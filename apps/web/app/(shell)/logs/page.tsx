import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { logListQueryOptions } from '@entities/log/log.query'
import { logLevelSchema } from '@entities/log/log.type'
import { LogsWidget } from '@widgets/logs/logs'
import { DEFAULT_PAGE_LIMIT } from '@shared/constants/pagination'

const LogsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string; level?: string }> }) => {
    const { page, level } = await searchParams
    const parsedLevel = logLevelSchema.safeParse(level)
    const params = {
        page: Math.max(Number(page ?? '1') || 1, 1),
        limit: DEFAULT_PAGE_LIMIT,
        level: parsedLevel.success ? parsedLevel.data : undefined,
    }

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(logListQueryOptions(params))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LogsWidget params={params} />
        </HydrationBoundary>
    )
}

export default LogsPage
