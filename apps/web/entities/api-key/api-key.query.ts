import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { apiKeyRecordSchema, createdApiKeySchema } from '@entities/api-key/api-key.type'
import { QUERY_KEY } from '@shared/constants/query-key'
import { successEnvelopeSchema } from '@shared/lib/envelope'
import { apiFetch } from '@shared/lib/fetch'

export const apiKeyListQueryOptions = () =>
    queryOptions({
        queryKey: QUERY_KEY.API_KEY.LIST,
        queryFn: async () => successEnvelopeSchema(z.object({ keys: z.array(apiKeyRecordSchema) })).parse(await apiFetch('/keys')).data.keys,
    })

export const useGetApiKeyList = () => useSuspenseQuery(apiKeyListQueryOptions())

export const useCreateApiKey = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (name: string) =>
            successEnvelopeSchema(createdApiKeySchema).parse(
                await apiFetch('/keys', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) }),
            ).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.API_KEY.LIST }),
    })
}

export const useRevokeApiKey = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) =>
            successEnvelopeSchema(z.object({ revokedId: z.number() })).parse(await apiFetch(`/keys/${id}/revoke`, { method: 'POST' })).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.API_KEY.LIST }),
    })
}
