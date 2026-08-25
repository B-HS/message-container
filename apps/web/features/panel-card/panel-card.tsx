import { cn } from '@shared/lib/utils'

import type { FC, PropsWithChildren, ReactNode } from 'react'

type PanelCardProps = PropsWithChildren<{
    title?: ReactNode
    contentClassName?: string
}>

export const PanelCard: FC<PanelCardProps> = ({ title, contentClassName, children }) => (
    <section className='flex flex-col gap-3 bg-card py-3'>
        {title ? (
            <header className='px-3'>
                <h2 className='text-sm font-medium'>{title}</h2>
            </header>
        ) : null}
        <div className={cn('px-3', contentClassName)}>{children}</div>
    </section>
)
