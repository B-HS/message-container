module.exports = [
    93695,
    (a, b, c) => {
        b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
    },
    90027,
    (a) => {
        'use strict'
        var b = a.i(88870),
            c = a.i(85634)
        a.i(54453)
        var d = a.i(63636),
            e = a.i(27312),
            f = a.i(69001),
            g = a.i(23461)
        let h = e.z.object({ success: e.z.literal(!0), data: e.z.object({ passwordSet: e.z.boolean() }) }),
            i = async () => {
                ;(await (0, c.cookies)()).get(g.API_KEY_COOKIE_NAME) && (0, d.redirect)('/chats')
                let a = process.env.MESSAGE_API_URL ?? 'http://localhost:3000',
                    e = null
                try {
                    let b = await fetch(`${a}/api/auth/status`, { cache: 'no-store' })
                    e = h.parse(await b.json()).data.passwordSet
                } catch {
                    e = null
                }
                return (0, b.jsx)('div', {
                    className: 'grid min-h-dvh place-items-center bg-background p-4',
                    children: (0, b.jsxs)('div', {
                        className: 'flex w-full max-w-sm flex-col gap-4 bg-card p-6',
                        children: [
                            (0, b.jsx)('h1', { className: 'text-xl font-semibold tracking-tight', children: 'message-container' }),
                            null === e
                                ? (0, b.jsxs)('p', {
                                      className: 'text-xs text-destructive',
                                      children: ['API 서버(', a, ')에 연결할 수 없습니다. 컨테이너 상태를 확인하세요.'],
                                  })
                                : (0, b.jsxs)(b.Fragment, {
                                      children: [
                                          (0, b.jsx)('p', {
                                              className: 'text-xs text-muted-foreground',
                                              children: e
                                                  ? '설정한 패스워드로 로그인하세요.'
                                                  : '처음 사용합니다. 관리에 사용할 패스워드를 설정하세요.',
                                          }),
                                          (0, b.jsx)(f.SetupForm, { mode: e ? 'login' : 'setup' }),
                                      ],
                                  }),
                        ],
                    }),
                })
            }
        a.s(['default', 0, i])
    },
    36575,
    function (a) {
        a.n(a.i(90027))
    },
    23461,
    (a) => {
        'use strict'
        a.s(['API_KEY_COOKIE_NAME', 0, 'mc_api_key'])
    },
    52157,
    (a) => {
        'use strict'
        a.s(['SetupForm', () => b])
        let b = (0, a.i(22227).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call SetupForm() from the server but SetupForm is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                )
            },
            '[project]/apps/web/widgets/setup/setup-form.tsx',
            'SetupForm',
        )
    },
    69001,
    (a) => {
        'use strict'
        var b = a.i(52157)
        a.n(b)
    },
    54453,
    (a) => {
        'use strict'
        ;(a.i(63636), a.s([]))
    },
    40809,
    (a, b, c) => {
        'use strict'
        ;(Object.defineProperty(c, '__esModule', { value: !0 }),
            Object.defineProperty(c, 'isNextRouterError', {
                enumerable: !0,
                get: function () {
                    return f
                },
            }))
        let d = a.r(70786),
            e = a.r(99285)
        function f(a) {
            return (0, e.isRedirectError)(a) || (0, d.isHTTPAccessFallbackError)(a)
        }
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    78002,
    (a, b, c) => {
        'use strict'
        ;(Object.defineProperty(c, '__esModule', { value: !0 }),
            Object.defineProperty(c, 'ReadonlyURLSearchParams', {
                enumerable: !0,
                get: function () {
                    return e
                },
            }))
        class d extends Error {
            constructor() {
                ;(super(
                    'Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams',
                ),
                    Object.defineProperty(this, '__NEXT_ERROR_CODE', { value: 'E1174', enumerable: !1, configurable: !0 }))
            }
        }
        class e extends URLSearchParams {
            append() {
                throw new d()
            }
            delete() {
                throw new d()
            }
            set() {
                throw new d()
            }
            sort() {
                throw new d()
            }
        }
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    50958,
    (a, b, c) => {
        'use strict'
        ;(Object.defineProperty(c, '__esModule', { value: !0 }),
            Object.defineProperty(c, 'RedirectStatusCode', {
                enumerable: !0,
                get: function () {
                    return e
                },
            }))
        var d,
            e =
                (((d = {})[(d.SeeOther = 303)] = 'SeeOther'),
                (d[(d.TemporaryRedirect = 307)] = 'TemporaryRedirect'),
                (d[(d.PermanentRedirect = 308)] = 'PermanentRedirect'),
                d)
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    99285,
    (a, b, c) => {
        'use strict'
        Object.defineProperty(c, '__esModule', { value: !0 })
        var d = {
            REDIRECT_ERROR_CODE: function () {
                return g
            },
            isRedirectError: function () {
                return h
            },
        }
        for (var e in d) Object.defineProperty(c, e, { enumerable: !0, get: d[e] })
        let f = a.r(50958),
            g = 'NEXT_REDIRECT'
        function h(a) {
            if ('object' != typeof a || null === a || !('digest' in a) || 'string' != typeof a.digest) return !1
            let b = a.digest.split(';'),
                [c, d] = b,
                e = b.slice(2, -2).join(';'),
                h = Number(b.at(-2))
            return c === g && ('replace' === d || 'push' === d) && 'string' == typeof e && !isNaN(h) && h in f.RedirectStatusCode
        }
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    2107,
    (a, b, c) => {
        'use strict'
        Object.defineProperty(c, '__esModule', { value: !0 })
        var d = {
            actionAsyncStorage: function () {
                return f.actionAsyncStorage
            },
            workAsyncStorage: function () {
                return g.workAsyncStorage
            },
            workUnitAsyncStorage: function () {
                return h.workUnitAsyncStorage
            },
        }
        for (var e in d) Object.defineProperty(c, e, { enumerable: !0, get: d[e] })
        let f = a.r(20635),
            g = a.r(56704),
            h = a.r(32319)
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    965,
    (a, b, c) => {
        'use strict'
        Object.defineProperty(c, '__esModule', { value: !0 })
        var d = {
            getRedirectError: function () {
                return i
            },
            getRedirectStatusCodeFromError: function () {
                return n
            },
            getRedirectTypeFromError: function () {
                return m
            },
            getURLFromRedirectError: function () {
                return l
            },
            permanentRedirect: function () {
                return k
            },
            redirect: function () {
                return j
            },
        }
        for (var e in d) Object.defineProperty(c, e, { enumerable: !0, get: d[e] })
        let f = a.r(50958),
            g = a.r(99285),
            h = a.r(2107)
        function i(a, b, c = f.RedirectStatusCode.TemporaryRedirect) {
            let d = Object.defineProperty(Error(g.REDIRECT_ERROR_CODE), '__NEXT_ERROR_CODE', { value: 'E394', enumerable: !1, configurable: !0 })
            return ((d.digest = `${g.REDIRECT_ERROR_CODE};${b};${a};${c};`), d)
        }
        function j(a, b) {
            throw i(a, (b ??= h.actionAsyncStorage?.getStore()?.isAction ? 'push' : 'replace'), f.RedirectStatusCode.TemporaryRedirect)
        }
        function k(a, b = 'replace') {
            throw i(a, b, f.RedirectStatusCode.PermanentRedirect)
        }
        function l(a) {
            return (0, g.isRedirectError)(a) ? a.digest.split(';').slice(2, -2).join(';') : null
        }
        function m(a) {
            if (!(0, g.isRedirectError)(a))
                throw Object.defineProperty(Error('Not a redirect error'), '__NEXT_ERROR_CODE', { value: 'E260', enumerable: !1, configurable: !0 })
            return a.digest.split(';', 2)[1]
        }
        function n(a) {
            if (!(0, g.isRedirectError)(a))
                throw Object.defineProperty(Error('Not a redirect error'), '__NEXT_ERROR_CODE', { value: 'E260', enumerable: !1, configurable: !0 })
            return Number(a.digest.split(';').at(-2))
        }
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    70786,
    (a, b, c) => {
        'use strict'
        Object.defineProperty(c, '__esModule', { value: !0 })
        var d = {
            HTTPAccessErrorStatus: function () {
                return f
            },
            HTTP_ERROR_FALLBACK_ERROR_CODE: function () {
                return h
            },
            getAccessFallbackErrorTypeByStatus: function () {
                return k
            },
            getAccessFallbackHTTPStatus: function () {
                return j
            },
            isHTTPAccessFallbackError: function () {
                return i
            },
        }
        for (var e in d) Object.defineProperty(c, e, { enumerable: !0, get: d[e] })
        let f = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 },
            g = new Set(Object.values(f)),
            h = 'NEXT_HTTP_ERROR_FALLBACK'
        function i(a) {
            if ('object' != typeof a || null === a || !('digest' in a) || 'string' != typeof a.digest) return !1
            let [b, c] = a.digest.split(';')
            return b === h && g.has(Number(c))
        }
        function j(a) {
            return Number(a.digest.split(';')[1])
        }
        function k(a) {
            switch (a) {
                case 401:
                    return 'unauthorized'
                case 403:
                    return 'forbidden'
                case 404:
                    return 'not-found'
                default:
                    return
            }
        }
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    24649,
    (a, b, c) => {
        'use strict'
        ;(Object.defineProperty(c, '__esModule', { value: !0 }),
            Object.defineProperty(c, 'notFound', {
                enumerable: !0,
                get: function () {
                    return f
                },
            }))
        let d = a.r(70786),
            e = `${d.HTTP_ERROR_FALLBACK_ERROR_CODE};404`
        function f() {
            let a = Object.defineProperty(Error(e), '__NEXT_ERROR_CODE', { value: 'E1041', enumerable: !1, configurable: !0 })
            throw ((a.digest = e), a)
        }
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    53444,
    (a, b, c) => {
        'use strict'
        function d() {
            throw Object.defineProperty(
                Error('`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.'),
                '__NEXT_ERROR_CODE',
                { value: 'E488', enumerable: !1, configurable: !0 },
            )
        }
        ;(Object.defineProperty(c, '__esModule', { value: !0 }),
            Object.defineProperty(c, 'forbidden', {
                enumerable: !0,
                get: function () {
                    return d
                },
            }),
            a.r(70786).HTTP_ERROR_FALLBACK_ERROR_CODE,
            ('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
                void 0 === c.default.__esModule &&
                (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default)))
    },
    24461,
    (a, b, c) => {
        'use strict'
        function d() {
            throw Object.defineProperty(
                Error('`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.'),
                '__NEXT_ERROR_CODE',
                { value: 'E411', enumerable: !1, configurable: !0 },
            )
        }
        ;(Object.defineProperty(c, '__esModule', { value: !0 }),
            Object.defineProperty(c, 'unauthorized', {
                enumerable: !0,
                get: function () {
                    return d
                },
            }),
            a.r(70786).HTTP_ERROR_FALLBACK_ERROR_CODE,
            ('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
                void 0 === c.default.__esModule &&
                (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default)))
    },
    10800,
    (a, b, c) => {
        'use strict'
        ;(Object.defineProperty(c, '__esModule', { value: !0 }),
            Object.defineProperty(c, 'unstable_rethrow', {
                enumerable: !0,
                get: function () {
                    return function a(b) {
                        if (
                            (0, g.isNextRouterError)(b) ||
                            (0, f.isBailoutToCSRError)(b) ||
                            (0, i.isDynamicServerError)(b) ||
                            (0, h.isDynamicPostpone)(b) ||
                            (0, e.isPostpone)(b) ||
                            (0, d.isHangingPromiseRejectionError)(b) ||
                            (0, h.isPrerenderInterruptedError)(b)
                        )
                            throw b
                        b instanceof Error && 'cause' in b && a(b.cause)
                    }
                },
            }))
        let d = a.r(97821),
            e = a.r(85877),
            f = a.r(897),
            g = a.r(40809),
            h = a.r(28682),
            i = a.r(74956)
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    63636,
    (a, b, c) => {
        'use strict'
        Object.defineProperty(c, '__esModule', { value: !0 })
        var d = {
            ReadonlyURLSearchParams: function () {
                return f.ReadonlyURLSearchParams
            },
            RedirectType: function () {
                return m
            },
            forbidden: function () {
                return i.forbidden
            },
            notFound: function () {
                return h.notFound
            },
            permanentRedirect: function () {
                return g.permanentRedirect
            },
            redirect: function () {
                return g.redirect
            },
            unauthorized: function () {
                return j.unauthorized
            },
            unstable_isUnrecognizedActionError: function () {
                return l
            },
            unstable_rethrow: function () {
                return k.unstable_rethrow
            },
        }
        for (var e in d) Object.defineProperty(c, e, { enumerable: !0, get: d[e] })
        let f = a.r(78002),
            g = a.r(965),
            h = a.r(24649),
            i = a.r(53444),
            j = a.r(24461),
            k = a.r(10800)
        function l() {
            throw Object.defineProperty(Error('`unstable_isUnrecognizedActionError` can only be used on the client.'), '__NEXT_ERROR_CODE', {
                value: 'E776',
                enumerable: !1,
                configurable: !0,
            })
        }
        let m = { push: 'push', replace: 'replace' }
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
    69455,
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
            j = [
                '',
                {
                    children: [
                        'setup',
                        {
                            children: [
                                '__PAGE__',
                                {},
                                { metadata: {}, page: [(0, b.instrumentModuleGetter)(() => a.r(36575)), '[project]/apps/web/app/setup/page.tsx'] },
                                [],
                            ],
                        },
                        { metadata: {} },
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
            k = a.r.bind(a),
            l = a.l.bind(a),
            m = (0, c.createAppPageEntrypoint)({
                tree: j,
                page: '/setup/page',
                pathname: '/setup',
                require: k,
                loadChunk: l,
                interopDefault: d.interopDefault,
            }),
            n = m.__next_app__,
            o = m.routeModule,
            p = m.handler
        ;(a.s(['__next_app__', 0, n, 'handler', 0, p, 'routeModule', 0, o], 89109), a.i(89109))
        var q = a.i(67872)
        a.s(
            [
                'ClientPageRoot',
                () => q.ClientPageRoot,
                'ClientSegmentRoot',
                () => q.ClientSegmentRoot,
                'Fragment',
                () => q.Fragment,
                'HTTPAccessFallbackBoundary',
                () => q.HTTPAccessFallbackBoundary,
                'InstantValidation',
                () => q.InstantValidation,
                'LayoutRouter',
                () => q.LayoutRouter,
                'LoadingBoundaryProvider',
                () => q.LoadingBoundaryProvider,
                'Postpone',
                () => q.Postpone,
                'RenderFromTemplateContext',
                () => q.RenderFromTemplateContext,
                'RootLayoutBoundary',
                () => q.RootLayoutBoundary,
                'SegmentViewNode',
                () => q.SegmentViewNode,
                'SegmentViewStateNode',
                () => q.SegmentViewStateNode,
                '__next_app__',
                0,
                n,
                'captureOwnerStack',
                () => q.captureOwnerStack,
                'collectPrefetchHints',
                () => q.collectPrefetchHints,
                'collectSegmentData',
                () => q.collectSegmentData,
                'createElement',
                () => q.createElement,
                'createMetadataComponents',
                () => q.createMetadataComponents,
                'createPrerenderParamsForClientSegment',
                () => q.createPrerenderParamsForClientSegment,
                'createPrerenderSearchParamsForClientPage',
                () => q.createPrerenderSearchParamsForClientPage,
                'createServerParamsForServerSegment',
                () => q.createServerParamsForServerSegment,
                'createServerSearchParamsForServerPage',
                () => q.createServerSearchParamsForServerPage,
                'createTemporaryReferenceSet',
                () => q.createTemporaryReferenceSet,
                'decodeAction',
                () => q.decodeAction,
                'decodeFormState',
                () => q.decodeFormState,
                'decodeReply',
                () => q.decodeReply,
                'handler',
                0,
                p,
                'isEmptyHTMLPrelude',
                () => q.isEmptyHTMLPrelude,
                'patchFetch',
                () => q.patchFetch,
                'preconnect',
                () => q.preconnect,
                'preloadFont',
                () => q.preloadFont,
                'preloadStyle',
                () => q.preloadStyle,
                'prerender',
                () => q.prerender,
                'prerenderToNodeStream',
                () => q.prerenderToNodeStream,
                'renderToPipeableStream',
                () => q.renderToPipeableStream,
                'renderToReadableStream',
                () => q.renderToReadableStream,
                'routeModule',
                0,
                o,
                'serverHooks',
                () => q.serverHooks,
                'taintObjectReference',
                () => q.taintObjectReference,
            ],
            69455,
        )
    },
    85877,
    (a, b, c) => {
        'use strict'
        ;(Object.defineProperty(c, '__esModule', { value: !0 }),
            Object.defineProperty(c, 'isPostpone', {
                enumerable: !0,
                get: function () {
                    return e
                },
            }))
        let d = Symbol.for('react.postpone')
        function e(a) {
            return 'object' == typeof a && null !== a && a.$$typeof === d
        }
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__0jq0px1._.js.map
