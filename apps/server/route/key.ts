import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'

import { successResponse } from '@/lib/api-response'
import { validationHook } from '@/lib/validation-hook'
import { withErrorHandling } from '@/lib/with-error-handling'
import { idParamSchema } from '@/dto/common'
import { apiKeyCreateSchema } from '@/dto/panel'

import type { z } from 'zod'
import type { IdParam } from '@/dto/common'
import type { AuthService } from '@/service/domain/auth/auth-service'

type KeyRouteDeps = {
    authService: AuthService
}

export const createKeyRoute = (deps: KeyRouteDeps) => {
    const route = new Hono()

    route.get(
        '/',
        describeRoute({ tags: ['Key'], summary: 'API 키 목록 조회', responses: { 200: { description: '키 목록 (해시·원문 제외)' } } }),
        withErrorHandling(async (c) => c.json(successResponse({ keys: await deps.authService.listApiKeys() }))),
    )

    route.post(
        '/',
        describeRoute({ tags: ['Key'], summary: 'API 키 생성', responses: { 200: { description: '생성된 키 (원문은 1회만 반환)' } } }),
        validator('json', apiKeyCreateSchema, validationHook),
        withErrorHandling(async (c) => {
            const input = c.req.valid('json' as never) as z.infer<typeof apiKeyCreateSchema>
            return c.json(successResponse(await deps.authService.createApiKey(input.name)))
        }),
    )

    route.post(
        '/:id/revoke',
        describeRoute({ tags: ['Key'], summary: 'API 키 폐기', responses: { 200: { description: '폐기 완료' } } }),
        validator('param', idParamSchema, validationHook),
        withErrorHandling(async (c) => {
            const { id } = c.req.valid('param' as never) as IdParam
            await deps.authService.revokeApiKey(id)
            return c.json(successResponse({ revokedId: id }))
        }),
    )

    return route
}
