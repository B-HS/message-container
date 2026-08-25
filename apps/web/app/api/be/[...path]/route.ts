import { cookies } from 'next/headers'

import { API_KEY_COOKIE_NAME } from '@shared/constants/auth'
import { isTrustedOrigin } from '@shared/lib/origin'

import type { NextRequest } from 'next/server'

const BASE_URL = process.env.MESSAGE_API_URL ?? 'http://localhost:33000'
const FORWARDED_RESPONSE_HEADERS = ['content-type', 'content-disposition', 'content-length'] as const
const PUBLIC_BE_PATHS = ['/api/auth/status'] as const

const resolveAuthorization = async (request: NextRequest) => {
    const bearer = request.headers.get('Authorization')
    if (bearer) return bearer
    const cookieKey = (await cookies()).get(API_KEY_COOKIE_NAME)?.value
    return cookieKey ? `Bearer ${cookieKey}` : null
}

const forward = async (request: NextRequest, method: 'GET' | 'POST') => {
    const url = new URL(request.url)
    const targetPath = url.pathname.replace(/^\/api\/be/, '/api')
    const isPublicPath = PUBLIC_BE_PATHS.some((publicPath) => targetPath === publicPath)

    if (method === 'POST' && !request.headers.get('Authorization') && !isTrustedOrigin(request)) {
        return Response.json({ success: false, error: { code: 'FORBIDDEN', message: '허용되지 않은 출처입니다' } }, { status: 403 })
    }

    const authorization = await resolveAuthorization(request)
    if (!authorization && !isPublicPath) {
        return Response.json({ success: false, error: { code: 'UNAUTHORIZED', message: '로그인이 필요합니다' } }, { status: 401 })
    }

    const upstream = await fetch(`${BASE_URL}${targetPath}${url.search}`, {
        method,
        cache: 'no-store',
        headers: {
            ...(authorization ? { Authorization: authorization } : {}),
            ...(method === 'POST' ? { 'Content-Type': request.headers.get('Content-Type') ?? 'application/json' } : {}),
        },
        body: method === 'POST' ? await request.arrayBuffer() : undefined,
    })

    const headers = new Headers()
    for (const name of FORWARDED_RESPONSE_HEADERS) {
        const value = upstream.headers.get(name)
        if (value) headers.set(name, value)
    }
    return new Response(upstream.body, { status: upstream.status, headers })
}

export const GET = (request: NextRequest) => forward(request, 'GET')

export const POST = (request: NextRequest) => forward(request, 'POST')
