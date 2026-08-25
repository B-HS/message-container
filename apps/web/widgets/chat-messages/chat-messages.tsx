'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { attachmentFileUrl, useGetAttachmentsByMessages } from '@entities/attachment/attachment.query'
import { useGetChat } from '@entities/chat/chat.query'
import { useGetChatMessages } from '@entities/message/message.query'
import { Pager } from '@features/pager/pager'
import { StateCard } from '@features/state-card/state-card'
import { formatCount, formatDateTime } from '@shared/lib/format'
import { Badge } from '@shared/ui/badge'
import { Conversation, ConversationContent, ConversationScrollButton } from '@shared/ui/ai-elements/conversation'
import { Message, MessageContent } from '@shared/ui/ai-elements/message'

import type { ChatMessagesParams } from '@entities/message/message.query'
import type { MessageSummary } from '@entities/message/message.type'
import type { AttachmentMeta } from '@entities/attachment/attachment.type'
import type { FC } from 'react'

type ChatMessagesWidgetProps = {
    chatId: number
    params: ChatMessagesParams
}

const TAPBACK_LABEL: Record<number, string> = { 2000: '하트', 2001: '좋아요', 2002: '싫어요', 2003: '웃음', 2004: '강조', 2005: '물음' }
const TAPBACK_ADD_BASE = 2000
const TAPBACK_REMOVE_BASE = 3000
const TAPBACK_TYPE_LIMIT = 4000

const isTapbackRow = (message: MessageSummary) =>
    message.associatedMessageGuid !== null &&
    message.associatedMessageType !== null &&
    message.associatedMessageType >= TAPBACK_ADD_BASE &&
    message.associatedMessageType < TAPBACK_TYPE_LIMIT

const tapbackTargetGuid = (associatedMessageGuid: string) => {
    const afterSlash = associatedMessageGuid.split('/').at(-1) ?? associatedMessageGuid
    return afterSlash.split(':').at(-1) ?? afterSlash
}

