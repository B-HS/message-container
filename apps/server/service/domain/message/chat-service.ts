import type { PaginationQuery } from '@/dto/common'

export type ChatParticipant = {
    address: string
    service: string | null
}

export type ChatListRow = {
    sourceRowId: number
    guid: string
    identifier: string | null
    serviceName: string | null
    displayName: string | null
    isGroup: boolean
    participants: ChatParticipant[]
    messageCount: number
    lastMessageText: string | null
    lastMessageAtMs: number | null
}

export type ChatSummary = Omit<ChatListRow, 'lastMessageAtMs'> & { lastMessageAt: string | null }

export type ChatServiceDb = {
    getChatList: (params: { offset: number; limit: number }) => Promise<{ data: ChatListRow[]; total: number }>
    getChatById: (id: number) => Promise<ChatListRow | null>
}

type ChatServiceDeps = {
    db: ChatServiceDb
}

const toChatSummary = ({ lastMessageAtMs, ...row }: ChatListRow): ChatSummary => ({
    ...row,
    lastMessageAt: lastMessageAtMs === null ? null : new Date(lastMessageAtMs).toISOString(),
})

export const createChatService = (deps: ChatServiceDeps) => ({
    list: async (query: PaginationQuery) => {
        const { data, total } = await deps.db.getChatList({ offset: (query.page - 1) * query.limit, limit: query.limit })
        return { data: data.map(toChatSummary), page: query.page, limit: query.limit, total }
    },
    getById: async (id: number) => {
        const row = await deps.db.getChatById(id)
        if (!row) return null
        return toChatSummary(row)
    },
})

export type ChatService = ReturnType<typeof createChatService>
