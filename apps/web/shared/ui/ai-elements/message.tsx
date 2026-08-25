'use client'

import { cn } from '@shared/lib/utils'

import type { HTMLAttributes } from 'react'

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
    from: 'user' | 'assistant'
}

export const Message = ({ className, from, ...props }: MessageProps) => (
    <div
        className={cn(
            'group flex w-full max-w-[80%] flex-col gap-1',
            from === 'user' ? 'is-user ml-auto items-end' : 'is-assistant items-start',
            className,
        )}
        {...props}
    />
)

export type MessageContentProps = HTMLAttributes<HTMLDivElement>

export const MessageContent = ({ children, className, ...props }: MessageContentProps) => (
    <div
        className={cn(
            'flex w-fit max-w-full min-w-0 flex-col gap-2 overflow-hidden rounded-lg px-3 py-2 text-sm break-words whitespace-pre-wrap',
            'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
            'group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-secondary-foreground',
            className,
        )}
        {...props}>
        {children}
    </div>
)
