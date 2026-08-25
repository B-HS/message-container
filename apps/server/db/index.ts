import { drizzle as drizzleBunSqlite } from 'drizzle-orm/bun-sqlite'
import { migrate as migrateSqlite } from 'drizzle-orm/bun-sqlite/migrator'
import { drizzle as drizzleBunSqlPg } from 'drizzle-orm/bun-sql'
import { migrate as migratePg } from 'drizzle-orm/bun-sql/migrator'
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2'
import { migrate as migrateMysql } from 'drizzle-orm/mysql2/migrator'

import { createAppError } from '@/lib/error'

import type { Env } from '@/lib/env'

const MIGRATIONS_ROOT = new URL('../drizzle/', import.meta.url).pathname

const MIGRATIONS_FOLDER = {
    mysql: `${MIGRATIONS_ROOT}mysql`,
    postgres: `${MIGRATIONS_ROOT}pg`,
    sqlite: `${MIGRATIONS_ROOT}sqlite`,
} as const

type DbEnv = Pick<Env, 'DB_PROVIDER' | 'DATABASE_URL' | 'SQLITE_PATH'>

const requireDatabaseUrl = (env: DbEnv) => {
    if (!env.DATABASE_URL) throw createAppError('INTERNAL_ERROR', { reason: `DATABASE_URL is required when DB_PROVIDER is ${env.DB_PROVIDER}` })
    return env.DATABASE_URL
}

export const createDbClient = (env: DbEnv) => {
    if (env.DB_PROVIDER === 'sqlite') return { provider: 'sqlite', db: drizzleBunSqlite(env.SQLITE_PATH) } as const
    if (env.DB_PROVIDER === 'postgres') return { provider: 'postgres', db: drizzleBunSqlPg(requireDatabaseUrl(env)) } as const
    return { provider: 'mysql', db: drizzleMysql(requireDatabaseUrl(env)) } as const
}

export type DbClient = ReturnType<typeof createDbClient>

export const runMigrations = async (client: DbClient) => {
    if (client.provider === 'sqlite') return migrateSqlite(client.db, { migrationsFolder: MIGRATIONS_FOLDER.sqlite })
    if (client.provider === 'postgres') return migratePg(client.db, { migrationsFolder: MIGRATIONS_FOLDER.postgres })
    return migrateMysql(client.db, { migrationsFolder: MIGRATIONS_FOLDER.mysql })
}
