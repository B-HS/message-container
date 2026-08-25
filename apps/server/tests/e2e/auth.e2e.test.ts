import '@/tests/helpers/test-env'

import { describe, expect, test } from 'bun:test'
import { Hono } from 'hono'
import { z } from 'zod'

import { compose } from '@/compose'
import { createDbClient, runMigrations } from '@/db'
import { createRouter } from '@/route'
import { createAuthRoute } from '@/route/auth'
import { parseJson } from '@/tests/helpers/parse-json'

import type { Env } from '@/lib/env'

const PASSWORD = 'auth-e2e-pass'
const WRONG_PASSWORD = 'wrong-password'

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
app.route('/api/auth', createAuthRoute({ authService: composed.authService }))
app.route('/api', createRouter(composed))

const postJson = (path: string, body: unknown) =>
    app.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

const keyEnvelopeSchema = z.object({
    success: z.literal(true),
    data: z.object({ id: z.number(), name: z.string(), start: z.string(), key: z.string() }),
})

const errorEnvelopeSchema = z.object({ success: z.literal(false), error: z.object({ code: z.string() }).passthrough() })

describe('auth JSON API e2e', () => {
    test('status 는 공개이며 초기 상태에서 passwordSet false 를 반환한다', async () => {
        const res = await app.request('/api/auth/status')
        expect(res.status).toBe(200)
        const body = await parseJson(res, z.object({ success: z.literal(true), data: z.object({ passwordSet: z.boolean() }) }))
        expect(body.data.passwordSet).toBe(false)
    })

    test('setup 은 패스워드를 설정하고 즉시 사용 가능한 API 키를 발급한다', async () => {
        const res = await postJson('/api/auth/setup', { password: PASSWORD })
        expect(res.status).toBe(200)
        const body = await parseJson(res, keyEnvelopeSchema)
        expect(body.data.key.startsWith('msg_')).toBe(true)

        const statusRes = await app.request('/api/sync/status', { headers: { Authorization: `Bearer ${body.data.key}` } })
        expect(statusRes.status).toBe(200)

        expect(
            (
                await parseJson(
                    await app.request('/api/auth/status'),
                    z.object({ success: z.literal(true), data: z.object({ passwordSet: z.boolean() }) }),
                )
            ).data.passwordSet,
        ).toBe(true)
    })

    test('setup 재호출은 409 AUTH_ALREADY_SETUP 을 반환한다', async () => {
        const res = await postJson('/api/auth/setup', { password: PASSWORD })
        expect(res.status).toBe(409)
        expect((await parseJson(res, errorEnvelopeSchema)).error.code).toBe('AUTH_ALREADY_SETUP')
    })

    test('login 은 틀린 패스워드에 401, 맞는 패스워드에 새 키를 발급한다', async () => {
        const invalidRes = await postJson('/api/auth/login', { password: WRONG_PASSWORD })
        expect(invalidRes.status).toBe(401)
        expect((await parseJson(invalidRes, errorEnvelopeSchema)).error.code).toBe('AUTH_INVALID_PASSWORD')

        const okRes = await postJson('/api/auth/login', { password: PASSWORD, keyName: 'web-login' })
        expect(okRes.status).toBe(200)
        const body = await parseJson(okRes, keyEnvelopeSchema)
        expect(body.data.name).toBe('web-login')

        const chatsRes = await app.request('/api/chats', { headers: { Authorization: `Bearer ${body.data.key}` } })
        expect(chatsRes.status).toBe(200)
    })

    test('짧은 패스워드로 setup 하면 400 VALIDATION_ERROR 를 반환한다', async () => {
        const res = await postJson('/api/auth/login', { password: '' })
        expect(res.status).toBe(400)
        const setupRes = await postJson('/api/auth/setup', { password: 'short' })
        expect(setupRes.status).toBe(400)
        expect((await parseJson(setupRes, errorEnvelopeSchema)).error.code).toBe('VALIDATION_ERROR')
    })
})
