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
import { createMcpRoute } from '@/route/mcp'
import { createFakeChatDbSchema } from '@/tests/helpers/fake-chat-db'
import { parseJson } from '@/tests/helpers/parse-json'

import type { Env } from '@/lib/env'

const NS_PER_MS = 1_000_000n
const INDIVIDUAL_CHAT_STYLE = 45
const CHAT_ROW_ID = 10
const MISSING_CHAT_ROW_ID = 9999
const HANDLE_ROW_ID = 1
const HANDLE_ADDRESS = '+821011112222'
const MESSAGE_1_ROW_ID = 1
const MESSAGE_2_ROW_ID = 2
const MESSAGE_1_TEXT = '안녕하세요'
const MESSAGE_2_TEXT = '사진 보냈습니다'
const SEARCH_KEYWORD = '사진'
const ATTACHMENT_ROW_ID = 100
const ATTACHMENT_MIME_TYPE = 'image/png'
const ATTACHMENT_BYTES = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10])
const BASE_MS = 700_000_000_000
const MESSAGE_INTERVAL_MS = 1000
const ENV_SYNC_INTERVAL_MS = 1000
const ENV_SYNC_BATCH_SIZE = 1000
const MCP_PROTOCOL_VERSION = '2025-06-18'
const MCP_TOOL_NAMES = ['list_chats', 'get_chat_messages', 'search_messages', 'get_sync_status', 'run_sync', 'get_attachment']
const SSE_DATA_PREFIX = 'data: '

const tempDir = mkdtempSync(join(tmpdir(), 'mcp-e2e-'))
const chatDbPath = join(tempDir, 'chat.db')
const attachmentsRoot = join(tempDir, 'attachments')

const toApplenanoseconds = (ms: number) => BigInt(ms) * NS_PER_MS

