import '@/tests/helpers/test-env'

import { Database } from 'bun:sqlite'
import { afterAll, describe, expect, test } from 'bun:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Hono } from 'hono'
import { z } from 'zod'

import { compose } from '@/compose'
import { createDbClient, runMigrations } from '@/db'
import { createRouter } from '@/route'
import { createFakeChatDbSchema } from '@/tests/helpers/fake-chat-db'
import { parseJson } from '@/tests/helpers/parse-json'

import type { Env } from '@/lib/env'

const NS_PER_MS = 1_000_000n
const INDIVIDUAL_CHAT_STYLE = 45
const GROUP_CHAT_STYLE = 43
const INDIVIDUAL_CHAT_ROW_ID = 10
const GROUP_CHAT_ROW_ID = 11
const MISSING_CHAT_ROW_ID = 9999
const HANDLE_1_ROW_ID = 1
const HANDLE_2_ROW_ID = 2
const HANDLE_1_ADDRESS = '+821012345678'
const HANDLE_2_ADDRESS = 'friend@example.com'
const MESSAGE_1_ROW_ID = 1
const MESSAGE_2_ROW_ID = 2
const MESSAGE_3_ROW_ID = 3
const MESSAGE_1_TEXT = '안녕하세요 반갑습니다'
const MESSAGE_2_TEXT = '네 안녕하세요'
const MESSAGE_3_TEXT = '사진 보냈어요'
const SEARCH_KEYWORD = '사진'
const ATTACHMENT_ROW_ID = 100
const MISSING_ATTACHMENT_ROW_ID = 9999
const ATTACHMENT_MIME_TYPE = 'image/png'
const ATTACHMENT_BYTES = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10])
const BASE_MS = 700_000_000_000
const MESSAGE_INTERVAL_MS = 1000
const ENV_SYNC_INTERVAL_MS = 1000
const ENV_SYNC_BATCH_SIZE = 1000
const OVER_MAX_LIMIT = 101

const tempDir = mkdtempSync(join(tmpdir(), 'api-e2e-'))
const chatDbPath = join(tempDir, 'chat.db')
const attachmentsRoot = join(tempDir, 'attachments')

const toApplenanoseconds = (ms: number) => BigInt(ms) * NS_PER_MS

const seedFakeChatDb = () => {
    const db = new Database(chatDbPath, { create: true })
    createFakeChatDbSchema(db)
    db.exec(`
        INSERT INTO handle (ROWID, id, service) VALUES (${HANDLE_1_ROW_ID}, '${HANDLE_1_ADDRESS}', 'iMessage'), (${HANDLE_2_ROW_ID}, '${HANDLE_2_ADDRESS}', 'iMessage');
        INSERT INTO chat (ROWID, guid, chat_identifier, service_name, display_name, style)
            VALUES (${INDIVIDUAL_CHAT_ROW_ID}, 'chat-guid-10', '${HANDLE_1_ADDRESS}', 'iMessage', NULL, ${INDIVIDUAL_CHAT_STYLE}),
                   (${GROUP_CHAT_ROW_ID}, 'chat-guid-11', 'group-1', 'iMessage', '가족방', ${GROUP_CHAT_STYLE});
        INSERT INTO chat_handle_join (chat_id, handle_id)
            VALUES (${INDIVIDUAL_CHAT_ROW_ID}, ${HANDLE_1_ROW_ID}), (${GROUP_CHAT_ROW_ID}, ${HANDLE_1_ROW_ID}), (${GROUP_CHAT_ROW_ID}, ${HANDLE_2_ROW_ID});
        INSERT INTO attachment (ROWID, guid, filename, transfer_name, mime_type, total_bytes)
            VALUES (${ATTACHMENT_ROW_ID}, 'att-guid', '~/Library/Messages/Attachments/ab/photo.png', 'photo.png', '${ATTACHMENT_MIME_TYPE}', ${ATTACHMENT_BYTES.length});
    `)
    const insertMessage = db.prepare(
        'INSERT INTO message (ROWID, guid, text, attributedBody, handle_id, is_from_me, date, service, cache_has_attachments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    )
    insertMessage.run(MESSAGE_1_ROW_ID, 'msg-1', MESSAGE_1_TEXT, null, HANDLE_1_ROW_ID, 0, toApplenanoseconds(BASE_MS), 'iMessage', 0)
    insertMessage.run(MESSAGE_2_ROW_ID, 'msg-2', MESSAGE_2_TEXT, null, 0, 1, toApplenanoseconds(BASE_MS + MESSAGE_INTERVAL_MS), 'iMessage', 0)
    insertMessage.run(
        MESSAGE_3_ROW_ID,
        'msg-3',
        MESSAGE_3_TEXT,
        null,
        HANDLE_2_ROW_ID,
        0,
        toApplenanoseconds(BASE_MS + MESSAGE_INTERVAL_MS * 2),
        'iMessage',
        1,
    )
    db.exec(
        `INSERT INTO chat_message_join (chat_id, message_id) VALUES (${INDIVIDUAL_CHAT_ROW_ID}, ${MESSAGE_1_ROW_ID}), (${INDIVIDUAL_CHAT_ROW_ID}, ${MESSAGE_2_ROW_ID}), (${GROUP_CHAT_ROW_ID}, ${MESSAGE_3_ROW_ID})`,
    )
    db.exec(`INSERT INTO message_attachment_join (message_id, attachment_id) VALUES (${MESSAGE_3_ROW_ID}, ${ATTACHMENT_ROW_ID})`)
    db.close()
}

seedFakeChatDb()
await Bun.write(join(attachmentsRoot, 'ab', 'photo.png'), ATTACHMENT_BYTES)

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
const app = new Hono().route('/api', createRouter(composed))

const createdKey = await composed.authService.createApiKey('e2e')
const authedRequest = (path: string, init?: RequestInit) =>
    app.request(path, { ...init, headers: { ...init?.headers, Authorization: `Bearer ${createdKey.key}` } })

afterAll(() => rmSync(tempDir, { recursive: true, force: true }))

const successEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({ success: z.literal(true), data: dataSchema })

const paginatedEnvelopeSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        success: z.literal(true),
        data: z.array(itemSchema),
        pagination: z.object({ page: z.number(), limit: z.number(), total: z.number(), totalPages: z.number() }),
    })

