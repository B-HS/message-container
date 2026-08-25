const BASE_URL = process.env.MESSAGE_API_URL ?? 'http://localhost:33000'

export const GET = async () => {
    const upstream = await fetch(`${BASE_URL}/openapi.json`, { cache: 'no-store' })
    return new Response(upstream.body, {
        status: upstream.status,
        headers: { 'content-type': upstream.headers.get('content-type') ?? 'application/json' },
    })
}
