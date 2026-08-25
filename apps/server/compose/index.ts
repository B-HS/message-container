import { createMysqlServiceDb } from '@/compose/provider/mysql'
import { createPgServiceDb } from '@/compose/provider/pg'
import { createSqliteServiceDb } from '@/compose/provider/sqlite'
import { createAuthService } from '@/service/domain/auth/auth-service'
import { createLogService } from '@/service/domain/log/log-service'
import { createAttachmentService } from '@/service/domain/message/attachment-service'
import { createChatService } from '@/service/domain/message/chat-service'
import { createMessageService } from '@/service/domain/message/message-service'
import { createSyncService } from '@/service/domain/message/sync-service'
import { createChatDbReader } from '@/service/shared/chat-db-reader'

import type { DbClient } from '@/db'
import type { Env } from '@/lib/env'

const createServiceDb = (client: DbClient) => {
    if (client.provider === 'sqlite') return createSqliteServiceDb(client.db)
    if (client.provider === 'postgres') return createPgServiceDb(client.db)
    return createMysqlServiceDb(client.db)
}

type ComposeArgs = {
    env: Env
    client: DbClient
}

export const compose = ({ env, client }: ComposeArgs) => {
    const serviceDb = createServiceDb(client)
    const chatDbReader = createChatDbReader({ chatDbPath: env.CHAT_DB_PATH })
    const logService = createLogService({ db: serviceDb.log })

    return {
        logService,
        syncService: createSyncService({ db: serviceDb.sync, source: chatDbReader, batchSize: env.SYNC_BATCH_SIZE, log: logService }),
        chatService: createChatService({ db: serviceDb.chat }),
        messageService: createMessageService({ db: serviceDb.message }),
        attachmentService: createAttachmentService({ db: serviceDb.attachment, attachmentsRoot: env.ATTACHMENTS_ROOT }),
        authService: createAuthService({ db: serviceDb.auth, log: logService }),
    }
}

export type Composed = ReturnType<typeof compose>
