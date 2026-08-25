import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'

import { paginatedResponse } from '@/lib/api-response'
import { validationHook } from '@/lib/validation-hook'
import { withErrorHandling } from '@/lib/with-error-handling'
import { messageListQuerySchema } from '@/dto/message'

import type { MessageListQuery } from '@/dto/message'
import type { MessageService } from '@/service/domain/message/message-service'

type MessageRouteDeps = {
    messageService: MessageService
}

export const createMessageRoute = (deps: MessageRouteDeps) => {
    const route = new Hono()

    route.get(
        '/',
        describeRoute({ tags: ['Message'], summary: '메시지 검색 · 최근 메시지 조회', responses: { 200: { description: '메시지 목록' } } }),
        validator('query', messageListQuerySchema, validationHook),
        withErrorHandling(async (c) => {
            const query = c.req.valid('query' as never) as MessageListQuery
            const result = await deps.messageService.search(query)
            return c.json(paginatedResponse(result.data, { page: result.page, limit: result.limit, total: result.total }))
        }),
    )

    return route
}
