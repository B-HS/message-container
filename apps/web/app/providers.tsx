'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

import type { FC, PropsWithChildren } from 'react'

const STALE_TIME_MS = 60_000

const makeQueryClient = () => new QueryClient({ defaultOptions: { queries: { staleTime: STALE_TIME_MS } } })

let browserQueryClient: QueryClient | undefined

const getQueryClient = () => {
    if (typeof window === 'undefined') return makeQueryClient()
    browserQueryClient ??= makeQueryClient()
    return browserQueryClient
}

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
    const queryClient = getQueryClient()

    return (
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false} disableTransitionOnChange>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
    )
}
