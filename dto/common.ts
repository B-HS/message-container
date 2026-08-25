import { z } from 'zod'

const DEFAULT_PAGE_LIMIT = 20
const MAX_PAGE_LIMIT = 100

export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(MAX_PAGE_LIMIT).default(DEFAULT_PAGE_LIMIT),
})

export const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
})

export type PaginationQuery = z.infer<typeof paginationQuerySchema>
export type IdParam = z.infer<typeof idParamSchema>
