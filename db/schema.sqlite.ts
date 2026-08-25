import { index, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const chats = sqliteTable('chats', {
    sourceRowId: integer('source_row_id').primaryKey(),
    guid: text('guid').notNull().unique(),
    identifier: text('identifier'),
    serviceName: text('service_name'),
    displayName: text('display_name'),
    isGroup: integer('is_group', { mode: 'boolean' }).notNull().default(false),
    syncedAtMs: integer('synced_at_ms').notNull(),
})

export const handles = sqliteTable('handles', {
    sourceRowId: integer('source_row_id').primaryKey(),
    address: text('address').notNull(),
    service: text('service'),
    syncedAtMs: integer('synced_at_ms').notNull(),
})

export const chatHandles = sqliteTable(
    'chat_handles',
    {
        chatSourceRowId: integer('chat_source_row_id').notNull(),
        handleSourceRowId: integer('handle_source_row_id').notNull(),
    },
    (t) => [primaryKey({ columns: [t.chatSourceRowId, t.handleSourceRowId] })],
)

export const messages = sqliteTable(
    'messages',
    {
        sourceRowId: integer('source_row_id').primaryKey(),
        guid: text('guid').notNull().unique(),
        chatSourceRowId: integer('chat_source_row_id'),
        handleSourceRowId: integer('handle_source_row_id'),
        isFromMe: integer('is_from_me', { mode: 'boolean' }).notNull(),
        text: text('text'),
        service: text('service'),
        sentAtMs: integer('sent_at_ms').notNull(),
        hasAttachments: integer('has_attachments', { mode: 'boolean' }).notNull().default(false),
        syncedAtMs: integer('synced_at_ms').notNull(),
    },
    (t) => [index('messages_chat_sent_idx').on(t.chatSourceRowId, t.sentAtMs), index('messages_sent_idx').on(t.sentAtMs)],
)

export const attachments = sqliteTable(
    'attachments',
    {
        sourceRowId: integer('source_row_id').primaryKey(),
        messageSourceRowId: integer('message_source_row_id').notNull(),
        guid: text('guid'),
        transferName: text('transfer_name'),
        mimeType: text('mime_type'),
        totalBytes: integer('total_bytes'),
        sourcePath: text('source_path'),
    },
    (t) => [index('attachments_message_idx').on(t.messageSourceRowId)],
)

export const syncState = sqliteTable('sync_state', {
    key: text('key').primaryKey(),
    value: text('value').notNull(),
})

export const authState = sqliteTable('auth_state', {
    key: text('key').primaryKey(),
    value: text('value').notNull(),
})

export const apiKeys = sqliteTable('api_keys', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    start: text('start').notNull(),
    keyHash: text('key_hash').notNull().unique(),
    createdAtMs: integer('created_at_ms').notNull(),
    lastUsedAtMs: integer('last_used_at_ms'),
    revokedAtMs: integer('revoked_at_ms'),
})
