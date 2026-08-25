import { z } from 'zod'

export const successEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({ success: z.literal(true), data: dataSchema })

export const paginatedEnvelopeSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        success: z.literal(true),
        data: z.array(itemSchema),
        pagination: z.object({ page: z.number(), limit: z.number(), total: z.number(), totalPages: z.number() }),
    })
