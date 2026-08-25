import { Database } from 'bun:sqlite'
import { afterAll, describe, expect, test } from 'bun:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { z } from 'zod'

import { createFakeChatDbSchema } from '@/tests/helpers/fake-chat-db'
import { parseJson } from '@/tests/helpers/parse-json'

const PROJECT_ROOT = join(import.meta.dir, '..', '..')
const SERVER_PORT = 3891
const BASE_URL = `http://localhost:${SERVER_PORT}`
const POLL_INTERVAL_MS = 250
const MAX_POLL_ATTEMPTS = 40
const BOOT_TEST_TIMEOUT_MS = 20_000
const PANEL_PASSWORD = 'boot-e2e-password'

const tempDir = mkdtempSync(join(tmpdir(), 'server-boot-e2e-'))
const sqlitePath = join(tempDir, 'messages.db')
const chatDbPath = join(tempDir, 'chat.db')
const attachmentsRoot = join(tempDir, 'attachments')

const seedFakeChatDb = () => {
    const db = new Database(chatDbPath, { create: true })
    createFakeChatDbSchema(db)
    db.close()
}

seedFakeChatDb()

const proc = Bun.spawn(['bun', 'index.ts'], {
    cwd: PROJECT_ROOT,
    env: {
        ...process.env,
        DB_PROVIDER: 'sqlite',
        SQLITE_PATH: sqlitePath,
        CHAT_DB_PATH: chatDbPath,
        ATTACHMENTS_ROOT: attachmentsRoot,
        PORT: String(SERVER_PORT),
        NODE_ENV: 'development',
        SYNC_INTERVAL_MS: '1000',
    },
    stdout: 'ignore',
    stderr: 'pipe',
})

afterAll(() => {
    proc.kill()
    rmSync(tempDir, { recursive: true, force: true })
})

const waitForBoot = async () => {
    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS - 1; attempt += 1) {
        try {
            const res = await fetch(`${BASE_URL}/panel`)
            if (res.status === 200) return res
        } catch {}
        await Bun.sleep(POLL_INTERVAL_MS)
    }
    return fetch(`${BASE_URL}/panel`)
}

const statusBodySchema = z.object({ success: z.boolean() })
const openapiBodySchema = z.object({ openapi: z.string() }).passthrough()

describe('서버 부트 e2e', () => {
    test(
        '부트 후 패널에서 패스워드 설정과 키 발급을 거쳐 API 를 인증 호출할 수 있다',
        async () => {
            const panelRes = await waitForBoot()
            expect(panelRes.status).toBe(200)
            expect(await panelRes.text()).toContain('초기 패스워드 설정')

            const setupRes = await fetch(`${BASE_URL}/panel/setup`, {
                method: 'POST',
                redirect: 'manual',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ password: PANEL_PASSWORD, confirm: PANEL_PASSWORD }),
            })
            expect(setupRes.status).toBe(302)
            const sessionCookie = setupRes.headers.get('set-cookie')?.split(';').at(0)
            expect(sessionCookie).toContain('panel_session=')

            const createKeyRes = await fetch(`${BASE_URL}/panel/keys`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: sessionCookie ?? '' },
                body: new URLSearchParams({ name: 'boot-e2e' }),
            })
            expect(createKeyRes.status).toBe(200)
            const apiKey = (await createKeyRes.text()).match(/msg_[A-Za-z0-9_-]+/)?.at(0)
            expect(apiKey).toBeTruthy()

            const unauthorizedRes = await fetch(`${BASE_URL}/api/sync/status`)
            expect(unauthorizedRes.status).toBe(401)

            const statusRes = await fetch(`${BASE_URL}/api/sync/status`, { headers: { Authorization: `Bearer ${apiKey}` } })
            expect(statusRes.status).toBe(200)
            expect((await parseJson(statusRes, statusBodySchema)).success).toBe(true)

            const chatsRes = await fetch(`${BASE_URL}/api/chats`, { headers: { Authorization: `Bearer ${apiKey}` } })
            expect(chatsRes.status).toBe(200)

            const openapiRes = await fetch(`${BASE_URL}/openapi.json`)
            expect(openapiRes.status).toBe(200)
            expect((await parseJson(openapiRes, openapiBodySchema)).openapi).toBeTruthy()
        },
        BOOT_TEST_TIMEOUT_MS,
    )
})
