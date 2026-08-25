module.exports = [
    93695,
    (a, b, c) => {
        b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
    },
    90031,
    (a) => {
        'use strict'
        var b = a.i(88870),
            c = a.i(20387),
            d = a.i(33767),
            e = a.i(1346),
            f = a.i(60778),
            g = a.i(94521),
            h = a.i(33052)
        let i = async ({ searchParams: a }) => {
            let { page: i, q: j } = await a,
                k = { q: j || void 0, page: Math.max(Number(i ?? '1') || 1, 1), limit: h.DEFAULT_PAGE_LIMIT },
                l = new e.QueryClient()
            return (
                await l.prefetchQuery((0, f.messageSearchQueryOptions)(k)),
                (0, b.jsx)(d.HydrationBoundary, { state: (0, c.dehydrate)(l), children: (0, b.jsx)(g.MessageSearchWidget, { params: k }) })
            )
        }
        a.s(['default', 0, i])
    },
    41687,
    function (a) {
        a.n(a.i(90031))
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
    60778,
    (a) => {
        'use strict'
        var b = a.i(5686)
        a.i(48785)
        var c = a.i(27312)
        let d = c.z.object({
            sourceRowId: c.z.number(),
            guid: c.z.string(),
            chatSourceRowId: c.z.number().nullable(),
            senderAddress: c.z.string().nullable(),
            isFromMe: c.z.boolean(),
            text: c.z.string().nullable(),
            service: c.z.string().nullable(),
            sentAt: c.z.string(),
            hasAttachments: c.z.boolean(),
        })
        var e = a.i(39293),
            f = a.i(78125),
            g = a.i(58944)
        let h = (a) => {
            let b = (0, f.paginatedEnvelopeSchema)(d).parse(a)
            return { data: b.data, pagination: b.pagination }
        }
        a.s(
            [
                'chatMessagesQueryOptions',
                0,
                (a, c) =>
                    (0, b.queryOptions)({
                        queryKey: e.QUERY_KEY.CHAT.MESSAGES(a, c),
                        queryFn: async () => h(await (0, g.apiFetch)(`/chats/${a}/messages?page=${c.page}&limit=${c.limit}`)),
                    }),
                'messageSearchQueryOptions',
                0,
                (a) =>
                    (0, b.queryOptions)({
                        queryKey: e.QUERY_KEY.MESSAGE.SEARCH(a),
                        queryFn: async () => {
                            let b = new URLSearchParams({ page: String(a.page), limit: String(a.limit) })
                            return (a.q && b.set('q', a.q), h(await (0, g.apiFetch)(`/messages?${b.toString()}`)))
                        },
                    }),
            ],
            60778,
        )
    },
    33052,
    (a) => {
        'use strict'
        a.s(['CHAT_MESSAGES_PAGE_LIMIT', 0, 50, 'DEFAULT_PAGE_LIMIT', 0, 20])
    },
    48759,
    (a) => {
        'use strict'
        a.s(['MessageSearchWidget', () => b])
        let b = (0, a.i(22227).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call MessageSearchWidget() from the server but MessageSearchWidget is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                )
            },
            '[project]/apps/web/widgets/message-search/message-search.tsx',
            'MessageSearchWidget',
        )
    },
    94521,
    (a) => {
        'use strict'
        var b = a.i(48759)
        a.n(b)
    },
    61100,
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
            p = (0, b.instrumentModuleGetter)(() => a.r(17038)),
            q = [
                '',
                {
                    children: [
                        '(shell)',
                        {
                            children: [
                                'messages',
                                {
                                    children: [
                                        '__PAGE__',
                                        {},
                                        {
                                            metadata: {},
                                            page: [
                                                (0, b.instrumentModuleGetter)(() => a.r(41687)),
                                                '[project]/apps/web/app/(shell)/messages/page.tsx',
                                            ],
                                        },
                                        [],
                                    ],
                                },
                                { metadata: {}, loading: [p, '[project]/apps/web/app/(shell)/messages/loading.tsx'] },
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
                page: '/(shell)/messages/page',
                pathname: '/messages',
                require: r,
                loadChunk: s,
                interopDefault: d.interopDefault,
            }),
            u = t.__next_app__,
            v = t.routeModule,
            w = t.handler
        ;(a.s(['__next_app__', 0, u, 'handler', 0, w, 'routeModule', 0, v], 35833), a.i(35833))
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
            61100,
        )
    },
    69096,
    (a) => {
        a.v((a) => Promise.resolve().then(() => a(85634)))
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__1_j3ha6._.js.map
