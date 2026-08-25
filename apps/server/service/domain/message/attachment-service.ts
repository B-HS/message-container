import { resolve, sep } from 'node:path'

import { createAppError } from '@/lib/error'

export type AttachmentRecord = {
    sourceRowId: number
    messageSourceRowId: number
    guid: string | null
    transferName: string | null
    mimeType: string | null
    totalBytes: number | null
    sourcePath: string | null
}

export type AttachmentServiceDb = {
    getAttachmentById: (id: number) => Promise<AttachmentRecord | null>
    getAttachmentsByMessageIds: (messageIds: number[]) => Promise<AttachmentRecord[]>
}

type AttachmentServiceDeps = {
    db: AttachmentServiceDb
    attachmentsRoot: string
}

const HOME_ATTACHMENTS_PREFIX = '~/Library/Messages/Attachments/'
const ABSOLUTE_ATTACHMENTS_MARKER = '/Library/Messages/Attachments/'

const toRelativeSourcePath = (sourcePath: string) => {
    if (sourcePath.startsWith(HOME_ATTACHMENTS_PREFIX)) return sourcePath.slice(HOME_ATTACHMENTS_PREFIX.length)
    const markerIndex = sourcePath.indexOf(ABSOLUTE_ATTACHMENTS_MARKER)
    if (markerIndex === -1) return null
    return sourcePath.slice(markerIndex + ABSOLUTE_ATTACHMENTS_MARKER.length)
}

export const createAttachmentService = (deps: AttachmentServiceDeps) => ({
    listByMessageIds: async (messageIds: number[]) =>
        (await deps.db.getAttachmentsByMessageIds(messageIds)).map(({ sourcePath, ...record }) => record),
    getFileById: async (id: number) => {
        const record = await deps.db.getAttachmentById(id)
        if (!record) return null
        if (!record.sourcePath) return { record, filePath: null }
        const relativePath = toRelativeSourcePath(record.sourcePath)
        if (!relativePath) return { record, filePath: null }
        const root = resolve(deps.attachmentsRoot)
        const filePath = resolve(root, relativePath)
        if (!filePath.startsWith(root + sep)) throw createAppError('ATTACHMENT_PATH_INVALID', { sourcePath: record.sourcePath })
        return { record, filePath }
    },
})

export type AttachmentService = ReturnType<typeof createAttachmentService>
