import type { PaginationQuery } from '@/dto/common'

export type ChatParticipant = {
    address: string
    service: string | null
}

export type ChatSummary = {
    sourceRowId: number
    guid: string
    identifier: string | null
    serviceName: string | null
    displayName: string | null
    isGroup: boolean
    participants: ChatParticipant[]
}

export type ChatServiceDb = {
    getChatList: (params: { offset: number; limit: number }) => Promise<{ data: ChatSummary[]; total: number }>
    getChatById: (id: number) => Promise<ChatSummary | null>
}

type ChatServiceDeps = {
    db: ChatServiceDb
}

export const createChatService = (deps: ChatServiceDeps) => ({
    list: async (query: PaginationQuery) => {
        const { data, total } = await deps.db.getChatList({ offset: (query.page - 1) * query.limit, limit: query.limit })
        return { data, page: query.page, limit: query.limit, total }
    },
    getById: async (id: number) => deps.db.getChatById(id),
})

export type ChatService = ReturnType<typeof createChatService>
