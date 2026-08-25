module.exports = [
    93695,
    (a, b, c) => {
        b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
    },
    50601,
    (a) => {
        'use strict'
        a.i(54453)
        var b = a.i(63636)
        a.s(['default', 0, () => (0, b.redirect)('/chats')])
    },
    79679,
    function (a) {
        a.n(a.i(50601))
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
    75405,
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
                                '__PAGE__',
                                {},
                                { metadata: {}, page: [(0, b.instrumentModuleGetter)(() => a.r(79679)), '[project]/apps/web/app/(shell)/page.tsx'] },
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
                page: '/(shell)/page',
                pathname: '/',
                require: q,
                loadChunk: r,
                interopDefault: d.interopDefault,
            }),
            t = s.__next_app__,
            u = s.routeModule,
            v = s.handler
        ;(a.s(['__next_app__', 0, t, 'handler', 0, v, 'routeModule', 0, u], 17042), a.i(17042))
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
            75405,
        )
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__16wq5ex._.js.map
