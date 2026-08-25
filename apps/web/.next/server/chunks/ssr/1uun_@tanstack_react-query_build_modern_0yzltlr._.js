module.exports = [
    79274,
    (a) => {
        'use strict'
        var b = a.i(31894),
            c = a.i(77010),
            d = a.i(97355)
        function e(a, b, c) {
            let e = a.getMutationCache(),
                f = a.getQueryCache(),
                g = c?.defaultOptions?.deserializeData ?? a.getDefaultOptions().hydrate?.deserializeData
            ;(b.mutations?.forEach(({ state: b, ...d }) => {
                e.build(a, { ...a.getDefaultOptions().hydrate?.mutations, ...c?.defaultOptions?.mutations, ...d }, b)
            }),
                b.queries?.forEach(({ queryKey: b, state: e, queryHash: h, meta: i, promise: j, dehydratedAt: k, queryType: l }) => {
                    let m = j
                            ? (function (a) {
                                  let b
                                  if ((a.then((a) => ((b = a), a), d.noop)?.catch?.(d.noop), void 0 !== b)) return { data: b }
                              })(j)
                            : void 0,
                        n = void 0 === e.data ? m?.data : e.data,
                        o = void 0 === n ? n : g ? g(n) : n,
                        p = f.get(h),
                        q = p?.state.status === 'pending',
                        r = p?.state.fetchStatus === 'fetching'
                    if (p) {
                        let a = m && void 0 !== k && k > p.state.dataUpdatedAt
                        if (e.dataUpdatedAt > p.state.dataUpdatedAt || a) {
                            let { fetchStatus: a, ...b } = e
                            p.setState({
                                ...b,
                                data: o,
                                ...('pending' === e.status &&
                                    void 0 !== o && { status: 'success', dataUpdatedAt: k ?? Date.now(), ...(!r && { fetchStatus: 'idle' }) }),
                            })
                        }
                    } else
                        p = f.build(
                            a,
                            {
                                ...a.getDefaultOptions().hydrate?.queries,
                                ...c?.defaultOptions?.queries,
                                queryKey: b,
                                queryHash: h,
                                meta: i,
                                _type: l,
                            },
                            {
                                ...e,
                                data: o,
                                fetchStatus: 'idle',
                                status: 'pending' === e.status && void 0 !== o ? 'success' : e.status,
                                ...('pending' === e.status && void 0 !== o && { dataUpdatedAt: k ?? Date.now() }),
                            },
                        )
                    !j ||
                        m ||
                        q ||
                        r ||
                        (void 0 !== k && !(k > p.state.dataUpdatedAt)) ||
                        p.fetch(void 0, { initialPromise: Promise.resolve(j).then(g) }).catch(d.noop)
                }))
        }
        a.s(
            [
                'HydrationBoundary',
                0,
                ({ children: a, options: d = {}, state: f, queryClient: g }) => {
                    let h = (0, b.useQueryClient)(g),
                        i = c.useRef(d)
                    c.useEffect(() => {
                        i.current = d
                    })
                    let j = c.useMemo(() => {
                        if (f) {
                            if ('object' != typeof f) return
                            let a = h.getQueryCache(),
                                b = f.queries || [],
                                c = [],
                                d = []
                            for (let e of b) {
                                let b = a.get(e.queryHash)
                                b
                                    ? (e.state.dataUpdatedAt > b.state.dataUpdatedAt ||
                                          (e.promise &&
                                              'pending' !== b.state.status &&
                                              'fetching' !== b.state.fetchStatus &&
                                              void 0 !== e.dehydratedAt &&
                                              e.dehydratedAt > b.state.dataUpdatedAt)) &&
                                      d.push(e)
                                    : c.push(e)
                            }
                            if ((c.length > 0 && e(h, { queries: c }, i.current), d.length > 0)) return d
                        }
                    }, [h, f])
                    return (
                        c.useEffect(() => {
                            j && e(h, { queries: j }, i.current)
                        }, [h, j]),
                        a
                    )
                },
            ],
            79274,
        )
    },
    58731,
    9965,
    61496,
    (a) => {
        'use strict'
        let b
        var c = a.i(77010)
        let d = c.createContext(!1)
        ;(d.Provider, a.s(['useIsRestoring', 0, () => c.useContext(d)], 58731), a.i(90329))
        let e = c.createContext(
            ((b = !1),
            {
                clearReset: () => {
                    b = !1
                },
                reset: () => {
                    b = !0
                },
                isReset: () => b,
            }),
        )
        a.s(['useQueryErrorResetBoundary', 0, () => c.useContext(e)], 9965)
        var f = a.i(97355)
        a.s(
            [
                'ensurePreventErrorBoundaryRetry',
                0,
                (a, b, c) => {
                    let d =
                        c?.state.error && 'function' == typeof a.throwOnError
                            ? (0, f.shouldThrowError)(a.throwOnError, [c.state.error, c])
                            : a.throwOnError
                    ;(a.suspense || d) && !b.isReset() && (a.retryOnMount = !1)
                },
                'getHasError',
                0,
                ({ result: a, errorResetBoundary: b, throwOnError: c, query: d, suspense: e }) =>
                    a.isError && !b.isReset() && !a.isFetching && d && ((e && void 0 === a.data) || (0, f.shouldThrowError)(c, [a.error, d])),
                'useClearResetErrorBoundary',
                0,
                (a) => {
                    c.useEffect(() => {
                        a.clearReset()
                    }, [a])
                },
            ],
            61496,
        )
    },
    88406,
    55335,
    44958,
    45473,
    35711,
    76846,
    83443,
    (a) => {
        'use strict'
        ;(a.s(
            [
                'queryOptions',
                0,
                function (a) {
                    return a
                },
            ],
            88406,
        ),
            a.s(
                [
                    'QUERY_KEY',
                    0,
                    {
                        AUTH: { STATUS: ['auth', 'status'] },
                        CHAT: {
                            ALL: ['chat'],
                            LIST: (a) => ['chat', 'list', a],
                            DETAIL: (a) => ['chat', 'detail', a],
                            MESSAGES: (a, b) => ['chat', 'messages', a, b],
                        },
                        MESSAGE: { ALL: ['message'], SEARCH: (a) => ['message', 'search', a] },
                        ATTACHMENT: { BY_MESSAGES: (a) => ['attachment', 'by-messages', a] },
                        SYNC: { STATUS: ['sync', 'status'] },
                    },
                ],
                55335,
            ))
        var b = a.i(87432)
        a.s(
            [
                'paginatedEnvelopeSchema',
                0,
                (a) =>
                    b.z.object({
                        success: b.z.literal(!0),
                        data: b.z.array(a),
                        pagination: b.z.object({ page: b.z.number(), limit: b.z.number(), total: b.z.number(), totalPages: b.z.number() }),
                    }),
                'successEnvelopeSchema',
                0,
                (a) => b.z.object({ success: b.z.literal(!0), data: a }),
            ],
            44958,
        )
        class c extends Error {
            code
            status
            constructor(a, b, c) {
                ;(super(b), (this.code = a), (this.status = c), (this.name = 'ApiError'))
            }
        }
        let d = b.z.object({ success: b.z.literal(!1), error: b.z.object({ code: b.z.string(), message: b.z.string() }) }),
            e = async (b, c) => {
                let { cookies: d } = await a.A(12723),
                    e = (await d()).get('mc_api_key')?.value,
                    f = process.env.MESSAGE_API_URL ?? 'http://localhost:3000'
                return fetch(`${f}/api${b}`, { ...c, cache: 'no-store', headers: { ...c?.headers, ...(e ? { Authorization: `Bearer ${e}` } : {}) } })
            },
            f = async (a, b) => {
                let f = await e(a, b),
                    g = await f.json(),
                    h = d.safeParse(g)
                if (h.success) throw new c(h.data.error.code, h.data.error.message, f.status)
                if (!f.ok) throw new c(`HTTP_${f.status}`, f.statusText, f.status)
                return g
            }
        a.s(['apiFetch', 0, f], 45473)
        var g = a.i(90329)
        a.s(['PageRoot', 0, ({ children: a }) => (0, g.jsx)('div', { className: 'flex flex-col gap-px', children: a })], 35711)
        var h = a.i(30583)
        a.s(
            [
                'PanelCard',
                0,
                ({ title: a, contentClassName: b, children: c }) =>
                    (0, g.jsxs)('section', {
                        className: 'flex flex-col gap-3 bg-card py-3',
                        children: [
                            a
                                ? (0, g.jsx)('header', {
                                      className: 'px-3',
                                      children: (0, g.jsx)('h2', { className: 'text-sm font-medium', children: a }),
                                  })
                                : null,
                            (0, g.jsx)('div', { className: (0, h.cn)('px-3', b), children: c }),
                        ],
                    }),
            ],
            76846,
        )
        let i = (a) => String(a).padStart(2, '0')
        a.s(
            [
                'formatCount',
                0,
                (a) => a.toLocaleString('ko-KR'),
                'formatDateTime',
                0,
                (a) => {
                    if (!a) return '-'
                    let b = new Date(a)
                    return `${b.getFullYear()}-${i(b.getMonth() + 1)}-${i(b.getDate())} ${i(b.getHours())}:${i(b.getMinutes())}:${i(b.getSeconds())}`
                },
            ],
            83443,
        )
    },
    95799,
    (a) => {
        'use strict'
        a.s([
            'defaultThrowOnError',
            0,
            (a, b) => void 0 === b.state.data,
            'ensureSuspenseTimers',
            0,
            (a) => {
                if (a.suspense) {
                    let b = (a) => ('static' === a ? a : Math.max(a ?? 1e3, 1e3)),
                        c = a.staleTime
                    ;((a.staleTime = 'function' == typeof c ? (...a) => b(c(...a)) : b(c)),
                        'number' == typeof a.gcTime && (a.gcTime = Math.max(a.gcTime, 1e3)))
                }
            },
            'fetchOptimistic',
            0,
            (a, b, c) =>
                b.fetchOptimistic(a).catch(() => {
                    c.clearReset()
                }),
            'shouldSuspend',
            0,
            (a, b) => a?.suspense && b.isPending,
        ])
    },
    76386,
    80873,
    30217,
    (a) => {
        'use strict'
        var b = a.i(95799),
            c = a.i(31894),
            d = a.i(58731),
            e = a.i(9965),
            f = a.i(61496),
            g = a.i(77010),
            h = a.i(97355),
            i = a.i(88801)
        function j(a, j, k) {
            let l = (0, d.useIsRestoring)(),
                m = (0, e.useQueryErrorResetBoundary)(),
                n = (0, c.useQueryClient)(k),
                o = n.defaultQueryOptions(a),
                p = n.getQueryCache().get(o.queryHash),
                q = !1 !== a.subscribed
            ;((o._optimisticResults = l ? 'isRestoring' : q ? 'optimistic' : void 0),
                (0, b.ensureSuspenseTimers)(o),
                (0, f.ensurePreventErrorBoundaryRetry)(o, m, p),
                (0, f.useClearResetErrorBoundary)(m))
            let [r] = g.useState(() => new j(n, o)),
                s = r.getOptimisticResult(o),
                t = !l && q
            if (
                (g.useSyncExternalStore(
                    g.useCallback(
                        (a) => {
                            let b = t ? r.subscribe(i.notifyManager.batchCalls(a)) : h.noop
                            return (r.updateResult(), b)
                        },
                        [r, t],
                    ),
                    () => r.getCurrentResult(),
                    () => r.getCurrentResult(),
                ),
                g.useEffect(() => {
                    r.setOptions(o)
                }, [o, r]),
                (0, b.shouldSuspend)(o, s))
            )
                throw (0, b.fetchOptimistic)(o, r, m)
            if ((0, f.getHasError)({ result: s, errorResetBoundary: m, throwOnError: o.throwOnError, query: p, suspense: o.suspense })) throw s.error
            return o.notifyOnChangeProps ? s : r.trackResult(s)
        }
        a.s(['useBaseQuery', 0, j], 80873)
        var k = a.i(7392),
            l = a.i(29121),
            m = a.i(57141),
            n = a.i(80998),
            o = a.i(7711),
            p = class extends m.Subscribable {
                #a
                #b = void 0
                #c = void 0
                #d = void 0
                #e
                #f
                #g
                #h
                #i
                #j
                #k
                #l
                #m
                #n = new Set()
                constructor(a, b) {
                    ;(super(), (this.options = b), (this.#a = a), (this.#g = null), this.bindMethods(), this.setOptions(b))
                }
                bindMethods() {
                    this.refetch = this.refetch.bind(this)
                }
                onSubscribe() {
                    1 === this.listeners.size && (this.#b.addObserver(this), q(this.#b, this.options) ? this.#o() : this.updateResult(), this.#p())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.destroy()
                }
                shouldFetchOnReconnect() {
                    return r(this.#b, this.options, this.options.refetchOnReconnect)
                }
                shouldFetchOnWindowFocus() {
                    return r(this.#b, this.options, this.options.refetchOnWindowFocus)
                }
                destroy() {
                    ;((this.listeners = new Set()), this.#q(), this.#r(), this.#b.removeObserver(this))
                }
                setOptions(a) {
                    let b = this.options,
                        c = this.#b
                    if (
                        ((this.options = this.#a.defaultQueryOptions(a)),
                        void 0 !== this.options.enabled &&
                            'boolean' != typeof this.options.enabled &&
                            'function' != typeof this.options.enabled &&
                            'boolean' != typeof (0, h.resolveQueryBoolean)(this.options.enabled, this.#b))
                    )
                        throw Error('Expected enabled to be a boolean or a callback that returns a boolean')
                    ;(this.#s(),
                        this.#b.setOptions(this.options),
                        b._defaulted &&
                            !(0, h.shallowEqualObjects)(this.options, b) &&
                            this.#a.getQueryCache().notify({ type: 'observerOptionsUpdated', query: this.#b, observer: this }))
                    let d = this.hasListeners()
                    ;(d && s(this.#b, c, this.options, b) && this.#o(),
                        this.updateResult(),
                        d &&
                            (this.#b !== c ||
                                (0, h.resolveQueryBoolean)(this.options.enabled, this.#b) !== (0, h.resolveQueryBoolean)(b.enabled, this.#b) ||
                                (0, h.resolveStaleTime)(this.options.staleTime, this.#b) !== (0, h.resolveStaleTime)(b.staleTime, this.#b)) &&
                            this.#t())
                    let e = this.#u()
                    d &&
                        (this.#b !== c ||
                            (0, h.resolveQueryBoolean)(this.options.enabled, this.#b) !== (0, h.resolveQueryBoolean)(b.enabled, this.#b) ||
                            e !== this.#m) &&
                        this.#v(e)
                }
                getOptimisticResult(a) {
                    var b, c
                    let d = this.#a.getQueryCache().build(this.#a, a),
                        e = this.createResult(d, a)
                    return (
                        (b = this),
                        (c = e),
                        (0, h.shallowEqualObjects)(b.getCurrentResult(), c) || ((this.#d = e), (this.#f = this.options), (this.#e = this.#b.state)),
                        e
                    )
                }
                getCurrentResult() {
                    return this.#d
                }
                trackResult(a, b) {
                    return new Proxy(a, { get: (a, c) => (this.trackProp(c), b?.(c), Reflect.get(a, c)) })
                }
                trackProp(a) {
                    this.#n.add(a)
                }
                getCurrentQuery() {
                    return this.#b
                }
                refetch({ ...a } = {}) {
                    return this.fetch({ ...a })
                }
                fetchOptimistic(a) {
                    let b,
                        c = this.#a.defaultQueryOptions(a),
                        d = this.#a.getQueryCache().build(this.#a, c),
                        e = () => {},
                        f = new Promise((a) => {
                            ;((b = a),
                                (e = this.#a.getQueryCache().subscribe((b) => {
                                    'updated' === b.type &&
                                        b.query.queryHash === d.queryHash &&
                                        void 0 !== d.state.data &&
                                        (e(), a(this.createResult(d, c)))
                                })))
                        })
                    return Promise.race([
                        d
                            .fetch()
                            .then(() => {
                                let a = this.createResult(d, c)
                                return (b?.(a), a)
                            })
                            .finally(() => {
                                e()
                            }),
                        f,
                    ])
                }
                fetch(a) {
                    return this.#o({ ...a, cancelRefetch: a.cancelRefetch ?? !0 }).then(() => (this.updateResult(), this.#d))
                }
                #o(a) {
                    this.#s()
                    let b = this.#b.fetch(this.options, a)
                    return (a?.throwOnError || (b = b.catch(h.noop)), b)
                }
                #t() {
                    this.#q()
                    let a = (0, h.resolveStaleTime)(this.options.staleTime, this.#b)
                    if (l.environmentManager.isServer() || this.#d.isStale || !(0, h.isValidTimeout)(a)) return
                    let b = (0, h.timeUntilStale)(this.#d.dataUpdatedAt, a) + 1
                    this.#k = k.timeoutManager.setTimeout(() => {
                        this.#d.isStale || this.updateResult()
                    }, b)
                }
                #u() {
                    return (
                        ('function' == typeof this.options.refetchInterval ? this.options.refetchInterval(this.#b) : this.options.refetchInterval) ??
                        !1
                    )
                }
                #v(a) {
                    ;(this.#r(),
                        (this.#m = a),
                        !l.environmentManager.isServer() &&
                            !1 !== (0, h.resolveQueryBoolean)(this.options.enabled, this.#b) &&
                            (0, h.isValidTimeout)(this.#m) &&
                            0 !== this.#m &&
                            (this.#l = k.timeoutManager.setInterval(() => {
                                ;(this.options.refetchIntervalInBackground || n.focusManager.isFocused()) && this.#o()
                            }, this.#m)))
                }
                #p() {
                    ;(this.#t(), this.#v(this.#u()))
                }
                #q() {
                    void 0 !== this.#k && (k.timeoutManager.clearTimeout(this.#k), (this.#k = void 0))
                }
                #r() {
                    void 0 !== this.#l && (k.timeoutManager.clearInterval(this.#l), (this.#l = void 0))
                }
                createResult(a, b) {
                    let c,
                        d = this.#b,
                        e = this.options,
                        f = this.#d,
                        g = this.#e,
                        i = this.#f,
                        j = a !== d ? a.state : this.#c,
                        { state: k } = a,
                        l = { ...k },
                        m = !1
                    if (b._optimisticResults) {
                        let c = this.hasListeners(),
                            f = !c && q(a, b),
                            g = c && s(a, d, b, e)
                        ;((f || g) && (l = { ...l, ...(0, o.fetchState)(k.data, a.options) }),
                            'isRestoring' === b._optimisticResults && (l.fetchStatus = 'idle'))
                    }
                    let { error: n, errorUpdatedAt: p, status: r } = l
                    c = l.data
                    let u = !1
                    if (void 0 !== b.placeholderData && void 0 === c && 'pending' === r) {
                        let a
                        ;(f?.isPlaceholderData && b.placeholderData === i?.placeholderData
                            ? ((a = f.data), (u = !0))
                            : (a = 'function' == typeof b.placeholderData ? b.placeholderData(this.#j?.state.data, this.#j) : b.placeholderData),
                            void 0 !== a && ((r = 'success'), (c = (0, h.replaceData)(f?.data, a, b)), (m = !0)))
                    }
                    if (b.select && void 0 !== c && !u)
                        if (f && c === g?.data && b.select === this.#h) c = this.#i
                        else
                            try {
                                ;((this.#h = b.select), (c = b.select(c)), (c = (0, h.replaceData)(f?.data, c, b)), (this.#i = c), (this.#g = null))
                            } catch (a) {
                                this.#g = a
                            }
                    else void 0 === c && (this.#g = null)
                    this.#g && ((n = this.#g), (c = this.#i), (p = Date.now()), (r = 'error'), (m = !1))
                    let v = 'fetching' === l.fetchStatus,
                        w = 'pending' === r,
                        x = 'error' === r,
                        y = w && v,
                        z = void 0 !== c
                    return {
                        status: r,
                        fetchStatus: l.fetchStatus,
                        isPending: w,
                        isSuccess: 'success' === r,
                        isError: x,
                        isInitialLoading: y,
                        isLoading: y,
                        data: c,
                        dataUpdatedAt: l.dataUpdatedAt,
                        error: n,
                        errorUpdatedAt: p,
                        failureCount: l.fetchFailureCount,
                        failureReason: l.fetchFailureReason,
                        errorUpdateCount: l.errorUpdateCount,
                        isFetched: a.isFetched(),
                        isFetchedAfterMount: l.dataUpdateCount > j.dataUpdateCount || l.errorUpdateCount > j.errorUpdateCount,
                        isFetching: v,
                        isRefetching: v && !w,
                        isLoadingError: x && !z,
                        isPaused: 'paused' === l.fetchStatus,
                        isPlaceholderData: m,
                        isRefetchError: x && z,
                        isStale: t(a, b),
                        refetch: this.refetch,
                        isEnabled: !1 !== (0, h.resolveQueryBoolean)(b.enabled, a),
                    }
                }
                updateResult() {
                    let a = this.#d,
                        b = this.createResult(this.#b, this.options)
                    if (
                        ((this.#e = this.#b.state),
                        (this.#f = this.options),
                        void 0 !== this.#e.data && (this.#j = this.#b),
                        (0, h.shallowEqualObjects)(b, a))
                    )
                        return
                    this.#d = b
                    let c = () => {
                        if (!a) return !0
                        let { notifyOnChangeProps: b } = this.options,
                            c = 'function' == typeof b ? b() : b
                        if ('all' === c || (!c && !this.#n.size)) return !0
                        let d = new Set(c ?? this.#n)
                        return (this.options.throwOnError && d.add('error'), Object.keys(this.#d).some((b) => this.#d[b] !== a[b] && d.has(b)))
                    }
                    this.#w({ listeners: c() })
                }
                #s() {
                    let a = this.#a.getQueryCache().build(this.#a, this.options)
                    if (a === this.#b) return
                    let b = this.#b
                    ;((this.#b = a), (this.#c = a.state), this.hasListeners() && (b?.removeObserver(this), a.addObserver(this)))
                }
                onQueryUpdate() {
                    ;(this.updateResult(), this.hasListeners() && this.#p())
                }
                #w(a) {
                    i.notifyManager.batch(() => {
                        ;(a.listeners &&
                            this.listeners.forEach((a) => {
                                a(this.#d)
                            }),
                            this.#a.getQueryCache().notify({ query: this.#b, type: 'observerResultsUpdated' }))
                    })
                }
            }
        function q(a, b) {
            return (
                (!1 !== (0, h.resolveQueryBoolean)(b.enabled, a) &&
                    void 0 === a.state.data &&
                    ('error' !== a.state.status || !1 !== (0, h.resolveQueryBoolean)(b.retryOnMount, a))) ||
                (void 0 !== a.state.data && r(a, b, b.refetchOnMount))
            )
        }
        function r(a, b, c) {
            if (!1 !== (0, h.resolveQueryBoolean)(b.enabled, a) && 'static' !== (0, h.resolveStaleTime)(b.staleTime, a)) {
                let d = 'function' == typeof c ? c(a) : c
                return 'always' === d || (!1 !== d && t(a, b))
            }
            return !1
        }
        function s(a, b, c, d) {
            return (a !== b || !1 === (0, h.resolveQueryBoolean)(d.enabled, a)) && (!c.suspense || 'error' !== a.state.status) && t(a, c)
        }
        function t(a, b) {
            return !1 !== (0, h.resolveQueryBoolean)(b.enabled, a) && a.isStaleByTime((0, h.resolveStaleTime)(b.staleTime, a))
        }
        ;(a.s(['QueryObserver', 0, p], 30217),
            a.s(
                [
                    'useSuspenseQuery',
                    0,
                    function (a, c) {
                        return j({ ...a, enabled: !0, suspense: !0, throwOnError: b.defaultThrowOnError, placeholderData: void 0 }, p, c)
                    },
                ],
                76386,
            ))
    },
]

//# sourceMappingURL=1uun_%40tanstack_react-query_build_modern_0yzltlr._.js.map
