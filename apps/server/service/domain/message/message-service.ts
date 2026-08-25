import type { MessageListQuery } from '@/dto/message'
import type { PaginationQuery } from '@/dto/common'

export type MessageRecord = {
    sourceRowId: number
    guid: string
    chatSourceRowId: number | null
    senderAddress: string | null
    isFromMe: boolean
    text: string | null
    service: string | null
    sentAtMs: number
    hasAttachments: boolean
}

export type MessageServiceDb = {
    getMessageListByChat: (params: { chatSourceRowId: number; offset: number; limit: number }) => Promise<{ data: MessageRecord[]; total: number }>
    searchMessageList: (params: { keyword?: string; offset: number; limit: number }) => Promise<{ data: MessageRecord[]; total: number }>
}

type MessageServiceDeps = {
    db: MessageServiceDb
}

const toMessageSummary = ({ sentAtMs, ...record }: MessageRecord) => ({ ...record, sentAt: new Date(sentAtMs).toISOString() })

export const createMessageService = (deps: MessageServiceDeps) => ({
    listByChat: async (chatSourceRowId: number, query: PaginationQuery) => {
        const { data, total } = await deps.db.getMessageListByChat({ chatSourceRowId, offset: (query.page - 1) * query.limit, limit: query.limit })
        return { data: data.map(toMessageSummary), page: query.page, limit: query.limit, total }
    },
    search: async (query: MessageListQuery) => {
        const { data, total } = await deps.db.searchMessageList({ keyword: query.q, offset: (query.page - 1) * query.limit, limit: query.limit })
        return { data: data.map(toMessageSummary), page: query.page, limit: query.limit, total }
    },
})

export type MessageService = ReturnType<typeof createMessageService>
