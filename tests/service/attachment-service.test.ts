import { describe, expect, test } from 'bun:test'

import { isAppError } from '@/lib/error'
import { createAttachmentService } from '@/service/domain/message/attachment-service'

import type { AttachmentRecord, AttachmentServiceDb } from '@/service/domain/message/attachment-service'

const ATTACHMENTS_ROOT = '/host/messages/Attachments'

const buildRecord = (sourcePath: string | null): AttachmentRecord => ({
    sourceRowId: 1,
    messageSourceRowId: 10,
    guid: 'att-guid',
    transferName: 'photo.png',
    mimeType: 'image/png',
    totalBytes: 100,
    sourcePath,
})

const createService = (record: AttachmentRecord | null) => {
    const db: AttachmentServiceDb = { getAttachmentById: async () => record }
    return createAttachmentService({ db, attachmentsRoot: ATTACHMENTS_ROOT })
}

describe('attachmentService.getFileById', () => {
    test('~ 접두 경로를 마운트 루트 경로로 변환한다', async () => {
        const result = await createService(buildRecord('~/Library/Messages/Attachments/ab/cd/photo.png')).getFileById(1)
        expect(result?.filePath).toBe(`${ATTACHMENTS_ROOT}/ab/cd/photo.png`)
    })

    test('절대 경로도 마운트 루트 경로로 변환한다', async () => {
        const result = await createService(buildRecord('/Users/someone/Library/Messages/Attachments/ab/cd/photo.png')).getFileById(1)
        expect(result?.filePath).toBe(`${ATTACHMENTS_ROOT}/ab/cd/photo.png`)
    })

    test('경로 탈출 시도는 ATTACHMENT_PATH_INVALID 로 실패한다', async () => {
        try {
            await createService(buildRecord('~/Library/Messages/Attachments/../../../etc/passwd')).getFileById(1)
            expect.unreachable()
        } catch (error) {
            expect(isAppError(error) && error.code === 'ATTACHMENT_PATH_INVALID').toBe(true)
        }
    })

    test('알 수 없는 경로 형태면 filePath 가 null 이다', async () => {
        const result = await createService(buildRecord('/tmp/outside.png')).getFileById(1)
        expect(result?.filePath).toBeNull()
    })

    test('레코드가 없으면 null 을 반환한다', async () => {
        expect(await createService(null).getFileById(1)).toBeNull()
    })
})
