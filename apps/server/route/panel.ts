import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import { apiKeyCreateSchema, panelLoginSchema, panelSetupSchema, PASSWORD_MIN_LENGTH } from '@/dto/panel'

import type { ApiKeyRecord, AuthService } from '@/service/domain/auth/auth-service'

type PanelRouteDeps = {
    authService: AuthService
}

const SESSION_COOKIE_NAME = 'panel_session'
const SESSION_COOKIE_MAX_AGE_S = 12 * 60 * 60

const HTML_ESCAPE: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (ch) => HTML_ESCAPE[ch] ?? ch)

const PAGE_STYLE = `
    * { box-sizing: border-box; margin: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f5f7; color: #1c1e21; display: flex; justify-content: center; padding: 48px 16px; }
    main { width: 100%; max-width: 720px; }
    .card { background: #fff; border: 1px solid #e1e4e8; border-radius: 8px; padding: 24px; margin-bottom: 16px; }
    h1 { font-size: 20px; margin-bottom: 8px; }
    p { font-size: 14px; color: #57606a; margin-bottom: 16px; }
    label { display: block; font-size: 13px; margin-bottom: 4px; }
    input[type='password'], input[type='text'] { width: 100%; padding: 8px 10px; border: 1px solid #d0d7de; border-radius: 6px; font-size: 14px; margin-bottom: 12px; }
    button { padding: 8px 14px; border: 0; border-radius: 6px; background: #1f6feb; color: #fff; font-size: 14px; cursor: pointer; }
    button.danger { background: #cf222e; }
    button.plain { background: #57606a; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { text-align: left; padding: 8px 6px; border-bottom: 1px solid #e1e4e8; }
    .error { color: #cf222e; font-size: 13px; margin-bottom: 12px; }
    .new-key { background: #fff8c5; border: 1px solid #d4a72c; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 13px; }
    .new-key code { display: block; margin-top: 8px; word-break: break-all; font-size: 13px; }
    .row { display: flex; gap: 8px; align-items: flex-end; }
    .row div { flex: 1; }
    .muted { color: #8b949e; }
`

const layout = (title: string, body: string) =>
    `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>${PAGE_STYLE}</style></head><body><main>${body}</main></body></html>`

const setupPage = (error?: string) =>
    layout(
        'message-container 초기 설정',
        `<div class="card">
            <h1>초기 패스워드 설정</h1>
            <p>패널과 API 키 관리에 사용할 패스워드를 설정합니다. 최소 ${PASSWORD_MIN_LENGTH}자.</p>
            ${error ? `<div class="error">${escapeHtml(error)}</div>` : ''}
            <form method="post" action="/panel/setup">
                <label for="password">패스워드</label>
                <input id="password" name="password" type="password" autocomplete="new-password" required>
                <label for="confirm">패스워드 확인</label>
                <input id="confirm" name="confirm" type="password" autocomplete="new-password" required>
                <button type="submit">설정</button>
            </form>
        </div>`,
    )

const loginPage = (error?: string) =>
    layout(
        'message-container 로그인',
        `<div class="card">
            <h1>로그인</h1>
            <p>설정한 패스워드를 입력하세요.</p>
            ${error ? `<div class="error">${escapeHtml(error)}</div>` : ''}
            <form method="post" action="/panel/login">
                <label for="password">패스워드</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required>
                <button type="submit">로그인</button>
            </form>
        </div>`,
    )

const formatMs = (ms: number | null) => (ms === null ? '-' : new Date(ms).toISOString())

const keyRow = (key: ApiKeyRecord) =>
    `<tr>
        <td>${escapeHtml(key.name)}</td>
        <td><code>${escapeHtml(key.start)}...</code></td>
        <td>${formatMs(key.createdAtMs)}</td>
        <td>${formatMs(key.lastUsedAtMs)}</td>
        <td>${key.revokedAtMs === null ? '활성' : `<span class="muted">폐기됨</span>`}</td>
        <td>${key.revokedAtMs === null ? `<form method="post" action="/panel/keys/${key.id}/revoke"><button class="danger" type="submit">폐기</button></form>` : ''}</td>
    </tr>`

