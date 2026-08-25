import { describe, expect, test } from 'bun:test'

import { idParamSchema, paginationQuerySchema } from '@/dto/common'

describe('paginationQuerySchema', () => {
    test('기본값으로 파싱한다', () => {
        const result = paginationQuerySchema.parse({})
        expect(result.page).toBe(1)
        expect(result.limit).toBe(20)
    })

    test('문자열 쿼리를 숫자로 강제 변환한다', () => {
        const result = paginationQuerySchema.parse({ page: '3', limit: '50' })
        expect(result.page).toBe(3)
        expect(result.limit).toBe(50)
    })

    test('limit 최대값을 초과하면 실패한다', () => {
        expect(() => paginationQuerySchema.parse({ limit: '101' })).toThrow()
    })

    test('page 가 0 이하이면 실패한다', () => {
        expect(() => paginationQuerySchema.parse({ page: '0' })).toThrow()
    })
})

describe('idParamSchema', () => {
    test('문자열 id 를 양의 정수로 변환한다', () => {
        expect(idParamSchema.parse({ id: '42' }).id).toBe(42)
    })

    test('숫자가 아닌 id 는 실패한다', () => {
        expect(() => idParamSchema.parse({ id: 'abc' })).toThrow()
    })
})
