module.exports = [
    93695,
    (a, b, c) => {
        b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
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
    35357,
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
            n = (0, b.instrumentModuleGetter)(() => a.r(79460)),
            o = [
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
                                { metadata: {}, loading: [n, '[project]/apps/web/app/(shell)/sync/loading.tsx'] },
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
            p = a.r.bind(a),
            q = a.l.bind(a),
            r = (0, c.createAppPageEntrypoint)({
                tree: o,
                page: '/(shell)/sync/page',
                pathname: '/sync',
                require: p,
                loadChunk: q,
                interopDefault: d.interopDefault,
            }),
            s = r.__next_app__,
            t = r.routeModule,
            u = r.handler
        ;(a.s(['__next_app__', 0, s, 'handler', 0, u, 'routeModule', 0, t], 80293), a.i(80293))
        var v = a.i(67872)
        a.s(
            [
                'ClientPageRoot',
                () => v.ClientPageRoot,
                'ClientSegmentRoot',
                () => v.ClientSegmentRoot,
                'Fragment',
                () => v.Fragment,
                'HTTPAccessFallbackBoundary',
                () => v.HTTPAccessFallbackBoundary,
                'InstantValidation',
                () => v.InstantValidation,
                'LayoutRouter',
                () => v.LayoutRouter,
                'LoadingBoundaryProvider',
                () => v.LoadingBoundaryProvider,
                'Postpone',
                () => v.Postpone,
                'RenderFromTemplateContext',
                () => v.RenderFromTemplateContext,
                'RootLayoutBoundary',
                () => v.RootLayoutBoundary,
                'SegmentViewNode',
                () => v.SegmentViewNode,
                'SegmentViewStateNode',
                () => v.SegmentViewStateNode,
                '__next_app__',
                0,
                s,
                'captureOwnerStack',
                () => v.captureOwnerStack,
                'collectPrefetchHints',
                () => v.collectPrefetchHints,
                'collectSegmentData',
                () => v.collectSegmentData,
                'createElement',
                () => v.createElement,
                'createMetadataComponents',
                () => v.createMetadataComponents,
                'createPrerenderParamsForClientSegment',
                () => v.createPrerenderParamsForClientSegment,
                'createPrerenderSearchParamsForClientPage',
                () => v.createPrerenderSearchParamsForClientPage,
                'createServerParamsForServerSegment',
                () => v.createServerParamsForServerSegment,
                'createServerSearchParamsForServerPage',
                () => v.createServerSearchParamsForServerPage,
                'createTemporaryReferenceSet',
                () => v.createTemporaryReferenceSet,
                'decodeAction',
                () => v.decodeAction,
                'decodeFormState',
                () => v.decodeFormState,
                'decodeReply',
                () => v.decodeReply,
                'handler',
                0,
                u,
                'isEmptyHTMLPrelude',
                () => v.isEmptyHTMLPrelude,
                'patchFetch',
                () => v.patchFetch,
                'preconnect',
                () => v.preconnect,
                'preloadFont',
                () => v.preloadFont,
                'preloadStyle',
                () => v.preloadStyle,
                'prerender',
                () => v.prerender,
                'prerenderToNodeStream',
                () => v.prerenderToNodeStream,
                'renderToPipeableStream',
                () => v.renderToPipeableStream,
                'renderToReadableStream',
                () => v.renderToReadableStream,
                'routeModule',
                0,
                t,
                'serverHooks',
                () => v.serverHooks,
                'taintObjectReference',
                () => v.taintObjectReference,
            ],
            35357,
        )
    },
    69096,
    (a) => {
        a.v((a) => Promise.resolve().then(() => a(85634)))
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__0mprywn._.js.map
