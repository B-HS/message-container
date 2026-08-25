import { StreamableHTTPTransport } from '@hono/mcp'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { Hono } from 'hono'
import { z } from 'zod'

import { errorResponse } from '@/lib/api-response'
import { getBearerToken } from '@/lib/bearer-token'
import { isAppError } from '@/lib/error'
import { ERROR_MESSAGE } from '@/lib/error-message'
import { messageListQuerySchema } from '@/dto/message'
import { paginationQuerySchema } from '@/dto/common'

import type { AuthService } from '@/service/domain/auth/auth-service'
import type { AttachmentService } from '@/service/domain/message/attachment-service'
import type { ChatService } from '@/service/domain/message/chat-service'
import type { MessageService } from '@/service/domain/message/message-service'
import type { SyncService } from '@/service/domain/message/sync-service'

type McpRouteDeps = {
    authService: AuthService
    chatService: ChatService
    messageService: MessageService
    attachmentService: AttachmentService
    syncService: SyncService
}

const MCP_SERVER_NAME = 'message-container'
const MCP_SERVER_VERSION = '0.1.0'
const DEFAULT_MIME_TYPE = 'application/octet-stream'

const textResult = (value: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }] })

const errorResult = (message: string) => ({ isError: true, content: [{ type: 'text' as const, text: message }] })

const buildMcpServer = (deps: McpRouteDeps) => {
    const server = new McpServer({ name: MCP_SERVER_NAME, version: MCP_SERVER_VERSION })

    server.registerTool(
        'list_chats',
        {
            description: 'List synced Messages conversations with participants. Ordered by newest chat first. Paginated.',
            inputSchema: paginationQuerySchema,
        },
        async (input) => textResult(await deps.chatService.list(input)),
    )

    server.registerTool(
        'get_chat_messages',
        {
            description: 'Get messages of one conversation, newest first. Use chatId from list_chats (sourceRowId).',
            inputSchema: paginationQuerySchema.extend({ chatId: z.coerce.number().int().positive() }),
        },
        async ({ chatId, ...pagination }) => {
            const chat = await deps.chatService.getById(chatId)
            if (!chat) return errorResult(`chat ${chatId} not found`)
            return textResult({ chat, messages: await deps.messageService.listByChat(chat.chatIds, pagination) })
        },
    )

    server.registerTool(
        'search_messages',
        {
            description: 'Search messages by keyword across all conversations (q omitted returns recent messages). Newest first, paginated.',
            inputSchema: messageListQuerySchema,
        },
        async (input) => textResult(await deps.messageService.search(input)),
    )

    server.registerTool(
        'get_sync_status',
        {
            description: 'Get sync state: cursor, last sync time, last error, and synced row counts.',
            inputSchema: z.object({}),
        },
        async () => textResult(await deps.syncService.status()),
    )

    server.registerTool(
        'run_sync',
        {
            description: 'Trigger an immediate incremental sync from the live chat.db and return how many messages were synced.',
            inputSchema: z.object({}),
        },
        async () => {
            try {
                return textResult(await deps.syncService.runOnce())
            } catch (error) {
                return errorResult(isAppError(error) ? `${error.code}: ${error.message}` : 'sync failed')
            }
        },
    )

    server.registerTool(
        'get_attachment',
        {
            description:
                'Fetch an attachment file by attachment id (from message hasAttachments, attachment metadata). Returns image content for images, base64 blob resource otherwise.',
            inputSchema: z.object({ attachmentId: z.coerce.number().int().positive() }),
        },
        async ({ attachmentId }) => {
            const result = await deps.attachmentService.getFileById(attachmentId)
            if (!result) return errorResult(`attachment ${attachmentId} not found`)
            if (!result.filePath) return errorResult(`attachment ${attachmentId} has no resolvable file path`)
            const file = Bun.file(result.filePath)
            if (!(await file.exists())) return errorResult(`attachment ${attachmentId} file does not exist on the mounted volume`)
            const data = Buffer.from(await file.arrayBuffer()).toString('base64')
            const mimeType = result.record.mimeType ?? DEFAULT_MIME_TYPE
            if (mimeType.startsWith('image/')) return { content: [{ type: 'image' as const, data, mimeType }] }
            return {
                content: [
                    {
                        type: 'resource' as const,
                        resource: { uri: `attachment://${attachmentId}/${result.record.transferName ?? 'file'}`, blob: data, mimeType },
                    },
                ],
            }
        },
    )

    return server
}

export const createMcpRoute = (deps: McpRouteDeps) => {
    const route = new Hono()

    route.all('/', async (c) => {
        const key = getBearerToken(c.req.header('Authorization'))
        const verified = key ? await deps.authService.verifyApiKey(key) : null
        if (!verified) return c.json(errorResponse('UNAUTHORIZED', ERROR_MESSAGE.UNAUTHORIZED), 401)
        const transport = new StreamableHTTPTransport()
        await buildMcpServer(deps).connect(transport)
        return transport.handleRequest(c)
    })

    return route
}
