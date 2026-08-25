'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, MessagesSquare, Moon, PanelLeft, RefreshCw, ScrollText, Search, Settings, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@shared/lib/utils'

import type { FC } from 'react'

const NAV_ITEMS = [
    { href: '/chats', label: '대화', icon: MessagesSquare },
    { href: '/messages', label: '메시지 검색', icon: Search },
    { href: '/sync', label: '동기화', icon: RefreshCw },
    { href: '/logs', label: '로그', icon: ScrollText },
    { href: '/settings', label: '설정', icon: Settings },
] as const

const SCRIM_BACKGROUND = 'oklch(0 0 0 / 50%)'

type RailContentProps = {
    onNavigate?: () => void
}

const RailContent: FC<RailContentProps> = ({ onNavigate }) => {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/session', { method: 'DELETE' })
        router.replace('/setup')
    }

    const { resolvedTheme, setTheme } = useTheme()

    return (
        <>
            <header className='flex h-12 shrink-0 items-center px-3'>
                <span className='truncate text-sm font-semibold tracking-tight'>Message Container</span>
            </header>
            <nav className='flex min-h-0 flex-1 flex-col overflow-y-auto'>
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={cn(
                            'flex h-9 shrink-0 items-center gap-3 rounded-none px-3 text-sm font-medium',
                            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                            pathname === item.href && 'bg-sidebar-accent text-sidebar-accent-foreground',
                        )}>
                        <item.icon className='size-4 shrink-0' />
                        <span className='truncate'>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <footer className='flex h-12 shrink-0 items-center justify-end gap-1 px-3'>
                <button
                    type='button'
                    aria-label='테마 전환'
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className='flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'>
                    <Sun className='size-4 dark:hidden' />
                    <Moon className='hidden size-4 dark:block' />
                </button>
                <button
                    type='button'
                    aria-label='로그아웃'
                    onClick={handleLogout}
                    className='flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'>
                    <LogOut className='size-4' />
                </button>
            </footer>
        </>
    )
}

export const Rail = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => {
        if (!isDrawerOpen) return
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsDrawerOpen(false)
        }
        window.addEventListener('keydown', handleKeydown)
        return () => window.removeEventListener('keydown', handleKeydown)
    }, [isDrawerOpen])

    return (
        <>
            <aside className='fixed inset-y-0 left-0 z-10 hidden w-64 flex-col bg-sidebar text-sidebar-foreground md:flex'>
                <RailContent />
            </aside>
            <div className='fixed inset-x-0 top-0 z-10 flex h-12 items-center gap-2 bg-sidebar px-3 text-sidebar-foreground md:hidden'>
                <button
                    type='button'
                    aria-label='내비게이션 열기'
                    aria-expanded={isDrawerOpen}
                    onClick={() => setIsDrawerOpen(true)}
                    className='flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'>
                    <PanelLeft className='size-4' />
                </button>
                <span className='truncate text-sm font-semibold tracking-tight'>Message Container</span>
            </div>
            {isDrawerOpen ? (
                <div className='fixed inset-0 z-50 md:hidden'>
                    <button
                        type='button'
                        aria-label='내비게이션 닫기'
                        className='absolute inset-0'
                        style={{ background: SCRIM_BACKGROUND }}
                        onClick={() => setIsDrawerOpen(false)}
                    />
                    <aside className='absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar text-sidebar-foreground'>
                        <RailContent onNavigate={() => setIsDrawerOpen(false)} />
                    </aside>
                </div>
            ) : null}
        </>
    )
}
