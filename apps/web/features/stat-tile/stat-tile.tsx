import { cn } from '@shared/lib/utils'

import type { FC } from 'react'

type StatTileProps = {
    label: string
    value: string
    hint?: string
    accent?: 'warning' | 'danger'
}

const ACCENT_CLASS = { warning: 'text-warning', danger: 'text-destructive' } as const

export const StatTile: FC<StatTileProps> = ({ label, value, hint, accent }) => (
    <article className='flex h-full flex-col items-start gap-1 bg-card p-3'>
        <p className='text-xs text-muted-foreground'>{label}</p>
        <p className={cn('text-2xl font-semibold tracking-tight tabular-nums', accent && ACCENT_CLASS[accent])}>{value}</p>
        {hint ? <p className='text-xs text-muted-foreground'>{hint}</p> : null}
    </article>
)
