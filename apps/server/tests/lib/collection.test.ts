import { describe, expect, test } from 'bun:test'

import { chunk } from '@/lib/collection'

describe('chunk', () => {
    test('빈 배열은 빈 배열을 반환한다', () => {
        expect(chunk([], 3)).toEqual([])
    })

    test('정확히 나누어떨어지면 균등한 청크로 나눈다', () => {
        expect(chunk([1, 2, 3, 4], 2)).toEqual([
            [1, 2],
            [3, 4],
        ])
    })

    test('나머지가 있으면 마지막 청크가 더 작다', () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })

    test('size 보다 배열이 작으면 청크 하나에 전부 담는다', () => {
        expect(chunk([1, 2], 5)).toEqual([[1, 2]])
    })
})
