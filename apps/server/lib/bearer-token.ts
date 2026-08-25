const BEARER_PREFIX = 'Bearer '

export const getBearerToken = (header: string | undefined) => (header?.startsWith(BEARER_PREFIX) ? header.slice(BEARER_PREFIX.length) : undefined)