const errorEnvelopeSchema = z.object({ success: z.literal(false), error: z.object({ code: z.string(), message: z.string() }).passthrough() })

const syncStatusDataSchema = z.object({
    cursor: z.number(),
    lastSyncAt: z.string().nullable(),
    lastError: z.string().nullable(),
    counts: z.object({ chats: z.number(), messages: z.number(), attachments: z.number() }),
})

const chatSummarySchema = z.object({
    sourceRowId: z.number(),
    guid: z.string(),
    identifier: z.string().nullable(),
    serviceNames: z.array(z.string()),
    displayName: z.string().nullable(),
    isGroup: z.boolean(),
    chatIds: z.array(z.number()),
    participants: z.array(z.object({ address: z.string(), service: z.string().nullable() })),
    messageCount: z.number(),
    lastMessageText: z.string().nullable(),
    lastMessageAt: z.string().nullable(),
})

const messageSummarySchema = z.object({
    sourceRowId: z.number(),
    guid: z.string(),
    chatSourceRowId: z.number().nullable(),
    senderAddress: z.string().nullable(),
    isFromMe: z.boolean(),
    text: z.string().nullable(),
    service: z.string().nullable(),
    sentAt: z.string(),
    hasAttachments: z.boolean(),
    isRead: z.boolean(),
    readAt: z.string().nullable(),
    associatedMessageGuid: z.string().nullable(),
    associatedMessageType: z.number().nullable(),
})

const logEntrySchema = z.object({
    id: z.number(),
    level: z.string(),
    event: z.string(),
    message: z.string(),
    detailsJson: z.string().nullable(),
    createdAt: z.string(),
})

