'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { attachmentFileUrl, useGetAttachmentsByMessages } from '@entities/attachment/attachment.query'
import { useGetChat } from '@entities/chat/chat.query'
import { useGetChatMessages } from '@entities/message/message.query'
import { DataTable } from '@features/data-table/data-table'
import { PageRoot } from '@features/page-root/page-root'
import { PanelCard } from '@features/panel-card/panel-card'
import { Pager } from '@features/pager/pager'
import { StateCard } from '@features/state-card/state-card'
import { formatCount, formatDateTime } from '@shared/lib/format'
import { Badge } from '@shared/ui/badge'

import type { ChatMessagesParams } from '@entities/message/message.query'
import type { MessageSummary } from '@entities/message/message.type'
import type { DataTableColumn } from '@features/data-table/data-table'
import type { FC } from 'react'

type ChatMessagesWidgetProps = {
    chatId: number
    params: ChatMessagesParams
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
        key: 'attachments',
        label: '첨부',
        width: 64,
        align: 'right',
        render: (message) => (message.hasAttachments ? <Badge variant='secondary'>있음</Badge> : null),
    },
]

export const ChatMessagesWidget: FC<ChatMessagesWidgetProps> = ({ chatId, params }) => {
    const router = useRouter()
    const chat = useGetChat(chatId).data
    const { data } = useGetChatMessages(chatId, params)

    const attachmentMessageIds = data.data.filter((message) => message.hasAttachments).map((message) => message.sourceRowId)
    const attachments = useGetAttachmentsByMessages(attachmentMessageIds)
    const imageAttachments = (attachments.data ?? []).filter((attachment) => attachment.mimeType?.startsWith('image/'))

    return (
        <PageRoot>
            <PanelCard contentClassName='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <Link href='/chats' className='text-xs text-muted-foreground hover:underline'>
                        목록
                    </Link>
                    <h2 className='truncate text-sm font-medium'>
                        {chat.displayName ?? chat.identifier ?? chat.participants.map((participant) => participant.address).join(', ')}
                    </h2>
                    <Badge variant={chat.isGroup ? 'secondary' : 'outline'}>{chat.isGroup ? '그룹' : '1:1'}</Badge>
                </div>
                <p className='font-mono text-xs text-muted-foreground'>{chat.participants.map((participant) => participant.address).join(' · ')}</p>
            </PanelCard>
            {data.data.length === 0 ? (
                <StateCard variant='empty' title='메시지가 없습니다' />
            ) : (
                <PanelCard title={`메시지 ${formatCount(data.pagination.total)}건`} contentClassName='flex flex-col gap-2'>
                    <DataTable columns={COLUMNS} rows={data.data} rowKey={(message) => message.sourceRowId} />
                    <Pager
                        page={data.pagination.page}
                        totalPages={data.pagination.totalPages}
                        onPageChange={(page) => router.push(`/chats/${chatId}?page=${page}`)}
                    />
                </PanelCard>
            )}
            {imageAttachments.length > 0 ? (
                <PanelCard title={`이미지 첨부 ${imageAttachments.length}개`} contentClassName='flex flex-wrap gap-2'>
                    {imageAttachments.map((attachment) => (
                        <a key={attachment.sourceRowId} href={attachmentFileUrl(attachment.sourceRowId)} target='_blank' rel='noreferrer'>
                            <img
                                src={attachmentFileUrl(attachment.sourceRowId)}
                                alt={attachment.transferName ?? `attachment-${attachment.sourceRowId}`}
                                loading='lazy'
                                className='h-40 bg-muted object-contain'
                            />
                        </a>
                    ))}
                </PanelCard>
            ) : null}
        </PageRoot>
    )
}
