import { bigint, boolean, index, pgTable, primaryKey, text } from 'drizzle-orm/pg-core'

export const chats = pgTable('chats', {
    sourceRowId: bigint('source_row_id', { mode: 'number' }).primaryKey(),
    guid: text('guid').notNull().unique(),
    identifier: text('identifier'),
    serviceName: text('service_name'),
    displayName: text('display_name'),
    isGroup: boolean('is_group').notNull().default(false),
    syncedAtMs: bigint('synced_at_ms', { mode: 'number' }).notNull(),
})

export const handles = pgTable('handles', {
    sourceRowId: bigint('source_row_id', { mode: 'number' }).primaryKey(),
    address: text('address').notNull(),
    service: text('service'),
    syncedAtMs: bigint('synced_at_ms', { mode: 'number' }).notNull(),
})

export const chatHandles = pgTable(
    'chat_handles',
    {
        chatSourceRowId: bigint('chat_source_row_id', { mode: 'number' }).notNull(),
        handleSourceRowId: bigint('handle_source_row_id', { mode: 'number' }).notNull(),
    },
    (t) => [primaryKey({ columns: [t.chatSourceRowId, t.handleSourceRowId] })],
)

export const messages = pgTable(
    'messages',
    {
        sourceRowId: bigint('source_row_id', { mode: 'number' }).primaryKey(),
        guid: text('guid').notNull().unique(),
        chatSourceRowId: bigint('chat_source_row_id', { mode: 'number' }),
        handleSourceRowId: bigint('handle_source_row_id', { mode: 'number' }),
        isFromMe: boolean('is_from_me').notNull(),
        text: text('text'),
        service: text('service'),
        sentAtMs: bigint('sent_at_ms', { mode: 'number' }).notNull(),
        hasAttachments: boolean('has_attachments').notNull().default(false),
        syncedAtMs: bigint('synced_at_ms', { mode: 'number' }).notNull(),
    },
    (t) => [index('messages_chat_sent_idx').on(t.chatSourceRowId, t.sentAtMs), index('messages_sent_idx').on(t.sentAtMs)],
)

export const attachments = pgTable(
    'attachments',
    {
        sourceRowId: bigint('source_row_id', { mode: 'number' }).primaryKey(),
        messageSourceRowId: bigint('message_source_row_id', { mode: 'number' }).notNull(),
        guid: text('guid'),
        transferName: text('transfer_name'),
        mimeType: text('mime_type'),
        totalBytes: bigint('total_bytes', { mode: 'number' }),
        sourcePath: text('source_path'),
    },
    (t) => [index('attachments_message_idx').on(t.messageSourceRowId)],
)

export const syncState = pgTable('sync_state', {
    key: text('key').primaryKey(),
    value: text('value').notNull(),
})
