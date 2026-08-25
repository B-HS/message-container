import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { syncStatusSchema } from '@entities/sync/sync.type'
import { QUERY_KEY } from '@shared/constants/query-key'
import { successEnvelopeSchema } from '@shared/lib/envelope'
import { apiFetch } from '@shared/lib/fetch'

export const SYNC_STATUS_REFETCH_INTERVAL_MS = 5_000

export const syncStatusQueryOptions = () =>
    queryOptions({
        queryKey: QUERY_KEY.SYNC.STATUS,
        queryFn: async () => successEnvelopeSchema(syncStatusSchema).parse(await apiFetch('/sync/status')).data,
    })

export const useGetSyncStatus = () => useSuspenseQuery({ ...syncStatusQueryOptions(), refetchInterval: SYNC_STATUS_REFETCH_INTERVAL_MS })

export const useRunSync = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => successEnvelopeSchema(z.object({ synced: z.number() })).parse(await apiFetch('/sync/run', { method: 'POST' })).data,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.SYNC.STATUS })
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.CHAT.ALL })
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.MESSAGE.ALL })
        },
    })
}
