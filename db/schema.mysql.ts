import { bigint, boolean, index, mysqlTable, primaryKey, text, varchar } from 'drizzle-orm/mysql-core'

const GUID_LENGTH = 191
const ADDRESS_LENGTH = 255
const SERVICE_LENGTH = 64
const KEY_LENGTH = 64

export const chats = mysqlTable('chats', {
    sourceRowId: bigint('source_row_id', { mode: 'number' }).primaryKey(),
    guid: varchar('guid', { length: GUID_LENGTH }).notNull().unique(),
    identifier: varchar('identifier', { length: ADDRESS_LENGTH }),
    serviceName: varchar('service_name', { length: SERVICE_LENGTH }),
    displayName: text('display_name'),
    isGroup: boolean('is_group').notNull().default(false),
    syncedAtMs: bigint('synced_at_ms', { mode: 'number' }).notNull(),
})

export const handles = mysqlTable('handles', {
    sourceRowId: bigint('source_row_id', { mode: 'number' }).primaryKey(),
    address: varchar('address', { length: ADDRESS_LENGTH }).notNull(),
    service: varchar('service', { length: SERVICE_LENGTH }),
    syncedAtMs: bigint('synced_at_ms', { mode: 'number' }).notNull(),
})

export const chatHandles = mysqlTable(
    'chat_handles',
    {
        chatSourceRowId: bigint('chat_source_row_id', { mode: 'number' }).notNull(),
        handleSourceRowId: bigint('handle_source_row_id', { mode: 'number' }).notNull(),
    },
    (t) => [primaryKey({ columns: [t.chatSourceRowId, t.handleSourceRowId] })],
)

export const messages = mysqlTable(
    'messages',
    {
        sourceRowId: bigint('source_row_id', { mode: 'number' }).primaryKey(),
        guid: varchar('guid', { length: GUID_LENGTH }).notNull().unique(),
        chatSourceRowId: bigint('chat_source_row_id', { mode: 'number' }),
        handleSourceRowId: bigint('handle_source_row_id', { mode: 'number' }),
        isFromMe: boolean('is_from_me').notNull(),
        text: text('text'),
        service: varchar('service', { length: SERVICE_LENGTH }),
        sentAtMs: bigint('sent_at_ms', { mode: 'number' }).notNull(),
        hasAttachments: boolean('has_attachments').notNull().default(false),
        syncedAtMs: bigint('synced_at_ms', { mode: 'number' }).notNull(),
    },
    (t) => [index('messages_chat_sent_idx').on(t.chatSourceRowId, t.sentAtMs), index('messages_sent_idx').on(t.sentAtMs)],
)

export const attachments = mysqlTable(
    'attachments',
    {
        sourceRowId: bigint('source_row_id', { mode: 'number' }).primaryKey(),
        messageSourceRowId: bigint('message_source_row_id', { mode: 'number' }).notNull(),
        guid: varchar('guid', { length: GUID_LENGTH }),
        transferName: text('transfer_name'),
        mimeType: varchar('mime_type', { length: ADDRESS_LENGTH }),
        totalBytes: bigint('total_bytes', { mode: 'number' }),
        sourcePath: text('source_path'),
    },
    (t) => [index('attachments_message_idx').on(t.messageSourceRowId)],
)

export const syncState = mysqlTable('sync_state', {
    key: varchar('key', { length: KEY_LENGTH }).primaryKey(),
    value: text('value').notNull(),
})

export const authState = mysqlTable('auth_state', {
    key: varchar('key', { length: KEY_LENGTH }).primaryKey(),
    value: text('value').notNull(),
})

const KEY_HASH_LENGTH = 64
const KEY_START_LENGTH = 16

export const apiKeys = mysqlTable('api_keys', {
    id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
    name: varchar('name', { length: ADDRESS_LENGTH }).notNull(),
    start: varchar('start', { length: KEY_START_LENGTH }).notNull(),
    keyHash: varchar('key_hash', { length: KEY_HASH_LENGTH }).notNull().unique(),
    createdAtMs: bigint('created_at_ms', { mode: 'number' }).notNull(),
    lastUsedAtMs: bigint('last_used_at_ms', { mode: 'number' }),
    revokedAtMs: bigint('revoked_at_ms', { mode: 'number' }),
})
