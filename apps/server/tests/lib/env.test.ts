import { describe, expect, test } from 'bun:test'

import { envSchema } from '@/lib/env'

const DEFAULT_SYNC_INTERVAL_MS = 5000
const DEFAULT_SYNC_BATCH_SIZE = 1000
const DEFAULT_PORT = 33000

describe('envSchema', () => {
    test('DATABASE_URL 이 있으면 mysql 기본값으로 파싱한다', () => {
        const result = envSchema.parse({ DATABASE_URL: 'mysql://localhost/db' })

        expect(result.DB_PROVIDER).toBe('mysql')
        expect(result.SQLITE_PATH).toBe('/data/messages.db')
        expect(result.CHAT_DB_PATH).toBe('/host/messages/chat.db')
        expect(result.ATTACHMENTS_ROOT).toBe('/host/messages/Attachments')
        expect(result.SYNC_INTERVAL_MS).toBe(DEFAULT_SYNC_INTERVAL_MS)
        expect(result.SYNC_BATCH_SIZE).toBe(DEFAULT_SYNC_BATCH_SIZE)
        expect(result.PORT).toBe(DEFAULT_PORT)
        expect(result.NODE_ENV).toBe('development')
    })

    test('숫자 문자열을 coerce 한다', () => {
        const result = envSchema.parse({
            DB_PROVIDER: 'sqlite',
            SYNC_INTERVAL_MS: '10000',
            SYNC_BATCH_SIZE: '500',
            PORT: '4000',
        })

        expect(result.SYNC_INTERVAL_MS).toBe(10000)
        expect(result.SYNC_BATCH_SIZE).toBe(500)
        expect(result.PORT).toBe(4000)
    })

    test('DB_PROVIDER 가 mysql 인데 DATABASE_URL 이 없으면 실패한다', () => {
        const result = envSchema.safeParse({ DB_PROVIDER: 'mysql' })

        expect(result.success).toBe(false)
    })

    test('DB_PROVIDER 가 postgres 인데 DATABASE_URL 이 없으면 실패한다', () => {
        const result = envSchema.safeParse({ DB_PROVIDER: 'postgres' })

        expect(result.success).toBe(false)
    })

    test('DB_PROVIDER 가 sqlite 이면 DATABASE_URL 없이도 성공한다', () => {
        const result = envSchema.safeParse({ DB_PROVIDER: 'sqlite' })

        expect(result.success).toBe(true)
    })

    test('잘못된 DB_PROVIDER 값이면 실패한다', () => {
        const result = envSchema.safeParse({ DB_PROVIDER: 'oracle', DATABASE_URL: 'x' })

        expect(result.success).toBe(false)
    })
})
