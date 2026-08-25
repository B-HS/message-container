import { cookies } from 'next/headers'
import { z } from 'zod'

import { API_KEY_COOKIE_MAX_AGE_S, API_KEY_COOKIE_NAME } from '@shared/constants/auth'
import { isTrustedOrigin } from '@shared/lib/origin'

const PASSWORD_MIN_LENGTH = 8
const BASE_URL = process.env.MESSAGE_API_URL ?? 'http://localhost:33000'
const WEB_KEY_NAME = 'web'

const sessionCreateSchema = z.object({ password: z.string().min(PASSWORD_MIN_LENGTH) })

const statusEnvelopeSchema = z.object({ success: z.literal(true), data: z.object({ passwordSet: z.boolean() }) })
const keyEnvelopeSchema = z.object({ success: z.literal(true), data: z.object({ key: z.string() }) })
const errorEnvelopeSchema = z.object({ success: z.literal(false), error: z.object({ code: z.string(), message: z.string() }) })

const forbiddenResponse = () => Response.json({ success: false, error: { code: 'FORBIDDEN', message: '허용되지 않은 출처입니다' } }, { status: 403 })

export const POST = async (request: Request) => {
    if (!isTrustedOrigin(request)) return forbiddenResponse()
    const parsed = sessionCreateSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) {
        return Response.json(
            { success: false, error: { code: 'VALIDATION_ERROR', message: `패스워드는 최소 ${PASSWORD_MIN_LENGTH}자여야 합니다` } },
            { status: 400 },
        )
    }

    const statusRes = await fetch(`${BASE_URL}/api/auth/status`, { cache: 'no-store' })
    const status = statusEnvelopeSchema.safeParse(await statusRes.json().catch(() => null))
    if (!status.success) {
        return Response.json({ success: false, error: { code: 'BACKEND_UNAVAILABLE', message: 'API 서버에 연결할 수 없습니다' } }, { status: 502 })
    }

    const mode = status.data.data.passwordSet ? 'login' : 'setup'
    const authRes = await fetch(`${BASE_URL}/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: parsed.data.password, keyName: WEB_KEY_NAME }),
        cache: 'no-store',
    })
    const authBody: unknown = await authRes.json().catch(() => null)

    const issued = keyEnvelopeSchema.safeParse(authBody)
    if (!issued.success) {
        const backendError = errorEnvelopeSchema.safeParse(authBody)
        if (backendError.success) return Response.json(backendError.data, { status: authRes.status })
        return Response.json(
            { success: false, error: { code: 'BACKEND_UNAVAILABLE', message: 'API 서버 응답을 해석할 수 없습니다' } },
            { status: 502 },
        )
    }

    const cookieStore = await cookies()
    cookieStore.set(API_KEY_COOKIE_NAME, issued.data.data.key, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: API_KEY_COOKIE_MAX_AGE_S,
    })
    return Response.json({ success: true, data: { mode } })
}

export const DELETE = async (request: Request) => {
    if (!isTrustedOrigin(request)) return forbiddenResponse()
    const cookieStore = await cookies()
    const apiKey = cookieStore.get(API_KEY_COOKIE_NAME)?.value
    if (apiKey) {
        await fetch(`${BASE_URL}/api/auth/revoke`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}` },
            cache: 'no-store',
        }).catch(() => null)
    }
    cookieStore.delete(API_KEY_COOKIE_NAME)
    return Response.json({ success: true, data: { loggedOut: true } })
}
