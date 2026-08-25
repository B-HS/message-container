'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { PageRoot } from '@features/page-root/page-root'
import { PageSkeleton } from '@features/page-skeleton/page-skeleton'
import { StateCard } from '@features/state-card/state-card'
import { isApiError } from '@shared/lib/api-error'
import { Button } from '@shared/ui/button'

import type { FC } from 'react'

type ShellErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ShellError: FC<ShellErrorProps> = ({ error, reset }) => {
    const isUnauthorized = (isApiError(error) && error.code === 'UNAUTHORIZED') || error.message.includes('API 키')

    const router = useRouter()

    useEffect(() => {
        if (isUnauthorized) router.replace('/setup')
    }, [isUnauthorized, router])

    if (isUnauthorized) return <PageSkeleton />

    return (
        <PageRoot>
            <StateCard variant='error' title='데이터를 불러오지 못했습니다' description='요청이 실패했습니다. 잠시 후 다시 시도하세요.' />
            <section className='flex justify-center bg-card p-3'>
                <Button size='sm' variant='outline' onClick={() => reset()}>
                    다시 시도
                </Button>
            </section>
        </PageRoot>
    )
}

export default ShellError
