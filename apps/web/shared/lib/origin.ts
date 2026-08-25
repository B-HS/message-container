/**
 * Same-origin guard for state-changing route handlers.
 * Requests without an Origin header (same-origin navigations, curl) pass; a mismatched Origin is rejected by the caller.
 */
export const isTrustedOrigin = (request: Request) => {
    const origin = request.headers.get('Origin')
    if (!origin) return true
    try {
        return new URL(origin).host === request.headers.get('Host')
    } catch {
        return false
    }
}
