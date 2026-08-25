import { count, desc, eq, inArray, like, sql } from 'drizzle-orm'

import { INSERT_CHUNK_SIZE, SYNC_STATE_KEY } from '@/compose/provider/constants'
import { apiKeys, attachments, authState, chatHandles, chats, handles, messages, syncState } from '@/db/schema.mysql'
import { chunk } from '@/lib/collection'
import { createAppError } from '@/lib/error'

import type { MySql2Database } from 'drizzle-orm/mysql2'
import type { AuthServiceDb } from '@/service/domain/auth/auth-service'
import type { AttachmentServiceDb } from '@/service/domain/message/attachment-service'
import type { ChatServiceDb, ChatSummary } from '@/service/domain/message/chat-service'
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

    const toChatSummaries = (
        chatRows: (typeof chats.$inferSelect)[],
        participantRows: Awaited<ReturnType<typeof getParticipantRows>>,
    ): ChatSummary[] =>
        chatRows.map((c) => ({
            sourceRowId: c.sourceRowId,
            guid: c.guid,
            identifier: c.identifier,
            serviceName: c.serviceName,
            displayName: c.displayName,
            isGroup: c.isGroup,
            participants: participantRows.filter((p) => p.chatSourceRowId === c.sourceRowId).map(({ address, service }) => ({ address, service })),
        }))

    const chat: ChatServiceDb = {
        getChatList: async ({ offset, limit }) => {
            const [totalRow, chatRows] = await Promise.all([
                db.select({ value: count() }).from(chats),
                db.select().from(chats).orderBy(desc(chats.sourceRowId)).limit(limit).offset(offset),
            ])
            const participantRows = await getParticipantRows(chatRows.map((c) => c.sourceRowId))
            return { data: toChatSummaries(chatRows, participantRows), total: totalRow.at(0)?.value ?? 0 }
        },
        getChatById: async (id) => {
            const chatRow = (await db.select().from(chats).where(eq(chats.sourceRowId, id))).at(0)
            if (!chatRow) return null
            return toChatSummaries([chatRow], await getParticipantRows([id])).at(0) ?? null
        },
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
    }

    const message: MessageServiceDb = {
        getMessageListByChat: async ({ chatSourceRowId, offset, limit }) => {
            const condition = eq(messages.chatSourceRowId, chatSourceRowId)
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

    return { sync, chat, message, attachment, auth }
}
