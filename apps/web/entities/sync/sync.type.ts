import { z } from 'zod'

export const syncStatusSchema = z.object({
    cursor: z.number(),
    lastSyncAt: z.string().nullable(),
    lastError: z.string().nullable(),
    counts: z.object({ chats: z.number(), messages: z.number(), attachments: z.number() }),
})

export type SyncStatus = z.infer<typeof syncStatusSchema>
