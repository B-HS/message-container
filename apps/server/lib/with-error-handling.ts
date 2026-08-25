import { errorResponse } from '@/lib/api-response'
import { ERROR_MESSAGE } from '@/lib/error-message'
import { isAppError } from '@/lib/error'

import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

type RouteHandler = (c: Context) => Promise<Response> | Response

export const withErrorHandling = (handler: RouteHandler) => async (c: Context) => {
    try {
        return await handler(c)
    } catch (error) {
        if (isAppError(error)) return c.json(errorResponse(error.code, error.message, error.details), error.statusCode as ContentfulStatusCode)
        console.error('[unhandled]', error)
        return c.json(errorResponse('INTERNAL_ERROR', ERROR_MESSAGE.INTERNAL_ERROR), 500)
    }
}