describe('API e2e', () => {
    test('POST /api/sync/run 은 fake chat.db 의 메시지 3건을 동기화한다', async () => {
        const res = await authedRequest('/api/sync/run', { method: 'POST' })
        expect(res.status).toBe(200)
        const body = await parseJson(res, successEnvelopeSchema(z.object({ synced: z.number() })))
        expect(body.data.synced).toBe(3)
    })

    test('GET /api/sync/status 는 동기화된 카운트와 마지막 에러 없음을 반환한다', async () => {
        const res = await authedRequest('/api/sync/status')
        expect(res.status).toBe(200)
        const body = await parseJson(res, successEnvelopeSchema(syncStatusDataSchema))
        expect(body.data.counts).toEqual({ chats: 2, messages: 3, attachments: 1 })
        expect(body.data.lastError).toBeNull()
    })

    test('GET /api/chats 는 참여자 정보를 포함한 대화 2건을 반환한다', async () => {
        const res = await authedRequest('/api/chats')
        expect(res.status).toBe(200)
        const body = await parseJson(res, paginatedEnvelopeSchema(chatSummarySchema))

        expect(body.data.length).toBe(2)
        const individualChat = body.data.find((chat) => chat.sourceRowId === INDIVIDUAL_CHAT_ROW_ID)
        const groupChat = body.data.find((chat) => chat.sourceRowId === GROUP_CHAT_ROW_ID)
        expect(individualChat?.isGroup).toBe(false)
        expect(individualChat?.participants.map((p) => p.address)).toEqual([HANDLE_1_ADDRESS])
        expect(groupChat?.isGroup).toBe(true)
        expect(groupChat?.participants.map((p) => p.address).toSorted()).toEqual([HANDLE_1_ADDRESS, HANDLE_2_ADDRESS].toSorted())
    })

    test('GET /api/chats/:id/messages 는 최신 메시지 순으로 발신자 주소와 함께 반환한다', async () => {
        const res = await authedRequest(`/api/chats/${INDIVIDUAL_CHAT_ROW_ID}/messages`)
        expect(res.status).toBe(200)
        const body = await parseJson(res, paginatedEnvelopeSchema(messageSummarySchema))

        expect(body.data.map((m) => m.sourceRowId)).toEqual([MESSAGE_2_ROW_ID, MESSAGE_1_ROW_ID])
        expect(body.data.at(0)?.isFromMe).toBe(true)
        expect(body.data.at(0)?.senderAddress).toBeNull()
        expect(body.data.at(1)?.senderAddress).toBe(HANDLE_1_ADDRESS)
    })

    test('GET /api/chats/:id/messages 는 존재하지 않는 대화면 404 CHAT_NOT_FOUND 봉투를 반환한다', async () => {
        const res = await authedRequest(`/api/chats/${MISSING_CHAT_ROW_ID}/messages`)
        expect(res.status).toBe(404)
        const body = await parseJson(res, errorEnvelopeSchema)
        expect(body.error.code).toBe('CHAT_NOT_FOUND')
    })

    test('GET /api/messages 는 검색어로 메시지를 필터링한다', async () => {
        const res = await authedRequest(`/api/messages?q=${encodeURIComponent(SEARCH_KEYWORD)}`)
        expect(res.status).toBe(200)
        const body = await parseJson(res, paginatedEnvelopeSchema(messageSummarySchema))

        expect(body.data.map((m) => m.sourceRowId)).toEqual([MESSAGE_3_ROW_ID])
        expect(body.data.at(0)?.text).toBe(MESSAGE_3_TEXT)
    })

    test('GET /api/attachments/:id/file 은 첨부파일 바이트를 그대로 반환한다', async () => {
        const res = await authedRequest(`/api/attachments/${ATTACHMENT_ROW_ID}/file`)
        expect(res.status).toBe(200)
        expect(res.headers.get('content-type')).toBe(ATTACHMENT_MIME_TYPE)
        const bytes = new Uint8Array(await res.arrayBuffer())
        expect(Array.from(bytes)).toEqual(Array.from(ATTACHMENT_BYTES))
    })

    test('GET /api/attachments/:id/file 은 존재하지 않는 첨부면 404 를 반환한다', async () => {
        const res = await authedRequest(`/api/attachments/${MISSING_ATTACHMENT_ROW_ID}/file`)
        expect(res.status).toBe(404)
        const body = await parseJson(res, errorEnvelopeSchema)
        expect(body.error.code).toBe('ATTACHMENT_NOT_FOUND')
    })

    test('GET /api/chats 는 limit 이 최대값을 넘으면 400 VALIDATION_ERROR 봉투를 반환한다', async () => {
        const res = await authedRequest(`/api/chats?limit=${OVER_MAX_LIMIT}`)
        expect(res.status).toBe(400)
        const body = await parseJson(res, errorEnvelopeSchema)
        expect(body.error.code).toBe('VALIDATION_ERROR')
    })

    test('API 키가 없거나 폐기된 키면 401 UNAUTHORIZED 봉투를 반환한다', async () => {
        const withoutKey = await app.request('/api/chats')
        expect(withoutKey.status).toBe(401)
        expect((await parseJson(withoutKey, errorEnvelopeSchema)).error.code).toBe('UNAUTHORIZED')

        const revokedKey = await composed.authService.createApiKey('revoked')
        await composed.authService.revokeApiKey(revokedKey.id)
        const withRevokedKey = await app.request('/api/chats', { headers: { Authorization: `Bearer ${revokedKey.key}` } })
        expect(withRevokedKey.status).toBe(401)
    })

    test('기존 행의 text 수정·읽음 처리가 재동기화(재스캔)로 반영된다', async () => {
        const editedText = '수정된 인사말'
        const readAtMs = BASE_MS + MESSAGE_INTERVAL_MS * 3
        const chatDb = new Database(chatDbPath)
        chatDb.exec(
            `UPDATE message SET text = '${editedText}', is_read = 1, date_read = ${toApplenanoseconds(readAtMs)} WHERE ROWID = ${MESSAGE_1_ROW_ID}`,
        )
        chatDb.close()

        const syncRes = await authedRequest('/api/sync/run', { method: 'POST' })
        expect((await parseJson(syncRes, successEnvelopeSchema(z.object({ synced: z.number() })))).data.synced).toBe(0)

        const res = await authedRequest(`/api/chats/${INDIVIDUAL_CHAT_ROW_ID}/messages`)
        const body = await parseJson(res, paginatedEnvelopeSchema(messageSummarySchema))
        const editedMessage = body.data.find((m) => m.sourceRowId === MESSAGE_1_ROW_ID)
        expect(editedMessage?.text).toBe(editedText)
        expect(editedMessage?.isRead).toBe(true)
        expect(editedMessage?.readAt).not.toBeNull()
    })

    test('tapback 행은 associated 정보와 함께 동기화된다', async () => {
        const tapbackRowId = 4
        const tapbackLikeType = 2001
        const chatDb = new Database(chatDbPath)
        chatDb
            .prepare(
                'INSERT INTO message (ROWID, guid, text, attributedBody, handle_id, is_from_me, date, service, cache_has_attachments, associated_message_guid, associated_message_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            )
            .run(
                tapbackRowId,
                'msg-4',
                null,
                null,
                HANDLE_1_ROW_ID,
                0,
                toApplenanoseconds(BASE_MS + MESSAGE_INTERVAL_MS * 4),
                'iMessage',
                0,
                'p:0/msg-2',
                tapbackLikeType,
            )
        chatDb.exec(`INSERT INTO chat_message_join (chat_id, message_id) VALUES (${INDIVIDUAL_CHAT_ROW_ID}, ${tapbackRowId})`)
        chatDb.close()

        const syncRes = await authedRequest('/api/sync/run', { method: 'POST' })
        expect((await parseJson(syncRes, successEnvelopeSchema(z.object({ synced: z.number() })))).data.synced).toBe(1)

        const res = await authedRequest(`/api/chats/${INDIVIDUAL_CHAT_ROW_ID}/messages`)
        const body = await parseJson(res, paginatedEnvelopeSchema(messageSummarySchema))
        const tapback = body.data.find((m) => m.sourceRowId === tapbackRowId)
        expect(tapback?.associatedMessageGuid).toBe('p:0/msg-2')
        expect(tapback?.associatedMessageType).toBe(tapbackLikeType)
    })

    test('GET /api/logs 는 인증 이벤트 로그를 최신순으로 반환하고 level 필터를 지원한다', async () => {
        const res = await authedRequest('/api/logs')
        expect(res.status).toBe(200)
        const body = await parseJson(res, paginatedEnvelopeSchema(logEntrySchema))
        expect(body.data.some((entry) => entry.event === 'auth.key.created')).toBe(true)
        expect(body.data.some((entry) => entry.event === 'auth.key.revoked')).toBe(true)
        const ids = body.data.map((entry) => entry.id)
        expect(ids).toEqual(ids.toSorted((a, b) => b - a))

        const filtered = await authedRequest('/api/logs?level=info')
        const filteredBody = await parseJson(filtered, paginatedEnvelopeSchema(logEntrySchema))
        expect(filteredBody.data.every((entry) => entry.level === 'info')).toBe(true)
        expect(filteredBody.data.length).toBeGreaterThan(0)
    })
})
