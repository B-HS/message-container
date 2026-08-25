import { describe, expect, test } from 'bun:test'

import { getBearerToken } from '@/lib/bearer-token'

describe('getBearerToken', () => {
    test('Bearer 접두사가 있으면 토큰만 추출한다', () => {
        expect(getBearerToken('Bearer abc')).toBe('abc')
    })

    test('Bearer 접두사가 없으면 undefined 를 반환한다', () => {
        expect(getBearerToken('Basic abc')).toBeUndefined()
    })

    test('header 가 undefined 면 undefined 를 반환한다', () => {
        expect(getBearerToken(undefined)).toBeUndefined()
    })
})
