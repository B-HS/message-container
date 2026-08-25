import { describe, expect, test } from 'bun:test'
import { z } from 'zod'

import { paginatedEnvelopeSchema, successEnvelopeSchema } from '@shared/lib/envelope'

describe('successEnvelopeSchema', () => {
    test('success true 봉투를 파싱한다', () => {
        const parsed = successEnvelopeSchema(z.object({ ok: z.boolean() })).parse({ success: true, data: { ok: true } })
        expect(parsed.data.ok).toBe(true)
    })

    test('success false 봉투는 실패한다', () => {
        expect(() => successEnvelopeSchema(z.object({})).parse({ success: false, error: {} })).toThrow()
    })
})

describe('paginatedEnvelopeSchema', () => {
    test('페이지네이션 봉투를 파싱한다', () => {
        const parsed = paginatedEnvelopeSchema(z.object({ id: z.number() })).parse({
            success: true,
            data: [{ id: 1 }],
            pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
        })
        expect(parsed.data.at(0)?.id).toBe(1)
        expect(parsed.pagination.totalPages).toBe(1)
    })
})
