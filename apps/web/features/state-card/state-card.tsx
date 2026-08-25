import { Inbox, TriangleAlert } from 'lucide-react'

import { cn } from '@shared/lib/utils'

import type { FC } from 'react'

type StateCardProps = {
    variant: 'empty' | 'error'
    title: string
    description?: string
}

export const StateCard: FC<StateCardProps> = ({ variant, title, description }) => {
    const Icon = variant === 'error' ? TriangleAlert : Inbox

    return (
        <section className='flex flex-col items-center justify-center gap-6 bg-card px-3 py-12 text-center text-balance'>
            <Icon className={cn('size-6', variant === 'error' && 'text-destructive')} />
            <div className='flex flex-col gap-1'>
                <p className='text-sm font-medium'>{title}</p>
                {description ? <p className='text-xs text-muted-foreground'>{description}</p> : null}
            </div>
        </section>
    )
}
