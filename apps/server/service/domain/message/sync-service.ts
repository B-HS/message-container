import { appleEpochMsToUtcMs } from '@/lib/apple-time'
import { extractTypedstreamText } from '@/lib/typedstream'

import type { LogService } from '@/service/domain/log/log-service'
import type { ChatDbBatch } from '@/service/shared/chat-db-reader'

export type SyncChatRow = {
    sourceRowId: number
    guid: string
    identifier: string | null
    serviceName: string | null
    displayName: string | null
    isGroup: boolean
    syncedAtMs: number
}

export type SyncHandleRow = {
    sourceRowId: number
    address: string
    service: string | null
    syncedAtMs: number
}

export type SyncChatHandleRow = {
    chatSourceRowId: number
    handleSourceRowId: number
}

export type SyncMessageRow = {
    sourceRowId: number
    guid: string
    chatSourceRowId: number | null
    handleSourceRowId: number | null
    isFromMe: boolean
    text: string | null
    service: string | null
    sentAtMs: number
    hasAttachments: boolean
    isRead: boolean
    dateReadMs: number | null
    associatedMessageGuid: string | null
    associatedMessageType: number | null
    syncedAtMs: number
}

export type SyncAttachmentRow = {
    sourceRowId: number
    messageSourceRowId: number
    guid: string | null
    transferName: string | null
    mimeType: string | null
    totalBytes: number | null
    sourcePath: string | null
}

export type SyncBatch = {
    chats: SyncChatRow[]
    handles: SyncHandleRow[]
    chatHandles: SyncChatHandleRow[]
    messages: SyncMessageRow[]
    attachments: SyncAttachmentRow[]
}

export type SyncCounts = {
    chats: number
    messages: number
    attachments: number
}

export type SyncServiceDb = {
    getCursor: () => Promise<number>
    saveBatch: (batch: SyncBatch, cursor: number) => Promise<void>
    markSynced: (atMs: number) => Promise<void>
    setLastError: (message: string | null) => Promise<void>
    getStatus: () => Promise<{ cursor: number; lastSyncAtMs: number | null; lastErrorMessage: string | null; counts: SyncCounts }>
}

type SyncSource = {
    readBatch: (afterRowId: number, limit: number) => ChatDbBatch
}

type SyncServiceDeps = {
    db: SyncServiceDb
    source: SyncSource
    batchSize: number
    log: Pick<LogService, 'record'>
}

const emptyToNull = (value: string | null) => (value === null || value === '' ? null : value)

const normalizeBatch = (raw: ChatDbBatch, syncedAtMs: number): SyncBatch => ({
    chats: raw.chats.map((c) => ({
        sourceRowId: c.rowId,
        guid: c.guid,
        identifier: emptyToNull(c.identifier),
        serviceName: emptyToNull(c.serviceName),
        displayName: emptyToNull(c.displayName),
        isGroup: c.isGroup,
        syncedAtMs,
    })),
    handles: raw.handles.map((h) => ({ sourceRowId: h.rowId, address: h.address, service: h.service, syncedAtMs })),
    chatHandles: raw.chatHandles.map((ch) => ({ chatSourceRowId: ch.chatRowId, handleSourceRowId: ch.handleRowId })),
    messages: raw.messages.map((m) => ({
        sourceRowId: m.rowId,
        guid: m.guid,
        chatSourceRowId: m.chatRowId,
        handleSourceRowId: m.handleRowId,
        isFromMe: m.isFromMe,
        text: m.text && m.text.length > 0 ? m.text : extractTypedstreamText(m.attributedBody),
        service: m.service,
        sentAtMs: appleEpochMsToUtcMs(m.msSinceAppleEpoch),
        hasAttachments: m.hasAttachments,
        isRead: m.isRead,
        dateReadMs: m.msSinceAppleEpochRead === null ? null : appleEpochMsToUtcMs(m.msSinceAppleEpochRead),
        associatedMessageGuid: emptyToNull(m.associatedMessageGuid),
        associatedMessageType: m.associatedMessageType === 0 ? null : m.associatedMessageType,
        syncedAtMs,
    })),
    attachments: raw.attachments.map((a) => ({
        sourceRowId: a.rowId,
        messageSourceRowId: a.messageRowId,
        guid: a.guid,
        transferName: a.transferName,
        mimeType: a.mimeType,
        totalBytes: a.totalBytes,
        sourcePath: a.sourcePath,
    })),
})

export const RESCAN_WINDOW_ROWS = 500

export const createSyncService = (deps: SyncServiceDeps) => ({
    runOnce: async () => {
        let synced = 0
        while (true) {
            const cursor = await deps.db.getCursor()
            const raw = deps.source.readBatch(cursor, deps.batchSize)
            const lastMessage = raw.messages.at(-1)
            if (!lastMessage) break
            await deps.db.saveBatch(normalizeBatch(raw, Date.now()), lastMessage.rowId)
            synced += raw.messages.length
            if (raw.messages.length < deps.batchSize) break
        }
        const cursor = await deps.db.getCursor()
        if (cursor > 0) {
            const rescan = deps.source.readBatch(Math.max(0, cursor - RESCAN_WINDOW_ROWS), RESCAN_WINDOW_ROWS)
            if (rescan.messages.length > 0) await deps.db.saveBatch(normalizeBatch(rescan, Date.now()), cursor)
        }
        await deps.db.markSynced(Date.now())
        await deps.db.setLastError(null)
        if (synced > 0) await deps.log.record({ level: 'info', event: 'sync.batch', message: `메시지 ${synced}건 동기화`, details: { synced } })
        return { synced }
    },
    recordError: async (message: string) => deps.db.setLastError(message),
    status: async () => {
        const { cursor, lastSyncAtMs, lastErrorMessage, counts } = await deps.db.getStatus()
        return {
            cursor,
            lastSyncAt: lastSyncAtMs === null ? null : new Date(lastSyncAtMs).toISOString(),
            lastError: lastErrorMessage,
            counts,
        }
    },
})

export type SyncService = ReturnType<typeof createSyncService>
