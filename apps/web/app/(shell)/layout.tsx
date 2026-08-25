import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Rail } from '@widgets/rail/rail'
import { API_KEY_COOKIE_NAME } from '@shared/constants/auth'

import type { PropsWithChildren } from 'react'

const ShellLayout = async ({ children }: PropsWithChildren) => {
    const cookieStore = await cookies()
    if (!cookieStore.get(API_KEY_COOKIE_NAME)) redirect('/setup')

    return (
        <div className='h-dvh min-h-0 bg-background'>
            <Rail />
            <main className='h-full min-h-0 min-w-0 overflow-y-auto pl-64'>{children}</main>
        </div>
    )
}

export default ShellLayout
