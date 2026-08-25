import { describe, expect, test } from 'bun:test'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

import { createSqliteServiceDb } from '@/compose/provider/sqlite'

import type { SyncBatch } from '@/service/domain/message/sync-service'

const SYNCED_AT_MS = 1_700_000_000_000

const buildBatch = (): SyncBatch => ({
    chats: [
        {
            sourceRowId: 10,
            guid: 'chat-10',
            identifier: '+821012345678',
            serviceName: 'iMessage',
            displayName: null,
            isGroup: false,
            syncedAtMs: SYNCED_AT_MS,
        },
        {
            sourceRowId: 11,
            guid: 'chat-11',
            identifier: 'group-1',
            serviceName: 'iMessage',
            displayName: '가족방',
            isGroup: true,
            syncedAtMs: SYNCED_AT_MS,
        },
    ],
    handles: [
        { sourceRowId: 1, address: '+821012345678', service: 'iMessage', syncedAtMs: SYNCED_AT_MS },
        { sourceRowId: 2, address: 'friend@example.com', service: 'iMessage', syncedAtMs: SYNCED_AT_MS },
    ],
    chatHandles: [
        { chatSourceRowId: 10, handleSourceRowId: 1 },
        { chatSourceRowId: 11, handleSourceRowId: 1 },
        { chatSourceRowId: 11, handleSourceRowId: 2 },
    ],
    messages: [
        {
            sourceRowId: 1,
            guid: 'msg-1',
            chatSourceRowId: 10,
            handleSourceRowId: 1,
            isFromMe: false,
            text: '안녕하세요',
            service: 'iMessage',
            sentAtMs: SYNCED_AT_MS,
            hasAttachments: false,
            syncedAtMs: SYNCED_AT_MS,
        },
        {
            sourceRowId: 2,
            guid: 'msg-2',
            chatSourceRowId: 11,
            handleSourceRowId: 2,
            isFromMe: false,
            text: '사진 보냈어요',
            service: 'iMessage',
            sentAtMs: SYNCED_AT_MS + 1000,
            hasAttachments: true,
            syncedAtMs: SYNCED_AT_MS,
        },
    ],
    attachments: [
        {
            sourceRowId: 100,
            messageSourceRowId: 2,
            guid: 'att-100',
            transferName: 'photo.png',
            mimeType: 'image/png',
            totalBytes: 1234,
            sourcePath: '~/Library/Messages/Attachments/ab/photo.png',
        },
    ],
})

const setupServiceDb = async () => {
    const db = drizzle(':memory:')
    await migrate(db, { migrationsFolder: './drizzle/sqlite' })
    return createSqliteServiceDb(db)
}

describe('sqlite provider', () => {
    test('saveBatch 는 멱등하게 upsert 하고 커서를 저장한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 2)
        await serviceDb.sync.saveBatch(buildBatch(), 2)

        const status = await serviceDb.sync.getStatus()
        expect(status.cursor).toBe(2)
        expect(status.counts).toEqual({ chats: 2, messages: 2, attachments: 1 })
    })

    test('getChatList 는 참여자를 포함해 반환한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 2)

        const { data, total } = await serviceDb.chat.getChatList({ offset: 0, limit: 10 })
        expect(total).toBe(2)
        const groupChat = data.find((c) => c.sourceRowId === 11)
        expect(groupChat?.isGroup).toBe(true)
        expect(groupChat?.participants.map((p) => p.address).toSorted()).toEqual(['+821012345678', 'friend@example.com'])
    })

    test('getMessageListByChat 은 발신자 주소를 조인해 반환한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 2)

        const { data, total } = await serviceDb.message.getMessageListByChat({ chatSourceRowId: 11, offset: 0, limit: 10 })
        expect(total).toBe(1)
        expect(data.at(0)?.senderAddress).toBe('friend@example.com')
        expect(data.at(0)?.hasAttachments).toBe(true)
    })

    test('searchMessageList 는 키워드로 필터링한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 2)

        const { data } = await serviceDb.message.searchMessageList({ keyword: '사진', offset: 0, limit: 10 })
        expect(data.map((m) => m.sourceRowId)).toEqual([2])

        const all = await serviceDb.message.searchMessageList({ offset: 0, limit: 10 })
        expect(all.total).toBe(2)
    })

    test('markSynced 와 setLastError 상태가 getStatus 에 반영된다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.markSynced(SYNCED_AT_MS)
        await serviceDb.sync.setLastError('read failed')

        const status = await serviceDb.sync.getStatus()
        expect(status.lastSyncAtMs).toBe(SYNCED_AT_MS)
        expect(status.lastErrorMessage).toBe('read failed')

        await serviceDb.sync.setLastError(null)
        expect((await serviceDb.sync.getStatus()).lastErrorMessage).toBeNull()
    })

    test('getAttachmentById 는 저장된 첨부 메타데이터를 반환한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 2)

        const record = await serviceDb.attachment.getAttachmentById(100)
        expect(record?.sourcePath).toBe('~/Library/Messages/Attachments/ab/photo.png')
        expect(await serviceDb.attachment.getAttachmentById(999)).toBeNull()
    })
})
