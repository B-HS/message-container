import { Hono } from 'hono'

import { createRequireApiKey } from '@/middleware/require-api-key'
import { createAttachmentRoute } from '@/route/attachment'
import { createChatRoute } from '@/route/chat'
import { createKeyRoute } from '@/route/key'
import { createLogRoute } from '@/route/log'
import { createMessageRoute } from '@/route/message'
import { createSyncRoute } from '@/route/sync'

import type { Composed } from '@/compose'

export const createRouter = (composed: Composed) => {
    const api = new Hono()

    api.use('*', async (c, next) => {
        await next()
        if (c.res.status === 500) {
            await composed.logService.record({
                level: 'error',
                event: 'api.unhandled',
                message: `${c.req.method} ${c.req.path} 처리 중 예기치 못한 오류`,
            })
        }
    })
    api.use('*', createRequireApiKey({ verifyApiKey: composed.authService.verifyApiKey }))
    api.route('/chats', createChatRoute({ chatService: composed.chatService, messageService: composed.messageService }))
    api.route('/messages', createMessageRoute({ messageService: composed.messageService }))
    api.route('/attachments', createAttachmentRoute({ attachmentService: composed.attachmentService }))
    api.route('/sync', createSyncRoute({ syncService: composed.syncService }))
    api.route('/keys', createKeyRoute({ authService: composed.authService }))
    api.route('/logs', createLogRoute({ logService: composed.logService }))

    return api
}
