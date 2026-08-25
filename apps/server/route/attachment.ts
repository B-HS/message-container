import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'

import { errorResponses, successResponse } from '@/lib/api-response'
import { createAppError } from '@/lib/error'
import { validationHook } from '@/lib/validation-hook'
import { withErrorHandling } from '@/lib/with-error-handling'
import { attachmentListQuerySchema } from '@/dto/attachment'
import { idParamSchema } from '@/dto/common'

import type { AttachmentListQuery } from '@/dto/attachment'
import type { IdParam } from '@/dto/common'
import type { AttachmentService } from '@/service/domain/message/attachment-service'

type AttachmentRouteDeps = {
    attachmentService: AttachmentService
}

const DEFAULT_MIME_TYPE = 'application/octet-stream'

export const createAttachmentRoute = (deps: AttachmentRouteDeps) => {
    const route = new Hono()

    route.get(
        '/',
        describeRoute({ tags: ['Attachment'], summary: '메시지별 첨부 메타데이터 일괄 조회', responses: { 200: { description: '첨부 목록' } } }),
        validator('query', attachmentListQuerySchema, validationHook),
        withErrorHandling(async (c) => {
            const query = c.req.valid('query' as never) as AttachmentListQuery
            return c.json(successResponse({ attachments: await deps.attachmentService.listByMessageIds(query.messageIds) }))
        }),
    )

    route.get(
        '/:id/file',
        describeRoute({
            tags: ['Attachment'],
            summary: '첨부파일 원본 조회',
            responses: {
                200: { description: '첨부파일 바이너리' },
                ...errorResponses(['ATTACHMENT_NOT_FOUND', 'ATTACHMENT_FILE_NOT_FOUND', 'ATTACHMENT_PATH_INVALID']),
            },
        }),
        validator('param', idParamSchema, validationHook),
        withErrorHandling(async (c) => {
            const { id } = c.req.valid('param' as never) as IdParam
            const result = await deps.attachmentService.getFileById(id)
            if (!result) throw createAppError('ATTACHMENT_NOT_FOUND')
            if (!result.filePath) throw createAppError('ATTACHMENT_FILE_NOT_FOUND')
            const file = Bun.file(result.filePath)
            if (!(await file.exists())) throw createAppError('ATTACHMENT_FILE_NOT_FOUND')
            const fileName = result.record.transferName ?? String(result.record.sourceRowId)
            return new Response(file, {
                headers: {
                    'Content-Type': result.record.mimeType ?? DEFAULT_MIME_TYPE,
                    'Content-Disposition': `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`,
                },
            })
        }),
    )

    return route
}
