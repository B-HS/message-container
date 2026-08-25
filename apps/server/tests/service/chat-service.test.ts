import { describe, expect, test } from 'bun:test'

import { createChatService } from '@/service/domain/message/chat-service'

import type { ChatListRow, ChatServiceDb } from '@/service/domain/message/chat-service'

const LAST_MESSAGE_AT_MS = 1_700_000_000_000

const buildChatRow = (sourceRowId: number): ChatListRow => ({
    sourceRowId,
    guid: `chat-guid-${sourceRowId}`,
    identifier: 'chat-identifier',
    serviceName: 'iMessage',
    displayName: null,
    isGroup: false,
    participants: [{ address: '+15551234567', service: 'iMessage' }],
    messageCount: 3,
    lastMessageText: '마지막 메시지',
    lastMessageAtMs: LAST_MESSAGE_AT_MS,
})

describe('chatService.list', () => {
    test('page 와 limit 으로 offset 을 계산해 db 에 전달한다', async () => {
        const capturedParams: { offset: number; limit: number }[] = []
        const db: ChatServiceDb = {
            getChatList: async (params) => {
                capturedParams.push(params)
                return { data: [], total: 0 }
            },
            getChatById: async () => null,
        }
        const service = createChatService({ db })

        await service.list({ page: 3, limit: 10 })

        expect(capturedParams).toEqual([{ offset: 20, limit: 10 }])
    })

    test('lastMessageAtMs 를 ISO lastMessageAt 으로 변환해 반환한다', async () => {
        const db: ChatServiceDb = {
            getChatList: async () => ({ data: [buildChatRow(1)], total: 1 }),
            getChatById: async () => null,
        }
        const service = createChatService({ db })

        const result = await service.list({ page: 1, limit: 20 })

        expect(result.page).toBe(1)
        expect(result.total).toBe(1)
        expect(result.data.at(0)?.lastMessageAt).toBe(new Date(LAST_MESSAGE_AT_MS).toISOString())
        expect(result.data.at(0)?.lastMessageText).toBe('마지막 메시지')
        expect(result.data.at(0)?.messageCount).toBe(3)
        expect(result.data.at(0)).not.toHaveProperty('lastMessageAtMs')
    })
})

describe('chatService.getById', () => {
    test('db 조회 결과를 요약 형태로 변환해 반환한다', async () => {
        const db: ChatServiceDb = { getChatList: async () => ({ data: [], total: 0 }), getChatById: async () => buildChatRow(5) }
        const service = createChatService({ db })

        const result = await service.getById(5)

        expect(result?.sourceRowId).toBe(5)
        expect(result?.lastMessageAt).toBe(new Date(LAST_MESSAGE_AT_MS).toISOString())
    })

    test('없는 채팅이면 null 을 반환한다', async () => {
        const db: ChatServiceDb = { getChatList: async () => ({ data: [], total: 0 }), getChatById: async () => null }
        const service = createChatService({ db })

        expect(await service.getById(999)).toBeNull()
    })
})
