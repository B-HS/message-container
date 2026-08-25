import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'

import { errorResponses, successResponse } from '@/lib/api-response'
import { getBearerToken } from '@/lib/bearer-token'
import { createAppError } from '@/lib/error'
import { validationHook } from '@/lib/validation-hook'
import { withErrorHandling } from '@/lib/with-error-handling'
import { authLoginSchema, authSetupSchema } from '@/dto/auth'

import type { AuthLoginInput, AuthSetupInput } from '@/dto/auth'
import type { AuthService } from '@/service/domain/auth/auth-service'

type AuthRouteDeps = {
    authService: AuthService
}

export const createAuthRoute = (deps: AuthRouteDeps) => {
    const route = new Hono()

    route.get(
        '/status',
        describeRoute({ tags: ['Auth'], summary: '초기 설정 여부 조회 (공개)', responses: { 200: { description: '설정 상태' } } }),
        withErrorHandling(async (c) => c.json(successResponse({ passwordSet: await deps.authService.isPasswordSet() }))),
    )

    route.post(
        '/setup',
        describeRoute({
            tags: ['Auth'],
            summary: '초기 패스워드 설정 + API 키 발급 (공개, 최초 1회)',
            responses: { 200: { description: '발급된 API 키 (1회만 반환)' }, ...errorResponses(['AUTH_ALREADY_SETUP']) },
        }),
        validator('json', authSetupSchema, validationHook),
        withErrorHandling(async (c) => {
            const input = c.req.valid('json' as never) as AuthSetupInput
            const created = await deps.authService.setupPassword(input.password)
            if (!created) throw createAppError('AUTH_ALREADY_SETUP')
            const key = await deps.authService.createApiKey(input.keyName)
            return c.json(successResponse({ id: key.id, name: key.name, start: key.start, key: key.key }))
        }),
    )

    route.post(
        '/login',
        describeRoute({
            tags: ['Auth'],
            summary: '패스워드 검증 + API 키 발급 (공개)',
            responses: {
                200: { description: '발급된 API 키 (1회만 반환)' },
                ...errorResponses(['AUTH_INVALID_PASSWORD', 'AUTH_LOCKED']),
            },
        }),
        validator('json', authLoginSchema, validationHook),
        withErrorHandling(async (c) => {
            const input = c.req.valid('json' as never) as AuthLoginInput
            const result = await deps.authService.verifyPassword(input.password)
            if (result === 'locked') throw createAppError('AUTH_LOCKED')
            if (result === 'invalid') throw createAppError('AUTH_INVALID_PASSWORD')
            const key = await deps.authService.createApiKey(input.keyName)
            return c.json(successResponse({ id: key.id, name: key.name, start: key.start, key: key.key }))
        }),
    )

    route.post(
        '/revoke',
        describeRoute({
            tags: ['Auth'],
            summary: '제시한 API 키 자기 폐기 (로그아웃)',
            responses: { 200: { description: '폐기 완료' }, ...errorResponses(['UNAUTHORIZED']) },
        }),
        withErrorHandling(async (c) => {
            const key = getBearerToken(c.req.header('Authorization'))
            const verified = key ? await deps.authService.verifyApiKey(key) : null
            if (!verified) throw createAppError('UNAUTHORIZED')
            await deps.authService.revokeApiKey(verified.id)
            return c.json(successResponse({ revokedId: verified.id }))
        }),
    )

    return route
}
