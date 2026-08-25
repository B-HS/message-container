import { z } from 'zod'

export const chatParticipantSchema = z.object({ address: z.string(), service: z.string().nullable() })

export const chatSummarySchema = z.object({
    sourceRowId: z.number(),
    guid: z.string(),
    identifier: z.string().nullable(),
    serviceNames: z.array(z.string()),
    displayName: z.string().nullable(),
    isGroup: z.boolean(),
    chatIds: z.array(z.number()),
    participants: z.array(chatParticipantSchema),
    messageCount: z.number(),
    lastMessageText: z.string().nullable(),
    lastMessageAt: z.string().nullable(),
})

export type ChatSummary = z.infer<typeof chatSummarySchema>
