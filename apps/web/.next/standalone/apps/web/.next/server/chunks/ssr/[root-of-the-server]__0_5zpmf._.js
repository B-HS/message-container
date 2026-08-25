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
    90264,
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
                                '__PAGE__',
                                {},
                                { metadata: {}, page: [(0, b.instrumentModuleGetter)(() => a.r(79679)), '[project]/apps/web/app/(shell)/page.tsx'] },
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
                page: '/(shell)/page',
                pathname: '/',
                require: o,
                loadChunk: p,
                interopDefault: d.interopDefault,
            }),
            r = q.__next_app__,
            s = q.routeModule,
            t = q.handler
        ;(a.s(['__next_app__', 0, r, 'handler', 0, t, 'routeModule', 0, s], 50570), a.i(50570))
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
            90264,
        )
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__0_5zpmf._.js.map
