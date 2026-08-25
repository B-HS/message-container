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
    33877,
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
            q = (0, b.instrumentModuleGetter)(() => a.r(65491)),
            r = [
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
                                        { metadata: {}, loading: [q, '[project]/apps/web/app/(shell)/chats/[id]/loading.tsx'] },
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
            s = a.r.bind(a),
            t = a.l.bind(a),
            u = (0, c.createAppPageEntrypoint)({
                tree: r,
                page: '/(shell)/chats/[id]/page',
                pathname: '/chats/[id]',
                require: s,
                loadChunk: t,
                interopDefault: d.interopDefault,
            }),
            v = u.__next_app__,
            w = u.routeModule,
            x = u.handler
        ;(a.s(['__next_app__', 0, v, 'handler', 0, x, 'routeModule', 0, w], 36258), a.i(36258))
        var y = a.i(67872)
        a.s(
            [
                'ClientPageRoot',
                () => y.ClientPageRoot,
                'ClientSegmentRoot',
                () => y.ClientSegmentRoot,
                'Fragment',
                () => y.Fragment,
                'HTTPAccessFallbackBoundary',
                () => y.HTTPAccessFallbackBoundary,
                'InstantValidation',
                () => y.InstantValidation,
                'LayoutRouter',
                () => y.LayoutRouter,
                'LoadingBoundaryProvider',
                () => y.LoadingBoundaryProvider,
                'Postpone',
                () => y.Postpone,
                'RenderFromTemplateContext',
                () => y.RenderFromTemplateContext,
                'RootLayoutBoundary',
                () => y.RootLayoutBoundary,
                'SegmentViewNode',
                () => y.SegmentViewNode,
                'SegmentViewStateNode',
                () => y.SegmentViewStateNode,
                '__next_app__',
                0,
                v,
                'captureOwnerStack',
                () => y.captureOwnerStack,
                'collectPrefetchHints',
                () => y.collectPrefetchHints,
                'collectSegmentData',
                () => y.collectSegmentData,
                'createElement',
                () => y.createElement,
                'createMetadataComponents',
                () => y.createMetadataComponents,
                'createPrerenderParamsForClientSegment',
                () => y.createPrerenderParamsForClientSegment,
                'createPrerenderSearchParamsForClientPage',
                () => y.createPrerenderSearchParamsForClientPage,
                'createServerParamsForServerSegment',
                () => y.createServerParamsForServerSegment,
                'createServerSearchParamsForServerPage',
                () => y.createServerSearchParamsForServerPage,
                'createTemporaryReferenceSet',
                () => y.createTemporaryReferenceSet,
                'decodeAction',
                () => y.decodeAction,
                'decodeFormState',
                () => y.decodeFormState,
                'decodeReply',
                () => y.decodeReply,
                'handler',
                0,
                x,
                'isEmptyHTMLPrelude',
                () => y.isEmptyHTMLPrelude,
                'patchFetch',
                () => y.patchFetch,
                'preconnect',
                () => y.preconnect,
                'preloadFont',
                () => y.preloadFont,
                'preloadStyle',
                () => y.preloadStyle,
                'prerender',
                () => y.prerender,
                'prerenderToNodeStream',
                () => y.prerenderToNodeStream,
                'renderToPipeableStream',
                () => y.renderToPipeableStream,
                'renderToReadableStream',
                () => y.renderToReadableStream,
                'routeModule',
                0,
                w,
                'serverHooks',
                () => y.serverHooks,
                'taintObjectReference',
                () => y.taintObjectReference,
            ],
            33877,
        )
    },
    69096,
    (a) => {
        a.v((a) => Promise.resolve().then(() => a(85634)))
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__0_geog5._.js.map
