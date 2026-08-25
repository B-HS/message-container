export class ApiError extends Error {
    constructor(
        readonly code: string,
        message: string,
        readonly status?: number,
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError
