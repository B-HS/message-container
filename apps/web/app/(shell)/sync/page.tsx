import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { syncStatusQueryOptions } from '@entities/sync/sync.query'
import { SyncStatusWidget } from '@widgets/sync-status/sync-status'

const SyncPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(syncStatusQueryOptions())

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SyncStatusWidget />
        </HydrationBoundary>
    )
}

export default SyncPage
