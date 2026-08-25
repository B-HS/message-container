import '@/tests/helpers/test-env'

import { Hono } from 'hono'
import { validator } from 'hono-openapi'
import { describe, expect, test } from 'bun:test'

import { validationHook } from '@/lib/validation-hook'
import { paginationQuerySchema } from '@/dto/common'

const createTestApp = () => {
    const app = new Hono()
    app.get('/', validator('query', paginationQuerySchema, validationHook), (c) => c.json({ ok: true }))
    return app
}

describe('validationHook', () => {
    test('유효한 쿼리면 핸들러가 그대로 실행된다', async () => {
        const app = createTestApp()
        const res = await app.request('/?page=1&limit=10')

        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({ ok: true })
    })

    test('무효한 쿼리면 400 과 VALIDATION_ERROR 봉투를 반환한다', async () => {
        const app = createTestApp()
        const res = await app.request('/?limit=0')

        expect(res.status).toBe(400)
        const body = await res.json()
        expect(body.success).toBe(false)
        expect(body.error.code).toBe('VALIDATION_ERROR')
    })
})
