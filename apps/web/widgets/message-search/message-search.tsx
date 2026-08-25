'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useSearchMessages } from '@entities/message/message.query'
import { DataTable } from '@features/data-table/data-table'
import { PageRoot } from '@features/page-root/page-root'
import { PanelCard } from '@features/panel-card/panel-card'
import { Pager } from '@features/pager/pager'
import { StateCard } from '@features/state-card/state-card'
import { formatCount, formatDateTime } from '@shared/lib/format'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'

import type { MessageSearchParams } from '@entities/message/message.query'
import type { MessageSummary } from '@entities/message/message.type'
import type { DataTableColumn } from '@features/data-table/data-table'
import type { FC, FormEvent } from 'react'

type MessageSearchWidgetProps = {
    params: MessageSearchParams
}

const COLUMNS: DataTableColumn<MessageSummary>[] = [
    {
        key: 'sentAt',
        label: '시각',
        width: 160,
        mono: true,
        render: (message) => <span suppressHydrationWarning>{formatDateTime(message.sentAt)}</span>,
    },
    {
        key: 'sender',
        label: '발신',
        width: 160,
        mono: true,
        render: (message) => (message.isFromMe ? <span className='text-muted-foreground'>나</span> : (message.senderAddress ?? '-')),
    },
    { key: 'text', label: '내용', flexible: true, render: (message) => message.text ?? <span className='text-muted-foreground'>(본문 없음)</span> },
    {
        key: 'chat',
        label: '대화',
        width: 80,
        align: 'right',
        mono: true,
        render: (message) =>
            message.chatSourceRowId === null ? (
                '-'
            ) : (
                <Link href={`/chats/${message.chatSourceRowId}`} className='hover:underline' onClick={(event) => event.stopPropagation()}>
                    {message.chatSourceRowId}
                </Link>
            ),
    },
]

export const MessageSearchWidget: FC<MessageSearchWidgetProps> = ({ params }) => {
    const [keyword, setKeyword] = useState(params.q ?? '')

    const router = useRouter()
    const { data } = useSearchMessages(params)

    const pushSearch = (page: number, q: string) => {
        const query = new URLSearchParams({ page: String(page) })
        if (q) query.set('q', q)
        router.push(`/messages?${query.toString()}`)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        pushSearch(1, keyword.trim())
    }

    return (
        <PageRoot>
            <PanelCard contentClassName='flex flex-wrap items-center gap-2'>
                <form onSubmit={handleSubmit} className='flex min-w-0 flex-1 items-center gap-2'>
                    <Input
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder='메시지 본문 검색 (비우면 최근 메시지)'
                        aria-label='메시지 검색'
                        className='font-mono text-xs'
                    />
                    <Button type='submit' size='sm'>
                        검색
                    </Button>
                </form>
            </PanelCard>
            {data.data.length === 0 ? (
                <StateCard
                    variant='empty'
                    title={params.q ? '검색 결과가 없습니다' : '동기화된 메시지가 없습니다'}
                    description={params.q ? '다른 검색어를 시도하세요' : undefined}
                />
            ) : (
                <PanelCard
                    title={
                        params.q
                            ? `"${params.q}" 검색 결과 ${formatCount(data.pagination.total)}건`
                            : `최근 메시지 ${formatCount(data.pagination.total)}건`
                    }
                    contentClassName='flex flex-col gap-2'>
                    <DataTable columns={COLUMNS} rows={data.data} rowKey={(message) => message.sourceRowId} />
                    <Pager
                        page={data.pagination.page}
                        totalPages={data.pagination.totalPages}
                        onPageChange={(page) => pushSearch(page, params.q ?? '')}
                    />
                </PanelCard>
            )}
        </PageRoot>
    )
}
