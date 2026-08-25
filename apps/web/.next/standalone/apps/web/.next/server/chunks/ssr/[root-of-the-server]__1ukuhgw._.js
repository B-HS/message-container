module.exports = [
    93695,
    (a, b, c) => {
        b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
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
    99732,
    (a) => {
        'use strict'
        a.s(['SyncStatusWidget', () => b])
        let b = (0, a.i(22227).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call SyncStatusWidget() from the server but SyncStatusWidget is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                )
            },
            '[project]/apps/web/widgets/sync-status/sync-status.tsx',
            'SyncStatusWidget',
        )
    },
    47151,
    (a) => {
        'use strict'
        var b = a.i(99732)
        a.n(b)
    },
    68067,
    (a) => {
        'use strict'
        var b = a.i(88870),
            c = a.i(20387),
            d = a.i(33767),
            e = a.i(1346),
            f = a.i(5686)
        ;(a.i(29136), a.i(76266), a.i(48785))
        var g = a.i(27312)
        let h = g.z.object({
            cursor: g.z.number(),
            lastSyncAt: g.z.string().nullable(),
            lastError: g.z.string().nullable(),
            counts: g.z.object({ chats: g.z.number(), messages: g.z.number(), attachments: g.z.number() }),
        })
        var i = a.i(39293),
            j = a.i(78125),
            k = a.i(58944),
            l = a.i(47151)
        let m = async () => {
            let a = new e.QueryClient()
            return (
                await a.prefetchQuery(
                    (0, f.queryOptions)({
                        queryKey: i.QUERY_KEY.SYNC.STATUS,
                        queryFn: async () => (0, j.successEnvelopeSchema)(h).parse(await (0, k.apiFetch)('/sync/status')).data,
                    }),
                ),
                (0, b.jsx)(d.HydrationBoundary, { state: (0, c.dehydrate)(a), children: (0, b.jsx)(l.SyncStatusWidget, {}) })
            )
        }
        a.s(['default', 0, m], 68067)
    },
    78501,
    function (a) {
        a.n(a.i(68067))
    },
    94598,
    (a) => {
        'use strict'
        a.s(['QueryClientContext', () => c, 'QueryClientProvider', () => d, 'useQueryClient', () => e])
        var b = a.i(22227)
        let c = (0, b.registerClientReference)(
                function () {
                    throw Error(
                        "Attempted to call QueryClientContext() from the server but QueryClientContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                    )
                },
                '[project]/node_modules/.bun/@tanstack+react-query@5.102.3+0f58469d5b3bd39f/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js',
                'QueryClientContext',
            ),
            d = (0, b.registerClientReference)(
                function () {
                    throw Error(
                        "Attempted to call QueryClientProvider() from the server but QueryClientProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                    )
                },
                '[project]/node_modules/.bun/@tanstack+react-query@5.102.3+0f58469d5b3bd39f/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js',
                'QueryClientProvider',
            ),
            e = (0, b.registerClientReference)(
                function () {
                    throw Error(
                        "Attempted to call useQueryClient() from the server but useQueryClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                    )
                },
                '[project]/node_modules/.bun/@tanstack+react-query@5.102.3+0f58469d5b3bd39f/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js',
                'useQueryClient',
            )
    },
    76266,
    (a) => {
        'use strict'
        var b = a.i(94598)
        a.n(b)
    },
    60324,
    (a) => {
        'use strict'
        a.s(['useMutation', () => b])
        let b = (0, a.i(22227).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call useMutation() from the server but useMutation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                )
            },
            '[project]/node_modules/.bun/@tanstack+react-query@5.102.3+0f58469d5b3bd39f/node_modules/@tanstack/react-query/build/modern/useMutation.js',
            'useMutation',
        )
    },
    29136,
    (a) => {
        'use strict'
        var b = a.i(60324)
        a.n(b)
    },
    10279,
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
            p = (0, b.instrumentModuleGetter)(() => a.r(79460)),
            q = [
                '',
                {
                    children: [
                        '(shell)',
                        {
                            children: [
                                'sync',
                                {
                                    children: [
                                        '__PAGE__',
                                        {},
                                        {
                                            metadata: {},
                                            page: [(0, b.instrumentModuleGetter)(() => a.r(78501)), '[project]/apps/web/app/(shell)/sync/page.tsx'],
                                        },
                                        [],
                                    ],
                                },
                                { metadata: {}, loading: [p, '[project]/apps/web/app/(shell)/sync/loading.tsx'] },
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
            r = a.r.bind(a),
            s = a.l.bind(a),
            t = (0, c.createAppPageEntrypoint)({
                tree: q,
                page: '/(shell)/sync/page',
                pathname: '/sync',
                require: r,
                loadChunk: s,
                interopDefault: d.interopDefault,
            }),
            u = t.__next_app__,
            v = t.routeModule,
            w = t.handler
        ;(a.s(['__next_app__', 0, u, 'handler', 0, w, 'routeModule', 0, v], 12674), a.i(12674))
        var x = a.i(67872)
        a.s(
            [
                'ClientPageRoot',
                () => x.ClientPageRoot,
                'ClientSegmentRoot',
                () => x.ClientSegmentRoot,
                'Fragment',
                () => x.Fragment,
                'HTTPAccessFallbackBoundary',
                () => x.HTTPAccessFallbackBoundary,
                'InstantValidation',
                () => x.InstantValidation,
                'LayoutRouter',
                () => x.LayoutRouter,
                'LoadingBoundaryProvider',
                () => x.LoadingBoundaryProvider,
                'Postpone',
                () => x.Postpone,
                'RenderFromTemplateContext',
                () => x.RenderFromTemplateContext,
                'RootLayoutBoundary',
                () => x.RootLayoutBoundary,
                'SegmentViewNode',
                () => x.SegmentViewNode,
                'SegmentViewStateNode',
                () => x.SegmentViewStateNode,
                '__next_app__',
                0,
                u,
                'captureOwnerStack',
                () => x.captureOwnerStack,
                'collectPrefetchHints',
                () => x.collectPrefetchHints,
                'collectSegmentData',
                () => x.collectSegmentData,
                'createElement',
                () => x.createElement,
                'createMetadataComponents',
                () => x.createMetadataComponents,
                'createPrerenderParamsForClientSegment',
                () => x.createPrerenderParamsForClientSegment,
                'createPrerenderSearchParamsForClientPage',
                () => x.createPrerenderSearchParamsForClientPage,
                'createServerParamsForServerSegment',
                () => x.createServerParamsForServerSegment,
                'createServerSearchParamsForServerPage',
                () => x.createServerSearchParamsForServerPage,
                'createTemporaryReferenceSet',
                () => x.createTemporaryReferenceSet,
                'decodeAction',
                () => x.decodeAction,
                'decodeFormState',
                () => x.decodeFormState,
                'decodeReply',
                () => x.decodeReply,
                'handler',
                0,
                w,
                'isEmptyHTMLPrelude',
                () => x.isEmptyHTMLPrelude,
                'patchFetch',
                () => x.patchFetch,
                'preconnect',
                () => x.preconnect,
                'preloadFont',
                () => x.preloadFont,
                'preloadStyle',
                () => x.preloadStyle,
                'prerender',
                () => x.prerender,
                'prerenderToNodeStream',
                () => x.prerenderToNodeStream,
                'renderToPipeableStream',
                () => x.renderToPipeableStream,
                'renderToReadableStream',
                () => x.renderToReadableStream,
                'routeModule',
                0,
                v,
                'serverHooks',
                () => x.serverHooks,
                'taintObjectReference',
                () => x.taintObjectReference,
            ],
            10279,
        )
    },
    69096,
    (a) => {
        a.v((a) => Promise.resolve().then(() => a(85634)))
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__1ukuhgw._.js.map
