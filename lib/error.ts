import { ERROR_MESSAGE } from '@/lib/error-message'

import type { ErrorCode } from '@/lib/error-code'

export type AppError = {
    code: ErrorCode
    message: string
    statusCode: number
    details?: Record<string, unknown>
}

const STATUS_MAP: Record<ErrorCode, number> = {
    VALIDATION_ERROR: 400,
    CHAT_NOT_FOUND: 404,
    ATTACHMENT_NOT_FOUND: 404,
    ATTACHMENT_FILE_NOT_FOUND: 404,
    ATTACHMENT_PATH_INVALID: 422,
    SYNC_SOURCE_UNAVAILABLE: 503,
    INTERNAL_ERROR: 500,
}

export const getStatusCode = (code: ErrorCode) => STATUS_MAP[code]

export const createAppError = (code: ErrorCode, details?: Record<string, unknown>): AppError => ({
    code,
    message: ERROR_MESSAGE[code],
    statusCode: getStatusCode(code),
    details,
})

export const isAppError = (error: unknown): error is AppError =>
    typeof error === 'object' && error !== null && 'code' in error && 'message' in error && 'statusCode' in error
