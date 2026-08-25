import { describe, expect, test } from 'bun:test'

import { API_KEY_PREFIX, createAuthService } from '@/service/domain/auth/auth-service'

import type { ApiKeyRecord, AuthServiceDb } from '@/service/domain/auth/auth-service'

const FAILED_LOGIN_ATTEMPTS_TO_LOCK = 5
const API_KEY_START_VISIBLE_LENGTH = 8
const SHA256_HEX_LENGTH = 64

const createStubDb = () => {
    const authState = new Map<string, string>()
    const apiKeys: (ApiKeyRecord & { keyHash: string })[] = []
    const touchedApiKeyIds: number[] = []
    let nextId = 1

    const db: AuthServiceDb = {
        getAuthState: async (key) => authState.get(key) ?? null,
        setAuthState: async (key, value) => {
            authState.set(key, value)
        },
        insertApiKey: async ({ name, start, keyHash, createdAtMs }) => {
            const id = nextId
            nextId += 1
            apiKeys.push({ id, name, start, keyHash, createdAtMs, lastUsedAtMs: null, revokedAtMs: null })
            return { id }
        },
        getApiKeyByHash: async (keyHash) => apiKeys.find((row) => row.keyHash === keyHash) ?? null,
        listApiKeys: async () => apiKeys.map(({ keyHash: _keyHash, ...record }) => record),
        revokeApiKey: async (id, atMs) => {
            const row = apiKeys.find((candidate) => candidate.id === id)
            if (row) row.revokedAtMs = atMs
        },
        touchApiKey: async (id, atMs) => {
            touchedApiKeyIds.push(id)
            const row = apiKeys.find((candidate) => candidate.id === id)
            if (row) row.lastUsedAtMs = atMs
        },
    }

    return { db, authState, apiKeys, touchedApiKeyIds }
}

describe('authService.setupPassword', () => {
    test('최초 설정은 true 를 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })

        expect(await service.setupPassword('correct-horse')).toBe(true)
    })

    test('이미 설정돼 있으면 false 를 반환하고 해시가 바뀌지 않는다', async () => {
        const { db, authState } = createStubDb()
        const service = createAuthService({ db })

        await service.setupPassword('correct-horse')
        const originalHash = authState.get('password_hash')

        expect(await service.setupPassword('another-password')).toBe(false)
        expect(authState.get('password_hash')).toBe(originalHash)
    })
})

describe('authService.verifyPassword', () => {
    test('올바른 패스워드는 ok 를 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })
        await service.setupPassword('correct-horse')

        expect(await service.verifyPassword('correct-horse')).toBe('ok')
    })

    test('틀린 패스워드는 invalid 를 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })
        await service.setupPassword('correct-horse')

        expect(await service.verifyPassword('wrong-password')).toBe('invalid')
    })

    test('5회 연속 실패하면 locked 를 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })
        await service.setupPassword('correct-horse')

        for (let attempt = 0; attempt < FAILED_LOGIN_ATTEMPTS_TO_LOCK; attempt += 1) {
            await service.verifyPassword('wrong-password')
        }

        expect(await service.verifyPassword('correct-horse')).toBe('locked')
    })
})

describe('authService 세션', () => {
    test('createSession 토큰으로 validateSession 은 true 를 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })

        const token = service.createSession()

        expect(service.validateSession(token)).toBe(true)
    })

    test('모르는 토큰은 false 를 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })

        expect(service.validateSession('unknown-token')).toBe(false)
    })

    test('revokeSession 이후에는 false 를 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })

        const token = service.createSession()
        service.revokeSession(token)

        expect(service.validateSession(token)).toBe(false)
    })
})

describe('authService.createApiKey', () => {
    test('msg_ 로 시작하는 키를 반환하고 start/keyHash 를 db 에 저장한다', async () => {
        const { db, apiKeys } = createStubDb()
        const service = createAuthService({ db })

        const result = await service.createApiKey('내 키')

        expect(result.key.startsWith(API_KEY_PREFIX)).toBe(true)
        expect(result.start).toBe(result.key.slice(0, API_KEY_START_VISIBLE_LENGTH))
        expect(apiKeys[0]?.keyHash).not.toBe(result.key)
        expect(apiKeys[0]?.keyHash).toMatch(/^[0-9a-f]{64}$/)
        expect(apiKeys[0]?.keyHash.length).toBe(SHA256_HEX_LENGTH)
    })
})

describe('authService.verifyApiKey', () => {
    test('발급한 원문 키로 id/name 을 반환하고 touchApiKey 를 호출한다', async () => {
        const { db, touchedApiKeyIds } = createStubDb()
        const service = createAuthService({ db })
        const { id, name, key } = await service.createApiKey('내 키')

        const result = await service.verifyApiKey(key)

        expect(result).toEqual({ id, name })
        expect(touchedApiKeyIds).toEqual([id])
    })

    test('폐기된 키는 null 을 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })
        const { id, key } = await service.createApiKey('내 키')
        await service.revokeApiKey(id)

        expect(await service.verifyApiKey(key)).toBeNull()
    })

    test('msg_ prefix 가 아니면 null 을 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })

        expect(await service.verifyApiKey('other_abcdef')).toBeNull()
    })

    test('존재하지 않는 키는 null 을 반환한다', async () => {
        const { db } = createStubDb()
        const service = createAuthService({ db })

        expect(await service.verifyApiKey(`${API_KEY_PREFIX}does-not-exist`)).toBeNull()
    })
})
