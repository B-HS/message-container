import { describe, expect, test } from 'bun:test'

import { createMessageService } from '@/service/domain/message/message-service'

import type { MessageRecord, MessageServiceDb } from '@/service/domain/message/message-service'

const SENT_AT_MS = 1700000000000

const READ_AT_MS = 1700000001000

const buildRecord = (sourceRowId: number): MessageRecord => ({
    sourceRowId,
    guid: `msg-guid-${sourceRowId}`,
    chatSourceRowId: 7,
    senderAddress: '+15551234567',
    isFromMe: false,
    text: 'hello',
    service: 'iMessage',
    sentAtMs: SENT_AT_MS,
    hasAttachments: false,
    isRead: true,
    dateReadMs: READ_AT_MS,
    associatedMessageGuid: null,
    associatedMessageType: null,
})

describe('messageService.listByChat', () => {
    test('chatSourceRowId 와 offset 을 db 에 전달한다', async () => {
        const capturedParams: { chatSourceRowIds: number[]; offset: number; limit: number }[] = []
        const db: MessageServiceDb = {
            getMessageListByChat: async (params) => {
                capturedParams.push(params)
                return { data: [], total: 0 }
            },
            searchMessageList: async () => ({ data: [], total: 0 }),
        }
        const service = createMessageService({ db })

        await service.listByChat([7], { page: 3, limit: 10 })

        expect(capturedParams).toEqual([{ chatSourceRowIds: [7], offset: 20, limit: 10 }])
    })

    test('sentAtMs 를 sentAt ISO 문자열로 변환하고 sentAtMs 는 응답에 없다', async () => {
        const record = buildRecord(1)
        const db: MessageServiceDb = {
            getMessageListByChat: async () => ({ data: [record], total: 1 }),
            searchMessageList: async () => ({ data: [], total: 0 }),
        }
        const service = createMessageService({ db })

        const result = await service.listByChat([7], { page: 1, limit: 20 })

        expect(result.data[0]?.sentAt).toBe(new Date(SENT_AT_MS).toISOString())
        expect(result.data[0] && 'sentAtMs' in result.data[0]).toBe(false)
    })

    test('dateReadMs 를 readAt ISO 문자열로 변환하고 isRead 를 그대로 노출한다', async () => {
        const db: MessageServiceDb = {
            getMessageListByChat: async () => ({ data: [buildRecord(1)], total: 1 }),
            searchMessageList: async () => ({ data: [], total: 0 }),
        }
        const service = createMessageService({ db })

        const result = await service.listByChat([7], { page: 1, limit: 20 })

        expect(result.data[0]?.readAt).toBe(new Date(READ_AT_MS).toISOString())
        expect(result.data[0]?.isRead).toBe(true)
        expect(result.data[0] && 'dateReadMs' in result.data[0]).toBe(false)
    })
})

describe('messageService.search', () => {
    test('query.q 가 keyword 로 전달된다', async () => {
        const capturedParams: { keyword?: string; offset: number; limit: number }[] = []
        const db: MessageServiceDb = {
            getMessageListByChat: async () => ({ data: [], total: 0 }),
            searchMessageList: async (params) => {
                capturedParams.push(params)
                return { data: [], total: 0 }
            },
        }
        const service = createMessageService({ db })

        await service.search({ q: 'hello', page: 1, limit: 20 })

        expect(capturedParams).toEqual([{ keyword: 'hello', offset: 0, limit: 20 }])
    })

    test('q 를 생략하면 keyword 가 undefined 로 전달된다', async () => {
        const capturedParams: { keyword?: string; offset: number; limit: number }[] = []
        const db: MessageServiceDb = {
            getMessageListByChat: async () => ({ data: [], total: 0 }),
            searchMessageList: async (params) => {
                capturedParams.push(params)
                return { data: [], total: 0 }
            },
        }
        const service = createMessageService({ db })

        await service.search({ page: 1, limit: 20 })

        expect(capturedParams[0]?.keyword).toBeUndefined()
    })
})
