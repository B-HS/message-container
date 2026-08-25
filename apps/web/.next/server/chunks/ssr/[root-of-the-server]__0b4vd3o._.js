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
    78479,
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
            n = (0, b.instrumentModuleGetter)(() => a.r(17038)),
            o = [
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
                                { metadata: {}, loading: [n, '[project]/apps/web/app/(shell)/messages/loading.tsx'] },
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
                page: '/(shell)/messages/page',
                pathname: '/messages',
                require: p,
                loadChunk: q,
                interopDefault: d.interopDefault,
            }),
            s = r.__next_app__,
            t = r.routeModule,
            u = r.handler
        ;(a.s(['__next_app__', 0, s, 'handler', 0, u, 'routeModule', 0, t], 94628), a.i(94628))
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
            78479,
        )
    },
    69096,
    (a) => {
        a.v((a) => Promise.resolve().then(() => a(85634)))
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__0b4vd3o._.js.map
