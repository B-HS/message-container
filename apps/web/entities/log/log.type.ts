import { z } from 'zod'

export const logLevelSchema = z.enum(['info', 'warn', 'error'])

export const logEntrySchema = z.object({
    id: z.number(),
    level: z.string(),
    event: z.string(),
    message: z.string(),
    detailsJson: z.string().nullable(),
    createdAt: z.string(),
})

export type LogLevel = z.infer<typeof logLevelSchema>
export type LogEntry = z.infer<typeof logEntrySchema>