const seedFakeChatDb = () => {
    const db = new Database(chatDbPath, { create: true })
    createFakeChatDbSchema(db)
    db.exec(`
        INSERT INTO handle (ROWID, id, service) VALUES (${HANDLE_ROW_ID}, '${HANDLE_ADDRESS}', 'iMessage');
        INSERT INTO chat (ROWID, guid, chat_identifier, service_name, display_name, style)
            VALUES (${CHAT_ROW_ID}, 'chat-guid-10', '${HANDLE_ADDRESS}', 'iMessage', NULL, ${INDIVIDUAL_CHAT_STYLE});
        INSERT INTO chat_handle_join (chat_id, handle_id) VALUES (${CHAT_ROW_ID}, ${HANDLE_ROW_ID});
        INSERT INTO attachment (ROWID, guid, filename, transfer_name, mime_type, total_bytes)
            VALUES (${ATTACHMENT_ROW_ID}, 'att-guid', '~/Library/Messages/Attachments/ab/photo.png', 'photo.png', '${ATTACHMENT_MIME_TYPE}', ${ATTACHMENT_BYTES.length});
    `)
    const insertMessage = db.prepare(
        'INSERT INTO message (ROWID, guid, text, attributedBody, handle_id, is_from_me, date, service, cache_has_attachments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    )
    insertMessage.run(MESSAGE_1_ROW_ID, 'msg-1', MESSAGE_1_TEXT, null, HANDLE_ROW_ID, 0, toApplenanoseconds(BASE_MS), 'iMessage', 0)
    insertMessage.run(
        MESSAGE_2_ROW_ID,
        'msg-2',
        MESSAGE_2_TEXT,
        null,
        HANDLE_ROW_ID,
        0,
        toApplenanoseconds(BASE_MS + MESSAGE_INTERVAL_MS),
        'iMessage',
        1,
    )
    db.exec(`INSERT INTO chat_message_join (chat_id, message_id) VALUES (${CHAT_ROW_ID}, ${MESSAGE_1_ROW_ID}), (${CHAT_ROW_ID}, ${MESSAGE_2_ROW_ID})`)
    db.exec(`INSERT INTO message_attachment_join (message_id, attachment_id) VALUES (${MESSAGE_2_ROW_ID}, ${ATTACHMENT_ROW_ID})`)
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
const app = new Hono().route('/mcp', createMcpRoute(composed))

await composed.syncService.runOnce()
const issuedKey = await composed.authService.createApiKey('mcp-e2e')

afterAll(() => rmSync(tempDir, { recursive: true, force: true }))

let nextRequestId = 1

const callMcp = (apiKey: string | undefined, method: string, params: Record<string, unknown> = {}) => {
    const id = nextRequestId
    nextRequestId += 1
    return app.request('/mcp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/event-stream',
            ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({ jsonrpc: '2.0', id, method, params }),
    })
}

const parseSseJson = async <T extends z.ZodTypeAny>(res: Response, schema: T) => {
    const text = await res.text()
    const dataLine = text.split('\n').find((line) => line.startsWith(SSE_DATA_PREFIX))
    return schema.parse(JSON.parse(dataLine?.slice(SSE_DATA_PREFIX.length) ?? '{}'))
}

const errorEnvelopeSchema = z.object({ success: z.literal(false), error: z.object({ code: z.string(), message: z.string() }).passthrough() })

const jsonRpcResultSchema = <T extends z.ZodTypeAny>(resultSchema: T) =>
    z.object({ jsonrpc: z.literal('2.0'), id: z.union([z.number(), z.string()]), result: resultSchema })

const initializeResultSchema = z.object({ serverInfo: z.object({ name: z.string(), version: z.string() }) }).passthrough()

const toolListResultSchema = z.object({ tools: z.array(z.object({ name: z.string() }).passthrough()) })

const toolTextContentSchema = z.object({ type: z.literal('text'), text: z.string() })
const toolCallTextResultSchema = z.object({ content: z.array(toolTextContentSchema), isError: z.boolean().optional() })

const toolImageContentSchema = z.object({ type: z.literal('image'), data: z.string(), mimeType: z.string() })
const toolCallImageResultSchema = z.object({ content: z.array(toolImageContentSchema), isError: z.boolean().optional() })

const messageSummarySchema = z.object({
    sourceRowId: z.number(),
    guid: z.string(),
    text: z.string().nullable(),
})

const searchMessagesResultSchema = z.object({ data: z.array(messageSummarySchema), page: z.number(), limit: z.number(), total: z.number() })

const getChatMessagesResultSchema = z.object({
    chat: z.object({ sourceRowId: z.number() }).passthrough(),
    messages: z.object({ data: z.array(messageSummarySchema) }).passthrough(),
})

const runSyncResultSchema = z.object({ synced: z.number() })

describe('MCP e2e', () => {
    test('API 키가 없으면 POST /mcp 는 401 UNAUTHORIZED 봉투를 반환한다', async () => {
        const res = await callMcp(undefined, 'tools/list')
        expect(res.status).toBe(401)
        const body = await parseJson(res, errorEnvelopeSchema)
        expect(body.error.code).toBe('UNAUTHORIZED')
    })

    test('initialize 요청은 serverInfo.name 을 포함한 SSE 응답을 반환한다', async () => {
        const res = await callMcp(issuedKey.key, 'initialize', {
            protocolVersion: MCP_PROTOCOL_VERSION,
            capabilities: {},
            clientInfo: { name: 'mcp-e2e-test-client', version: '1.0.0' },
        })
        expect(res.status).toBe(200)
        const body = await parseSseJson(res, jsonRpcResultSchema(initializeResultSchema))
        expect(body.result.serverInfo.name).toBe('message-container')
    })

    test('tools/list 은 6종의 도구를 모두 반환한다', async () => {
        const res = await callMcp(issuedKey.key, 'tools/list')
        expect(res.status).toBe(200)
        const body = await parseSseJson(res, jsonRpcResultSchema(toolListResultSchema))
        expect(body.result.tools.map((tool) => tool.name).toSorted()).toEqual(MCP_TOOL_NAMES.toSorted())
    })

    test('tools/call search_messages 는 시드한 키워드를 포함한 메시지를 반환한다', async () => {
        const res = await callMcp(issuedKey.key, 'tools/call', { name: 'search_messages', arguments: { q: SEARCH_KEYWORD } })
        expect(res.status).toBe(200)
        const body = await parseSseJson(res, jsonRpcResultSchema(toolCallTextResultSchema))
        expect(body.result.isError).toBeFalsy()
        const parsed = searchMessagesResultSchema.parse(JSON.parse(body.result.content.at(0)?.text ?? '{}'))
        expect(parsed.data.map((message) => message.sourceRowId)).toContain(MESSAGE_2_ROW_ID)
        expect(parsed.data.find((message) => message.sourceRowId === MESSAGE_2_ROW_ID)?.text).toBe(MESSAGE_2_TEXT)
    })

    test('tools/call get_chat_messages 는 존재하는 대화면 chat 과 messages 를 반환한다', async () => {
        const res = await callMcp(issuedKey.key, 'tools/call', { name: 'get_chat_messages', arguments: { chatId: CHAT_ROW_ID } })
        expect(res.status).toBe(200)
        const body = await parseSseJson(res, jsonRpcResultSchema(toolCallTextResultSchema))
        expect(body.result.isError).toBeFalsy()
        const parsed = getChatMessagesResultSchema.parse(JSON.parse(body.result.content.at(0)?.text ?? '{}'))
        expect(parsed.chat.sourceRowId).toBe(CHAT_ROW_ID)
        expect(parsed.messages.data.map((message) => message.sourceRowId).toSorted()).toEqual([MESSAGE_1_ROW_ID, MESSAGE_2_ROW_ID].toSorted())
    })

    test('tools/call get_chat_messages 는 존재하지 않는 대화면 isError 를 반환한다', async () => {
        const res = await callMcp(issuedKey.key, 'tools/call', { name: 'get_chat_messages', arguments: { chatId: MISSING_CHAT_ROW_ID } })
        expect(res.status).toBe(200)
        const body = await parseSseJson(res, jsonRpcResultSchema(toolCallTextResultSchema))
        expect(body.result.isError).toBe(true)
    })

    test('tools/call get_attachment 은 이미지 콘텐츠와 원본 바이트의 base64 를 반환한다', async () => {
        const res = await callMcp(issuedKey.key, 'tools/call', { name: 'get_attachment', arguments: { attachmentId: ATTACHMENT_ROW_ID } })
        expect(res.status).toBe(200)
        const body = await parseSseJson(res, jsonRpcResultSchema(toolCallImageResultSchema))
        expect(body.result.isError).toBeFalsy()
        const content = body.result.content.at(0)
        expect(content?.type).toBe('image')
        expect(content?.mimeType).toBe(ATTACHMENT_MIME_TYPE)
        expect(content?.data).toBe(Buffer.from(ATTACHMENT_BYTES).toString('base64'))
    })

    test('tools/call run_sync 는 synced 개수를 숫자로 반환한다', async () => {
        const res = await callMcp(issuedKey.key, 'tools/call', { name: 'run_sync', arguments: {} })
        expect(res.status).toBe(200)
        const body = await parseSseJson(res, jsonRpcResultSchema(toolCallTextResultSchema))
        expect(body.result.isError).toBeFalsy()
        const parsed = runSyncResultSchema.parse(JSON.parse(body.result.content.at(0)?.text ?? '{}'))
        expect(typeof parsed.synced).toBe('number')
    })
})
