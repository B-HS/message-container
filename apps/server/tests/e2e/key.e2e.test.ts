import '@/tests/helpers/test-env'

import { describe, expect, test } from 'bun:test'
import { Hono } from 'hono'
import { z } from 'zod'

import { compose } from '@/compose'
import { createDbClient, runMigrations } from '@/db'
import { createRouter } from '@/route'
import { parseJson } from '@/tests/helpers/parse-json'

import type { Env } from '@/lib/env'

const env: Env = {
    DB_PROVIDER: 'sqlite',
    DATABASE_URL: undefined,
    SQLITE_PATH: ':memory:',
    CHAT_DB_PATH: '/nonexistent/chat.db',
    ATTACHMENTS_ROOT: '/nonexistent/attachments',
    SYNC_INTERVAL_MS: 1000,
    SYNC_BATCH_SIZE: 1000,
    PORT: 0,
    NODE_ENV: 'test',
}

const client = createDbClient(env)
await runMigrations(client)
const composed = compose({ env, client })
const app = new Hono()
app.route('/api', createRouter(composed))

const sessionKey = await composed.authService.createApiKey('session')
const authedHeaders = { Authorization: `Bearer ${sessionKey.key}` }

const keyListSchema = z.object({
    success: z.literal(true),
    data: z.object({
        keys: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                start: z.string(),
                createdAtMs: z.number(),
                lastUsedAtMs: z.number().nullable(),
                revokedAtMs: z.number().nullable(),
            }),
        ),
    }),
})

const createdKeySchema = z.object({
    success: z.literal(true),
    data: z.object({ id: z.number(), name: z.string(), start: z.string(), key: z.string() }),
})

describe('키 관리 API e2e', () => {
    test('키 없이 호출하면 401 을 반환한다', async () => {
        expect((await app.request('/api/keys')).status).toBe(401)
    })

    test('생성 → 목록 → 폐기 흐름이 동작한다', async () => {
        const createRes = await app.request('/api/keys', {
            method: 'POST',
            headers: { ...authedHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'from-fe' }),
        })
        expect(createRes.status).toBe(200)
        const created = await parseJson(createRes, createdKeySchema)
        expect(created.data.key.startsWith('msg_')).toBe(true)

        const listBody = await parseJson(await app.request('/api/keys', { headers: authedHeaders }), keyListSchema)
        const target = listBody.data.keys.find((key) => key.id === created.data.id)
        expect(target?.name).toBe('from-fe')
        expect(target?.revokedAtMs).toBeNull()

        const revokeRes = await app.request(`/api/keys/${created.data.id}/revoke`, { method: 'POST', headers: authedHeaders })
        expect(revokeRes.status).toBe(200)

        const afterBody = await parseJson(await app.request('/api/keys', { headers: authedHeaders }), keyListSchema)
        expect(afterBody.data.keys.find((key) => key.id === created.data.id)?.revokedAtMs).not.toBeNull()

        expect((await app.request('/api/chats', { headers: { Authorization: `Bearer ${created.data.key}` } })).status).toBe(401)
    })

    test('빈 이름으로 생성하면 400 을 반환한다', async () => {
        const res = await app.request('/api/keys', {
            method: 'POST',
            headers: { ...authedHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: '  ' }),
        })
        expect(res.status).toBe(400)
    })
})
