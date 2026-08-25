import { z } from 'zod'

import { paginationQuerySchema } from '@/dto/common'

export const logLevelSchema = z.enum(['info', 'warn', 'error'])

export const logListQuerySchema = paginationQuerySchema.extend({
    level: logLevelSchema.optional(),
})

export type LogLevel = z.infer<typeof logLevelSchema>
export type LogListQuery = z.infer<typeof logListQuerySchema>
