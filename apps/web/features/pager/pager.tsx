'use client'

import { Button } from '@shared/ui/button'

import type { FC } from 'react'

type PagerProps = {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pager: FC<PagerProps> = ({ page, totalPages, onPageChange }) => (
    <div className='flex items-center justify-end gap-2'>
        <span className='text-2xs text-muted-foreground tabular-nums'>
            {page} / {Math.max(totalPages, 1)}
        </span>
        <Button variant='ghost' size='sm' disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            이전
        </Button>
        <Button variant='ghost' size='sm' disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
            다음
        </Button>
    </div>
)
