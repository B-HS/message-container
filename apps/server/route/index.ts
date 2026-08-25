import { Hono } from 'hono'

import { createRequireApiKey } from '@/middleware/require-api-key'
import { createAttachmentRoute } from '@/route/attachment'
import { createChatRoute } from '@/route/chat'
import { createKeyRoute } from '@/route/key'
import { createMessageRoute } from '@/route/message'
import { createSyncRoute } from '@/route/sync'

import type { Composed } from '@/compose'

export const createRouter = (composed: Composed) => {
    const api = new Hono()

    api.use('*', createRequireApiKey({ verifyApiKey: composed.authService.verifyApiKey }))
    api.route('/chats', createChatRoute({ chatService: composed.chatService, messageService: composed.messageService }))
    api.route('/messages', createMessageRoute({ messageService: composed.messageService }))
    api.route('/attachments', createAttachmentRoute({ attachmentService: composed.attachmentService }))
    api.route('/sync', createSyncRoute({ syncService: composed.syncService }))
    api.route('/keys', createKeyRoute({ authService: composed.authService }))

    return api
}
