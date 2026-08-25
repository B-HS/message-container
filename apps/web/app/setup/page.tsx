import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { SetupForm } from '@widgets/setup/setup-form'
import { API_KEY_COOKIE_NAME } from '@shared/constants/auth'

const statusEnvelopeSchema = z.object({ success: z.literal(true), data: z.object({ passwordSet: z.boolean() }) })

const SetupPage = async () => {
    const cookieStore = await cookies()
    if (cookieStore.get(API_KEY_COOKIE_NAME)) redirect('/chats')

    const baseUrl = process.env.MESSAGE_API_URL ?? 'http://localhost:3000'
    let passwordSet: boolean | null = null
    try {
        const res = await fetch(`${baseUrl}/api/auth/status`, { cache: 'no-store' })
        passwordSet = statusEnvelopeSchema.parse(await res.json()).data.passwordSet
    } catch {
        passwordSet = null
    }

    return (
        <div className='grid min-h-dvh place-items-center bg-background p-4'>
            <div className='flex w-full max-w-sm flex-col gap-4 bg-card p-6'>
                <h1 className='text-xl font-semibold tracking-tight'>message-container</h1>
                {passwordSet === null ? (
                    <p className='text-xs text-destructive'>API 서버({baseUrl})에 연결할 수 없습니다. 컨테이너 상태를 확인하세요.</p>
                ) : (
                    <>
                        <p className='text-xs text-muted-foreground'>
                            {passwordSet ? '설정한 패스워드로 로그인하세요.' : '처음 사용합니다. 관리에 사용할 패스워드를 설정하세요.'}
                        </p>
                        <SetupForm mode={passwordSet ? 'login' : 'setup'} />
                    </>
                )}
            </div>
        </div>
    )
}

export default SetupPage
