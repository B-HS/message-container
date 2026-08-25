import { Hono } from 'hono'
import { openAPIRouteHandler } from 'hono-openapi'

import { compose } from '@/compose'
import { createDbClient, runMigrations } from '@/db'
import { getEnv } from '@/lib/env'
import { createRouter } from '@/route'

const env = getEnv()
const client = createDbClient(env)
await runMigrations(client)

const composed = compose({ env, client })

const app = new Hono()
app.route('/api', createRouter(composed))

if (env.NODE_ENV !== 'production') {
    app.get('/openapi.json', openAPIRouteHandler(app, { documentation: { info: { title: 'message-container API', version: '0.1.0' } } }))
}

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
