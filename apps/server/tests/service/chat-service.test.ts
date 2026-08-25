import { describe, expect, test } from 'bun:test'

import { createChatService } from '@/service/domain/message/chat-service'

import type { ChatServiceDb, ChatSummary } from '@/service/domain/message/chat-service'

const buildChat = (sourceRowId: number): ChatSummary => ({
    sourceRowId,
    guid: `chat-guid-${sourceRowId}`,
    identifier: 'chat-identifier',
    serviceName: 'iMessage',
    displayName: null,
    isGroup: false,
    participants: [{ address: '+15551234567', service: 'iMessage' }],
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

    test('db 의 data/total 을 그대로 전달하고 page/limit 을 응답에 포함한다', async () => {
        const chats = [buildChat(1), buildChat(2)]
        const db: ChatServiceDb = {
            getChatList: async () => ({ data: chats, total: 2 }),
            getChatById: async () => null,
        }
        const service = createChatService({ db })

        const result = await service.list({ page: 1, limit: 20 })

        expect(result).toEqual({ data: chats, page: 1, limit: 20, total: 2 })
    })
})

describe('chatService.getById', () => {
    test('db 조회 결과를 그대로 반환한다', async () => {
        const chat = buildChat(5)
        const db: ChatServiceDb = { getChatList: async () => ({ data: [], total: 0 }), getChatById: async () => chat }
        const service = createChatService({ db })

        expect(await service.getById(5)).toEqual(chat)
    })

    test('없는 채팅이면 null 을 반환한다', async () => {
        const db: ChatServiceDb = { getChatList: async () => ({ data: [], total: 0 }), getChatById: async () => null }
        const service = createChatService({ db })

        expect(await service.getById(999)).toBeNull()
    })
})
