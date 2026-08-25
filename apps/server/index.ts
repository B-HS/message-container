import { Hono } from 'hono'
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
