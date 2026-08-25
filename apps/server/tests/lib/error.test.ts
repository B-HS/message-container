import { describe, expect, test } from 'bun:test'

import { createAppError, isAppError } from '@/lib/error'
import { ERROR_MESSAGE } from '@/lib/error-message'

describe('createAppError', () => {
    test('CHAT_NOT_FOUND 는 404 로 매핑된다', () => {
        const error = createAppError('CHAT_NOT_FOUND')

        expect(error.code).toBe('CHAT_NOT_FOUND')
        expect(error.message).toBe(ERROR_MESSAGE.CHAT_NOT_FOUND)
        expect(error.statusCode).toBe(404)
    })

    test('SYNC_SOURCE_UNAVAILABLE 은 503 으로 매핑된다', () => {
        const error = createAppError('SYNC_SOURCE_UNAVAILABLE')

        expect(error.statusCode).toBe(503)
    })

    test('details 를 그대로 담는다', () => {
        const error = createAppError('ATTACHMENT_NOT_FOUND', { attachmentId: 1 })

        expect(error.details).toEqual({ attachmentId: 1 })
    })
})

describe('isAppError', () => {
    test('createAppError 결과는 참이다', () => {
        expect(isAppError(createAppError('VALIDATION_ERROR'))).toBe(true)
    })

    test('null 은 거짓이다', () => {
        expect(isAppError(null)).toBe(false)
    })

    test('code/message/statusCode 가 없는 일반 객체는 거짓이다', () => {
        expect(isAppError({ foo: 'bar' })).toBe(false)
    })

    test('일반 Error 인스턴스는 거짓이다', () => {
        expect(isAppError(new Error('boom'))).toBe(false)
    })
})
