import type { LogLevel, LogListQuery } from '@/dto/log'

export type LogRecord = {
    id: number
    level: string
    event: string
    message: string
    detailsJson: string | null
    createdAtMs: number
}

export type LogServiceDb = {
    insertLog: (row: { level: LogLevel; event: string; message: string; detailsJson: string | null; createdAtMs: number }) => Promise<void>
    listLogs: (params: { offset: number; limit: number; level?: LogLevel }) => Promise<{ data: LogRecord[]; total: number }>
    pruneLogs: (keep: number) => Promise<void>
}

type LogServiceDeps = {
    db: LogServiceDb
}

const LOG_RETENTION_MAX_ROWS = 10000

const toLogSummary = ({ createdAtMs, ...record }: LogRecord) => ({ ...record, createdAt: new Date(createdAtMs).toISOString() })

export const createLogService = (deps: LogServiceDeps) => ({
    record: async (entry: { level: LogLevel; event: string; message: string; details?: Record<string, unknown> }) => {
        try {
            await deps.db.insertLog({
                level: entry.level,
                event: entry.event,
                message: entry.message,
                detailsJson: entry.details === undefined ? null : JSON.stringify(entry.details),
                createdAtMs: Date.now(),
            })
            await deps.db.pruneLogs(LOG_RETENTION_MAX_ROWS)
        } catch (error) {
            console.error('[log]', error)
        }
    },
    list: async (query: LogListQuery) => {
        const { data, total } = await deps.db.listLogs({ offset: (query.page - 1) * query.limit, limit: query.limit, level: query.level })
        return { data: data.map(toLogSummary), page: query.page, limit: query.limit, total }
    },
})

export type LogService = ReturnType<typeof createLogService>
