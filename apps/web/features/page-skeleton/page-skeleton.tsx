import { Skeleton } from '@shared/ui/skeleton'

import type { FC } from 'react'

export const PageSkeleton: FC = () => (
    <div className='flex flex-col gap-px'>
        <section className='bg-card p-3'>
            <Skeleton className='h-96 w-full' />
        </section>
    </div>
)
