import { z } from 'zod'

const DEFAULT_PORT = 3000
const DEFAULT_SYNC_INTERVAL_MS = 5000
const DEFAULT_SYNC_BATCH_SIZE = 1000

const envSchema = z
    .object({
        DB_PROVIDER: z.enum(['mysql', 'postgres', 'sqlite']).default('mysql'),
        DATABASE_URL: z.string().min(1).optional(),
        SQLITE_PATH: z.string().min(1).default('/data/messages.db'),
        CHAT_DB_PATH: z.string().min(1).default('/host/messages/chat.db'),
        ATTACHMENTS_ROOT: z.string().min(1).default('/host/messages/Attachments'),
        SYNC_INTERVAL_MS: z.coerce.number().int().positive().default(DEFAULT_SYNC_INTERVAL_MS),
        SYNC_BATCH_SIZE: z.coerce.number().int().positive().default(DEFAULT_SYNC_BATCH_SIZE),
        PORT: z.coerce.number().int().positive().default(DEFAULT_PORT),
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    })
    .superRefine((env, ctx) => {
        if (env.DB_PROVIDER !== 'sqlite' && !env.DATABASE_URL) {
            ctx.addIssue({ code: 'custom', path: ['DATABASE_URL'], message: `DATABASE_URL is required when DB_PROVIDER is ${env.DB_PROVIDER}` })
        }
    })

export type Env = z.infer<typeof envSchema>

let cachedEnv: Env | null = null

export const getEnv = () => {
    if (cachedEnv) return cachedEnv
    const result = envSchema.safeParse(process.env)
    if (!result.success) throw new Error(`Missing or invalid env: ${result.error.issues.map((i) => `${i.path.join('.')} (${i.message})`).join(', ')}`)
    cachedEnv = result.data
    return cachedEnv
}
