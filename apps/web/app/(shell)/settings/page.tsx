import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { apiKeyListQueryOptions } from '@entities/api-key/api-key.query'
import { SettingsPanel } from '@widgets/settings/settings-panel'

const statusEnvelopeSchema = z.object({ success: z.literal(true), data: z.object({ passwordSet: z.boolean() }) })

const SettingsPage = async () => {
    const baseUrl = process.env.MESSAGE_API_URL ?? 'http://localhost:33000'

    let backendReachable = false
    try {
        const res = await fetch(`${baseUrl}/api/auth/status`, { cache: 'no-store' })
        backendReachable = statusEnvelopeSchema.safeParse(await res.json()).success
    } catch {
        backendReachable = false
    }

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(apiKeyListQueryOptions())

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SettingsPanel backendReachable={backendReachable} />
        </HydrationBoundary>
    )
}

export default SettingsPage
