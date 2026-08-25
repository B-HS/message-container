'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'

import type { FC, FormEvent } from 'react'

type SetupFormProps = {
    mode: 'setup' | 'login'
}

const sessionResultSchema = z.union([
    z.object({ success: z.literal(true) }),
    z.object({ success: z.literal(false), error: z.object({ code: z.string(), message: z.string() }) }),
])

export const SetupForm: FC<SetupFormProps> = ({ mode }) => {
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setIsSubmitting(true)
        setErrorMessage(null)
        try {
            const res = await fetch('/api/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            const body = sessionResultSchema.parse(await res.json())
            if (!body.success) {
                setErrorMessage(body.error.message)
                return
            }
            router.replace('/chats')
            router.refresh()
        } catch {
            setErrorMessage('요청을 처리하지 못했습니다. API 서버 상태를 확인하세요')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3' noValidate>
            <label htmlFor='password' className='text-xs text-muted-foreground'>
                패스워드 {mode === 'setup' ? '(최소 8자 — 이 값으로 초기 설정됩니다)' : ''}
            </label>
            <Input
                id='password'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === 'setup' ? 'new-password' : 'current-password'}
                autoFocus
                required
            />
            {errorMessage ? <p className='text-xs text-destructive'>{errorMessage}</p> : null}
            <Button type='submit' disabled={isSubmitting || password.length === 0}>
                {mode === 'setup' ? '초기 설정' : '로그인'}
            </Button>
        </form>
    )
}
