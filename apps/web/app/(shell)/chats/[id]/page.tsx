import { notFound } from 'next/navigation'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { chatDetailQueryOptions } from '@entities/chat/chat.query'
import { chatMessagesQueryOptions } from '@entities/message/message.query'
import { ChatMessagesWidget } from '@widgets/chat-messages/chat-messages'
import { CHAT_MESSAGES_PAGE_LIMIT } from '@shared/constants/pagination'

const ChatDetailPage = async ({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> }) => {
    const { id } = await params
    const { page } = await searchParams
    const chatId = Number(id)
    if (!Number.isInteger(chatId) || chatId <= 0) notFound()

    const messagesParams = { page: Math.max(Number(page ?? '1') || 1, 1), limit: CHAT_MESSAGES_PAGE_LIMIT }

    const queryClient = new QueryClient()
    await Promise.all([
        queryClient.prefetchQuery(chatDetailQueryOptions(chatId)),
        queryClient.prefetchQuery(chatMessagesQueryOptions(chatId, messagesParams)),
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ChatMessagesWidget chatId={chatId} params={messagesParams} />
        </HydrationBoundary>
    )
}

export default ChatDetailPage
