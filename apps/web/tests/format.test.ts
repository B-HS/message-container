import { describe, expect, test } from 'bun:test'

import { formatCount, formatDateTime } from '@shared/lib/format'

describe('formatDateTime', () => {
    test('null 은 대시를 반환한다', () => {
        expect(formatDateTime(null)).toBe('-')
    })

    test('ISO 문자열을 로컬 기준 YYYY-MM-DD HH:mm:ss 로 변환한다', () => {
        expect(formatDateTime(new Date(2026, 0, 2, 3, 4, 5).toISOString())).toBe('2026-01-02 03:04:05')
    })
})

describe('formatCount', () => {
    test('천 단위 구분자를 넣는다', () => {
        expect(formatCount(6239)).toBe('6,239')
    })
})
