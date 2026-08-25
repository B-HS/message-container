import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'

import { errorResponses, successResponse } from '@/lib/api-response'
import { withErrorHandling } from '@/lib/with-error-handling'

import type { SyncService } from '@/service/domain/message/sync-service'

type SyncRouteDeps = {
    syncService: SyncService
}

export const createSyncRoute = (deps: SyncRouteDeps) => {
    const route = new Hono()

    route.get(
        '/status',
        describeRoute({ tags: ['Sync'], summary: '동기화 상태 조회', responses: { 200: { description: '동기화 상태' } } }),
        withErrorHandling(async (c) => c.json(successResponse(await deps.syncService.status()))),
    )

    route.post(
        '/run',
        describeRoute({
            tags: ['Sync'],
            summary: '동기화 즉시 실행',
            responses: { 200: { description: '동기화 결과' }, ...errorResponses(['SYNC_SOURCE_UNAVAILABLE']) },
        }),
        withErrorHandling(async (c) => c.json(successResponse(await deps.syncService.runOnce()))),
    )

    return route
}
