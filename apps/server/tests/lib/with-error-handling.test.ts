import '@/tests/helpers/test-env'

import { Hono } from 'hono'
import { describe, expect, test } from 'bun:test'

import { createAppError } from '@/lib/error'
import { withErrorHandling } from '@/lib/with-error-handling'

const createTestApp = () => {
    const app = new Hono()
    app.get(
        '/ok',
        withErrorHandling(async (c) => c.json({ ok: true })),
    )
    app.get(
        '/not-found',
        withErrorHandling(async () => {
            throw createAppError('CHAT_NOT_FOUND')
        }),
    )
    app.get(
        '/boom',
        withErrorHandling(async () => {
            JSON.parse('{invalid')
            return new Response('unreachable')
        }),
    )
    return app
}

describe('withErrorHandling', () => {
    test('정상 핸들러는 그대로 응답한다', async () => {
        const app = createTestApp()
        const res = await app.request('/ok')

        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({ ok: true })
    })

    test('createAppError 를 던지면 매핑된 statusCode 와 에러 봉투로 응답한다', async () => {
        const app = createTestApp()
        const res = await app.request('/not-found')

        expect(res.status).toBe(404)
        const body = await res.json()
        expect(body).toEqual({ success: false, error: { code: 'CHAT_NOT_FOUND', message: '대화를 찾을 수 없습니다' } })
    })

    test('일반 예외는 500 INTERNAL_ERROR 봉투로 변환한다', async () => {
        const app = createTestApp()
        const res = await app.request('/boom')

        expect(res.status).toBe(500)
        const body = await res.json()
        expect(body.success).toBe(false)
        expect(body.error.code).toBe('INTERNAL_ERROR')
    })
})
