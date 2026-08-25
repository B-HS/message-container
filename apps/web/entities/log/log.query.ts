import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { logEntrySchema } from '@entities/log/log.type'
import { QUERY_KEY } from '@shared/constants/query-key'
import { paginatedEnvelopeSchema } from '@shared/lib/envelope'
import { apiFetch } from '@shared/lib/fetch'

import type { LogLevel } from '@entities/log/log.type'

export type LogListParams = { page: number; limit: number; level?: LogLevel }

export const logListQueryOptions = (params: LogListParams) =>
    queryOptions({
        queryKey: QUERY_KEY.LOG.LIST(params),
        queryFn: async () => {
            const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) })
            if (params.level) query.set('level', params.level)
            const parsed = paginatedEnvelopeSchema(logEntrySchema).parse(await apiFetch(`/logs?${query.toString()}`))
            return { data: parsed.data, pagination: parsed.pagination }
        },
    })

export const useGetLogList = (params: LogListParams) => useSuspenseQuery(logListQueryOptions(params))