const keysPage = (keys: ApiKeyRecord[], newKey?: { name: string; key: string }, error?: string) =>
    layout(
        'API 키 관리',
        `<div class="card">
            <h1>API 키 관리</h1>
            <p>키는 생성 시 한 번만 표시됩니다. Authorization: Bearer 헤더로 사용하세요.</p>
            ${error ? `<div class="error">${escapeHtml(error)}</div>` : ''}
            ${
                newKey
                    ? `<div class="new-key">새 키 <strong>${escapeHtml(newKey.name)}</strong> 가 생성되었습니다. 지금 복사해 두세요 — 다시 표시되지 않습니다.<code data-new-key>${escapeHtml(newKey.key)}</code></div>`
                    : ''
            }
            <form method="post" action="/panel/keys" class="row">
                <div>
                    <label for="name">키 이름</label>
                    <input id="name" name="name" type="text" placeholder="예: claude-mcp" required>
                </div>
                <button type="submit">키 생성</button>
            </form>
        </div>
        <div class="card">
            <table>
                <thead><tr><th>이름</th><th>키</th><th>생성</th><th>마지막 사용</th><th>상태</th><th></th></tr></thead>
                <tbody>${keys.length === 0 ? '<tr><td colspan="6" class="muted">생성된 키가 없습니다</td></tr>' : keys.map(keyRow).join('')}</tbody>
            </table>
        </div>
        <form method="post" action="/panel/logout"><button class="plain" type="submit">로그아웃</button></form>`,
    )

export const createPanelRoute = (deps: PanelRouteDeps) => {
    const route = new Hono()

    route.get('/', async (c) => {
        if (!(await deps.authService.isPasswordSet())) return c.html(setupPage())
        if (!deps.authService.validateSession(getCookie(c, SESSION_COOKIE_NAME))) return c.html(loginPage())
        return c.html(keysPage(await deps.authService.listApiKeys()))
    })

    route.post('/setup', async (c) => {
        if (await deps.authService.isPasswordSet()) return c.redirect('/panel')
        const parsed = panelSetupSchema.safeParse(await c.req.parseBody())
        if (!parsed.success) return c.html(setupPage(`패스워드는 최소 ${PASSWORD_MIN_LENGTH}자이며, 확인 값과 일치해야 합니다`))
        await deps.authService.setupPassword(parsed.data.password)
        setCookie(c, SESSION_COOKIE_NAME, deps.authService.createSession(), {
            httpOnly: true,
            sameSite: 'Strict',
            path: '/',
            maxAge: SESSION_COOKIE_MAX_AGE_S,
        })
        return c.redirect('/panel')
    })

    route.post('/login', async (c) => {
        const parsed = panelLoginSchema.safeParse(await c.req.parseBody())
        if (!parsed.success) return c.html(loginPage('패스워드를 입력하세요'))
        const result = await deps.authService.verifyPassword(parsed.data.password)
        if (result === 'locked') return c.html(loginPage('로그인 시도가 너무 많습니다. 잠시 후 다시 시도하세요'))
        if (result === 'invalid') return c.html(loginPage('패스워드가 올바르지 않습니다'))
        setCookie(c, SESSION_COOKIE_NAME, deps.authService.createSession(), {
            httpOnly: true,
            sameSite: 'Strict',
            path: '/',
            maxAge: SESSION_COOKIE_MAX_AGE_S,
        })
        return c.redirect('/panel')
    })

    route.post('/logout', async (c) => {
        deps.authService.revokeSession(getCookie(c, SESSION_COOKIE_NAME))
        deleteCookie(c, SESSION_COOKIE_NAME, { path: '/' })
        return c.redirect('/panel')
    })

    route.post('/keys', async (c) => {
        if (!deps.authService.validateSession(getCookie(c, SESSION_COOKIE_NAME))) return c.redirect('/panel')
        const parsed = apiKeyCreateSchema.safeParse(await c.req.parseBody())
        if (!parsed.success) return c.html(keysPage(await deps.authService.listApiKeys(), undefined, '키 이름을 1~100자로 입력하세요'))
        const created = await deps.authService.createApiKey(parsed.data.name)
        return c.html(keysPage(await deps.authService.listApiKeys(), { name: created.name, key: created.key }))
    })

    route.post('/keys/:id/revoke', async (c) => {
        if (!deps.authService.validateSession(getCookie(c, SESSION_COOKIE_NAME))) return c.redirect('/panel')
        const id = Number(c.req.param('id'))
        if (Number.isInteger(id) && id > 0) await deps.authService.revokeApiKey(id)
        return c.redirect('/panel')
    })

    return route
}
