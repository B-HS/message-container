import '@/tests/helpers/test-env'

import { describe, expect, test } from 'bun:test'

import { errorResponse, errorResponses, paginatedResponse, successResponse } from '@/lib/api-response'
import { getStatusCode } from '@/lib/error'

describe('successResponse', () => {
    test('success:true 와 data 를 그대로 담는다', () => {
        expect(successResponse({ id: 1 })).toEqual({ success: true, data: { id: 1 } })
    })
})

describe('paginatedResponse', () => {
    test('total 을 limit 으로 나눈 값을 올림해 totalPages 를 계산한다', () => {
        const result = paginatedResponse([1, 2], { page: 1, limit: 20, total: 21 })

        expect(result.pagination.totalPages).toBe(2)
    })

    test('나누어떨어지면 totalPages 가 그대로 몫이 된다', () => {
        const result = paginatedResponse([], { page: 1, limit: 20, total: 40 })

        expect(result.pagination.totalPages).toBe(2)
    })
})

describe('errorResponses', () => {
    test('각 에러 코드의 STATUS_MAP 상태코드를 키로 갖는다', () => {
        const result = errorResponses(['CHAT_NOT_FOUND', 'SYNC_SOURCE_UNAVAILABLE'])

        expect(Object.keys(result)).toContain(String(getStatusCode('CHAT_NOT_FOUND')))
        expect(Object.keys(result)).toContain(String(getStatusCode('SYNC_SOURCE_UNAVAILABLE')))
    })
})

describe('errorResponse', () => {
    test('details 를 전달하면 test 환경에서는 details 를 포함한다', () => {
        const result = errorResponse('CHAT_NOT_FOUND', '대화를 찾을 수 없습니다', { chatId: 1 })

        expect(result.error.details).toEqual({ chatId: 1 })
    })

    test('details 를 전달하지 않으면 details 키 자체가 없다', () => {
        const result = errorResponse('CHAT_NOT_FOUND', '대화를 찾을 수 없습니다')

        expect('details' in result.error).toBe(false)
    })
})
