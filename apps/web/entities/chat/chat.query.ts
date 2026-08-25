import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { chatSummarySchema } from '@entities/chat/chat.type'
import { QUERY_KEY } from '@shared/constants/query-key'
import { paginatedEnvelopeSchema, successEnvelopeSchema } from '@shared/lib/envelope'
import { apiFetch } from '@shared/lib/fetch'

export type ChatListParams = { page: number; limit: number }

export const chatListQueryOptions = (params: ChatListParams) =>
    queryOptions({
        queryKey: QUERY_KEY.CHAT.LIST(params),
        queryFn: async () => {
            const body = paginatedEnvelopeSchema(chatSummarySchema).parse(await apiFetch(`/chats?page=${params.page}&limit=${params.limit}`))
            return { data: body.data, pagination: body.pagination }
        },
    })

export const chatDetailQueryOptions = (chatId: number) =>
    queryOptions({
        queryKey: QUERY_KEY.CHAT.DETAIL(chatId),
        queryFn: async () => successEnvelopeSchema(z.object({ chat: chatSummarySchema })).parse(await apiFetch(`/chats/${chatId}`)).data.chat,
    })

export const useGetChatList = (params: ChatListParams) => useSuspenseQuery(chatListQueryOptions(params))

export const useGetChat = (chatId: number) => useSuspenseQuery(chatDetailQueryOptions(chatId))
