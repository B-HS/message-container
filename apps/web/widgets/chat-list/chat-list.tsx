'use client'

import { useRouter } from 'next/navigation'

import { useGetChatList } from '@entities/chat/chat.query'
import { DataTable } from '@features/data-table/data-table'
import { PageRoot } from '@features/page-root/page-root'
import { PanelCard } from '@features/panel-card/panel-card'
import { Pager } from '@features/pager/pager'
import { StateCard } from '@features/state-card/state-card'
import { formatCount, formatDateTime } from '@shared/lib/format'
import { Badge } from '@shared/ui/badge'

import type { ChatListParams } from '@entities/chat/chat.query'
import type { ChatSummary } from '@entities/chat/chat.type'
import type { DataTableColumn } from '@features/data-table/data-table'
import type { FC } from 'react'

type ChatListWidgetProps = {
    params: ChatListParams
}

const chatDisplayName = (chat: ChatSummary) =>
    chat.displayName || chat.identifier || chat.participants.map((participant) => participant.address).join(', ') || chat.guid

const COLUMNS: DataTableColumn<ChatSummary>[] = [
    { key: 'name', label: '대화', width: 224, truncate: true, render: (chat) => chatDisplayName(chat) },
    {
        key: 'lastMessage',
        label: '마지막 메시지',
        flexible: true,
        render: (chat) => (chat.lastMessageText ? chat.lastMessageText : <span className='text-muted-foreground'>(본문 없음)</span>),
    },
    {
        key: 'lastMessageAt',
        label: '시각',
        width: 160,
        align: 'right',
        mono: true,
        render: (chat) => <span suppressHydrationWarning>{formatDateTime(chat.lastMessageAt)}</span>,
    },
    {
        key: 'type',
        label: '유형',
        width: 80,
        render: (chat) => <Badge variant={chat.isGroup ? 'secondary' : 'outline'}>{chat.isGroup ? '그룹' : '1:1'}</Badge>,
    },
    { key: 'messageCount', label: '메시지', width: 80, align: 'right', render: (chat) => formatCount(chat.messageCount) },
]

export const ChatListWidget: FC<ChatListWidgetProps> = ({ params }) => {
    const router = useRouter()
    const { data } = useGetChatList(params)

    if (data.data.length === 0) {
        return (
            <PageRoot>
                <StateCard variant='empty' title='동기화된 대화가 없습니다' description='동기화 화면에서 상태를 확인하세요' />
            </PageRoot>
        )
    }

    return (
        <PageRoot>
            <PanelCard title={`대화 ${formatCount(data.pagination.total)}개`} contentClassName='flex flex-col gap-2'>
                <DataTable
                    columns={COLUMNS}
                    rows={data.data}
                    rowKey={(chat) => chat.sourceRowId}
                    onRowClick={(chat) => router.push(`/chats/${chat.sourceRowId}`)}
                />
                <Pager
                    page={data.pagination.page}
                    totalPages={data.pagination.totalPages}
                    onPageChange={(page) => router.push(`/chats?page=${page}`)}
                />
            </PanelCard>
        </PageRoot>
    )
}
