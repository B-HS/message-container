import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'

import { paginatedResponse } from '@/lib/api-response'
import { validationHook } from '@/lib/validation-hook'
import { withErrorHandling } from '@/lib/with-error-handling'
import { logListQuerySchema } from '@/dto/log'

import type { LogListQuery } from '@/dto/log'
import type { LogService } from '@/service/domain/log/log-service'

type LogRouteDeps = {
    logService: LogService
}

export const createLogRoute = (deps: LogRouteDeps) => {
    const route = new Hono()

    route.get(
        '/',
        describeRoute({ tags: ['Log'], summary: '시스템 로그 조회 (최신순, level 필터)', responses: { 200: { description: '로그 목록' } } }),
        validator('query', logListQuerySchema, validationHook),
        withErrorHandling(async (c) => {
            const query = c.req.valid('query' as never) as LogListQuery
            const result = await deps.logService.list(query)
            return c.json(paginatedResponse(result.data, { page: result.page, limit: result.limit, total: result.total }))
        }),
    )

    return route
}
