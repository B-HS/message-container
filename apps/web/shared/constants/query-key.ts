export const QUERY_KEY = {
    AUTH: { STATUS: ['auth', 'status'] },
    CHAT: {
        ALL: ['chat'],
        LIST: (params: Record<string, unknown>) => ['chat', 'list', params],
        DETAIL: (id: number) => ['chat', 'detail', id],
        MESSAGES: (id: number, params: Record<string, unknown>) => ['chat', 'messages', id, params],
    },
    MESSAGE: {
        ALL: ['message'],
        SEARCH: (params: Record<string, unknown>) => ['message', 'search', params],
    },
    ATTACHMENT: {
        BY_MESSAGES: (messageIds: number[]) => ['attachment', 'by-messages', messageIds],
    },
    SYNC: { STATUS: ['sync', 'status'] },
    API_KEY: { LIST: ['api-key', 'list'] },
    LOG: {
        ALL: ['log'],
        LIST: (params: Record<string, unknown>) => ['log', 'list', params],
    },
}
