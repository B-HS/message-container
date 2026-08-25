import { z } from 'zod'

import { PASSWORD_MIN_LENGTH } from '@/dto/panel'

const KEY_NAME_MAX_LENGTH = 100

export const authSetupSchema = z.object({
    password: z.string().min(PASSWORD_MIN_LENGTH),
    keyName: z.string().trim().min(1).max(KEY_NAME_MAX_LENGTH).default('web'),
})

export const authLoginSchema = z.object({
    password: z.string().min(1),
    keyName: z.string().trim().min(1).max(KEY_NAME_MAX_LENGTH).default('web'),
})

export type AuthSetupInput = z.infer<typeof authSetupSchema>
export type AuthLoginInput = z.infer<typeof authLoginSchema>
