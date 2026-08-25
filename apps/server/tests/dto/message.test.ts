import { describe, expect, test } from 'bun:test'

import { messageListQuerySchema } from '@/dto/message'

describe('messageListQuerySchema', () => {
    test('q 를 생략해도 파싱된다', () => {
        const result = messageListQuerySchema.parse({})
        expect(result.q).toBeUndefined()
    })

    test('q 가 빈 문자열이면 실패한다', () => {
        expect(() => messageListQuerySchema.parse({ q: '' })).toThrow()
    })

    test('page/limit 기본값을 상속한다', () => {
        const result = messageListQuerySchema.parse({})
        expect(result.page).toBe(1)
        expect(result.limit).toBe(20)
    })

    test('page/limit 문자열을 숫자로 강제 변환한다', () => {
        const result = messageListQuerySchema.parse({ page: '3', limit: '50', q: 'hello' })
        expect(result.page).toBe(3)
        expect(result.limit).toBe(50)
        expect(result.q).toBe('hello')
    })
})
