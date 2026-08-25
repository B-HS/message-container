import { Database } from 'bun:sqlite'
import { z } from 'zod'

import { NANOSECOND_DETECTION_THRESHOLD } from '@/lib/apple-time'
import { createAppError } from '@/lib/error'

const GROUP_CHAT_STYLE = 43

const rawMessageSchema = z.object({
    row_id: z.number().int(),
    guid: z.string(),
    text: z.string().nullable(),
    attributed_body: z.instanceof(Uint8Array).nullable(),
    handle_row_id: z.number().int().nullable(),
    is_from_me: z.number().nullable(),
    ms_since_apple_epoch: z.number().nullable(),
    service: z.string().nullable(),
    has_attachments: z.number().nullable(),
    chat_row_id: z.number().int().nullable(),
    is_read: z.number().nullable(),
    ms_since_apple_epoch_read: z.number().nullable(),
    associated_message_guid: z.string().nullable(),
    associated_message_type: z.number().int().nullable(),
})

const rawChatSchema = z.object({
    row_id: z.number().int(),
    guid: z.string(),
    identifier: z.string().nullable(),
    service_name: z.string().nullable(),
    display_name: z.string().nullable(),
    style: z.number().nullable(),
})

const rawChatHandleSchema = z.object({
    chat_row_id: z.number().int(),
    handle_row_id: z.number().int(),
})

const rawHandleSchema = z.object({
    row_id: z.number().int(),
    address: z.string(),
    service: z.string().nullable(),
})

const rawAttachmentSchema = z.object({
    row_id: z.number().int(),
    message_row_id: z.number().int(),
    guid: z.string().nullable(),
    transfer_name: z.string().nullable(),
    mime_type: z.string().nullable(),
    total_bytes: z.number().nullable(),
    source_path: z.string().nullable(),
})

const placeholders = (length: number) => Array.from({ length }, () => '?').join(', ')

