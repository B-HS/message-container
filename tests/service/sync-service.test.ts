import { describe, expect, test } from 'bun:test'

import { APPLE_EPOCH_UTC_MS } from '@/lib/apple-time'
import { createSyncService } from '@/service/domain/message/sync-service'
import { buildTypedstreamBody } from '@/tests/helpers/typedstream-fixture'

import type { SyncBatch, SyncServiceDb } from '@/service/domain/message/sync-service'
import type { ChatDbBatch } from '@/service/shared/chat-db-reader'

const emptyBatch: ChatDbBatch = { messages: [], chats: [], handles: [], chatHandles: [], attachments: [] }

const buildSourceMessage = (rowId: number, overrides?: Partial<ChatDbBatch['messages'][number]>) => ({
    rowId,
    guid: `guid-${rowId}`,
    text: `text-${rowId}`,
    attributedBody: null,
    handleRowId: 1,
    isFromMe: false,
    msSinceAppleEpoch: 1000,
    service: 'iMessage',
    hasAttachments: false,
    chatRowId: 10,
    ...overrides,
})

const createSyncDbStub = () => {
    const savedBatches: SyncBatch[] = []
    let cursor = 0
    let lastError: string | null = null
    const db: SyncServiceDb = {
        getCursor: async () => cursor,
        saveBatch: async (batch, nextCursor) => {
            savedBatches.push(batch)
            cursor = nextCursor
        },
        markSynced: async () => {},
        setLastError: async (message) => {
            lastError = message
        },
        getStatus: async () => ({ cursor, lastSyncAtMs: null, lastErrorMessage: lastError, counts: { chats: 0, messages: 0, attachments: 0 } }),
    }
    return { db, savedBatches, getCursor: () => cursor }
}

describe('syncService.runOnce', () => {
    test('배치가 가득 차면 커서를 전진시키며 반복 동기화한다', async () => {
        const stub = createSyncDbStub()
        const service = createSyncService({
            db: stub.db,
            source: {
                readBatch: (afterRowId, limit) => {
                    if (afterRowId >= 3) return emptyBatch
                    const rowIds = afterRowId === 0 ? [1, 2] : [3]
                    return { ...emptyBatch, messages: rowIds.map((id) => buildSourceMessage(id)) }
                },
            },
            batchSize: 2,
        })

        const result = await service.runOnce()

        expect(result.synced).toBe(3)
        expect(stub.savedBatches.length).toBe(2)
        expect(stub.getCursor()).toBe(3)
    })

    test('text 가 없으면 attributedBody 에서 본문을 추출한다', async () => {
        const stub = createSyncDbStub()
        const service = createSyncService({
            db: stub.db,
            source: {
                readBatch: (afterRowId) =>
                    afterRowId === 0
                        ? { ...emptyBatch, messages: [buildSourceMessage(1, { text: null, attributedBody: buildTypedstreamBody('복원된 본문') })] }
                        : emptyBatch,
            },
            batchSize: 10,
        })

        await service.runOnce()

        expect(stub.savedBatches.at(0)?.messages.at(0)?.text).toBe('복원된 본문')
    })

    test('sentAtMs 는 Apple epoch 오프셋에 Unix epoch 을 더한 값이다', async () => {
        const stub = createSyncDbStub()
        const service = createSyncService({
            db: stub.db,
            source: { readBatch: (afterRowId) => (afterRowId === 0 ? { ...emptyBatch, messages: [buildSourceMessage(1)] } : emptyBatch) },
            batchSize: 10,
        })

        await service.runOnce()

        expect(stub.savedBatches.at(0)?.messages.at(0)?.sentAtMs).toBe(APPLE_EPOCH_UTC_MS + 1000)
    })

    test('신규 메시지가 없으면 저장 없이 종료하고 lastError 를 비운다', async () => {
        const stub = createSyncDbStub()
        const service = createSyncService({ db: stub.db, source: { readBatch: () => emptyBatch }, batchSize: 10 })

        const result = await service.runOnce()

        expect(result.synced).toBe(0)
        expect(stub.savedBatches.length).toBe(0)
        expect((await stub.db.getStatus()).lastErrorMessage).toBeNull()
    })
})
