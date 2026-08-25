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
    78631,
    (a) => {
        'use strict'
        var b = a.i(76319),
            c = a.i(91870),
            d = a.i(43471)
        a.i(81217)
        let e = (0, b.instrumentModuleGetter)(() => a.r(44665)),
            f = (0, b.instrumentModuleGetter)(() => a.r(16013)),
            g = (0, b.instrumentModuleGetter)(() => a.r(72835)),
            h = (0, b.instrumentModuleGetter)(() => a.r(67921)),
            i = (0, b.instrumentModuleGetter)(() => a.r(23197)),
            j = (0, b.instrumentModuleGetter)(() => a.r(81140)),
            k = (0, b.instrumentModuleGetter)(() => a.r(16013)),
            l = (0, b.instrumentModuleGetter)(() => a.r(72835)),
            m = (0, b.instrumentModuleGetter)(() => a.r(67921)),
            n = [
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
                            layout: [j, '[project]/apps/web/app/(shell)/layout.tsx'],
                            'not-found': [
                                k,
                                '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/not-found.js',
                            ],
                            forbidden: [
                                l,
                                '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/forbidden.js',
                            ],
                            unauthorized: [
                                m,
                                '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/unauthorized.js',
                            ],
                        },
                        [],
                    ],
                },
                {
                    layout: [e, '[project]/apps/web/app/layout.tsx'],
                    'not-found': [
                        f,
                        '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/not-found.js',
                    ],
                    forbidden: [
                        g,
                        '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/forbidden.js',
                    ],
                    unauthorized: [
                        h,
                        '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/unauthorized.js',
                    ],
                    'global-error': [
                        i,
                        '[project]/node_modules/.bun/next@16.3.2+f291276adcc5d530/node_modules/next/dist/client/components/builtin/global-error.js',
                    ],
                },
                [],
            ],
            o = a.r.bind(a),
            p = a.l.bind(a),
            q = (0, c.createAppPageEntrypoint)({
                tree: n,
                page: '/(shell)/settings/page',
                pathname: '/settings',
                require: o,
                loadChunk: p,
                interopDefault: d.interopDefault,
            }),
            r = q.__next_app__,
            s = q.routeModule,
            t = q.handler
        ;(a.s(['__next_app__', 0, r, 'handler', 0, t, 'routeModule', 0, s], 57640), a.i(57640))
        var u = a.i(67872)
        a.s(
            [
                'ClientPageRoot',
                () => u.ClientPageRoot,
                'ClientSegmentRoot',
                () => u.ClientSegmentRoot,
                'Fragment',
                () => u.Fragment,
                'HTTPAccessFallbackBoundary',
                () => u.HTTPAccessFallbackBoundary,
                'InstantValidation',
                () => u.InstantValidation,
                'LayoutRouter',
                () => u.LayoutRouter,
                'LoadingBoundaryProvider',
                () => u.LoadingBoundaryProvider,
                'Postpone',
                () => u.Postpone,
                'RenderFromTemplateContext',
                () => u.RenderFromTemplateContext,
                'RootLayoutBoundary',
                () => u.RootLayoutBoundary,
                'SegmentViewNode',
                () => u.SegmentViewNode,
                'SegmentViewStateNode',
                () => u.SegmentViewStateNode,
                '__next_app__',
                0,
                r,
                'captureOwnerStack',
                () => u.captureOwnerStack,
                'collectPrefetchHints',
                () => u.collectPrefetchHints,
                'collectSegmentData',
                () => u.collectSegmentData,
                'createElement',
                () => u.createElement,
                'createMetadataComponents',
                () => u.createMetadataComponents,
                'createPrerenderParamsForClientSegment',
                () => u.createPrerenderParamsForClientSegment,
                'createPrerenderSearchParamsForClientPage',
                () => u.createPrerenderSearchParamsForClientPage,
                'createServerParamsForServerSegment',
                () => u.createServerParamsForServerSegment,
                'createServerSearchParamsForServerPage',
                () => u.createServerSearchParamsForServerPage,
                'createTemporaryReferenceSet',
                () => u.createTemporaryReferenceSet,
                'decodeAction',
                () => u.decodeAction,
                'decodeFormState',
                () => u.decodeFormState,
                'decodeReply',
                () => u.decodeReply,
                'handler',
                0,
                t,
                'isEmptyHTMLPrelude',
                () => u.isEmptyHTMLPrelude,
                'patchFetch',
                () => u.patchFetch,
                'preconnect',
                () => u.preconnect,
                'preloadFont',
                () => u.preloadFont,
                'preloadStyle',
                () => u.preloadStyle,
                'prerender',
                () => u.prerender,
                'prerenderToNodeStream',
                () => u.prerenderToNodeStream,
                'renderToPipeableStream',
                () => u.renderToPipeableStream,
                'renderToReadableStream',
                () => u.renderToReadableStream,
                'routeModule',
                0,
                s,
                'serverHooks',
                () => u.serverHooks,
                'taintObjectReference',
                () => u.taintObjectReference,
            ],
            78631,
        )
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__1077kv2._.js.map
