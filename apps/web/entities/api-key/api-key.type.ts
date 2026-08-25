import { z } from 'zod'

export const apiKeyRecordSchema = z.object({
    id: z.number(),
    name: z.string(),
    start: z.string(),
    createdAtMs: z.number(),
    lastUsedAtMs: z.number().nullable(),
    revokedAtMs: z.number().nullable(),
})

export const createdApiKeySchema = z.object({
    id: z.number(),
    name: z.string(),
    start: z.string(),
    key: z.string(),
})

export type ApiKeyRecord = z.infer<typeof apiKeyRecordSchema>
export type CreatedApiKey = z.infer<typeof createdApiKeySchema>
