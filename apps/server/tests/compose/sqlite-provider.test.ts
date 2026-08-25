import { describe, expect, test } from 'bun:test'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

import { createSqliteServiceDb } from '@/compose/provider/sqlite'
import { createChatService } from '@/service/domain/message/chat-service'

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
        {
            sourceRowId: 12,
            guid: 'chat-12',
            identifier: '+821012345678',
            serviceName: 'SMS',
            displayName: null,
            isGroup: false,
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
        { chatSourceRowId: 12, handleSourceRowId: 1 },
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
            isRead: false,
            dateReadMs: null,
            associatedMessageGuid: null,
            associatedMessageType: null,
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
            isRead: true,
            dateReadMs: SYNCED_AT_MS + 1500,
            associatedMessageGuid: null,
            associatedMessageType: null,
            syncedAtMs: SYNCED_AT_MS,
        },
        {
            sourceRowId: 3,
            guid: 'msg-3',
            chatSourceRowId: 12,
            handleSourceRowId: 1,
            isFromMe: false,
            text: '문자로 보냈어요',
            service: 'SMS',
            sentAtMs: SYNCED_AT_MS + 2000,
            hasAttachments: false,
            isRead: false,
            dateReadMs: null,
            associatedMessageGuid: null,
            associatedMessageType: null,
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
        await serviceDb.sync.saveBatch(buildBatch(), 3)
        await serviceDb.sync.saveBatch(buildBatch(), 3)

        const status = await serviceDb.sync.getStatus()
        expect(status.cursor).toBe(3)
        expect(status.counts).toEqual({ chats: 3, messages: 3, attachments: 1 })
    })

    test('chatService 는 같은 identifier 의 대화 행을 대표 1건으로 병합한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 3)
        const chatService = createChatService({ db: serviceDb.chat })

        const { data, total } = await chatService.list({ page: 1, limit: 10 })

        expect(total).toBe(2)
        const merged = data.at(0)
        expect(merged?.sourceRowId).toBe(12)
        expect(merged?.chatIds.toSorted()).toEqual([10, 12])
        expect(merged?.messageCount).toBe(2)
        expect(merged?.serviceNames.toSorted()).toEqual(['SMS', 'iMessage'])
        expect(merged?.lastMessageText).toBe('문자로 보냈어요')
        expect(merged?.participants.map((p) => p.address)).toEqual(['+821012345678'])
        expect(data.at(1)?.sourceRowId).toBe(11)
        expect(
            data
                .at(1)
                ?.participants.map((p) => p.address)
                .toSorted(),
        ).toEqual(['+821012345678', 'friend@example.com'])
    })

    test('chatService.getById 는 멤버 id 로도 병합 대화를 반환한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 3)
        const chatService = createChatService({ db: serviceDb.chat })

        const byMember = await chatService.getById(10)
        expect(byMember?.sourceRowId).toBe(12)
        expect(byMember?.chatIds.toSorted()).toEqual([10, 12])
    })

    test('getMessageListByChat 은 발신자 주소를 조인해 반환한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 3)

        const { data, total } = await serviceDb.message.getMessageListByChat({ chatSourceRowIds: [10, 12], offset: 0, limit: 10 })
        expect(total).toBe(2)
        expect(data.map((m) => m.sourceRowId)).toEqual([3, 1])
        expect(data.at(1)?.senderAddress).toBe('+821012345678')
    })

    test('searchMessageList 는 키워드로 필터링한다', async () => {
        const serviceDb = await setupServiceDb()
        await serviceDb.sync.saveBatch(buildBatch(), 3)

        const { data } = await serviceDb.message.searchMessageList({ keyword: '사진', offset: 0, limit: 10 })
        expect(data.map((m) => m.sourceRowId)).toEqual([2])

        const all = await serviceDb.message.searchMessageList({ offset: 0, limit: 10 })
        expect(all.total).toBe(3)
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
        await serviceDb.sync.saveBatch(buildBatch(), 3)

        const record = await serviceDb.attachment.getAttachmentById(100)
        expect(record?.sourcePath).toBe('~/Library/Messages/Attachments/ab/photo.png')
        expect(await serviceDb.attachment.getAttachmentById(999)).toBeNull()
    })
})
