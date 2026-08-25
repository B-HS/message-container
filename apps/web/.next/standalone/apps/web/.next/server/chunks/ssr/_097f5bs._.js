module.exports = [
    56357,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(94805),
            d = a.i(32802),
            e = a.i(66373)
        let f = (0, e.default)('log-out', [
                ['path', { d: 'm16 17 5-5-5-5', key: '1bji2h' }],
                ['path', { d: 'M21 12H9', key: 'dn1m92' }],
                ['path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', key: '1uf3rs' }],
            ]),
            g = (0, e.default)('messages-square', [
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
            h = (0, e.default)('moon', [
                [
                    'path',
                    {
                        d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
                        key: 'kfwtm',
                    },
                ],
            ]),
            i = (0, e.default)('refresh-cw', [
                ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
                ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
                ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
                ['path', { d: 'M8 16H3v5', key: '1cv678' }],
            ]),
            j = (0, e.default)('search', [
                ['path', { d: 'm21 21-4.34-4.34', key: '14j7rj' }],
                ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
            ]),
            k = (0, e.default)('settings', [
                [
                    'path',
                    {
                        d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
                        key: '1i5ecw',
                    },
                ],
                ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
            ]),
            l = (0, e.default)('sun', [
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
        var m = a.i(28396),
            n = a.i(30583)
        let o = [
            { href: '/chats', label: '대화', icon: g },
            { href: '/messages', label: '메시지 검색', icon: j },
            { href: '/sync', label: '동기화', icon: i },
            { href: '/settings', label: '설정', icon: k },
        ]
        a.s(
            [
                'Rail',
                0,
                () => {
                    let a = (0, d.usePathname)(),
                        e = (0, d.useRouter)(),
                        g = async () => {
                            ;(await fetch('/api/session', { method: 'DELETE' }), e.replace('/setup'))
                        },
                        { resolvedTheme: i, setTheme: j } = (0, m.useTheme)()
                    return (0, b.jsxs)('aside', {
                        className: 'fixed inset-y-0 left-0 z-10 flex w-64 flex-col bg-sidebar text-sidebar-foreground',
                        children: [
                            (0, b.jsx)('header', {
                                className: 'flex h-12 shrink-0 items-center px-3',
                                children: (0, b.jsx)('span', {
                                    className: 'truncate text-sm font-semibold tracking-tight',
                                    children: 'message-container',
                                }),
                            }),
                            (0, b.jsx)('nav', {
                                className: 'flex min-h-0 flex-1 flex-col',
                                children: o.map((d) =>
                                    (0, b.jsxs)(
                                        c.default,
                                        {
                                            href: d.href,
                                            'aria-current': a === d.href ? 'page' : void 0,
                                            className: (0, n.cn)(
                                                'flex h-9 items-center gap-3 rounded-none px-3 text-sm font-medium',
                                                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                                a === d.href && 'bg-sidebar-accent text-sidebar-accent-foreground',
                                            ),
                                            children: [
                                                (0, b.jsx)(d.icon, { className: 'size-4 shrink-0' }),
                                                (0, b.jsx)('span', { className: 'truncate', children: d.label }),
                                            ],
                                        },
                                        d.href,
                                    ),
                                ),
                            }),
                            (0, b.jsxs)('footer', {
                                className: 'flex h-12 shrink-0 items-center justify-end gap-1 px-3',
                                children: [
                                    (0, b.jsxs)('button', {
                                        type: 'button',
                                        'aria-label': '테마 전환',
                                        onClick: () => j('dark' === i ? 'light' : 'dark'),
                                        className:
                                            'flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                        children: [
                                            (0, b.jsx)(l, { className: 'size-4 dark:hidden' }),
                                            (0, b.jsx)(h, { className: 'hidden size-4 dark:block' }),
                                        ],
                                    }),
                                    (0, b.jsx)('button', {
                                        type: 'button',
                                        'aria-label': '로그아웃',
                                        onClick: g,
                                        className:
                                            'flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                        children: (0, b.jsx)(f, { className: 'size-4' }),
                                    }),
                                ],
                            }),
                        ],
                    })
                },
            ],
            56357,
        )
    },
    66373,
    (a) => {
        'use strict'
        var b = a.i(77010)
        let c = (...a) =>
                a
                    .filter((a, b, c) => !!a && '' !== a.trim() && c.indexOf(a) === b)
                    .join(' ')
                    .trim(),
            d = (a) => {
                let b = a.replace(/^([A-Z])|[\s-_]+(\w)/g, (a, b, c) => (c ? c.toUpperCase() : b.toLowerCase()))
                return b.charAt(0).toUpperCase() + b.slice(1)
            }
        var e = {
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
        let f = (0, b.createContext)({}),
            g = (0, b.forwardRef)(
                ({ color: a, size: d, strokeWidth: g, absoluteStrokeWidth: h, className: i = '', children: j, iconNode: k, ...l }, m) => {
                    let {
                            size: n = 24,
                            strokeWidth: o = 2,
                            absoluteStrokeWidth: p = !1,
                            color: q = 'currentColor',
                            className: r = '',
                        } = (0, b.useContext)(f) ?? {},
                        s = (h ?? p) ? (24 * Number(g ?? o)) / Number(d ?? n) : (g ?? o)
                    return (0, b.createElement)(
                        'svg',
                        {
                            ref: m,
                            ...e,
                            width: d ?? n ?? e.width,
                            height: d ?? n ?? e.height,
                            stroke: a ?? q,
                            strokeWidth: s,
                            className: c('lucide', r, i),
                            ...(!j &&
                                !((a) => {
                                    for (let b in a) if (b.startsWith('aria-') || 'role' === b || 'title' === b) return !0
                                    return !1
                                })(l) && { 'aria-hidden': 'true' }),
                            ...l,
                        },
                        [...k.map(([a, c]) => (0, b.createElement)(a, c)), ...(Array.isArray(j) ? j : [j])],
                    )
                },
            )
        a.s(
            [
                'default',
                0,
                (a, e) => {
                    let f = (0, b.forwardRef)(({ className: f, ...h }, i) =>
                        (0, b.createElement)(g, {
                            ref: i,
                            iconNode: e,
                            className: c(
                                `lucide-${d(a)
                                    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                                    .toLowerCase()}`,
                                `lucide-${a}`,
                                f,
                            ),
                            ...h,
                        }),
                    )
                    return ((f.displayName = d(a)), f)
                },
            ],
            66373,
        )
    },
    26755,
    (a, b, c) => {
        'use strict'
        Object.defineProperty(c, '__esModule', { value: !0 })
        var d = {
            actionAsyncStorage: function () {
                return f.actionAsyncStorage
            },
            workAsyncStorage: function () {
                return g.workAsyncStorage
            },
            workUnitAsyncStorage: function () {
                return h.workUnitAsyncStorage
            },
        }
        for (var e in d) Object.defineProperty(c, e, { enumerable: !0, get: d[e] })
        let f = a.r(20635),
            g = a.r(56704),
            h = a.r(32319)
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
]

//# sourceMappingURL=_097f5bs._.js.map
