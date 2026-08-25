import { cookies } from 'next/headers'
import { z } from 'zod'

import { PageRoot } from '@features/page-root/page-root'
import { PanelCard } from '@features/panel-card/panel-card'
import { API_KEY_COOKIE_NAME } from '@shared/constants/auth'

const statusEnvelopeSchema = z.object({ success: z.literal(true), data: z.object({ passwordSet: z.boolean() }) })

const SettingsPage = async () => {
    const baseUrl = process.env.MESSAGE_API_URL ?? 'http://localhost:33000'
    const cookieStore = await cookies()
    const hasSession = Boolean(cookieStore.get(API_KEY_COOKIE_NAME))

    let backendReachable = false
    try {
        const res = await fetch(`${baseUrl}/api/auth/status`, { cache: 'no-store' })
        backendReachable = statusEnvelopeSchema.safeParse(await res.json()).success
    } catch {
        backendReachable = false
    }

    return (
        <PageRoot>
            <PanelCard title='연결' contentClassName='flex flex-col gap-2 text-xs'>
                <div className='flex flex-wrap items-center gap-2'>
                    <span className='text-muted-foreground'>API 서버</span>
                    <span className='font-mono'>{baseUrl}</span>
                    {backendReachable ? (
                        <span className='text-muted-foreground'>연결됨</span>
                    ) : (
                        <span className='text-destructive'>연결할 수 없음</span>
                    )}
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <span className='text-muted-foreground'>세션</span>
                    <span>{hasSession ? 'API 키 쿠키 보유 (httpOnly)' : '없음'}</span>
                </div>
            </PanelCard>
            <PanelCard title='API 키 관리' contentClassName='flex flex-col gap-2 text-xs'>
                <p className='text-muted-foreground'>
                    발급된 키 목록 확인·폐기는 API 서버의 관리 패널에서 할 수 있습니다. 로그인할 때마다 웹 세션용 키가 새로 발급됩니다.
                </p>
                <p className='font-mono'>{baseUrl}/panel</p>
            </PanelCard>
            <PanelCard title='MCP' contentClassName='flex flex-col gap-2 text-xs'>
                <p className='text-muted-foreground'>AI 클라이언트는 같은 API 키로 MCP 엔드포인트에 접속할 수 있습니다.</p>
                <p className='font-mono'>{baseUrl}/mcp</p>
            </PanelCard>
        </PageRoot>
    )
}

export default SettingsPage
