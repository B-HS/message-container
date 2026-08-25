module.exports = [
    70406,
    (e, t, r) => {
        t.exports = e.x('next/dist/compiled/@opentelemetry/api', () => require('next/dist/compiled/@opentelemetry/api'))
    },
    18622,
    (e, t, r) => {
        t.exports = e.x('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js', () =>
            require('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js'),
        )
    },
    20635,
    (e, t, r) => {
        t.exports = e.x('next/dist/server/app-render/action-async-storage.external.js', () =>
            require('next/dist/server/app-render/action-async-storage.external.js'),
        )
    },
    24725,
    (e, t, r) => {
        t.exports = e.x('next/dist/server/app-render/after-task-async-storage.external.js', () =>
            require('next/dist/server/app-render/after-task-async-storage.external.js'),
        )
    },
    56704,
    (e, t, r) => {
        t.exports = e.x('next/dist/server/app-render/work-async-storage.external.js', () =>
            require('next/dist/server/app-render/work-async-storage.external.js'),
        )
    },
    32319,
    (e, t, r) => {
        t.exports = e.x('next/dist/server/app-render/work-unit-async-storage.external.js', () =>
            require('next/dist/server/app-render/work-unit-async-storage.external.js'),
        )
    },
    59043,
    (e, t, r) => {
        t.exports = e.x('next/dist/server/runtime-reacts.external.js', () => require('next/dist/server/runtime-reacts.external.js'))
    },
    93695,
    (e, t, r) => {
        t.exports = e.x('next/dist/shared/lib/no-fallback-error.external.js', () => require('next/dist/shared/lib/no-fallback-error.external.js'))
    },
    81111,
    (e, t, r) => {
        t.exports = e.x('node:stream', () => require('node:stream'))
    },
    46388,
    (e) => {
        'use strict'
        var t = e.i(21806),
            r = e.i(68348),
            a = e.i(87682)
        let n = process.env.MESSAGE_API_URL ?? 'http://localhost:3000',
            s = ['content-type', 'content-disposition', 'content-length'],
            o = async (e, o) => {
                if ('POST' === o && !(0, a.isTrustedOrigin)(e))
                    return Response.json({ success: !1, error: { code: 'FORBIDDEN', message: '허용되지 않은 출처입니다' } }, { status: 403 })
                let i = (await (0, t.cookies)()).get(r.API_KEY_COOKIE_NAME)?.value
                if (!i) return Response.json({ success: !1, error: { code: 'UNAUTHORIZED', message: '로그인이 필요합니다' } }, { status: 401 })
                let l = new URL(e.url),
                    d = l.pathname.replace(/^\/api\/be/, '/api'),
                    u = await fetch(`${n}${d}${l.search}`, {
                        method: o,
                        cache: 'no-store',
                        headers: {
                            Authorization: `Bearer ${i}`,
                            ...('POST' === o ? { 'Content-Type': e.headers.get('Content-Type') ?? 'application/json' } : {}),
                        },
                        body: 'POST' === o ? await e.arrayBuffer() : void 0,
                    }),
                    p = new Headers()
                for (let e of s) {
                    let t = u.headers.get(e)
                    t && p.set(e, t)
                }
                return new Response(u.body, { status: u.status, headers: p })
            }
        e.s(['GET', 0, (e) => o(e, 'GET'), 'POST', 0, (e) => o(e, 'POST')])
    },
    41198,
    (e) => {
        'use strict'
        var t = e.i(7808),
            r = e.i(93074),
            a = e.i(66924),
            n = e.i(98),
            s = e.i(96364),
            o = e.i(13614),
            i = e.i(13212),
            l = e.i(34556),
            d = e.i(43115),
            u = e.i(15724),
            p = e.i(64681),
            c = e.i(45635),
            h = e.i(79682),
            x = e.i(28408),
            R = e.i(17802),
            v = e.i(93695)
        e.i(60166)
        var g = e.i(88044)
        let m = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/be/[...path]/route',
                    pathname: '/api/be/[...path]',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath: '[project]/apps/web/app/api/be/[...path]/route.ts',
                nextConfigOutput: 'standalone',
                userland: () => e.r(46388),
                ...{},
            }),
            { workAsyncStorage: f, workUnitAsyncStorage: E, serverHooks: w } = m
        async function y(e, t, a) {
            ;(a.requestMeta && (0, n.setRequestMeta)(e, a.requestMeta),
                m.isDev && (0, n.addRequestMeta)(e, 'devRequestTimingInternalsEnd', process.hrtime.bigint()))
            let f = '/api/be/[...path]/route'
            f = f.replace(/\/index$/, '') || '/'
            let E = await m.prepare(e, t, { srcPage: f, multiZoneDraftMode: !1 })
            if (!E) return ((t.statusCode = 400), t.end('Bad Request'), null == a.waitUntil || a.waitUntil.call(a, Promise.resolve()), null)
            let {
                    buildId: w,
                    deploymentId: y,
                    params: C,
                    nextConfig: T,
                    parsedUrl: b,
                    isDraftMode: A,
                    prerenderManifest: P,
                    routerServerContext: S,
                    isOnDemandRevalidate: O,
                    revalidateOnlyGenerated: q,
                    resolvedPathname: N,
                    clientReferenceManifest: _,
                    serverActionsManifest: j,
                } = E,
                k = (0, i.normalizeAppPath)(f),
                I = !!(P.dynamicRoutes[k] || P.routes[N]),
                H = async () => ((null == S ? void 0 : S.render404) ? await S.render404(e, t, b, !1) : t.end('This page could not be found'), null)
            if (I && !A) {
                let e = !!P.routes[N],
                    t = P.dynamicRoutes[k]
                if (t && !1 === t.fallback && !e) {
                    if (T.adapterPath) return await H()
                    throw new v.NoFallbackError()
                }
            }
            let U = null
            !I || m.isDev || A || (U = '/index' === (U = N) ? '/' : U)
            let M = !0 === m.isDev || !I,
                D = I && !M
            j && _ && (0, o.setManifestsSingleton)({ page: f, clientReferenceManifest: _, serverActionsManifest: j })
            let $ = e.method || 'GET',
                K = (0, s.getTracer)(),
                B = K.getActiveScopeSpan(),
                F = !!(null == S ? void 0 : S.isWrappedByNextServer),
                L = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                G = (0, n.getRequestMeta)(e, 'incrementalCache') || (await m.getIncrementalCache(e, T, P, L))
            ;(null == G || G.resetRequestCache(), (globalThis.__incrementalCache = G))
            let V = {
                    params: C,
                    previewProps: P.preview,
                    renderOpts: {
                        experimental: { authInterrupts: !!T.experimental.authInterrupts, useCacheTimeout: T.experimental.useCacheTimeout },
                        cacheComponents: !!T.cacheComponents,
                        validationLevel: T.experimental.instantInsights.validationLevel,
                        supportsDynamicResponse: M,
                        incrementalCache: G,
                        hmrRefreshHash: (0, n.getRequestMeta)(e, 'hmrRefreshHash'),
                        cacheLifeProfiles: T.cacheLife,
                        staticPageGenerationTimeout: T.staticPageGenerationTimeout,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e)
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a, n) => m.onRequestError(e, t, a, n, S),
                    },
                    sharedContext: { buildId: w, deploymentId: y },
                },
                X = new l.NodeNextRequest(e),
                z = new l.NodeNextResponse(t),
                W = d.NextRequestAdapter.fromNodeNextRequest(X, (0, d.signalFromNodeResponse)(t)),
                Z = async ({ previousCacheEntry: r }) => {
                    try {
                        if (!L && O && q && !r)
                            return ((t.statusCode = 404), t.setHeader('x-nextjs-cache', 'REVALIDATED'), t.end('This page could not be found'), null)
                        let n = await m.handle(W, V)
                        e.fetchMetrics = V.renderOpts.fetchMetrics
                        let s = V.renderOpts.pendingWaitUntil
                        s && a.waitUntil && (a.waitUntil(s), (s = void 0))
                        let o = V.renderOpts.collectedTags
                        if (!I) return (await (0, c.sendResponse)(X, z, n, s), null)
                        {
                            let e = await n.blob(),
                                t = (0, h.toNodeOutgoingHttpHeaders)(n.headers)
                            ;(o && (t[R.NEXT_CACHE_TAGS_HEADER] = o), !t['content-type'] && e.type && (t['content-type'] = e.type))
                            let r =
                                    void 0 !== V.renderOpts.collectedRevalidate &&
                                    !(V.renderOpts.collectedRevalidate >= R.INFINITE_CACHE) &&
                                    V.renderOpts.collectedRevalidate,
                                a =
                                    void 0 === V.renderOpts.collectedExpire || V.renderOpts.collectedExpire >= R.INFINITE_CACHE
                                        ? !1 !== r && r > 0
                                            ? T.expireTime
                                            : void 0
                                        : V.renderOpts.collectedExpire
                            return {
                                value: { kind: g.CachedRouteKind.APP_ROUTE, status: n.status, body: Buffer.from(await e.arrayBuffer()), headers: t },
                                cacheControl: { revalidate: r, expire: a },
                            }
                        }
                    } catch (t) {
                        throw (
                            (null == r ? void 0 : r.isStale) &&
                                (await m.onRequestError(
                                    e,
                                    t,
                                    {
                                        routerKind: 'App Router',
                                        routePath: f,
                                        routeType: 'route',
                                        revalidateReason: (0, p.getRevalidateReason)({ isStaticGeneration: D, isOnDemandRevalidate: O }),
                                    },
                                    !1,
                                    S,
                                )),
                            t
                        )
                    }
                },
                Y = async (n, o) => {
                    try {
                        var i, l
                        let n = await m.handleResponse({
                            req: e,
                            nextConfig: T,
                            cacheKey: U,
                            routeKind: r.RouteKind.APP_ROUTE,
                            isFallback: !1,
                            prerenderManifest: P,
                            isRoutePPREnabled: !1,
                            isOnDemandRevalidate: O,
                            revalidateOnlyGenerated: q,
                            responseGenerator: Z,
                            waitUntil: a.waitUntil,
                            isMinimalMode: L,
                        })
                        if (!I) return
                        if ((null == n || null == (i = n.value) ? void 0 : i.kind) !== g.CachedRouteKind.APP_ROUTE)
                            throw Object.defineProperty(
                                Error(`Invariant: app-route received invalid cache entry ${null == n || null == (l = n.value) ? void 0 : l.kind}`),
                                '__NEXT_ERROR_CODE',
                                { value: 'E701', enumerable: !1, configurable: !0 },
                            )
                        ;(L || t.setHeader('x-nextjs-cache', O ? 'REVALIDATED' : n.isMiss ? 'MISS' : n.isStale ? 'STALE' : 'HIT'),
                            A && t.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate'))
                        let s = (0, h.fromNodeOutgoingHttpHeaders)(n.value.headers)
                        ;((L && I) || s.delete(R.NEXT_CACHE_TAGS_HEADER),
                            !n.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                s.get('Cache-Control') ||
                                s.set('Cache-Control', (0, x.getCacheControlHeader)(n.cacheControl)),
                            await (0, c.sendResponse)(X, z, new Response(n.value.body, { headers: s, status: n.value.status || 200 })))
                        return
                    } catch (t) {
                        if (
                            (t instanceof v.NoFallbackError ||
                                (await m.onRequestError(
                                    e,
                                    t,
                                    {
                                        routerKind: 'App Router',
                                        routePath: k,
                                        routeType: 'route',
                                        revalidateReason: (0, p.getRevalidateReason)({ isStaticGeneration: D, isOnDemandRevalidate: O }),
                                    },
                                    !1,
                                    S,
                                )),
                            I)
                        )
                            throw t
                        await (0, c.sendResponse)(X, z, new Response(null, { status: 500 }))
                        return
                    } finally {
                        ;(() => {
                            if (!n) return
                            let e = t.statusCode
                            ;(n.setAttributes({ 'http.status_code': e, 'next.rsc': !1 }),
                                e && e >= 500 && (n.setStatus({ code: s.SpanStatusCode.ERROR }), n.setAttribute('error.type', e.toString())))
                            let r = K.getRootSpanAttributes()
                            if (!r) return
                            if (r.get('next.span_type') !== u.BaseServerSpan.handleRequest)
                                return console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`,
                                )
                            let a = r.get('next.route') || k,
                                i = `${$} ${a}`
                            ;(n.setAttributes({ 'next.route': a, 'http.route': a, 'next.span_name': i }),
                                n.updateName(i),
                                o && o !== n && (o.setAttribute('http.route', a), o.updateName(i)))
                        })()
                    }
                }
            if (F && B) await Y(B, void 0)
            else {
                let t = K.getActiveScopeSpan()
                await K.withPropagatedContext(
                    e.headers,
                    () =>
                        K.trace(
                            u.BaseServerSpan.handleRequest,
                            { spanName: `${$} ${f}`, kind: s.SpanKind.SERVER, attributes: { 'http.method': $, 'http.target': e.url } },
                            (e) => Y(e, t),
                        ),
                    void 0,
                    !F,
                )
            }
        }
        e.s([
            'handler',
            0,
            y,
            'patchFetch',
            0,
            function () {
                return (0, a.patchFetch)({ workAsyncStorage: f, workUnitAsyncStorage: E })
            },
            'routeModule',
            0,
            m,
            'serverHooks',
            0,
            w,
            'workAsyncStorage',
            0,
            f,
            'workUnitAsyncStorage',
            0,
            E,
        ])
    },
]

//# sourceMappingURL=%5Broot-of-the-server%5D__1wwxp2a._.js.map
