import { z } from 'zod'

const PASSWORD_MIN_LENGTH = 8
const API_KEY_NAME_MAX_LENGTH = 100

export const panelSetupSchema = z
    .object({
        password: z.string().min(PASSWORD_MIN_LENGTH),
        confirm: z.string(),
    })
    .refine((value) => value.password === value.confirm, { message: 'password and confirm must match' })

export const panelLoginSchema = z.object({
    password: z.string().min(1),
})

export const apiKeyCreateSchema = z.object({
    name: z.string().trim().min(1).max(API_KEY_NAME_MAX_LENGTH),
})

export { PASSWORD_MIN_LENGTH }
