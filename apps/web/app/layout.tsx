import './globals.css'

import { AppProviders } from '@app/providers'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
    title: 'message-container',
    description: 'macOS Messages 조회 대시보드',
}

const RootLayout = ({ children }: PropsWithChildren) => (
    <html lang='ko' suppressHydrationWarning>
        <body>
            <AppProviders>{children}</AppProviders>
        </body>
    </html>
)

export default RootLayout
