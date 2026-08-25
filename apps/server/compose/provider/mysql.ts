import { count, desc, eq, inArray, like, lte, sql } from 'drizzle-orm'

import { INSERT_CHUNK_SIZE, SYNC_STATE_KEY } from '@/compose/provider/constants'
import { apiKeys, attachments, authState, chatHandles, chats, handles, logs, messages, syncState } from '@/db/schema.mysql'
import { chunk } from '@/lib/collection'
import { createAppError } from '@/lib/error'

import type { MySql2Database } from 'drizzle-orm/mysql2'
import type { AuthServiceDb } from '@/service/domain/auth/auth-service'
import type { LogServiceDb } from '@/service/domain/log/log-service'
import type { AttachmentServiceDb } from '@/service/domain/message/attachment-service'
import type { ChatServiceDb } from '@/service/domain/message/chat-service'
import type { MessageServiceDb } from '@/service/domain/message/message-service'
import type { SyncServiceDb } from '@/service/domain/message/sync-service'

export const createMysqlServiceDb = (db: MySql2Database) => {
    const getStateValue = async (key: string) => (await db.select().from(syncState).where(eq(syncState.key, key))).at(0)?.value ?? null
    const setStateValue = async (key: string, value: string) => db.insert(syncState).values({ key, value }).onDuplicateKeyUpdate({ set: { value } })

    const sync: SyncServiceDb = {
        getCursor: async () => Number((await getStateValue(SYNC_STATE_KEY.CURSOR)) ?? '0'),
        saveBatch: async (batch, cursor) =>
            db.transaction(async (tx) => {
                for (const rows of chunk(batch.handles, INSERT_CHUNK_SIZE)) {
                    await tx
                        .insert(handles)
                        .values(rows)
                        .onDuplicateKeyUpdate({
                            set: { address: sql`values(address)`, service: sql`values(service)`, syncedAtMs: sql`values(synced_at_ms)` },
                        })
                }
                for (const rows of chunk(batch.chats, INSERT_CHUNK_SIZE)) {
                    await tx
                        .insert(chats)
                        .values(rows)
                        .onDuplicateKeyUpdate({
                            set: {
                                guid: sql`values(guid)`,
                                identifier: sql`values(identifier)`,
                                serviceName: sql`values(service_name)`,
                                displayName: sql`values(display_name)`,
                                isGroup: sql`values(is_group)`,
                                syncedAtMs: sql`values(synced_at_ms)`,
                            },
                        })
                }
                for (const rows of chunk(batch.chatHandles, INSERT_CHUNK_SIZE)) {
                    await tx
                        .insert(chatHandles)
                        .values(rows)
                        .onDuplicateKeyUpdate({ set: { chatSourceRowId: sql`chat_source_row_id` } })
                }
                for (const rows of chunk(batch.messages, INSERT_CHUNK_SIZE)) {
                    await tx
                        .insert(messages)
                        .values(rows)
                        .onDuplicateKeyUpdate({
                            set: {
                                guid: sql`values(guid)`,
                                chatSourceRowId: sql`values(chat_source_row_id)`,
                                handleSourceRowId: sql`values(handle_source_row_id)`,
                                isFromMe: sql`values(is_from_me)`,
                                text: sql`values(text)`,
                                service: sql`values(service)`,
                                sentAtMs: sql`values(sent_at_ms)`,
                                hasAttachments: sql`values(has_attachments)`,
                                isRead: sql`values(is_read)`,
                                dateReadMs: sql`values(date_read_ms)`,
                                associatedMessageGuid: sql`values(associated_message_guid)`,
                                associatedMessageType: sql`values(associated_message_type)`,
                                syncedAtMs: sql`values(synced_at_ms)`,
                            },
                        })
                }
                for (const rows of chunk(batch.attachments, INSERT_CHUNK_SIZE)) {
                    await tx
                        .insert(attachments)
                        .values(rows)
                        .onDuplicateKeyUpdate({
                            set: {
                                messageSourceRowId: sql`values(message_source_row_id)`,
                                guid: sql`values(guid)`,
                                transferName: sql`values(transfer_name)`,
                                mimeType: sql`values(mime_type)`,
                                totalBytes: sql`values(total_bytes)`,
                                sourcePath: sql`values(source_path)`,
                            },
                        })
                }
                await tx
                    .insert(syncState)
                    .values({ key: SYNC_STATE_KEY.CURSOR, value: String(cursor) })
                    .onDuplicateKeyUpdate({ set: { value: String(cursor) } })
            }),
        markSynced: async (atMs) => {
            await setStateValue(SYNC_STATE_KEY.LAST_SYNC_AT_MS, String(atMs))
        },
        setLastError: async (message) => {
            await setStateValue(SYNC_STATE_KEY.LAST_ERROR, message ?? '')
        },
        getStatus: async () => {
            const [cursorValue, lastSyncValue, lastErrorValue, chatTotal, messageTotal, attachmentTotal] = await Promise.all([
                getStateValue(SYNC_STATE_KEY.CURSOR),
                getStateValue(SYNC_STATE_KEY.LAST_SYNC_AT_MS),
                getStateValue(SYNC_STATE_KEY.LAST_ERROR),
                db.select({ value: count() }).from(chats),
                db.select({ value: count() }).from(messages),
                db.select({ value: count() }).from(attachments),
            ])
            return {
                cursor: Number(cursorValue ?? '0'),
                lastSyncAtMs: lastSyncValue === null ? null : Number(lastSyncValue),
                lastErrorMessage: lastErrorValue === null || lastErrorValue === '' ? null : lastErrorValue,
                counts: {
                    chats: chatTotal.at(0)?.value ?? 0,
                    messages: messageTotal.at(0)?.value ?? 0,
                    attachments: attachmentTotal.at(0)?.value ?? 0,
                },
            }
        },
    }

    const getParticipantRows = async (chatIds: number[]) =>
        chatIds.length === 0
            ? []
            : db
                  .select({ chatSourceRowId: chatHandles.chatSourceRowId, address: handles.address, service: handles.service })
                  .from(chatHandles)
                  .innerJoin(handles, eq(handles.sourceRowId, chatHandles.handleSourceRowId))
                  .where(inArray(chatHandles.chatSourceRowId, chatIds))

    const chatListSelection = {
        sourceRowId: chats.sourceRowId,
        guid: chats.guid,
        identifier: chats.identifier,
        serviceName: chats.serviceName,
        displayName: chats.displayName,
        isGroup: chats.isGroup,
        messageCount: sql<number>`(select count(*) from messages m where m.chat_source_row_id = chats.source_row_id)`,
        lastMessageText: sql<
            string | null
        >`(select m.text from messages m where m.chat_source_row_id = chats.source_row_id order by m.sent_at_ms desc, m.source_row_id desc limit 1)`,
        lastMessageAtMs: sql<number | null>`(select max(m.sent_at_ms) from messages m where m.chat_source_row_id = chats.source_row_id)`,
    }

    const chat: ChatServiceDb = {
        getAllChatRows: async () =>
            (await db.select(chatListSelection).from(chats)).map((c) => ({
                ...c,
                messageCount: Number(c.messageCount),
                lastMessageAtMs: c.lastMessageAtMs === null ? null : Number(c.lastMessageAtMs),
            })),
        getParticipants: async (chatIds) => getParticipantRows(chatIds),
    }

    const messageSelection = {
        sourceRowId: messages.sourceRowId,
        guid: messages.guid,
        chatSourceRowId: messages.chatSourceRowId,
        senderAddress: handles.address,
        isFromMe: messages.isFromMe,
        text: messages.text,
        service: messages.service,
        sentAtMs: messages.sentAtMs,
        hasAttachments: messages.hasAttachments,
        isRead: messages.isRead,
        dateReadMs: messages.dateReadMs,
        associatedMessageGuid: messages.associatedMessageGuid,
        associatedMessageType: messages.associatedMessageType,
    }

    const message: MessageServiceDb = {
        getMessageListByChat: async ({ chatSourceRowIds, offset, limit }) => {
            const condition = inArray(messages.chatSourceRowId, chatSourceRowIds)
            const [totalRow, rows] = await Promise.all([
                db.select({ value: count() }).from(messages).where(condition),
                db
                    .select(messageSelection)
                    .from(messages)
                    .leftJoin(handles, eq(handles.sourceRowId, messages.handleSourceRowId))
                    .where(condition)
                    .orderBy(desc(messages.sentAtMs), desc(messages.sourceRowId))
                    .limit(limit)
                    .offset(offset),
            ])
            return { data: rows, total: totalRow.at(0)?.value ?? 0 }
        },
        searchMessageList: async ({ keyword, offset, limit }) => {
            const condition = keyword === undefined ? undefined : like(messages.text, `%${keyword}%`)
            const [totalRow, rows] = await Promise.all([
                db.select({ value: count() }).from(messages).where(condition),
                db
                    .select(messageSelection)
                    .from(messages)
                    .leftJoin(handles, eq(handles.sourceRowId, messages.handleSourceRowId))
                    .where(condition)
                    .orderBy(desc(messages.sentAtMs), desc(messages.sourceRowId))
                    .limit(limit)
                    .offset(offset),
            ])
            return { data: rows, total: totalRow.at(0)?.value ?? 0 }
        },
    }

    const attachment: AttachmentServiceDb = {
        getAttachmentById: async (id) => (await db.select().from(attachments).where(eq(attachments.sourceRowId, id))).at(0) ?? null,
        getAttachmentsByMessageIds: async (messageIds) =>
            messageIds.length === 0 ? [] : db.select().from(attachments).where(inArray(attachments.messageSourceRowId, messageIds)),
    }

    const apiKeySelection = {
        id: apiKeys.id,
        name: apiKeys.name,
        start: apiKeys.start,
        createdAtMs: apiKeys.createdAtMs,
        lastUsedAtMs: apiKeys.lastUsedAtMs,
        revokedAtMs: apiKeys.revokedAtMs,
    }

    const auth: AuthServiceDb = {
        getAuthState: async (key) => (await db.select().from(authState).where(eq(authState.key, key))).at(0)?.value ?? null,
        setAuthState: async (key, value) => {
            await db.insert(authState).values({ key, value }).onDuplicateKeyUpdate({ set: { value } })
        },
        insertApiKey: async (row) => {
            const inserted = (await db.insert(apiKeys).values(row).$returningId()).at(0)
            if (!inserted) throw createAppError('INTERNAL_ERROR')
            return inserted
        },
        getApiKeyByHash: async (keyHash) => (await db.select(apiKeySelection).from(apiKeys).where(eq(apiKeys.keyHash, keyHash))).at(0) ?? null,
        listApiKeys: async () => db.select(apiKeySelection).from(apiKeys).orderBy(desc(apiKeys.id)),
        revokeApiKey: async (id, atMs) => {
            await db.update(apiKeys).set({ revokedAtMs: atMs }).where(eq(apiKeys.id, id))
        },
        touchApiKey: async (id, atMs) => {
            await db.update(apiKeys).set({ lastUsedAtMs: atMs }).where(eq(apiKeys.id, id))
        },
    }

    const log: LogServiceDb = {
        insertLog: async (row) => {
            await db.insert(logs).values(row)
        },
        listLogs: async ({ offset, limit, level }) => {
            const condition = level === undefined ? undefined : eq(logs.level, level)
            const [totalRow, rows] = await Promise.all([
                db.select({ value: count() }).from(logs).where(condition),
                db.select().from(logs).where(condition).orderBy(desc(logs.id)).limit(limit).offset(offset),
            ])
            return { data: rows, total: totalRow.at(0)?.value ?? 0 }
        },
        pruneLogs: async (keep) => {
            const threshold = (await db.select({ id: logs.id }).from(logs).orderBy(desc(logs.id)).limit(1).offset(keep)).at(0)
            if (threshold) await db.delete(logs).where(lte(logs.id, threshold.id))
        },
    }

    return { sync, chat, message, attachment, auth, log }
}
