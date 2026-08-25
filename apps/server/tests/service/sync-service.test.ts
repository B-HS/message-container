import { describe, expect, test } from 'bun:test'

import { APPLE_EPOCH_UTC_MS } from '@/lib/apple-time'
import { RESCAN_WINDOW_ROWS, createSyncService } from '@/service/domain/message/sync-service'
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
    isRead: false,
    msSinceAppleEpochRead: null,
    associatedMessageGuid: null,
    associatedMessageType: null,
    ...overrides,
})

const logStub = { record: async () => {} }

const createSyncDbStub = (initialCursor = 0) => {
    const savedBatches: SyncBatch[] = []
    let cursor = initialCursor
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
                    if (limit === RESCAN_WINDOW_ROWS) return emptyBatch
                    if (afterRowId >= 3) return emptyBatch
                    const rowIds = afterRowId === 0 ? [1, 2] : [3]
                    return { ...emptyBatch, messages: rowIds.map((id) => buildSourceMessage(id)) }
                },
            },
            batchSize: 2,
            log: logStub,
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
            log: logStub,
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
            log: logStub,
        })

        await service.runOnce()

        expect(stub.savedBatches.at(0)?.messages.at(0)?.sentAtMs).toBe(APPLE_EPOCH_UTC_MS + 1000)
    })

    test('신규 메시지가 없으면 저장 없이 종료하고 lastError 를 비운다', async () => {
        const stub = createSyncDbStub()
        const service = createSyncService({ db: stub.db, source: { readBatch: () => emptyBatch }, batchSize: 10, log: logStub })

        const result = await service.runOnce()

        expect(result.synced).toBe(0)
        expect(stub.savedBatches.length).toBe(0)
        expect((await stub.db.getStatus()).lastErrorMessage).toBeNull()
    })
})

describe('syncService.runOnce 재스캔', () => {
    test('신규분 처리 후 최근 윈도를 재읽기해 upsert 하고 커서는 전진시키지 않는다', async () => {
        const initialCursor = 1000
        const stub = createSyncDbStub(initialCursor)
        const calls: { afterRowId: number; limit: number }[] = []
        const service = createSyncService({
            db: stub.db,
            source: {
                readBatch: (afterRowId, limit) => {
                    calls.push({ afterRowId, limit })
                    if (limit === RESCAN_WINDOW_ROWS) return { ...emptyBatch, messages: [buildSourceMessage(999, { text: '수정된 본문' })] }
                    return emptyBatch
                },
            },
            batchSize: 10,
            log: logStub,
        })

        const result = await service.runOnce()

        expect(result.synced).toBe(0)
        expect(calls).toEqual([
            { afterRowId: initialCursor, limit: 10 },
            { afterRowId: initialCursor - RESCAN_WINDOW_ROWS, limit: RESCAN_WINDOW_ROWS },
        ])
        expect(stub.savedBatches.at(0)?.messages.at(0)?.text).toBe('수정된 본문')
        expect(stub.getCursor()).toBe(initialCursor)
    })

    test('커서가 윈도보다 작으면 0부터 재읽기한다', async () => {
        const initialCursor = 100
        const stub = createSyncDbStub(initialCursor)
        const calls: { afterRowId: number; limit: number }[] = []
        const service = createSyncService({
            db: stub.db,
            source: {
                readBatch: (afterRowId, limit) => {
                    calls.push({ afterRowId, limit })
                    return emptyBatch
                },
            },
            batchSize: 10,
            log: logStub,
        })

        await service.runOnce()

        expect(calls.at(-1)).toEqual({ afterRowId: 0, limit: RESCAN_WINDOW_ROWS })
    })

    test('커서가 0이면(최초 동기화 전) 재스캔하지 않는다', async () => {
        const stub = createSyncDbStub()
        const calls: { afterRowId: number; limit: number }[] = []
        const service = createSyncService({
            db: stub.db,
            source: {
                readBatch: (afterRowId, limit) => {
                    calls.push({ afterRowId, limit })
                    return emptyBatch
                },
            },
            batchSize: 10,
            log: logStub,
        })

        await service.runOnce()

        expect(calls).toEqual([{ afterRowId: 0, limit: 10 }])
    })

    test('읽음 상태·tapback 컬럼이 저장 행으로 정규화된다', async () => {
        const stub = createSyncDbStub()
        const service = createSyncService({
            db: stub.db,
            source: {
                readBatch: (afterRowId, limit) =>
                    afterRowId === 0 && limit === 10
                        ? {
                              ...emptyBatch,
                              messages: [
                                  buildSourceMessage(1, {
                                      isRead: true,
                                      msSinceAppleEpochRead: 2000,
                                      associatedMessageGuid: 'p:0/target-guid',
                                      associatedMessageType: 2001,
                                  }),
                              ],
                          }
                        : emptyBatch,
            },
            batchSize: 10,
            log: logStub,
        })

        await service.runOnce()

        const saved = stub.savedBatches.at(0)?.messages.at(0)
        expect(saved?.isRead).toBe(true)
        expect(saved?.dateReadMs).toBe(APPLE_EPOCH_UTC_MS + 2000)
        expect(saved?.associatedMessageGuid).toBe('p:0/target-guid')
        expect(saved?.associatedMessageType).toBe(2001)
    })

    test('associatedMessageType 0 과 빈 guid 는 null 로 정규화된다', async () => {
        const stub = createSyncDbStub()
        const service = createSyncService({
            db: stub.db,
            source: {
                readBatch: (afterRowId, limit) =>
                    afterRowId === 0 && limit === 10
                        ? { ...emptyBatch, messages: [buildSourceMessage(1, { associatedMessageGuid: '', associatedMessageType: 0 })] }
                        : emptyBatch,
            },
            batchSize: 10,
            log: logStub,
        })

        await service.runOnce()

        const saved = stub.savedBatches.at(0)?.messages.at(0)
        expect(saved?.associatedMessageGuid).toBeNull()
        expect(saved?.associatedMessageType).toBeNull()
    })
})
