import { errorResponse } from '@/lib/api-response'
import { ERROR_MESSAGE } from '@/lib/error-message'

import type { Context } from 'hono'

type ValidationResult = { success: true } | { success: false; error: readonly { message: string }[] }

export const validationHook = (result: ValidationResult, c: Context) => {
    if (result.success) return
    return c.json(errorResponse('VALIDATION_ERROR', ERROR_MESSAGE.VALIDATION_ERROR, { issues: result.error }), 400)
}
