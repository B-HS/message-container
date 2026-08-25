import { z } from 'zod'

export const attachmentMetaSchema = z.object({
    sourceRowId: z.number(),
    messageSourceRowId: z.number(),
    guid: z.string().nullable(),
    transferName: z.string().nullable(),
    mimeType: z.string().nullable(),
    totalBytes: z.number().nullable(),
})

export type AttachmentMeta = z.infer<typeof attachmentMetaSchema>
