module.exports = [
    93695,
    (a, b, c) => {
        b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
    },
    53754,
    (a) => {
        'use strict'
        var b = a.i(88870),
            c = a.i(85634),
            d = a.i(27312)
        let e = ({ children: a }) => (0, b.jsx)('div', { className: 'flex flex-col gap-px', children: a })
        var f = a.i(64352)
        let g = ({ title: a, contentClassName: c, children: d }) =>
            (0, b.jsxs)('section', {
                className: 'flex flex-col gap-3 bg-card py-3',
                children: [
                    a
                        ? (0, b.jsx)('header', { className: 'px-3', children: (0, b.jsx)('h2', { className: 'text-sm font-medium', children: a }) })
                        : null,
                    (0, b.jsx)('div', { className: (0, f.cn)('px-3', c), children: d }),
                ],
            })
        var h = a.i(23461)
        let i = d.z.object({ success: d.z.literal(!0), data: d.z.object({ passwordSet: d.z.boolean() }) }),
            j = async () => {
                let a = process.env.MESSAGE_API_URL ?? 'http://localhost:3000',
                    d = !!(await (0, c.cookies)()).get(h.API_KEY_COOKIE_NAME),
                    f = !1
                try {
                    let b = await fetch(`${a}/api/auth/status`, { cache: 'no-store' })
                    f = i.safeParse(await b.json()).success
                } catch {
                    f = !1
                }
                return (0, b.jsxs)(e, {
                    children: [
                        (0, b.jsxs)(g, {
                            title: '연결',
                            contentClassName: 'flex flex-col gap-2 text-xs',
                            children: [
                                (0, b.jsxs)('div', {
                                    className: 'flex flex-wrap items-center gap-2',
                                    children: [
                                        (0, b.jsx)('span', { className: 'text-muted-foreground', children: 'API 서버' }),
                                        (0, b.jsx)('span', { className: 'font-mono', children: a }),
                                        f
                                            ? (0, b.jsx)('span', { className: 'text-muted-foreground', children: '연결됨' })
                                            : (0, b.jsx)('span', { className: 'text-destructive', children: '연결할 수 없음' }),
                                    ],
                                }),
                                (0, b.jsxs)('div', {
                                    className: 'flex flex-wrap items-center gap-2',
                                    children: [
                                        (0, b.jsx)('span', { className: 'text-muted-foreground', children: '세션' }),
                                        (0, b.jsx)('span', { children: d ? 'API 키 쿠키 보유 (httpOnly)' : '없음' }),
                                    ],
                                }),
                            ],
                        }),
                        (0, b.jsxs)(g, {
                            title: 'API 키 관리',
                            contentClassName: 'flex flex-col gap-2 text-xs',
                            children: [
                                (0, b.jsx)('p', {
                                    className: 'text-muted-foreground',
                                    children:
                                        '발급된 키 목록 확인·폐기는 API 서버의 관리 패널에서 할 수 있습니다. 로그인할 때마다 웹 세션용 키가 새로 발급됩니다.',
                                }),
                                (0, b.jsxs)('p', { className: 'font-mono', children: [a, '/panel'] }),
                            ],
                        }),
                        (0, b.jsxs)(g, {
                            title: 'MCP',
                            contentClassName: 'flex flex-col gap-2 text-xs',
                            children: [
                                (0, b.jsx)('p', {
                                    className: 'text-muted-foreground',
                                    children: 'AI 클라이언트는 같은 API 키로 MCP 엔드포인트에 접속할 수 있습니다.',
                                }),
                                (0, b.jsxs)('p', { className: 'font-mono', children: [a, '/mcp'] }),
                            ],
                        }),
                    ],
                })
            }
        a.s(['default', 0, j], 53754)
    },
    51177,
    function (a) {
        a.n(a.i(53754))
    },
    27470,
    (a) => {
        a.v('/_next/static/media/icon.18bhl_ei_t2dp.svg' + (globalThis.NEXT_CLIENT_ASSET_SUFFIX || ''))
    },
    21192,
    (a) => {
        'use strict'
        let b = { src: a.i(27470).default, width: 32, height: 32 }
        a.s(['default', 0, b])
    },
    23872,
    (a) => {
        'use strict'
        var b = a.i(76319),
            c = a.i(91870),
            d = a.i(43471)
        a.i(81217)
        let e = (0, b.instrumentModuleGetter)(() => a.r(21192)),
            f = (0, b.instrumentModuleGetter)(() => a.r(44665)),
            g = (0, b.instrumentModuleGetter)(() => a.r(16013)),
            h = (0, b.instrumentModuleGetter)(() => a.r(72835)),
            i = (0, b.instrumentModuleGetter)(() => a.r(67921)),
            j = (0, b.instrumentModuleGetter)(() => a.r(23197)),
            k = (0, b.instrumentModuleGetter)(() => a.r(81140)),
            l = (0, b.instrumentModuleGetter)(() => a.r(75167)),
            m = (0, b.instrumentModuleGetter)(() => a.r(16013)),
            n = (0, b.instrumentModuleGetter)(() => a.r(72835)),
            o = (0, b.instrumentModuleGetter)(() => a.r(67921)),
            p = [
                '',
                {
                    children: [
                        '(shell)',
                        {
                            children: [
                                'settings',
                                {
                                    children: [
                                        '__PAGE__',
                                        {},
                                        {
                                            metadata: {},
                                            page: [
                                                (0, b.instrumentModuleGetter)(() => a.r(51177)),
                                                '[project]/apps/web/app/(shell)/settings/page.tsx',
                                            ],
                                        },
                                        [],
                                    ],
                                },
                                { metadata: {} },
                                [],
                            ],
                        },
                        {
                            metadata: {},
                            layout: [k, '[project]/apps/web/app/(shell)/layout.tsx'],
                            error: [l, '[project]/apps/web/app/(shell)/error.tsx'],
                            'not-found': [
                                m,
                                '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/not-found.js',
                            ],
                            forbidden: [
                                n,
                                '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/forbidden.js',
                            ],
                            unauthorized: [
                                o,
                                '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/unauthorized.js',
                            ],
                        },
                        [],
                    ],
                },
                {
                    metadata: {
                        icon: [
                            async () => {
                                let a = (0, d.interopDefault)(await e())
                                return [{ url: `/icon.svg?${a.src.split('/').splice(-1)[0]}`, sizes: 'any', type: 'image/svg+xml' }]
                            },
                        ],
                    },
                    layout: [f, '[project]/apps/web/app/layout.tsx'],
                    'not-found': [
                        g,
                        '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/not-found.js',
                    ],
                    forbidden: [
                        h,
                        '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/forbidden.js',
                    ],
                    unauthorized: [
                        i,
                        '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/unauthorized.js',
                    ],
                    'global-error': [
                        j,
                        '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/global-error.js',
                    ],
                },
                [],
            ],
            q = a.r.bind(a),
            r = a.l.bind(a),
            s = (0, c.createAppPageEntrypoint)({
                tree: p,
                page: '/(shell)/settings/page',
                pathname: '/settings',
                require: q,
                loadChunk: r,
                interopDefault: d.interopDefault,
            }),
            t = s.__next_app__,
            u = s.routeModule,
            v = s.handler
        ;(a.s(['__next_app__', 0, t, 'handler', 0, v, 'routeModule', 0, u], 31109), a.i(31109))
        var w = a.i(67872)
        a.s(
            [
                'ClientPageRoot',
                () => w.ClientPageRoot,
                'ClientSegmentRoot',
                () => w.ClientSegmentRoot,
                'Fragment',
                () => w.Fragment,
                'HTTPAccessFallbackBoundary',
                () => w.HTTPAccessFallbackBoundary,
                'InstantValidation',
                () => w.InstantValidation,
                'LayoutRouter',
                () => w.LayoutRouter,
                'LoadingBoundaryProvider',
                () => w.LoadingBoundaryProvider,
                'Postpone',
                () => w.Postpone,
                'RenderFromTemplateContext',
                () => w.RenderFromTemplateContext,
                'RootLayoutBoundary',
                () => w.RootLayoutBoundary,
                'SegmentViewNode',
                () => w.SegmentViewNode,
                'SegmentViewStateNode',
                () => w.SegmentViewStateNode,
                '__next_app__',
                0,
                t,
                'captureOwnerStack',
                () => w.captureOwnerStack,
                'collectPrefetchHints',
                () => w.collectPrefetchHints,
                'collectSegmentData',
                () => w.collectSegmentData,
                'createElement',
                () => w.createElement,
                'createMetadataComponents',
                () => w.createMetadataComponents,
                'createPrerenderParamsForClientSegment',
                () => w.createPrerenderParamsForClientSegment,
                'createPrerenderSearchParamsForClientPage',
                () => w.createPrerenderSearchParamsForClientPage,
                'createServerParamsForServerSegment',
                () => w.createServerParamsForServerSegment,
                'createServerSearchParamsForServerPage',
                () => w.createServerSearchParamsForServerPage,
                'createTemporaryReferenceSet',
                () => w.createTemporaryReferenceSet,
                'decodeAction',
                () => w.decodeAction,
                'decodeFormState',
                () => w.decodeFormState,
                'decodeReply',
                () => w.decodeReply,
                'handler',
                0,
                v,
                'isEmptyHTMLPrelude',
                () => w.isEmptyHTMLPrelude,
                'patchFetch',
                () => w.patchFetch,
                'preconnect',
                () => w.preconnect,
                'preloadFont',
                () => w.preloadFont,
                'preloadStyle',
                () => w.preloadStyle,
                'prerender',
                () => w.prerender,
                'prerenderToNodeStream',
                () => w.prerenderToNodeStream,
                'renderToPipeableStream',
                () => w.renderToPipeableStream,
                'renderToReadableStream',
                () => w.renderToReadableStream,
                'routeModule',
                0,
                u,
                'serverHooks',
                () => w.serverHooks,
                'taintObjectReference',
                () => w.taintObjectReference,
            ],
            23872,
        )
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__062op_j._.js.map