export const ChatMessagesWidget: FC<ChatMessagesWidgetProps> = ({ chatId, params }) => {
    const router = useRouter()
    const chat = useGetChat(chatId).data
    const { data } = useGetChatMessages(chatId, params)

    const tapbacksByTarget = new Map<string, Map<string, number>>()
    for (const message of data.data) {
        if (!isTapbackRow(message) || message.associatedMessageGuid === null || message.associatedMessageType === null) continue
        const isRemove = message.associatedMessageType >= TAPBACK_REMOVE_BASE
        const label =
            TAPBACK_LABEL[isRemove ? message.associatedMessageType - (TAPBACK_REMOVE_BASE - TAPBACK_ADD_BASE) : message.associatedMessageType] ??
            '반응'
        const target = tapbackTargetGuid(message.associatedMessageGuid)
        const counts = tapbacksByTarget.get(target) ?? new Map<string, number>()
        counts.set(label, (counts.get(label) ?? 0) + (isRemove ? -1 : 1))
        tapbacksByTarget.set(target, counts)
    }

    const orderedMessages = data.data.filter((message) => !isTapbackRow(message)).toReversed()
    const lastReadOwnMessageId = orderedMessages.findLast((message) => message.isFromMe && message.readAt !== null)?.sourceRowId
    const attachmentMessageIds = data.data.filter((message) => message.hasAttachments).map((message) => message.sourceRowId)
    const attachments = useGetAttachmentsByMessages(attachmentMessageIds)
    const attachmentsByMessage = new Map<number, AttachmentMeta[]>()
    for (const attachment of attachments.data ?? []) {
        attachmentsByMessage.set(attachment.messageSourceRowId, [...(attachmentsByMessage.get(attachment.messageSourceRowId) ?? []), attachment])
    }

    return (
        <div className='flex h-full min-h-0 flex-col gap-px'>
            <section className='flex shrink-0 flex-col gap-2 bg-card p-3'>
                <div className='flex flex-wrap items-center gap-2'>
                    <Link href='/chats' className='text-xs text-muted-foreground hover:underline'>
                        목록
                    </Link>
                    <h2 className='min-w-0 truncate text-sm font-medium'>
                        {chat.displayName || chat.identifier || chat.participants.map((participant) => participant.address).join(', ') || chat.guid}
                    </h2>
                    <Badge variant={chat.isGroup ? 'secondary' : 'outline'}>{chat.isGroup ? '그룹' : '1:1'}</Badge>
                    {chat.serviceNames.map((service) => (
                        <Badge key={service} variant='outline'>
                            {service}
                        </Badge>
                    ))}
                    <span className='text-xs text-muted-foreground tabular-nums'>{formatCount(chat.messageCount)}건</span>
                    <div className='ml-auto'>
                        <Pager
                            page={data.pagination.page}
                            totalPages={data.pagination.totalPages}
                            onPageChange={(page) => router.push(`/chats/${chatId}?page=${page}`)}
                        />
                    </div>
                </div>
                <p className='font-mono text-2xs text-muted-foreground'>{chat.participants.map((participant) => participant.address).join(' · ')}</p>
            </section>
            {orderedMessages.length === 0 ? (
                <StateCard variant='empty' title='메시지가 없습니다' />
            ) : (
                <section className='flex min-h-0 flex-1 flex-col bg-card'>
                    <Conversation className='min-h-0 flex-1'>
                        <ConversationContent className='gap-3 p-3'>
                            {orderedMessages.map((message) => {
                                const messageAttachments = attachmentsByMessage.get(message.sourceRowId) ?? []
                                const imageAttachments = messageAttachments.filter((attachment) => attachment.mimeType?.startsWith('image/'))
                                const fileAttachments = messageAttachments.filter((attachment) => !attachment.mimeType?.startsWith('image/'))
                                const tapbackChips = [...(tapbacksByTarget.get(message.guid) ?? [])].filter(([, count]) => count > 0)

                                return (
                                    <Message key={message.sourceRowId} from={message.isFromMe ? 'user' : 'assistant'}>
                                        {!message.isFromMe && chat.isGroup ? (
                                            <span className='font-mono text-2xs text-muted-foreground'>{message.senderAddress ?? '-'}</span>
                                        ) : null}
                                        <MessageContent>
                                            {message.text ? <span>{message.text}</span> : null}
                                            {imageAttachments.map((attachment) => (
                                                <a
                                                    key={attachment.sourceRowId}
                                                    href={attachmentFileUrl(attachment.sourceRowId)}
                                                    target='_blank'
                                                    rel='noreferrer'>
                                                    <img
                                                        src={attachmentFileUrl(attachment.sourceRowId)}
                                                        alt={attachment.transferName ?? `attachment-${attachment.sourceRowId}`}
                                                        loading='lazy'
                                                        className='max-h-64 w-auto bg-muted object-contain'
                                                    />
                                                </a>
                                            ))}
                                            {fileAttachments.map((attachment) => (
                                                <a
                                                    key={attachment.sourceRowId}
                                                    href={attachmentFileUrl(attachment.sourceRowId)}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='font-mono text-xs underline'>
                                                    {attachment.transferName ?? `첨부 ${attachment.sourceRowId}`}
                                                </a>
                                            ))}
                                            {!message.text && messageAttachments.length === 0 && message.hasAttachments ? (
                                                <span className='text-xs opacity-70'>(첨부)</span>
                                            ) : null}
                                            {!message.text && !message.hasAttachments ? (
                                                <span className='text-xs opacity-70'>(본문 없음)</span>
                                            ) : null}
                                        </MessageContent>
                                        {tapbackChips.length > 0 ? (
                                            <div className='flex flex-wrap gap-1'>
                                                {tapbackChips.map(([label, count]) => (
                                                    <span key={label} className='bg-muted px-1.5 py-0.5 font-mono text-2xs text-muted-foreground'>
                                                        {count > 1 ? `${label} ${count}` : label}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : null}
                                        <span className='font-mono text-2xs text-muted-foreground tabular-nums' suppressHydrationWarning>
                                            {formatDateTime(message.sentAt)}
                                            {message.sourceRowId === lastReadOwnMessageId ? ' · 읽음' : ''}
                                        </span>
                                    </Message>
                                )
                            })}
                        </ConversationContent>
                        <ConversationScrollButton />
                    </Conversation>
                </section>
            )}
        </div>
    )
}