const buildBatch = (db: Database, afterRowId: number, limit: number) => {
    const rawMessages = z.array(rawMessageSchema).parse(
        db
            .query(
                `SELECT m.ROWID AS row_id, m.guid AS guid, m.text AS text, m.attributedBody AS attributed_body,
                    NULLIF(m.handle_id, 0) AS handle_row_id, m.is_from_me AS is_from_me,
                    CAST(CASE WHEN m.date > ${NANOSECOND_DETECTION_THRESHOLD} THEN m.date / 1000000 ELSE m.date * 1000 END AS INTEGER) AS ms_since_apple_epoch,
                    m.service AS service, m.cache_has_attachments AS has_attachments,
                    (SELECT cmj.chat_id FROM chat_message_join cmj WHERE cmj.message_id = m.ROWID ORDER BY cmj.chat_id LIMIT 1) AS chat_row_id,
                    m.is_read AS is_read,
                    CAST(CASE WHEN NULLIF(m.date_read, 0) IS NULL THEN NULL
                        WHEN m.date_read > ${NANOSECOND_DETECTION_THRESHOLD} THEN m.date_read / 1000000
                        ELSE m.date_read * 1000 END AS INTEGER) AS ms_since_apple_epoch_read,
                    m.associated_message_guid AS associated_message_guid, m.associated_message_type AS associated_message_type
                FROM message m
                WHERE m.ROWID > ?
                ORDER BY m.ROWID ASC
                LIMIT ?`,
            )
            .all(afterRowId, limit),
    )

    const chatIds = [...new Set(rawMessages.flatMap((m) => (m.chat_row_id === null ? [] : [m.chat_row_id])))]
    const messageIds = rawMessages.map((m) => m.row_id)

    const rawChats =
        chatIds.length === 0
            ? []
            : z.array(rawChatSchema).parse(
                  db
                      .query(
                          `SELECT c.ROWID AS row_id, c.guid AS guid, c.chat_identifier AS identifier,
                              c.service_name AS service_name, c.display_name AS display_name, c.style AS style
                          FROM chat c WHERE c.ROWID IN (${placeholders(chatIds.length)})`,
                      )
                      .all(...chatIds),
              )

    const rawChatHandles =
        chatIds.length === 0
            ? []
            : z.array(rawChatHandleSchema).parse(
                  db
                      .query(
                          `SELECT chj.chat_id AS chat_row_id, chj.handle_id AS handle_row_id
                          FROM chat_handle_join chj WHERE chj.chat_id IN (${placeholders(chatIds.length)})`,
                      )
                      .all(...chatIds),
              )

    const handleIds = [
        ...new Set([
            ...rawMessages.flatMap((m) => (m.handle_row_id === null ? [] : [m.handle_row_id])),
            ...rawChatHandles.map((ch) => ch.handle_row_id),
        ]),
    ]

    const rawHandles =
        handleIds.length === 0
            ? []
            : z
                  .array(rawHandleSchema)
                  .parse(
                      db
                          .query(
                              `SELECT h.ROWID AS row_id, h.id AS address, h.service AS service FROM handle h WHERE h.ROWID IN (${placeholders(handleIds.length)})`,
                          )
                          .all(...handleIds),
                  )

    const rawAttachments =
        messageIds.length === 0
            ? []
            : z.array(rawAttachmentSchema).parse(
                  db
                      .query(
                          `SELECT a.ROWID AS row_id, maj.message_id AS message_row_id, a.guid AS guid, a.transfer_name AS transfer_name,
                              a.mime_type AS mime_type, a.total_bytes AS total_bytes, a.filename AS source_path
                          FROM message_attachment_join maj
                          JOIN attachment a ON a.ROWID = maj.attachment_id
                          WHERE maj.message_id IN (${placeholders(messageIds.length)})`,
                      )
                      .all(...messageIds),
              )

    return {
        messages: rawMessages.map((m) => ({
            rowId: m.row_id,
            guid: m.guid,
            text: m.text,
            attributedBody: m.attributed_body,
            handleRowId: m.handle_row_id,
            isFromMe: m.is_from_me === 1,
            msSinceAppleEpoch: m.ms_since_apple_epoch ?? 0,
            service: m.service,
            hasAttachments: m.has_attachments === 1,
            chatRowId: m.chat_row_id,
            isRead: m.is_read === 1,
            msSinceAppleEpochRead: m.ms_since_apple_epoch_read,
            associatedMessageGuid: m.associated_message_guid,
            associatedMessageType: m.associated_message_type,
        })),
        chats: rawChats.map((c) => ({
            rowId: c.row_id,
            guid: c.guid,
            identifier: c.identifier,
            serviceName: c.service_name,
            displayName: c.display_name,
            isGroup: c.style === GROUP_CHAT_STYLE,
        })),
        chatHandles: rawChatHandles.map((ch) => ({ chatRowId: ch.chat_row_id, handleRowId: ch.handle_row_id })),
        handles: rawHandles.map((h) => ({ rowId: h.row_id, address: h.address, service: h.service })),
        attachments: rawAttachments.map((a) => ({
            rowId: a.row_id,
            messageRowId: a.message_row_id,
            guid: a.guid,
            transferName: a.transfer_name,
            mimeType: a.mime_type,
            totalBytes: a.total_bytes,
            sourcePath: a.source_path,
        })),
    }
}

type ChatDbReaderDeps = {
    chatDbPath: string
}

export const createChatDbReader = ({ chatDbPath }: ChatDbReaderDeps) => ({
    readBatch: (afterRowId: number, limit: number) => {
        try {
            const db = new Database(chatDbPath, { readonly: true })
            try {
                return buildBatch(db, afterRowId, limit)
            } finally {
                db.close()
            }
        } catch (error) {
            throw createAppError('SYNC_SOURCE_UNAVAILABLE', { reason: error instanceof Error ? error.message : String(error) })
        }
    },
})

export type ChatDbReader = ReturnType<typeof createChatDbReader>
export type ChatDbBatch = ReturnType<ChatDbReader['readBatch']>
