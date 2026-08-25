module.exports = [
    93695,
    (a, b, c) => {
        b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
    },
    23246,
    (a) => {
        'use strict'
        var b = a.i(88870),
            c = a.i(20387),
            d = a.i(33767),
            e = a.i(1346),
            f = a.i(94863),
            g = a.i(59311),
            h = a.i(33052)
        let i = async ({ searchParams: a }) => {
            let { page: i } = await a,
                j = { page: Math.max(Number(i ?? '1') || 1, 1), limit: h.DEFAULT_PAGE_LIMIT },
                k = new e.QueryClient()
            return (
                await k.prefetchQuery((0, f.chatListQueryOptions)(j)),
                (0, b.jsx)(d.HydrationBoundary, { state: (0, c.dehydrate)(k), children: (0, b.jsx)(g.ChatListWidget, { params: j }) })
            )
        }
        a.s(['default', 0, i])
    },
    77663,
    function (a) {
        a.n(a.i(23246))
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
    94863,
    (a) => {
        'use strict'
        var b = a.i(5686)
        a.i(48785)
        var c = a.i(27312)
        let d = c.z.object({ address: c.z.string(), service: c.z.string().nullable() }),
            e = c.z.object({
                sourceRowId: c.z.number(),
                guid: c.z.string(),
                identifier: c.z.string().nullable(),
                serviceName: c.z.string().nullable(),
                displayName: c.z.string().nullable(),
                isGroup: c.z.boolean(),
                participants: c.z.array(d),
            })
        var f = a.i(39293),
            g = a.i(78125),
            h = a.i(58944)
        a.s(
            [
                'chatDetailQueryOptions',
                0,
                (a) =>
                    (0, b.queryOptions)({
                        queryKey: f.QUERY_KEY.CHAT.DETAIL(a),
                        queryFn: async () =>
                            (0, g.successEnvelopeSchema)(c.z.object({ chat: e })).parse(await (0, h.apiFetch)(`/chats/${a}`)).data.chat,
                    }),
                'chatListQueryOptions',
                0,
                (a) =>
                    (0, b.queryOptions)({
                        queryKey: f.QUERY_KEY.CHAT.LIST(a),
                        queryFn: async () => {
                            let b = (0, g.paginatedEnvelopeSchema)(e).parse(await (0, h.apiFetch)(`/chats?page=${a.page}&limit=${a.limit}`))
                            return { data: b.data, pagination: b.pagination }
                        },
                    }),
            ],
            94863,
        )
    },
    33052,
    (a) => {
        'use strict'
        a.s(['CHAT_MESSAGES_PAGE_LIMIT', 0, 50, 'DEFAULT_PAGE_LIMIT', 0, 20])
    },
    26485,
    (a) => {
        'use strict'
        a.s(['ChatListWidget', () => b])
        let b = (0, a.i(22227).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call ChatListWidget() from the server but ChatListWidget is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                )
            },
            '[project]/apps/web/widgets/chat-list/chat-list.tsx',
            'ChatListWidget',
        )
    },
    59311,
    (a) => {
        'use strict'
        var b = a.i(26485)
        a.n(b)
    },
    92134,
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
            p = (0, b.instrumentModuleGetter)(() => a.r(90760)),
            q = [
                '',
                {
                    children: [
                        '(shell)',
                        {
                            children: [
                                'chats',
                                {
                                    children: [
                                        '__PAGE__',
                                        {},
                                        {
                                            metadata: {},
                                            page: [(0, b.instrumentModuleGetter)(() => a.r(77663)), '[project]/apps/web/app/(shell)/chats/page.tsx'],
                                        },
                                        [],
                                    ],
                                },
                                { metadata: {}, loading: [p, '[project]/apps/web/app/(shell)/chats/loading.tsx'] },
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
                page: '/(shell)/chats/page',
                pathname: '/chats',
                require: r,
                loadChunk: s,
                interopDefault: d.interopDefault,
            }),
            u = t.__next_app__,
            v = t.routeModule,
            w = t.handler
        ;(a.s(['__next_app__', 0, u, 'handler', 0, w, 'routeModule', 0, v], 50311), a.i(50311))
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
            92134,
        )
    },
    69096,
    (a) => {
        a.v((a) => Promise.resolve().then(() => a(85634)))
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__10s6t9g._.js.map
