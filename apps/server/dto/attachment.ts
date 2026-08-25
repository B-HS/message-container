import { z } from 'zod'

const MESSAGE_IDS_PATTERN = /^\d+(,\d+)*$/
const MAX_MESSAGE_IDS = 200

export const attachmentListQuerySchema = z.object({
    messageIds: z
        .string()
        .regex(MESSAGE_IDS_PATTERN)
        .transform((value) => value.split(',').map(Number))
        .refine((ids) => ids.length <= MAX_MESSAGE_IDS),
})

export type AttachmentListQuery = z.infer<typeof attachmentListQuerySchema>
