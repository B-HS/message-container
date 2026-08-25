import { describe, expect, test } from 'bun:test'

import { extractTypedstreamText } from '@/lib/typedstream'
import { buildTypedstreamBody } from '@/tests/helpers/typedstream-fixture'

describe('extractTypedstreamText', () => {
    test('짧은 본문을 추출한다', () => {
        expect(extractTypedstreamText(buildTypedstreamBody('hello'))).toBe('hello')
    })

    test('한글 본문을 추출한다', () => {
        expect(extractTypedstreamText(buildTypedstreamBody('안녕하세요'))).toBe('안녕하세요')
    })

    test('uint16 길이 인코딩의 긴 본문을 추출한다', () => {
        const longText = 'a'.repeat(300)
        expect(extractTypedstreamText(buildTypedstreamBody(longText))).toBe(longText)
    })

    test('첨부 placeholder 만 있으면 null 을 반환한다', () => {
        expect(extractTypedstreamText(buildTypedstreamBody('\uFFFC'))).toBeNull()
    })

    test('NSString 마커가 없으면 null 을 반환한다', () => {
        expect(extractTypedstreamText(new TextEncoder().encode('streamtyped garbage'))).toBeNull()
    })

    test('null 과 빈 버퍼는 null 을 반환한다', () => {
        expect(extractTypedstreamText(null)).toBeNull()
        expect(extractTypedstreamText(new Uint8Array())).toBeNull()
    })
})
