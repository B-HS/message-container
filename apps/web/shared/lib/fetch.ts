import { z } from 'zod'

import { ApiError } from '@shared/lib/api-error'
import { API_KEY_COOKIE_NAME } from '@shared/constants/auth'

const apiErrorEnvelopeSchema = z.object({
    success: z.literal(false),
    error: z.object({ code: z.string(), message: z.string() }),
})

const resolveRequest = async (bePath: string, init?: RequestInit) => {
    if (typeof window !== 'undefined') return fetch(`/api/be${bePath}`, init)
    const { cookies } = await import('next/headers')
    const apiKey = (await cookies()).get(API_KEY_COOKIE_NAME)?.value
    const baseUrl = process.env.MESSAGE_API_URL ?? 'http://localhost:33000'
    return fetch(`${baseUrl}/api${bePath}`, {
        ...init,
        cache: 'no-store',
        headers: { ...init?.headers, ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}) },
    })
}

/**
 * Environment-neutral fetch against the message-container API.
 * On the client it goes through the Next proxy route (/api/be/*); on the server it calls the API directly with the cookie-held key.
 * Returns the parsed JSON body as unknown — callers narrow it with a Zod envelope schema.
 */
export const apiFetch = async (bePath: string, init?: RequestInit) => {
    const res = await resolveRequest(bePath, init)
    const body: unknown = await res.json()
    const errorEnvelope = apiErrorEnvelopeSchema.safeParse(body)
    if (errorEnvelope.success) throw new ApiError(errorEnvelope.data.error.code, errorEnvelope.data.error.message, res.status)
    if (!res.ok) throw new ApiError(`HTTP_${res.status}`, res.statusText, res.status)
    return body
}
