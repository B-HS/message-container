import { count, desc, eq, inArray, like, sql } from 'drizzle-orm'

import { INSERT_CHUNK_SIZE, SYNC_STATE_KEY } from '@/compose/provider/constants'
import { attachments, chatHandles, chats, handles, messages, syncState } from '@/db/schema.sqlite'
import { chunk } from '@/lib/collection'

import type { BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite'
import type { AttachmentServiceDb } from '@/service/domain/message/attachment-service'
import type { ChatServiceDb, ChatSummary } from '@/service/domain/message/chat-service'
import type { MessageServiceDb } from '@/service/domain/message/message-service'
import type { SyncServiceDb } from '@/service/domain/message/sync-service'

export const createSqliteServiceDb = (db: BunSQLiteDatabase) => {
    const getStateValue = async (key: string) => (await db.select().from(syncState).where(eq(syncState.key, key))).at(0)?.value ?? null
    const setStateValue = async (key: string, value: string) =>
        db.insert(syncState).values({ key, value }).onConflictDoUpdate({ target: syncState.key, set: { value } })

    const sync: SyncServiceDb = {
        getCursor: async () => Number((await getStateValue(SYNC_STATE_KEY.CURSOR)) ?? '0'),
        saveBatch: async (batch, cursor) => {
            db.transaction((tx) => {
                for (const rows of chunk(batch.handles, INSERT_CHUNK_SIZE)) {
                    tx.insert(handles)
                        .values(rows)
                        .onConflictDoUpdate({
                            target: handles.sourceRowId,
                            set: { address: sql`excluded.address`, service: sql`excluded.service`, syncedAtMs: sql`excluded.synced_at_ms` },
                        })
                        .run()
                }
                for (const rows of chunk(batch.chats, INSERT_CHUNK_SIZE)) {
                    tx.insert(chats)
                        .values(rows)
                        .onConflictDoUpdate({
                            target: chats.sourceRowId,
                            set: {
                                guid: sql`excluded.guid`,
                                identifier: sql`excluded.identifier`,
                                serviceName: sql`excluded.service_name`,
                                displayName: sql`excluded.display_name`,
                                isGroup: sql`excluded.is_group`,
                                syncedAtMs: sql`excluded.synced_at_ms`,
                            },
                        })
                        .run()
                }
                for (const rows of chunk(batch.chatHandles, INSERT_CHUNK_SIZE)) {
                    tx.insert(chatHandles).values(rows).onConflictDoNothing().run()
                }
                for (const rows of chunk(batch.messages, INSERT_CHUNK_SIZE)) {
                    tx.insert(messages)
                        .values(rows)
                        .onConflictDoUpdate({
                            target: messages.sourceRowId,
                            set: {
                                guid: sql`excluded.guid`,
                                chatSourceRowId: sql`excluded.chat_source_row_id`,
                                handleSourceRowId: sql`excluded.handle_source_row_id`,
                                isFromMe: sql`excluded.is_from_me`,
                                text: sql`excluded.text`,
                                service: sql`excluded.service`,
                                sentAtMs: sql`excluded.sent_at_ms`,
                                hasAttachments: sql`excluded.has_attachments`,
                                syncedAtMs: sql`excluded.synced_at_ms`,
                            },
                        })
                        .run()
                }
                for (const rows of chunk(batch.attachments, INSERT_CHUNK_SIZE)) {
                    tx.insert(attachments)
                        .values(rows)
                        .onConflictDoUpdate({
                            target: attachments.sourceRowId,
                            set: {
                                messageSourceRowId: sql`excluded.message_source_row_id`,
                                guid: sql`excluded.guid`,
                                transferName: sql`excluded.transfer_name`,
                                mimeType: sql`excluded.mime_type`,
                                totalBytes: sql`excluded.total_bytes`,
                                sourcePath: sql`excluded.source_path`,
                            },
                        })
                        .run()
                }
                tx.insert(syncState)
                    .values({ key: SYNC_STATE_KEY.CURSOR, value: String(cursor) })
                    .onConflictDoUpdate({ target: syncState.key, set: { value: String(cursor) } })
                    .run()
            })
        },
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

    return { sync, chat, message, attachment }
}
