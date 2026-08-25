import { z } from 'zod'

export const messageSummarySchema = z.object({
    sourceRowId: z.number(),
    guid: z.string(),
    chatSourceRowId: z.number().nullable(),
    senderAddress: z.string().nullable(),
    isFromMe: z.boolean(),
    text: z.string().nullable(),
    service: z.string().nullable(),
    sentAt: z.string(),
    hasAttachments: z.boolean(),
})

export type MessageSummary = z.infer<typeof messageSummarySchema>
