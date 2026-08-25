import { describe, expect, test } from 'bun:test'

import { APPLE_EPOCH_UTC_MS, appleEpochMsToUtcMs } from '@/lib/apple-time'

describe('appleEpochMsToUtcMs', () => {
    test('Apple epoch 기준 0ms 는 2001-01-01T00:00:00Z 가 된다', () => {
        expect(new Date(appleEpochMsToUtcMs(0)).toISOString()).toBe('2001-01-01T00:00:00.000Z')
    })

    test('Apple epoch 기준 오프셋을 Unix epoch ms 로 변환한다', () => {
        const oneDayMs = 24 * 60 * 60 * 1000
        expect(appleEpochMsToUtcMs(oneDayMs)).toBe(APPLE_EPOCH_UTC_MS + oneDayMs)
    })
})
