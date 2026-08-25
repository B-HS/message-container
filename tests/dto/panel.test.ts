import { describe, expect, test } from 'bun:test'

import { apiKeyCreateSchema, panelLoginSchema, panelSetupSchema } from '@/dto/panel'

describe('panelSetupSchema', () => {
    test('8자 미만 패스워드는 실패한다', () => {
        expect(() => panelSetupSchema.parse({ password: 'short1', confirm: 'short1' })).toThrow()
    })

    test('confirm 이 password 와 다르면 실패한다', () => {
        expect(() => panelSetupSchema.parse({ password: 'correct-horse', confirm: 'different-horse' })).toThrow()
    })

    test('8자 이상이고 confirm 이 일치하면 통과한다', () => {
        const result = panelSetupSchema.parse({ password: 'correct-horse', confirm: 'correct-horse' })

        expect(result).toEqual({ password: 'correct-horse', confirm: 'correct-horse' })
    })
})

describe('panelLoginSchema', () => {
    test('빈 문자열 패스워드는 실패한다', () => {
        expect(() => panelLoginSchema.parse({ password: '' })).toThrow()
    })

    test('비어있지 않은 패스워드는 통과한다', () => {
        expect(panelLoginSchema.parse({ password: 'anything' }).password).toBe('anything')
    })
})

describe('apiKeyCreateSchema', () => {
    test('공백만 있는 name 은 trim 후 1자 미만이라 실패한다', () => {
        expect(() => apiKeyCreateSchema.parse({ name: '   ' })).toThrow()
    })

    test('100자를 초과하는 name 은 실패한다', () => {
        expect(() => apiKeyCreateSchema.parse({ name: 'a'.repeat(101) })).toThrow()
    })

    test('앞뒤 공백은 trim 되어 통과한다', () => {
        expect(apiKeyCreateSchema.parse({ name: '  내 키  ' }).name).toBe('내 키')
    })
})
