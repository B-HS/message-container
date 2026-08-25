'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, MessagesSquare, Moon, RefreshCw, Search, Settings, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@shared/lib/utils'

const NAV_ITEMS = [
    { href: '/chats', label: '대화', icon: MessagesSquare },
    { href: '/messages', label: '메시지 검색', icon: Search },
    { href: '/sync', label: '동기화', icon: RefreshCw },
    { href: '/settings', label: '설정', icon: Settings },
] as const

export const Rail = () => {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/session', { method: 'DELETE' })
        router.replace('/setup')
    }

    const { resolvedTheme, setTheme } = useTheme()

    return (
        <aside className='fixed inset-y-0 left-0 z-10 flex w-64 flex-col bg-sidebar text-sidebar-foreground'>
            <header className='flex h-12 shrink-0 items-center px-3'>
                <span className='truncate text-sm font-semibold tracking-tight'>message-container</span>
            </header>
            <nav className='flex min-h-0 flex-1 flex-col'>
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={cn(
                            'flex h-9 items-center gap-3 rounded-none px-3 text-sm font-medium',
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
        </aside>
    )
}
