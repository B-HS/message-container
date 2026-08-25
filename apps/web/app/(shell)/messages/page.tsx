import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { messageSearchQueryOptions } from '@entities/message/message.query'
import { MessageSearchWidget } from '@widgets/message-search/message-search'
import { DEFAULT_PAGE_LIMIT } from '@shared/constants/pagination'

const MessagesPage = async ({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) => {
    const { page, q } = await searchParams
    const params = { q: q || undefined, page: Math.max(Number(page ?? '1') || 1, 1), limit: DEFAULT_PAGE_LIMIT }

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(messageSearchQueryOptions(params))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MessageSearchWidget params={params} />
        </HydrationBoundary>
    )
}

export default MessagesPage
