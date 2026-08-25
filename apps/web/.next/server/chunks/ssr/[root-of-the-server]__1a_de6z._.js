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
    94972,
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
            n = (0, b.instrumentModuleGetter)(() => a.r(90760)),
            o = [
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
                                { metadata: {}, loading: [n, '[project]/apps/web/app/(shell)/chats/loading.tsx'] },
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
                page: '/(shell)/chats/page',
                pathname: '/chats',
                require: p,
                loadChunk: q,
                interopDefault: d.interopDefault,
            }),
            s = r.__next_app__,
            t = r.routeModule,
            u = r.handler
        ;(a.s(['__next_app__', 0, s, 'handler', 0, u, 'routeModule', 0, t], 8168), a.i(8168))
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
            94972,
        )
    },
    69096,
    (a) => {
        a.v((a) => Promise.resolve().then(() => a(85634)))
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__1a_de6z._.js.map
