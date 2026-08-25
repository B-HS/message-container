;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    28802,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            n = e.i(33698),
            o = e.i(98899),
            a = e.i(82339)
        let i = (0, a.default)('log-out', [
                ['path', { d: 'm16 17 5-5-5-5', key: '1bji2h' }],
                ['path', { d: 'M21 12H9', key: 'dn1m92' }],
                ['path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', key: '1uf3rs' }],
            ]),
            s = (0, a.default)('messages-square', [
                [
                    'path',
                    {
                        d: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
                        key: '1n2ejm',
                    },
                ],
                [
                    'path',
                    { d: 'M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1', key: '1qfcsi' },
                ],
            ]),
            l = (0, a.default)('moon', [
                [
                    'path',
                    {
                        d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
                        key: 'kfwtm',
                    },
                ],
            ]),
            u = (0, a.default)('refresh-cw', [
                ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
                ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
                ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
                ['path', { d: 'M8 16H3v5', key: '1cv678' }],
            ]),
            c = (0, a.default)('search', [
                ['path', { d: 'm21 21-4.34-4.34', key: '14j7rj' }],
                ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
            ]),
            f = (0, a.default)('settings', [
                [
                    'path',
                    {
                        d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
                        key: '1i5ecw',
                    },
                ],
                ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
            ]),
            d = (0, a.default)('sun', [
                ['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
                ['path', { d: 'M12 2v2', key: 'tus03m' }],
                ['path', { d: 'M12 20v2', key: '1lh1kg' }],
                ['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
                ['path', { d: 'm17.66 17.66 1.41 1.41', key: 'ptbguv' }],
                ['path', { d: 'M2 12h2', key: '1t8f8n' }],
                ['path', { d: 'M20 12h2', key: '1q8mjw' }],
                ['path', { d: 'm6.34 17.66-1.41 1.41', key: '1m8zz5' }],
                ['path', { d: 'm19.07 4.93-1.41 1.41', key: '1shlcs' }],
            ])
        var h = e.i(76229),
            p = e.i(1718)
        let m = [
            { href: '/chats', label: '대화', icon: s },
            { href: '/messages', label: '메시지 검색', icon: c },
            { href: '/sync', label: '동기화', icon: u },
            { href: '/settings', label: '설정', icon: f },
        ]
        e.s(
            [
                'Rail',
                0,
                () => {
                    let e,
                        a,
                        s,
                        u,
                        c,
                        f,
                        y,
                        g,
                        b,
                        v,
                        x,
                        k,
                        j = (0, r.c)(23),
                        P = (0, o.usePathname)(),
                        _ = (0, o.useRouter)()
                    j[0] !== _
                        ? ((e = async () => {
                              ;(await fetch('/api/session', { method: 'DELETE' }), _.replace('/setup'))
                          }),
                          (j[0] = _),
                          (j[1] = e))
                        : (e = j[1])
                    let E = e,
                        { resolvedTheme: N, setTheme: C } = (0, h.useTheme)()
                    return (
                        j[2] === Symbol.for('react.memo_cache_sentinel')
                            ? ((a = (0, t.jsx)('header', {
                                  className: 'flex h-12 shrink-0 items-center px-3',
                                  children: (0, t.jsx)('span', {
                                      className: 'truncate text-sm font-semibold tracking-tight',
                                      children: 'message-container',
                                  }),
                              })),
                              (j[2] = a))
                            : (a = j[2]),
                        j[3] !== P
                            ? ((s = m.map((e) =>
                                  (0, t.jsxs)(
                                      n.default,
                                      {
                                          href: e.href,
                                          'aria-current': P === e.href ? 'page' : void 0,
                                          className: (0, p.cn)(
                                              'flex h-9 items-center gap-3 rounded-none px-3 text-sm font-medium',
                                              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                              P === e.href && 'bg-sidebar-accent text-sidebar-accent-foreground',
                                          ),
                                          children: [
                                              (0, t.jsx)(e.icon, { className: 'size-4 shrink-0' }),
                                              (0, t.jsx)('span', { className: 'truncate', children: e.label }),
                                          ],
                                      },
                                      e.href,
                                  ),
                              )),
                              (j[3] = P),
                              (j[4] = s))
                            : (s = j[4]),
                        j[5] !== s
                            ? ((u = (0, t.jsx)('nav', { className: 'flex min-h-0 flex-1 flex-col', children: s })), (j[5] = s), (j[6] = u))
                            : (u = j[6]),
                        j[7] !== N || j[8] !== C ? ((c = () => C('dark' === N ? 'light' : 'dark')), (j[7] = N), (j[8] = C), (j[9] = c)) : (c = j[9]),
                        j[10] === Symbol.for('react.memo_cache_sentinel')
                            ? ((f = (0, t.jsx)(d, { className: 'size-4 dark:hidden' })),
                              (y = (0, t.jsx)(l, { className: 'hidden size-4 dark:block' })),
                              (j[10] = f),
                              (j[11] = y))
                            : ((f = j[10]), (y = j[11])),
                        j[12] !== c
                            ? ((g = (0, t.jsxs)('button', {
                                  type: 'button',
                                  'aria-label': '테마 전환',
                                  onClick: c,
                                  className: 'flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                  children: [f, y],
                              })),
                              (j[12] = c),
                              (j[13] = g))
                            : (g = j[13]),
                        j[14] === Symbol.for('react.memo_cache_sentinel') ? ((b = (0, t.jsx)(i, { className: 'size-4' })), (j[14] = b)) : (b = j[14]),
                        j[15] !== E
                            ? ((v = (0, t.jsx)('button', {
                                  type: 'button',
                                  'aria-label': '로그아웃',
                                  onClick: E,
                                  className: 'flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                  children: b,
                              })),
                              (j[15] = E),
                              (j[16] = v))
                            : (v = j[16]),
                        j[17] !== g || j[18] !== v
                            ? ((x = (0, t.jsxs)('footer', { className: 'flex h-12 shrink-0 items-center justify-end gap-1 px-3', children: [g, v] })),
                              (j[17] = g),
                              (j[18] = v),
                              (j[19] = x))
                            : (x = j[19]),
                        j[20] !== x || j[21] !== u
                            ? ((k = (0, t.jsxs)('aside', {
                                  className: 'fixed inset-y-0 left-0 z-10 flex w-64 flex-col bg-sidebar text-sidebar-foreground',
                                  children: [a, u, x],
                              })),
                              (j[20] = x),
                              (j[21] = u),
                              (j[22] = k))
                            : (k = j[22]),
                        k
                    )
                },
            ],
            28802,
        )
    },
    82339,
    (e) => {
        'use strict'
        var t = e.i(30216)
        let r = (...e) =>
                e
                    .filter((e, t, r) => !!e && '' !== e.trim() && r.indexOf(e) === t)
                    .join(' ')
                    .trim(),
            n = (e) => {
                let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) => (r ? r.toUpperCase() : t.toLowerCase()))
                return t.charAt(0).toUpperCase() + t.slice(1)
            }
        var o = {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        }
        let a = (0, t.createContext)({}),
            i = (0, t.forwardRef)(
                ({ color: e, size: n, strokeWidth: i, absoluteStrokeWidth: s, className: l = '', children: u, iconNode: c, ...f }, d) => {
                    let {
                            size: h = 24,
                            strokeWidth: p = 2,
                            absoluteStrokeWidth: m = !1,
                            color: y = 'currentColor',
                            className: g = '',
                        } = (0, t.useContext)(a) ?? {},
                        b = (s ?? m) ? (24 * Number(i ?? p)) / Number(n ?? h) : (i ?? p)
                    return (0, t.createElement)(
                        'svg',
                        {
                            ref: d,
                            ...o,
                            width: n ?? h ?? o.width,
                            height: n ?? h ?? o.height,
                            stroke: e ?? y,
                            strokeWidth: b,
                            className: r('lucide', g, l),
                            ...(!u &&
                                !((e) => {
                                    for (let t in e) if (t.startsWith('aria-') || 'role' === t || 'title' === t) return !0
                                    return !1
                                })(f) && { 'aria-hidden': 'true' }),
                            ...f,
                        },
                        [...c.map(([e, r]) => (0, t.createElement)(e, r)), ...(Array.isArray(u) ? u : [u])],
                    )
                },
            )
        e.s(
            [
                'default',
                0,
                (e, o) => {
                    let a = (0, t.forwardRef)(({ className: a, ...s }, l) =>
                        (0, t.createElement)(i, {
                            ref: l,
                            iconNode: o,
                            className: r(
                                `lucide-${n(e)
                                    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                                    .toLowerCase()}`,
                                `lucide-${e}`,
                                a,
                            ),
                            ...s,
                        }),
                    )
                    return ((a.displayName = n(e)), a)
                },
            ],
            82339,
        )
    },
    33698,
    (e, t, r) => {
        'use strict'
        ;(e.i(5058), Object.defineProperty(r, '__esModule', { value: !0 }))
        var n = {
            default: function () {
                return g
            },
            useLinkStatus: function () {
                return v
            },
        }
        for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] })
        let a = e.r(88802),
            i = e.r(48607),
            s = a._(e.r(30216)),
            l = e.r(8298),
            u = e.r(35538),
            c = e.r(23496),
            f = e.r(16125),
            d = e.r(10329),
            h = e.r(99930),
            p = e.r(86557),
            m = e.r(5147),
            y = e.r(89392)
        function g(t) {
            var r
            let n,
                o,
                a,
                [g, v] = (0, s.useOptimistic)(p.IDLE_LINK_STATUS),
                x = (0, s.useRef)(null),
                {
                    href: k,
                    as: j,
                    children: P,
                    prefetch: _ = null,
                    passHref: E,
                    replace: N,
                    shallow: C,
                    scroll: w,
                    onClick: S,
                    onMouseEnter: O,
                    onTouchStart: M,
                    legacyBehavior: T = !1,
                    onNavigate: R,
                    transitionTypes: A,
                    ref: L,
                    unstable_dynamicOnHover: $,
                    ...U
                } = t
            ;((n = P), T && ('string' == typeof n || 'number' == typeof n) && (n = (0, i.jsx)('a', { children: n })))
            let z = s.default.useContext(u.AppRouterContext),
                I = !1 !== _,
                B = !1 === _ ? 'none' : !0 === _ ? 'full' : 'auto',
                D = 'none' !== B ? ('auto' === B ? y.FetchStrategy.PPR : y.FetchStrategy.Full) : y.FetchStrategy.PPR,
                F = 'string' == typeof (r = j || k) ? r : (0, l.formatUrl)(r)
            if (T) {
                if (n?.$$typeof === Symbol.for('react.lazy'))
                    throw Object.defineProperty(
                        Error(
                            "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag.",
                        ),
                        '__NEXT_ERROR_CODE',
                        { value: 'E863', enumerable: !1, configurable: !0 },
                    )
                o = s.default.Children.only(n)
            }
            let K = T ? o && 'object' == typeof o && o.ref : L,
                W,
                q = s.default.useCallback(
                    (e) => (
                        null !== z && (x.current = (0, p.mountLinkInstance)(e, F, z, D, I, v, W)),
                        () => {
                            ;(x.current && ((0, p.unmountLinkForCurrentNavigation)(x.current), (x.current = null)),
                                (0, p.unmountPrefetchableInstance)(e))
                        }
                    ),
                    [I, F, z, D, v, W],
                ),
                H = {
                    ref: (0, c.useMergedRef)(q, K),
                    onClick(t) {
                        ;(T || 'function' != typeof S || S(t),
                            T && o.props && 'function' == typeof o.props.onClick && o.props.onClick(t),
                            !z ||
                                t.defaultPrevented ||
                                (function (t, r, n, o, a, i, l, u = 'none') {
                                    if ('u' > typeof window) {
                                        let c,
                                            { nodeName: f } = t.currentTarget
                                        if (
                                            ('A' === f.toUpperCase() &&
                                                (((c = t.currentTarget.getAttribute('target')) && '_self' !== c) ||
                                                    t.metaKey ||
                                                    t.ctrlKey ||
                                                    t.shiftKey ||
                                                    t.altKey ||
                                                    (t.nativeEvent && 2 === t.nativeEvent.which))) ||
                                            t.currentTarget.hasAttribute('download')
                                        )
                                            return
                                        if (!(0, m.isLocalURL)(r)) {
                                            o && (t.preventDefault(), location.replace(r))
                                            return
                                        }
                                        if ((t.preventDefault(), i)) {
                                            let e = !1
                                            if (
                                                (i({
                                                    preventDefault: () => {
                                                        e = !0
                                                    },
                                                }),
                                                e)
                                            )
                                                return
                                        }
                                        let { dispatchNavigateAction: d } = e.r(90930)
                                        s.default.startTransition(() => {
                                            d(
                                                r,
                                                o ? 'replace' : 'push',
                                                !1 === a ? h.ScrollBehavior.NoScroll : h.ScrollBehavior.Default,
                                                n.current,
                                                l,
                                                u,
                                            )
                                        })
                                    }
                                })(t, F, x, N, w, R, A, B))
                    },
                    onMouseEnter(e) {
                        ;(T || 'function' != typeof O || O(e),
                            T && o.props && 'function' == typeof o.props.onMouseEnter && o.props.onMouseEnter(e),
                            z && I && (0, p.onNavigationIntent)(e.currentTarget, !0 === $))
                    },
                    onTouchStart: function (e) {
                        ;(T || 'function' != typeof M || M(e),
                            T && o.props && 'function' == typeof o.props.onTouchStart && o.props.onTouchStart(e),
                            z && I && (0, p.onNavigationIntent)(e.currentTarget, !0 === $))
                    },
                }
            return (
                (0, f.isAbsoluteUrl)(F) ? (H.href = F) : (T && !E && ('a' !== o.type || 'href' in o.props)) || (H.href = (0, d.addBasePath)(F)),
                (a = T ? s.default.cloneElement(o, H) : (0, i.jsx)('a', { ...U, ...H, children: n })),
                (0, i.jsx)(b.Provider, { value: g, children: a })
            )
        }
        let b = (0, s.createContext)(p.IDLE_LINK_STATUS),
            v = () => (0, s.useContext)(b)
        ;('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
            void 0 === r.default.__esModule &&
            (Object.defineProperty(r.default, '__esModule', { value: !0 }), Object.assign(r.default, r), (t.exports = r.default))
    },
    23496,
    (e, t, r) => {
        'use strict'
        ;(Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'useMergedRef', {
                enumerable: !0,
                get: function () {
                    return o
                },
            }))
        let n = e.r(30216)
        function o(e, t) {
            let r = (0, n.useRef)(null),
                o = (0, n.useRef)(null)
            return (0, n.useCallback)(
                (n) => {
                    if (null === n) {
                        let e = r.current
                        e && ((r.current = null), e())
                        let t = o.current
                        t && ((o.current = null), t())
                    } else (e && (r.current = a(e, n)), t && (o.current = a(t, n)))
                },
                [e, t],
            )
        }
        function a(e, t) {
            if ('function' != typeof e)
                return (
                    (e.current = t),
                    () => {
                        e.current = null
                    }
                )
            {
                let r = e(t)
                return 'function' == typeof r ? r : () => e(null)
            }
        }
        ;('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
            void 0 === r.default.__esModule &&
            (Object.defineProperty(r.default, '__esModule', { value: !0 }), Object.assign(r.default, r), (t.exports = r.default))
    },
    16125,
    (e, t, r) => {
        'use strict'
        ;(e.i(5058), Object.defineProperty(r, '__esModule', { value: !0 }))
        var n = {
            DecodeError: function () {
                return g
            },
            MiddlewareNotFoundError: function () {
                return k
            },
            MissingStaticPage: function () {
                return x
            },
            NormalizeError: function () {
                return b
            },
            PageNotFoundError: function () {
                return v
            },
            SP: function () {
                return m
            },
            ST: function () {
                return y
            },
            WEB_VITALS: function () {
                return a
            },
            execOnce: function () {
                return i
            },
            getDisplayName: function () {
                return f
            },
            getLocationOrigin: function () {
                return u
            },
            getURL: function () {
                return c
            },
            isAbsoluteUrl: function () {
                return l
            },
            isResSent: function () {
                return d
            },
            loadGetInitialProps: function () {
                return p
            },
            normalizeRepeatedSlashes: function () {
                return h
            },
            stringifyError: function () {
                return j
            },
        }
        for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] })
        let a = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']
        function i(e) {
            let t,
                r = !1
            return (...n) => (r || ((r = !0), (t = e(...n))), t)
        }
        let s = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
            l = (e) => {
                let t = e.charCodeAt(0)
                return !!((t >= 65 && t <= 90) || (t >= 97 && t <= 122)) && s.test(e)
            }
        function u() {
            let { protocol: e, hostname: t, port: r } = window.location
            return `${e}//${t}${r ? ':' + r : ''}`
        }
        function c() {
            let { href: e } = window.location,
                t = u()
            return e.substring(t.length)
        }
        function f(e) {
            return 'string' == typeof e ? e : e.displayName || e.name || 'Unknown'
        }
        function d(e) {
            return e.finished || e.headersSent
        }
        function h(e) {
            let t = e.split('?')
            return t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') + (t[1] ? `?${t.slice(1).join('?')}` : '')
        }
        async function p(e, t) {
            let r = t.res || (t.ctx && t.ctx.res)
            if (!e.getInitialProps) return t.ctx && t.Component ? { pageProps: await p(t.Component, t.ctx) } : {}
            let n = await e.getInitialProps(t)
            if (r && d(r)) return n
            if (!n)
                throw Object.defineProperty(
                    Error(`"${f(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),
                    '__NEXT_ERROR_CODE',
                    { value: 'E1025', enumerable: !1, configurable: !0 },
                )
            return n
        }
        let m = 'u' > typeof performance,
            y = m && ['mark', 'measure', 'getEntriesByName'].every((e) => 'function' == typeof performance[e])
        class g extends Error {}
        class b extends Error {}
        class v extends Error {
            constructor(e) {
                ;(super(), (this.code = 'ENOENT'), (this.name = 'PageNotFoundError'), (this.message = `Cannot find module for page: ${e}`))
            }
        }
        class x extends Error {
            constructor(e, t) {
                ;(super(), (this.message = `Failed to load static file for page: ${e} ${t}`))
            }
        }
        class k extends Error {
            constructor() {
                ;(super(), (this.code = 'ENOENT'), (this.message = 'Cannot find the middleware module'))
            }
        }
        function j(e) {
            return JSON.stringify({ message: e.message, stack: e.stack })
        }
    },
    5147,
    (e, t, r) => {
        'use strict'
        ;(Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'isLocalURL', {
                enumerable: !0,
                get: function () {
                    return a
                },
            }))
        let n = e.r(16125),
            o = e.r(40450)
        function a(e) {
            if (!(0, n.isAbsoluteUrl)(e)) return !0
            try {
                let t = (0, n.getLocationOrigin)(),
                    r = new URL(e, t)
                return r.origin === t && (0, o.hasBasePath)(r.pathname)
            } catch (e) {
                return !1
            }
        }
    },
    1283,
    (e, t, r) => {
        'use strict'
        Object.defineProperty(r, '__esModule', { value: !0 })
        var n = {
            assign: function () {
                return l
            },
            searchParamsToUrlQuery: function () {
                return a
            },
            urlQueryToSearchParams: function () {
                return s
            },
        }
        for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] })
        function a(e) {
            let t = {}
            for (let [r, n] of e.entries()) {
                let e = t[r]
                void 0 === e ? (t[r] = n) : Array.isArray(e) ? e.push(n) : (t[r] = [e, n])
            }
            return t
        }
        function i(e) {
            return 'string' == typeof e ? e : ('number' != typeof e || isNaN(e)) && 'boolean' != typeof e ? '' : String(e)
        }
        function s(e) {
            let t = new URLSearchParams()
            for (let [r, n] of Object.entries(e))
                if (Array.isArray(n)) for (let e of n) t.append(r, i(e))
                else t.set(r, i(n))
            return t
        }
        function l(e, ...t) {
            for (let r of t) {
                for (let t of r.keys()) e.delete(t)
                for (let [t, n] of r.entries()) e.append(t, n)
            }
            return e
        }
    },
    8298,
    (e, t, r) => {
        'use strict'
        ;(e.i(5058), Object.defineProperty(r, '__esModule', { value: !0 }))
        var n = {
            formatUrl: function () {
                return s
            },
            formatWithValidation: function () {
                return u
            },
            urlObjectKeys: function () {
                return l
            },
        }
        for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] })
        let a = e.r(88802)._(e.r(1283)),
            i = /https?|ftp|gopher|file/
        function s(e) {
            let { auth: t, hostname: r } = e,
                n = e.protocol || '',
                o = e.pathname || '',
                s = e.hash || '',
                l = e.query || '',
                u = !1
            ;((t = t ? encodeURIComponent(t).replace(/%3A/i, ':') + '@' : ''),
                e.host ? (u = t + e.host) : r && ((u = t + (~r.indexOf(':') ? `[${r}]` : r)), e.port && (u += ':' + e.port)),
                l && 'object' == typeof l && (l = String(a.urlQueryToSearchParams(l))))
            let c = e.search || (l && `?${l}`) || ''
            return (
                n && !n.endsWith(':') && (n += ':'),
                e.slashes || ((!n || i.test(n)) && !1 !== u) ? ((u = '//' + (u || '')), o && '/' !== o[0] && (o = '/' + o)) : u || (u = ''),
                s && '#' !== s[0] && (s = '#' + s),
                c && '?' !== c[0] && (c = '?' + c),
                (o = o.replace(/[?#]/g, encodeURIComponent)),
                (c = c.replace('#', '%23')),
                `${n}${u}${o}${c}${s}`
            )
        }
        let l = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes']
        function u(e) {
            return s(e)
        }
    },
    98899,
    (e, t, r) => {
        t.exports = e.r(303)
    },
])
