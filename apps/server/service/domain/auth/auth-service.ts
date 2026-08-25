export type ApiKeyRecord = {
    id: number
    name: string
    start: string
    createdAtMs: number
    lastUsedAtMs: number | null
    revokedAtMs: number | null
}

export type AuthServiceDb = {
    getAuthState: (key: string) => Promise<string | null>
    setAuthState: (key: string, value: string) => Promise<void>
    insertApiKey: (row: { name: string; start: string; keyHash: string; createdAtMs: number }) => Promise<{ id: number }>
    getApiKeyByHash: (keyHash: string) => Promise<ApiKeyRecord | null>
    listApiKeys: () => Promise<ApiKeyRecord[]>
    revokeApiKey: (id: number, atMs: number) => Promise<void>
    touchApiKey: (id: number, atMs: number) => Promise<void>
}

type AuthServiceDeps = {
    db: AuthServiceDb
}

export const API_KEY_PREFIX = 'msg_'

const PASSWORD_HASH_STATE_KEY = 'password_hash'
const API_KEY_RANDOM_BYTES = 32
const API_KEY_START_VISIBLE_LENGTH = 8
const SESSION_TOKEN_BYTES = 32
const SESSION_TTL_MS = 12 * 60 * 60 * 1000
const MAX_LOGIN_ATTEMPTS = 5
const LOGIN_LOCKOUT_MS = 30_000

const randomToken = (bytes: number) => Buffer.from(crypto.getRandomValues(new Uint8Array(bytes))).toString('base64url')

const sha256Hex = (value: string) => new Bun.CryptoHasher('sha256').update(value).digest('hex')

export const createAuthService = (deps: AuthServiceDeps) => {
    const sessions = new Map<string, number>()
    let failedLoginAttempts = 0
    let loginLockedUntilMs = 0

    return {
        isPasswordSet: async () => (await deps.db.getAuthState(PASSWORD_HASH_STATE_KEY)) !== null,
        setupPassword: async (password: string) => {
            if (await deps.db.getAuthState(PASSWORD_HASH_STATE_KEY)) return false
            await deps.db.setAuthState(PASSWORD_HASH_STATE_KEY, await Bun.password.hash(password))
            return true
        },
        verifyPassword: async (password: string) => {
            if (Date.now() < loginLockedUntilMs) return 'locked' as const
            const passwordHash = await deps.db.getAuthState(PASSWORD_HASH_STATE_KEY)
            if (!passwordHash || !(await Bun.password.verify(password, passwordHash))) {
                failedLoginAttempts += 1
                if (failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
                    loginLockedUntilMs = Date.now() + LOGIN_LOCKOUT_MS
                    failedLoginAttempts = 0
                }
                return 'invalid' as const
            }
            failedLoginAttempts = 0
            return 'ok' as const
        },
        createSession: () => {
            const token = randomToken(SESSION_TOKEN_BYTES)
            sessions.set(token, Date.now() + SESSION_TTL_MS)
            return token
        },
        validateSession: (token: string | undefined) => {
            if (!token) return false
            const expiresAtMs = sessions.get(token)
            if (!expiresAtMs) return false
            if (Date.now() > expiresAtMs) {
                sessions.delete(token)
                return false
            }
            return true
        },
        revokeSession: (token: string | undefined) => {
            if (token) sessions.delete(token)
        },
        createApiKey: async (name: string) => {
            const key = `${API_KEY_PREFIX}${randomToken(API_KEY_RANDOM_BYTES)}`
            const start = key.slice(0, API_KEY_START_VISIBLE_LENGTH)
            const { id } = await deps.db.insertApiKey({ name, start, keyHash: sha256Hex(key), createdAtMs: Date.now() })
            return { id, name, start, key }
        },
        listApiKeys: async () => deps.db.listApiKeys(),
        revokeApiKey: async (id: number) => deps.db.revokeApiKey(id, Date.now()),
        verifyApiKey: async (key: string) => {
            if (!key.startsWith(API_KEY_PREFIX)) return null
            const record = await deps.db.getApiKeyByHash(sha256Hex(key))
            if (!record || record.revokedAtMs !== null) return null
            await deps.db.touchApiKey(record.id, Date.now())
            return { id: record.id, name: record.name }
        },
    }
}

export type AuthService = ReturnType<typeof createAuthService>
