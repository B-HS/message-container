import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { chatListQueryOptions } from '@entities/chat/chat.query'
import { ChatListWidget } from '@widgets/chat-list/chat-list'
import { DEFAULT_PAGE_LIMIT } from '@shared/constants/pagination'

const ChatsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
    const { page } = await searchParams
    const params = { page: Math.max(Number(page ?? '1') || 1, 1), limit: DEFAULT_PAGE_LIMIT }

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(chatListQueryOptions(params))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ChatListWidget params={params} />
        </HydrationBoundary>
    )
}

export default ChatsPage
