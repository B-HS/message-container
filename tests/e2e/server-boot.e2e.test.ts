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

const waitForStatusResponse = async () => {
    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS - 1; attempt += 1) {
        try {
            const res = await fetch(`${BASE_URL}/api/sync/status`)
            if (res.status === 200) return res
        } catch {}
        await Bun.sleep(POLL_INTERVAL_MS)
    }
    return fetch(`${BASE_URL}/api/sync/status`)
}

const statusBodySchema = z.object({ success: z.boolean() })
const openapiBodySchema = z.object({ openapi: z.string() }).passthrough()

describe('서버 부트 e2e', () => {
    test(
        '실제 서버 프로세스가 부트되어 sync 상태 · openapi 문서 · API 를 제공한다',
        async () => {
            const statusRes = await waitForStatusResponse()
            expect(statusRes.status).toBe(200)
            const statusBody = await parseJson(statusRes, statusBodySchema)
            expect(statusBody.success).toBe(true)

            const openapiRes = await fetch(`${BASE_URL}/openapi.json`)
            expect(openapiRes.status).toBe(200)
            const openapiBody = await parseJson(openapiRes, openapiBodySchema)
            expect(openapiBody.openapi).toBeTruthy()

            const chatsRes = await fetch(`${BASE_URL}/api/chats`)
            expect(chatsRes.status).toBe(200)
        },
        BOOT_TEST_TIMEOUT_MS,
    )
})
