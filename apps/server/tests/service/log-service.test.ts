import { describe, expect, test } from 'bun:test'

import { createLogService } from '@/service/domain/log/log-service'

import type { LogRecord, LogServiceDb } from '@/service/domain/log/log-service'

const CREATED_AT_MS = 1_700_000_000_000

const buildRecord = (id: number): LogRecord => ({
    id,
    level: 'info',
    event: 'sync.batch',
    message: '메시지 2건 동기화',
    detailsJson: '{"synced":2}',
    createdAtMs: CREATED_AT_MS,
})

const createStubDb = () => {
    const inserted: Parameters<LogServiceDb['insertLog']>[0][] = []
    const prunedKeeps: number[] = []
    const db: LogServiceDb = {
        insertLog: async (row) => {
            inserted.push(row)
        },
        listLogs: async () => ({ data: [], total: 0 }),
        pruneLogs: async (keep) => {
            prunedKeeps.push(keep)
        },
    }
    return { db, inserted, prunedKeeps }
}

describe('logService.record', () => {
    test('details 를 JSON 문자열로 저장하고 보존 상한 정리를 호출한다', async () => {
        const stub = createStubDb()
        const service = createLogService({ db: stub.db })

        await service.record({ level: 'info', event: 'sync.batch', message: '메시지 2건 동기화', details: { synced: 2 } })

        expect(stub.inserted.length).toBe(1)
        expect(stub.inserted.at(0)?.detailsJson).toBe('{"synced":2}')
        expect(stub.prunedKeeps.length).toBe(1)
    })

    test('details 가 없으면 detailsJson 은 null 이다', async () => {
        const stub = createStubDb()
        const service = createLogService({ db: stub.db })

        await service.record({ level: 'error', event: 'sync.error', message: '읽기 실패' })

        expect(stub.inserted.at(0)?.detailsJson).toBeNull()
    })

    test('db 삽입이 실패해도 예외를 전파하지 않는다', async () => {
        const db: LogServiceDb = {
            insertLog: async () => {
                throw new TypeError('db down')
            },
            listLogs: async () => ({ data: [], total: 0 }),
            pruneLogs: async () => {},
        }
        const service = createLogService({ db })

        await expect(service.record({ level: 'error', event: 'sync.error', message: '실패' })).resolves.toBeUndefined()
    })
})

describe('logService.list', () => {
    test('page/limit 을 offset 으로 변환하고 createdAtMs 를 createdAt ISO 로 바꾼다', async () => {
        const capturedParams: Parameters<LogServiceDb['listLogs']>[0][] = []
        const db: LogServiceDb = {
            insertLog: async () => {},
            listLogs: async (params) => {
                capturedParams.push(params)
                return { data: [buildRecord(1)], total: 1 }
            },
            pruneLogs: async () => {},
        }
        const service = createLogService({ db })

        const result = await service.list({ page: 3, limit: 10, level: 'info' })

        expect(capturedParams).toEqual([{ offset: 20, limit: 10, level: 'info' }])
        expect(result.data.at(0)?.createdAt).toBe(new Date(CREATED_AT_MS).toISOString())
        expect(result.data.at(0) && 'createdAtMs' in (result.data.at(0) ?? {})).toBe(false)
    })
})
