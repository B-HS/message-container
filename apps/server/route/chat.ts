import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'

import { errorResponses, paginatedResponse, successResponse } from '@/lib/api-response'
import { createAppError } from '@/lib/error'
import { validationHook } from '@/lib/validation-hook'
import { withErrorHandling } from '@/lib/with-error-handling'
import { idParamSchema, paginationQuerySchema } from '@/dto/common'

import type { IdParam, PaginationQuery } from '@/dto/common'
import type { ChatService } from '@/service/domain/message/chat-service'
import type { MessageService } from '@/service/domain/message/message-service'

type ChatRouteDeps = {
    chatService: ChatService
    messageService: MessageService
}

export const createChatRoute = (deps: ChatRouteDeps) => {
    const route = new Hono()

    route.get(
        '/',
        describeRoute({ tags: ['Chat'], summary: '대화 목록 조회', responses: { 200: { description: '대화 목록' } } }),
        validator('query', paginationQuerySchema, validationHook),
        withErrorHandling(async (c) => {
            const query = c.req.valid('query' as never) as PaginationQuery
            const result = await deps.chatService.list(query)
            return c.json(paginatedResponse(result.data, { page: result.page, limit: result.limit, total: result.total }))
        }),
    )

    route.get(
        '/:id',
        describeRoute({
            tags: ['Chat'],
            summary: '대화 단건 조회',
            responses: { 200: { description: '대화' }, ...errorResponses(['CHAT_NOT_FOUND']) },
        }),
        validator('param', idParamSchema, validationHook),
        withErrorHandling(async (c) => {
            const { id } = c.req.valid('param' as never) as IdParam
            const chat = await deps.chatService.getById(id)
            if (!chat) throw createAppError('CHAT_NOT_FOUND')
            return c.json(successResponse({ chat }))
        }),
    )

    route.get(
        '/:id/messages',
        describeRoute({
            tags: ['Chat'],
            summary: '대화별 메시지 목록 조회',
            responses: { 200: { description: '메시지 목록' }, ...errorResponses(['CHAT_NOT_FOUND']) },
        }),
        validator('param', idParamSchema, validationHook),
        validator('query', paginationQuerySchema, validationHook),
        withErrorHandling(async (c) => {
            const { id } = c.req.valid('param' as never) as IdParam
            const query = c.req.valid('query' as never) as PaginationQuery
            const chat = await deps.chatService.getById(id)
            if (!chat) throw createAppError('CHAT_NOT_FOUND')
            const result = await deps.messageService.listByChat(id, query)
            return c.json(paginatedResponse(result.data, { page: result.page, limit: result.limit, total: result.total }))
        }),
    )

    return route
}
