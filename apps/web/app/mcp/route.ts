import type { NextRequest } from 'next/server'

const BASE_URL = process.env.MESSAGE_API_URL ?? 'http://localhost:33000'
const FORWARDED_REQUEST_HEADERS = ['authorization', 'content-type', 'accept', 'mcp-session-id', 'last-event-id', 'mcp-protocol-version'] as const
const FORWARDED_RESPONSE_HEADERS = ['content-type', 'mcp-session-id', 'mcp-protocol-version'] as const

const forward = async (request: NextRequest) => {
    const headers = new Headers()
    for (const name of FORWARDED_REQUEST_HEADERS) {
        const value = request.headers.get(name)
        if (value) headers.set(name, value)
    }

    const upstream = await fetch(`${BASE_URL}/mcp`, {
        method: request.method,
        cache: 'no-store',
        headers,
        body: request.method === 'GET' ? undefined : await request.arrayBuffer(),
    })

    const responseHeaders = new Headers()
    for (const name of FORWARDED_RESPONSE_HEADERS) {
        const value = upstream.headers.get(name)
        if (value) responseHeaders.set(name, value)
    }
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders })
}

export const GET = (request: NextRequest) => forward(request)

export const POST = (request: NextRequest) => forward(request)

export const DELETE = (request: NextRequest) => forward(request)
