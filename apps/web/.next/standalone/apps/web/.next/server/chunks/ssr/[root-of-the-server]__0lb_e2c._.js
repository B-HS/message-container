module.exports = [
    93695,
    (a, b, c) => {
        b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
    },
    66880,
    (a) => {
        'use strict'
        var b = a.i(88870)
        a.i(54453)
        var c = a.i(63636),
            d = a.i(20387),
            e = a.i(33767),
            f = a.i(1346),
            g = a.i(94863),
            h = a.i(60778),
            i = a.i(55923),
            j = a.i(33052)
        let k = async ({ params: a, searchParams: k }) => {
            let { id: l } = await a,
                { page: m } = await k,
                n = Number(l)
            ;(!Number.isInteger(n) || n <= 0) && (0, c.notFound)()
            let o = { page: Math.max(Number(m ?? '1') || 1, 1), limit: j.CHAT_MESSAGES_PAGE_LIMIT },
                p = new f.QueryClient()
            return (
                await Promise.all([p.prefetchQuery((0, g.chatDetailQueryOptions)(n)), p.prefetchQuery((0, h.chatMessagesQueryOptions)(n, o))]),
                (0, b.jsx)(e.HydrationBoundary, { state: (0, d.dehydrate)(p), children: (0, b.jsx)(i.ChatMessagesWidget, { chatId: n, params: o }) })
            )
        }
        a.s(['default', 0, k])
    },
    16985,
    function (a) {
        a.n(a.i(66880))
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
    32647,
    (a) => {
        'use strict'
        a.s(['ChatMessagesWidget', () => b])
        let b = (0, a.i(22227).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call ChatMessagesWidget() from the server but ChatMessagesWidget is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                )
            },
            '[project]/apps/web/widgets/chat-messages/chat-messages.tsx',
            'ChatMessagesWidget',
        )
    },
    55923,
    (a) => {
        'use strict'
        var b = a.i(32647)
        a.n(b)
    },
    88786,
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
            o = (0, b.instrumentModuleGetter)(() => a.r(65491)),
            p = [
                '',
                {
                    children: [
                        '(shell)',
                        {
                            children: [
                                'chats',
                                {
                                    children: [
                                        '[id]',
                                        {
                                            children: [
                                                '__PAGE__',
                                                {},
                                                {
                                                    metadata: {},
                                                    page: [
                                                        (0, b.instrumentModuleGetter)(() => a.r(16985)),
                                                        '[project]/apps/web/app/(shell)/chats/[id]/page.tsx',
                                                    ],
                                                },
                                                [],
                                            ],
                                        },
                                        { metadata: {}, loading: [o, '[project]/apps/web/app/(shell)/chats/[id]/loading.tsx'] },
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
            q = a.r.bind(a),
            r = a.l.bind(a),
            s = (0, c.createAppPageEntrypoint)({
                tree: p,
                page: '/(shell)/chats/[id]/page',
                pathname: '/chats/[id]',
                require: q,
                loadChunk: r,
                interopDefault: d.interopDefault,
            }),
            t = s.__next_app__,
            u = s.routeModule,
            v = s.handler
        ;(a.s(['__next_app__', 0, t, 'handler', 0, v, 'routeModule', 0, u], 82955), a.i(82955))
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
            88786,
        )
    },
    69096,
    (a) => {
        a.v((a) => Promise.resolve().then(() => a(85634)))
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__0lb_e2c._.js.map
