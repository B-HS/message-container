import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { messageSummarySchema } from '@entities/message/message.type'
import { QUERY_KEY } from '@shared/constants/query-key'
import { paginatedEnvelopeSchema } from '@shared/lib/envelope'
import { apiFetch } from '@shared/lib/fetch'

export type ChatMessagesParams = { page: number; limit: number }
export type MessageSearchParams = { q?: string; page: number; limit: number }

const parsePaginatedMessages = (body: unknown) => {
    const parsed = paginatedEnvelopeSchema(messageSummarySchema).parse(body)
    return { data: parsed.data, pagination: parsed.pagination }
}

export const chatMessagesQueryOptions = (chatId: number, params: ChatMessagesParams) =>
    queryOptions({
        queryKey: QUERY_KEY.CHAT.MESSAGES(chatId, params),
        queryFn: async () => parsePaginatedMessages(await apiFetch(`/chats/${chatId}/messages?page=${params.page}&limit=${params.limit}`)),
    })

export const messageSearchQueryOptions = (params: MessageSearchParams) =>
    queryOptions({
        queryKey: QUERY_KEY.MESSAGE.SEARCH(params),
        queryFn: async () => {
            const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) })
            if (params.q) query.set('q', params.q)
            return parsePaginatedMessages(await apiFetch(`/messages?${query.toString()}`))
        },
    })

export const useGetChatMessages = (chatId: number, params: ChatMessagesParams) => useSuspenseQuery(chatMessagesQueryOptions(chatId, params))

export const useSearchMessages = (params: MessageSearchParams) => useSuspenseQuery(messageSearchQueryOptions(params))
