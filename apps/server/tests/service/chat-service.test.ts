import { describe, expect, test } from 'bun:test'

import { createChatService } from '@/service/domain/message/chat-service'

import type { ChatRowStats, ChatServiceDb } from '@/service/domain/message/chat-service'

const buildRow = (overrides: Partial<ChatRowStats> & { sourceRowId: number }): ChatRowStats => ({
    guid: `chat-guid-${overrides.sourceRowId}`,
    identifier: '+821012345678',
    serviceName: 'iMessage',
    displayName: null,
    isGroup: false,
    messageCount: 1,
    lastMessageText: 'hello',
    lastMessageAtMs: 1_000,
    ...overrides,
})

const participantsFixture = [
    { chatSourceRowId: 1, address: '+821012345678', service: 'SMS' },
    { chatSourceRowId: 2, address: '+821012345678', service: 'iMessage' },
    { chatSourceRowId: 3, address: 'friend@example.com', service: 'iMessage' },
]

const createService = (rows: ChatRowStats[]) => {
    const db: ChatServiceDb = {
        getAllChatRows: async () => rows,
        getParticipants: async () => participantsFixture,
    }
    return createChatService({ db })
}

describe('chatService.list — 대화 병합', () => {
    test('같은 identifier 의 SMS·iMessage 행을 대표 1건으로 병합한다', async () => {
        const service = createService([
            buildRow({ sourceRowId: 1, serviceName: 'SMS', messageCount: 2, lastMessageText: 'sms 메시지', lastMessageAtMs: 1_000 }),
            buildRow({ sourceRowId: 2, serviceName: 'iMessage', messageCount: 3, lastMessageText: '최신 메시지', lastMessageAtMs: 2_000 }),
        ])

        const result = await service.list({ page: 1, limit: 20 })

        expect(result.total).toBe(1)
        const merged = result.data.at(0)
        expect(merged?.sourceRowId).toBe(2)
        expect(merged?.chatIds.toSorted()).toEqual([1, 2])
        expect(merged?.messageCount).toBe(5)
        expect(merged?.serviceNames.toSorted()).toEqual(['SMS', 'iMessage'])
        expect(merged?.lastMessageText).toBe('최신 메시지')
        expect(merged?.participants).toEqual([{ address: '+821012345678', service: 'SMS' }])
    })

    test('identifier 가 다르면 병합하지 않고 최근 메시지 순으로 정렬한다', async () => {
        const service = createService([
            buildRow({ sourceRowId: 1, identifier: '+821011111111', lastMessageAtMs: 1_000 }),
            buildRow({ sourceRowId: 3, identifier: 'group-1', isGroup: true, lastMessageAtMs: 3_000 }),
            buildRow({ sourceRowId: 2, identifier: '+821022222222', lastMessageAtMs: 2_000 }),
        ])

        const result = await service.list({ page: 1, limit: 20 })

        expect(result.total).toBe(3)
        expect(result.data.map((chat) => chat.sourceRowId)).toEqual([3, 2, 1])
    })

    test('페이지네이션은 병합된 그룹 기준으로 동작한다', async () => {
        const service = createService([
            buildRow({ sourceRowId: 1, identifier: 'a', lastMessageAtMs: 3_000 }),
            buildRow({ sourceRowId: 2, identifier: 'b', lastMessageAtMs: 2_000 }),
            buildRow({ sourceRowId: 3, identifier: 'c', lastMessageAtMs: 1_000 }),
        ])

        const result = await service.list({ page: 2, limit: 2 })

        expect(result.total).toBe(3)
        expect(result.data.map((chat) => chat.sourceRowId)).toEqual([3])
    })
})

describe('chatService.getById — 병합 그룹 해석', () => {
    test('대표가 아닌 멤버 id 로 조회해도 같은 병합 대화를 반환한다', async () => {
        const service = createService([
            buildRow({ sourceRowId: 1, serviceName: 'SMS', lastMessageAtMs: 1_000 }),
            buildRow({ sourceRowId: 2, serviceName: 'iMessage', lastMessageAtMs: 2_000 }),
        ])

        const byMember = await service.getById(1)
        const byRepresentative = await service.getById(2)

        expect(byMember?.sourceRowId).toBe(2)
        expect(byMember?.chatIds.toSorted()).toEqual([1, 2])
        expect(byRepresentative?.chatIds.toSorted()).toEqual([1, 2])
    })

    test('빈 문자열 displayName·identifier 는 null 로 정규화된다', async () => {
        const service = createService([
            buildRow({ sourceRowId: 1, identifier: '', displayName: '', guid: 'guid-empty-1', lastMessageAtMs: 2_000 }),
            buildRow({ sourceRowId: 2, identifier: '', displayName: '', guid: 'guid-empty-2', lastMessageAtMs: 1_000 }),
        ])

        const result = await service.list({ page: 1, limit: 20 })

        expect(result.total).toBe(2)
        expect(result.data.at(0)?.displayName).toBeNull()
        expect(result.data.at(0)?.identifier).toBeNull()
    })

    test('없는 id 는 null 을 반환한다', async () => {
        const service = createService([buildRow({ sourceRowId: 1 })])
        expect(await service.getById(999)).toBeNull()
    })
})
