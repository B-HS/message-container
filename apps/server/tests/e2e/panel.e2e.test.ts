import '@/tests/helpers/test-env'

import { Database } from 'bun:sqlite'
import { afterAll, describe, expect, test } from 'bun:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Hono } from 'hono'

import { compose } from '@/compose'
import { createDbClient, runMigrations } from '@/db'
import { createRouter } from '@/route'
import { createPanelRoute } from '@/route/panel'
import { createFakeChatDbSchema } from '@/tests/helpers/fake-chat-db'

import type { Env } from '@/lib/env'

const ENV_SYNC_INTERVAL_MS = 1000
const ENV_SYNC_BATCH_SIZE = 1000
const PANEL_PASSWORD = 'panel-e2e-password'
const SHORT_PASSWORD = 'short1'
const WRONG_PASSWORD = 'totally-wrong-password'
const KEY_NAME = 'test-key'
const NO_COOKIE_KEY_NAME = 'no-cookie-key'

const tempDir = mkdtempSync(join(tmpdir(), 'panel-e2e-'))
const chatDbPath = join(tempDir, 'chat.db')
const attachmentsRoot = join(tempDir, 'attachments')

const seedFakeChatDb = () => {
    const db = new Database(chatDbPath, { create: true })
    createFakeChatDbSchema(db)
    db.close()
}

seedFakeChatDb()

const env: Env = {
    DB_PROVIDER: 'sqlite',
    DATABASE_URL: undefined,
    SQLITE_PATH: ':memory:',
    CHAT_DB_PATH: chatDbPath,
    ATTACHMENTS_ROOT: attachmentsRoot,
    SYNC_INTERVAL_MS: ENV_SYNC_INTERVAL_MS,
    SYNC_BATCH_SIZE: ENV_SYNC_BATCH_SIZE,
    PORT: 0,
    NODE_ENV: 'test',
}

const client = createDbClient(env)
await runMigrations(client)
const composed = compose({ env, client })
const app = new Hono()
app.route('/panel', createPanelRoute({ authService: composed.authService }))
app.route('/api', createRouter(composed))

afterAll(() => rmSync(tempDir, { recursive: true, force: true }))

const extractSessionCookie = (res: Response) => res.headers.get('set-cookie')?.split(';').at(0)

let sessionCookie = ''
let issuedApiKey = ''

describe('패널 e2e', () => {
    test('최초 접근 시 초기 패스워드 설정 폼을 보여준다', async () => {
        const res = await app.request('/panel')
        expect(res.status).toBe(200)
        expect(await res.text()).toContain('초기 패스워드 설정')
    })

    test('8자 미만 패스워드로 설정을 시도하면 에러 문구와 함께 폼을 다시 보여준다', async () => {
        const res = await app.request('/panel/setup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ password: SHORT_PASSWORD, confirm: SHORT_PASSWORD }),
        })
        expect(res.status).toBe(200)
        expect(await res.text()).toContain('최소')
    })

    test('정상 패스워드로 설정하면 세션 쿠키와 함께 /panel 로 리다이렉트한다', async () => {
        const res = await app.request('/panel/setup', {
            method: 'POST',
            redirect: 'manual',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ password: PANEL_PASSWORD, confirm: PANEL_PASSWORD }),
        })
        expect(res.status).toBe(302)
        expect(res.headers.get('location')).toBe('/panel')
        const cookie = extractSessionCookie(res)
        expect(cookie).toContain('panel_session=')
    })

    test('이미 설정된 이후의 setup 요청은 /panel 로 리다이렉트한다', async () => {
        const res = await app.request('/panel/setup', {
            method: 'POST',
            redirect: 'manual',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ password: PANEL_PASSWORD, confirm: PANEL_PASSWORD }),
        })
        expect(res.status).toBe(302)
        expect(res.headers.get('location')).toBe('/panel')
    })

    test('틀린 패스워드로 로그인하면 로그인 페이지에 에러 문구를 보여준다', async () => {
        const res = await app.request('/panel/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ password: WRONG_PASSWORD }),
        })
        expect(res.status).toBe(200)
        expect(await res.text()).toContain('올바르지 않습니다')
    })

    test('맞는 패스워드로 로그인하면 세션 쿠키와 함께 /panel 로 리다이렉트한다', async () => {
        const res = await app.request('/panel/login', {
            method: 'POST',
            redirect: 'manual',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ password: PANEL_PASSWORD }),
        })
        expect(res.status).toBe(302)
        expect(res.headers.get('location')).toBe('/panel')
        const cookie = extractSessionCookie(res)
        expect(cookie).toContain('panel_session=')
        sessionCookie = cookie ?? ''
    })

    test('세션 쿠키로 키를 생성하면 새 키가 표시되고 목록에 이름이 나타난다', async () => {
        const res = await app.request('/panel/keys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: sessionCookie },
            body: new URLSearchParams({ name: KEY_NAME }),
        })
        expect(res.status).toBe(200)
        const html = await res.text()
        expect(html).toContain('data-new-key')
        const key = html.match(/<code data-new-key>(msg_[A-Za-z0-9_-]+)<\/code>/)?.at(1)
        expect(key).toBeTruthy()
        issuedApiKey = key ?? ''
        expect(html).toContain(KEY_NAME)
    })

    test('발급된 키로 GET /api/sync/status 를 호출할 수 있다', async () => {
        const res = await app.request('/api/sync/status', { headers: { Authorization: `Bearer ${issuedApiKey}` } })
        expect(res.status).toBe(200)
    })

    test('키를 폐기하면 이후 같은 키로 호출 시 401 이 된다', async () => {
        const target = (await composed.authService.listApiKeys()).find((key) => key.name === KEY_NAME)
        expect(target).toBeTruthy()

        const revokeRes = await app.request(`/panel/keys/${target?.id}/revoke`, {
            method: 'POST',
            redirect: 'manual',
            headers: { Cookie: sessionCookie },
        })
        expect(revokeRes.status).toBe(302)
        expect(revokeRes.headers.get('location')).toBe('/panel')

        const afterRevoke = await app.request('/api/sync/status', { headers: { Authorization: `Bearer ${issuedApiKey}` } })
        expect(afterRevoke.status).toBe(401)
    })

    test('세션 쿠키 없이 키 생성을 요청하면 /panel 로 리다이렉트한다', async () => {
        const res = await app.request('/panel/keys', {
            method: 'POST',
            redirect: 'manual',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ name: NO_COOKIE_KEY_NAME }),
        })
        expect(res.status).toBe(302)
        expect(res.headers.get('location')).toBe('/panel')
    })
})
