import { getEnv } from '@/lib/env'
import { ERROR_MESSAGE } from '@/lib/error-message'
import { getStatusCode } from '@/lib/error'

import type { ErrorCode } from '@/lib/error-code'

type Pagination = {
    page: number
    limit: number
    total: number
}

export const successResponse = <T>(data: T) => ({ success: true as const, data })

export const paginatedResponse = <T>(data: T[], pagination: Pagination) => ({
    success: true as const,
    data,
    pagination: { ...pagination, totalPages: Math.ceil(pagination.total / pagination.limit) },
})

export const errorResponses = (codes: ErrorCode[]) =>
    Object.fromEntries(codes.map((code) => [getStatusCode(code), { description: `${code}: ${ERROR_MESSAGE[code]}` }]))

export const errorResponse = (code: ErrorCode, message: string, details?: Record<string, unknown>) => ({
    success: false as const,
    error: {
        code,
        message,
        ...(details && getEnv().NODE_ENV !== 'production' ? { details } : {}),
    },
})
