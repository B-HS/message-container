import { errorResponse } from '@/lib/api-response'
import { getBearerToken } from '@/lib/bearer-token'
import { ERROR_MESSAGE } from '@/lib/error-message'

import type { MiddlewareHandler } from 'hono'
import type { AuthService } from '@/service/domain/auth/auth-service'

type RequireApiKeyDeps = {
    verifyApiKey: AuthService['verifyApiKey']
}

export const createRequireApiKey =
    (deps: RequireApiKeyDeps): MiddlewareHandler =>
    async (c, next) => {
        const key = getBearerToken(c.req.header('Authorization'))
        const verified = key ? await deps.verifyApiKey(key) : null
        if (!verified) return c.json(errorResponse('UNAUTHORIZED', ERROR_MESSAGE.UNAUTHORIZED), 401)
        return next()
    }
