import { z } from 'zod'

import { paginationQuerySchema } from '@/dto/common'

export const messageListQuerySchema = paginationQuerySchema.extend({
    q: z.string().min(1).optional(),
})

export type MessageListQuery = z.infer<typeof messageListQuerySchema>
