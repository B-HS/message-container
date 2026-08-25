import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { openAPIRouteHandler } from 'hono-openapi'

import { compose } from '@/compose'
import { createDbClient, runMigrations } from '@/db'
import { getEnv } from '@/lib/env'
import { createRouter } from '@/route'
import { createAuthRoute } from '@/route/auth'
import { createMcpRoute } from '@/route/mcp'
import { createPanelRoute } from '@/route/panel'

const env = getEnv()
const client = createDbClient(env)
await runMigrations(client)

const composed = compose({ env, client })

const app = new Hono()
app.use('*', secureHeaders())
if (env.CORS_ALLOWED_ORIGINS && env.CORS_ALLOWED_ORIGINS.length > 0) {
    const corsMiddleware = cors({
        origin: env.CORS_ALLOWED_ORIGINS,
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Authorization', 'Content-Type'],
        maxAge: 600,
    })
    app.use('/api/*', corsMiddleware)
    app.use('/mcp', corsMiddleware)
}
app.get('/', (c) => c.redirect('/panel'))
app.route('/panel', createPanelRoute({ authService: composed.authService }))
app.route('/mcp', createMcpRoute(composed))
app.route('/api/auth', createAuthRoute({ authService: composed.authService }))
app.route('/api', createRouter(composed))

app.get(
    '/openapi.json',
    openAPIRouteHandler(app, {
        documentation: {
            info: {
                title: 'message-container API',
                version: '0.1.0',
                description: 'macOS Messages(chat.db) 조회 API. 모든 /api/* 경로는 Bearer API 키(msg_ prefix)가 필요하다. 키는 /panel 에서 발급한다.',
            },
            components: {
                securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', description: 'msg_ prefix API key issued from /panel' } },
            },
            security: [{ bearerAuth: [] }],
        },
    }),
)

let isSyncRunning = false
const runSyncTick = async () => {
    if (isSyncRunning) return
    isSyncRunning = true
    try {
        await composed.syncService.runOnce()
    } catch (error) {
        const reason = error instanceof Error ? error.message : JSON.stringify(error)
        console.error('[sync]', reason)
        await composed.syncService.recordError(reason)
    } finally {
        isSyncRunning = false
    }
}

void runSyncTick()
setInterval(() => void runSyncTick(), env.SYNC_INTERVAL_MS)

export default {
    port: env.PORT,
    fetch: app.fetch,
}
