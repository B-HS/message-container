;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    5697,
    (t) => {
        'use strict'
        var e = t.i(48607),
            s = t.i(83782),
            r = t.i(66476),
            i = t.i(25852),
            a = t.i(60687),
            n = t.i(98750),
            u = t.i(68280)
        let o = u.z.object({
            cursor: u.z.number(),
            lastSyncAt: u.z.string().nullable(),
            lastError: u.z.string().nullable(),
            counts: u.z.object({ chats: u.z.number(), messages: u.z.number(), attachments: u.z.number() }),
        })
        var c = t.i(4526),
            l = t.i(15400),
            h = t.i(54037)
        async function d() {
            return (0, l.successEnvelopeSchema)(u.z.object({ synced: u.z.number() })).parse(await (0, h.apiFetch)('/sync/run', { method: 'POST' }))
                .data
        }
        var p = t.i(68915),
            f = t.i(3569),
            m = t.i(1718)
        let y = { warning: 'text-warning', danger: 'text-destructive' },
            v = (t) => {
                let r,
                    i,
                    a,
                    n,
                    u,
                    o = (0, s.c)(13),
                    { label: c, value: l, hint: h, accent: d } = t
                o[0] !== c ? ((r = (0, e.jsx)('p', { className: 'text-xs text-muted-foreground', children: c })), (o[0] = c), (o[1] = r)) : (r = o[1])
                let p = d && y[d]
                return (
                    o[2] !== p ? ((i = (0, m.cn)('text-2xl font-semibold tracking-tight tabular-nums', p)), (o[2] = p), (o[3] = i)) : (i = o[3]),
                    o[4] !== i || o[5] !== l
                        ? ((a = (0, e.jsx)('p', { className: i, children: l })), (o[4] = i), (o[5] = l), (o[6] = a))
                        : (a = o[6]),
                    o[7] !== h
                        ? ((n = h ? (0, e.jsx)('p', { className: 'text-xs text-muted-foreground', children: h }) : null), (o[7] = h), (o[8] = n))
                        : (n = o[8]),
                    o[9] !== r || o[10] !== a || o[11] !== n
                        ? ((u = (0, e.jsxs)('article', { className: 'flex h-full flex-col items-start gap-1 bg-card p-3', children: [r, a, n] })),
                          (o[9] = r),
                          (o[10] = a),
                          (o[11] = n),
                          (o[12] = u))
                        : (u = o[12]),
                    u
                )
            }
        var g = t.i(56507),
            b = t.i(44659)
        t.s(
            [
                'SyncStatusWidget',
                0,
                () => {
                    let t,
                        u,
                        m,
                        y,
                        R,
                        S,
                        x,
                        E,
                        Q,
                        O,
                        T,
                        C,
                        M,
                        j,
                        w,
                        I,
                        A,
                        U,
                        P,
                        D,
                        z,
                        B,
                        N,
                        F,
                        q,
                        K,
                        L,
                        _ = (0, s.c)(51),
                        { data: k } =
                            ((F = (0, s.c)(1))[0] === Symbol.for('react.memo_cache_sentinel')
                                ? ((N = {
                                      ...(0, r.queryOptions)({
                                          queryKey: c.QUERY_KEY.SYNC.STATUS,
                                          queryFn: async () => (0, l.successEnvelopeSchema)(o).parse(await (0, h.apiFetch)('/sync/status')).data,
                                      }),
                                      refetchInterval: 5e3,
                                  }),
                                  (F[0] = N))
                                : (N = F[0]),
                            (0, n.useSuspenseQuery)(N)),
                        H =
                            ((K = (0, s.c)(2)),
                            (L = (0, a.useQueryClient)()),
                            K[0] !== L
                                ? ((q = {
                                      mutationFn: d,
                                      onSuccess: () => {
                                          ;(L.invalidateQueries({ queryKey: c.QUERY_KEY.SYNC.STATUS }),
                                              L.invalidateQueries({ queryKey: c.QUERY_KEY.CHAT.ALL }),
                                              L.invalidateQueries({ queryKey: c.QUERY_KEY.MESSAGE.ALL }))
                                      },
                                  }),
                                  (K[0] = L),
                                  (K[1] = q))
                                : (q = K[1]),
                            (0, i.useMutation)(q))
                    return (
                        _[0] !== k.counts.chats ? ((t = (0, g.formatCount)(k.counts.chats)), (_[0] = k.counts.chats), (_[1] = t)) : (t = _[1]),
                        _[2] !== t ? ((u = (0, e.jsx)(v, { label: '대화', value: t })), (_[2] = t), (_[3] = u)) : (u = _[3]),
                        _[4] !== k.counts.messages
                            ? ((m = (0, g.formatCount)(k.counts.messages)), (_[4] = k.counts.messages), (_[5] = m))
                            : (m = _[5]),
                        _[6] !== m ? ((y = (0, e.jsx)(v, { label: '메시지', value: m })), (_[6] = m), (_[7] = y)) : (y = _[7]),
                        _[8] !== k.counts.attachments
                            ? ((R = (0, g.formatCount)(k.counts.attachments)), (_[8] = k.counts.attachments), (_[9] = R))
                            : (R = _[9]),
                        _[10] !== R ? ((S = (0, e.jsx)(v, { label: '첨부파일', value: R })), (_[10] = R), (_[11] = S)) : (S = _[11]),
                        _[12] !== k.cursor ? ((x = (0, g.formatCount)(k.cursor)), (_[12] = k.cursor), (_[13] = x)) : (x = _[13]),
                        _[14] !== x ? ((E = (0, e.jsx)(v, { label: '커서 (message ROWID)', value: x })), (_[14] = x), (_[15] = E)) : (E = _[15]),
                        _[16] !== u || _[17] !== y || _[18] !== S || _[19] !== E
                            ? ((Q = (0, e.jsxs)('div', { className: 'grid grid-cols-2 gap-px md:grid-cols-4', children: [u, y, S, E] })),
                              (_[16] = u),
                              (_[17] = y),
                              (_[18] = S),
                              (_[19] = E),
                              (_[20] = Q))
                            : (Q = _[20]),
                        _[21] === Symbol.for('react.memo_cache_sentinel')
                            ? ((O = (0, e.jsx)('span', { className: 'text-muted-foreground', children: '마지막 동기화' })), (_[21] = O))
                            : (O = _[21]),
                        _[22] !== k.lastSyncAt ? ((T = (0, g.formatDateTime)(k.lastSyncAt)), (_[22] = k.lastSyncAt), (_[23] = T)) : (T = _[23]),
                        _[24] !== T
                            ? ((C = (0, e.jsxs)('div', {
                                  className: 'flex flex-wrap items-center gap-2 text-xs',
                                  children: [
                                      O,
                                      (0, e.jsx)('span', { className: 'font-mono tabular-nums', suppressHydrationWarning: !0, children: T }),
                                  ],
                              })),
                              (_[24] = T),
                              (_[25] = C))
                            : (C = _[25]),
                        _[26] === Symbol.for('react.memo_cache_sentinel')
                            ? ((M = (0, e.jsx)('span', { className: 'text-muted-foreground', children: '마지막 에러' })), (_[26] = M))
                            : (M = _[26]),
                        _[27] !== k.lastError
                            ? ((j = (0, e.jsxs)('div', {
                                  className: 'flex flex-wrap items-center gap-2 text-xs',
                                  children: [
                                      M,
                                      k.lastError
                                          ? (0, e.jsx)('span', { className: 'font-mono text-destructive', children: k.lastError })
                                          : (0, e.jsx)('span', { className: 'text-muted-foreground', children: '없음' }),
                                  ],
                              })),
                              (_[27] = k.lastError),
                              (_[28] = j))
                            : (j = _[28]),
                        _[29] !== H ? ((w = () => H.mutate()), (_[29] = H), (_[30] = w)) : (w = _[30]),
                        _[31] !== H.isPending || _[32] !== w
                            ? ((I = (0, e.jsx)(b.Button, { size: 'sm', disabled: H.isPending, onClick: w, children: '지금 동기화' })),
                              (_[31] = H.isPending),
                              (_[32] = w),
                              (_[33] = I))
                            : (I = _[33]),
                        _[34] !== H.data || _[35] !== H.isSuccess
                            ? ((A = H.isSuccess
                                  ? (0, e.jsxs)('span', {
                                        className: 'text-xs text-muted-foreground tabular-nums',
                                        children: [(0, g.formatCount)(H.data.synced), '건 동기화됨'],
                                    })
                                  : null),
                              (_[34] = H.data),
                              (_[35] = H.isSuccess),
                              (_[36] = A))
                            : (A = _[36]),
                        _[37] !== H.isError
                            ? ((U = H.isError
                                  ? (0, e.jsx)('span', { className: 'text-xs text-destructive', children: '동기화 실행에 실패했습니다' })
                                  : null),
                              (_[37] = H.isError),
                              (_[38] = U))
                            : (U = _[38]),
                        _[39] !== I || _[40] !== A || _[41] !== U
                            ? ((P = (0, e.jsxs)('div', { className: 'flex items-center gap-2', children: [I, A, U] })),
                              (_[39] = I),
                              (_[40] = A),
                              (_[41] = U),
                              (_[42] = P))
                            : (P = _[42]),
                        _[43] === Symbol.for('react.memo_cache_sentinel')
                            ? ((D = (0, e.jsx)('p', {
                                  className: 'text-xs text-muted-foreground',
                                  children: '동기화는 서버에서 주기적으로 자동 실행되며, 이 화면은 5초마다 상태를 갱신합니다.',
                              })),
                              (_[43] = D))
                            : (D = _[43]),
                        _[44] !== C || _[45] !== j || _[46] !== P
                            ? ((z = (0, e.jsxs)(f.PanelCard, {
                                  title: '동기화 상태',
                                  contentClassName: 'flex flex-col gap-2',
                                  children: [C, j, P, D],
                              })),
                              (_[44] = C),
                              (_[45] = j),
                              (_[46] = P),
                              (_[47] = z))
                            : (z = _[47]),
                        _[48] !== z || _[49] !== Q
                            ? ((B = (0, e.jsxs)(p.PageRoot, { children: [Q, z] })), (_[48] = z), (_[49] = Q), (_[50] = B))
                            : (B = _[50]),
                        B
                    )
                },
            ],
            5697,
        )
    },
    62522,
    (t) => {
        'use strict'
        var e = t.i(60687),
            s = t.i(30216),
            r = t.i(36021)
        function i(t, e, s) {
            let i = t.getMutationCache(),
                a = t.getQueryCache(),
                n = s?.defaultOptions?.deserializeData ?? t.getDefaultOptions().hydrate?.deserializeData
            ;(e.mutations?.forEach(({ state: e, ...r }) => {
                i.build(t, { ...t.getDefaultOptions().hydrate?.mutations, ...s?.defaultOptions?.mutations, ...r }, e)
            }),
                e.queries?.forEach(({ queryKey: e, state: i, queryHash: u, meta: o, promise: c, dehydratedAt: l, queryType: h }) => {
                    let d = c
                            ? (function (t) {
                                  let e
                                  if ((t.then((t) => ((e = t), t), r.noop)?.catch?.(r.noop), void 0 !== e)) return { data: e }
                              })(c)
                            : void 0,
                        p = void 0 === i.data ? d?.data : i.data,
                        f = void 0 === p ? p : n ? n(p) : p,
                        m = a.get(u),
                        y = m?.state.status === 'pending',
                        v = m?.state.fetchStatus === 'fetching'
                    if (m) {
                        let t = d && void 0 !== l && l > m.state.dataUpdatedAt
                        if (i.dataUpdatedAt > m.state.dataUpdatedAt || t) {
                            let { fetchStatus: t, ...e } = i
                            m.setState({
                                ...e,
                                data: f,
                                ...('pending' === i.status &&
                                    void 0 !== f && { status: 'success', dataUpdatedAt: l ?? Date.now(), ...(!v && { fetchStatus: 'idle' }) }),
                            })
                        }
                    } else
                        m = a.build(
                            t,
                            {
                                ...t.getDefaultOptions().hydrate?.queries,
                                ...s?.defaultOptions?.queries,
                                queryKey: e,
                                queryHash: u,
                                meta: o,
                                _type: h,
                            },
                            {
                                ...i,
                                data: f,
                                fetchStatus: 'idle',
                                status: 'pending' === i.status && void 0 !== f ? 'success' : i.status,
                                ...('pending' === i.status && void 0 !== f && { dataUpdatedAt: l ?? Date.now() }),
                            },
                        )
                    !c ||
                        d ||
                        y ||
                        v ||
                        (void 0 !== l && !(l > m.state.dataUpdatedAt)) ||
                        m.fetch(void 0, { initialPromise: Promise.resolve(c).then(n) }).catch(r.noop)
                }))
        }
        t.s(
            [
                'HydrationBoundary',
                0,
                ({ children: t, options: r = {}, state: a, queryClient: n }) => {
                    let u = (0, e.useQueryClient)(n),
                        o = s.useRef(r)
                    s.useEffect(() => {
                        o.current = r
                    })
                    let c = s.useMemo(() => {
                        if (a) {
                            if ('object' != typeof a) return
                            let t = u.getQueryCache(),
                                e = a.queries || [],
                                s = [],
                                r = []
                            for (let i of e) {
                                let e = t.get(i.queryHash)
                                e
                                    ? (i.state.dataUpdatedAt > e.state.dataUpdatedAt ||
                                          (i.promise &&
                                              'pending' !== e.state.status &&
                                              'fetching' !== e.state.fetchStatus &&
                                              void 0 !== i.dehydratedAt &&
                                              i.dehydratedAt > e.state.dataUpdatedAt)) &&
                                      r.push(i)
                                    : s.push(i)
                            }
                            if ((s.length > 0 && i(u, { queries: s }, o.current), r.length > 0)) return r
                        }
                    }, [u, a])
                    return (
                        s.useEffect(() => {
                            c && i(u, { queries: c }, o.current)
                        }, [u, c]),
                        t
                    )
                },
            ],
            62522,
        )
    },
    85473,
    14860,
    33217,
    (t) => {
        'use strict'
        let e
        var s = t.i(30216)
        let r = s.createContext(!1)
        ;(r.Provider, t.s(['useIsRestoring', 0, () => s.useContext(r)], 85473), t.i(48607))
        let i = s.createContext(
            ((e = !1),
            {
                clearReset: () => {
                    e = !1
                },
                reset: () => {
                    e = !0
                },
                isReset: () => e,
            }),
        )
        t.s(['useQueryErrorResetBoundary', 0, () => s.useContext(i)], 14860)
        var a = t.i(36021)
        t.s(
            [
                'ensurePreventErrorBoundaryRetry',
                0,
                (t, e, s) => {
                    let r =
                        s?.state.error && 'function' == typeof t.throwOnError
                            ? (0, a.shouldThrowError)(t.throwOnError, [s.state.error, s])
                            : t.throwOnError
                    ;(t.suspense || r) && !e.isReset() && (t.retryOnMount = !1)
                },
                'getHasError',
                0,
                ({ result: t, errorResetBoundary: e, throwOnError: s, query: r, suspense: i }) =>
                    t.isError && !e.isReset() && !t.isFetching && r && ((i && void 0 === t.data) || (0, a.shouldThrowError)(s, [t.error, r])),
                'useClearResetErrorBoundary',
                0,
                (t) => {
                    s.useEffect(() => {
                        t.clearReset()
                    }, [t])
                },
            ],
            33217,
        )
    },
    66476,
    4526,
    15400,
    54037,
    68915,
    3569,
    56507,
    (t) => {
        'use strict'
        ;(t.s(
            [
                'queryOptions',
                0,
                function (t) {
                    return t
                },
            ],
            66476,
        ),
            t.s(
                [
                    'QUERY_KEY',
                    0,
                    {
                        AUTH: { STATUS: ['auth', 'status'] },
                        CHAT: {
                            ALL: ['chat'],
                            LIST: (t) => ['chat', 'list', t],
                            DETAIL: (t) => ['chat', 'detail', t],
                            MESSAGES: (t, e) => ['chat', 'messages', t, e],
                        },
                        MESSAGE: { ALL: ['message'], SEARCH: (t) => ['message', 'search', t] },
                        ATTACHMENT: { BY_MESSAGES: (t) => ['attachment', 'by-messages', t] },
                        SYNC: { STATUS: ['sync', 'status'] },
                    },
                ],
                4526,
            ))
        var e = t.i(68280)
        t.s(
            [
                'paginatedEnvelopeSchema',
                0,
                (t) =>
                    e.z.object({
                        success: e.z.literal(!0),
                        data: e.z.array(t),
                        pagination: e.z.object({ page: e.z.number(), limit: e.z.number(), total: e.z.number(), totalPages: e.z.number() }),
                    }),
                'successEnvelopeSchema',
                0,
                (t) => e.z.object({ success: e.z.literal(!0), data: t }),
            ],
            15400,
        )
        class s extends Error {
            code
            status
            constructor(t, e, s) {
                ;(super(e), (this.code = t), (this.status = s), (this.name = 'ApiError'))
            }
        }
        let r = e.z.object({ success: e.z.literal(!1), error: e.z.object({ code: e.z.string(), message: e.z.string() }) }),
            i = async (t, e) => fetch(`/api/be${t}`, e),
            a = async (t, e) => {
                let a = await i(t, e),
                    n = await a.json(),
                    u = r.safeParse(n)
                if (u.success) throw new s(u.data.error.code, u.data.error.message, a.status)
                if (!a.ok) throw new s(`HTTP_${a.status}`, a.statusText, a.status)
                return n
            }
        t.s(['apiFetch', 0, a], 54037)
        var n = t.i(48607),
            u = t.i(83782)
        t.s(
            [
                'PageRoot',
                0,
                (t) => {
                    let e,
                        s = (0, u.c)(2),
                        { children: r } = t
                    return (
                        s[0] !== r
                            ? ((e = (0, n.jsx)('div', { className: 'flex flex-col gap-px', children: r })), (s[0] = r), (s[1] = e))
                            : (e = s[1]),
                        e
                    )
                },
            ],
            68915,
        )
        var o = t.i(1718)
        t.s(
            [
                'PanelCard',
                0,
                (t) => {
                    let e,
                        s,
                        r,
                        i,
                        a = (0, u.c)(10),
                        { title: c, contentClassName: l, children: h } = t
                    return (
                        a[0] !== c
                            ? ((e = c
                                  ? (0, n.jsx)('header', {
                                        className: 'px-3',
                                        children: (0, n.jsx)('h2', { className: 'text-sm font-medium', children: c }),
                                    })
                                  : null),
                              (a[0] = c),
                              (a[1] = e))
                            : (e = a[1]),
                        a[2] !== l ? ((s = (0, o.cn)('px-3', l)), (a[2] = l), (a[3] = s)) : (s = a[3]),
                        a[4] !== h || a[5] !== s
                            ? ((r = (0, n.jsx)('div', { className: s, children: h })), (a[4] = h), (a[5] = s), (a[6] = r))
                            : (r = a[6]),
                        a[7] !== e || a[8] !== r
                            ? ((i = (0, n.jsxs)('section', { className: 'flex flex-col gap-3 bg-card py-3', children: [e, r] })),
                              (a[7] = e),
                              (a[8] = r),
                              (a[9] = i))
                            : (i = a[9]),
                        i
                    )
                },
            ],
            3569,
        )
        let c = (t) => String(t).padStart(2, '0')
        t.s(
            [
                'formatCount',
                0,
                (t) => t.toLocaleString('ko-KR'),
                'formatDateTime',
                0,
                (t) => {
                    if (!t) return '-'
                    let e = new Date(t)
                    return `${e.getFullYear()}-${c(e.getMonth() + 1)}-${c(e.getDate())} ${c(e.getHours())}:${c(e.getMinutes())}:${c(e.getSeconds())}`
                },
            ],
            56507,
        )
    },
    63502,
    (t) => {
        'use strict'
        t.s([
            'defaultThrowOnError',
            0,
            (t, e) => void 0 === e.state.data,
            'ensureSuspenseTimers',
            0,
            (t) => {
                if (t.suspense) {
                    let e = (t) => ('static' === t ? t : Math.max(t ?? 1e3, 1e3)),
                        s = t.staleTime
                    ;((t.staleTime = 'function' == typeof s ? (...t) => e(s(...t)) : e(s)),
                        'number' == typeof t.gcTime && (t.gcTime = Math.max(t.gcTime, 1e3)))
                }
            },
            'fetchOptimistic',
            0,
            (t, e, s) =>
                e.fetchOptimistic(t).catch(() => {
                    s.clearReset()
                }),
            'shouldSuspend',
            0,
            (t, e) => t?.suspense && e.isPending,
        ])
    },
    25852,
    (t) => {
        'use strict'
        var e = t.i(60687),
            s = t.i(30216),
            r = t.i(36021),
            i = t.i(66519),
            a = t.i(14437),
            n = t.i(57783),
            u = class extends i.Subscribable {
                #t
                #e = void 0
                #s
                #r
                constructor(t, e) {
                    ;(super(), (this.#t = t), this.setOptions(e), this.bindMethods(), this.#i())
                }
                bindMethods() {
                    ;((this.mutate = this.mutate.bind(this)), (this.reset = this.reset.bind(this)))
                }
                setOptions(t) {
                    let e = this.options
                    ;((this.options = this.#t.defaultMutationOptions(t)),
                        (0, r.shallowEqualObjects)(this.options, e) ||
                            this.#t.getMutationCache().notify({ type: 'observerOptionsUpdated', mutation: this.#s, observer: this }),
                        e?.mutationKey && this.options.mutationKey && (0, r.hashKey)(e.mutationKey) !== (0, r.hashKey)(this.options.mutationKey)
                            ? this.reset()
                            : this.#s?.state.status === 'pending' && this.#s.setOptions(this.options))
                }
                onSubscribe() {
                    1 === this.listeners.size && this.#s && (this.#s.addObserver(this), this.#i())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.#s?.removeObserver(this)
                }
                onMutationUpdate(t) {
                    ;(this.#i(), this.#a(t))
                }
                getCurrentResult() {
                    return this.#e
                }
                reset() {
                    ;(this.#s?.removeObserver(this), (this.#s = void 0), this.#i(), this.#a())
                }
                mutate(t, e) {
                    return (
                        (this.#r = e),
                        this.#s?.removeObserver(this),
                        (this.#s = this.#t.getMutationCache().build(this.#t, this.options)),
                        this.#s.addObserver(this),
                        this.#s.execute(t)
                    )
                }
                #i() {
                    let t = this.#s?.state ?? (0, n.getDefaultState)()
                    this.#e = {
                        ...t,
                        isPending: 'pending' === t.status,
                        isSuccess: 'success' === t.status,
                        isError: 'error' === t.status,
                        isIdle: 'idle' === t.status,
                        mutate: this.mutate,
                        reset: this.reset,
                    }
                }
                #a(t) {
                    a.notifyManager.batch(() => {
                        if (this.#r && this.hasListeners()) {
                            let e = this.#e.variables,
                                s = this.#e.context,
                                r = { client: this.#t, meta: this.options.meta, mutationKey: this.options.mutationKey }
                            if (t?.type === 'success') {
                                try {
                                    this.#r.onSuccess?.(t.data, e, s, r)
                                } catch (t) {
                                    Promise.reject(t)
                                }
                                try {
                                    this.#r.onSettled?.(t.data, null, e, s, r)
                                } catch (t) {
                                    Promise.reject(t)
                                }
                            } else if (t?.type === 'error') {
                                try {
                                    this.#r.onError?.(t.error, e, s, r)
                                } catch (t) {
                                    Promise.reject(t)
                                }
                                try {
                                    this.#r.onSettled?.(void 0, t.error, e, s, r)
                                } catch (t) {
                                    Promise.reject(t)
                                }
                            }
                        }
                        this.listeners.forEach((t) => {
                            t(this.#e)
                        })
                    })
                }
            }
        t.s(
            [
                'useMutation',
                0,
                function (t, i) {
                    let n = (0, e.useQueryClient)(i),
                        [o] = s.useState(() => new u(n, t))
                    s.useEffect(() => {
                        o.setOptions(t)
                    }, [o, t])
                    let c = s.useSyncExternalStore(
                            s.useCallback((t) => o.subscribe(a.notifyManager.batchCalls(t)), [o]),
                            () => o.getCurrentResult(),
                            () => o.getCurrentResult(),
                        ),
                        l = s.useCallback(
                            (...t) => {
                                o.mutate(t[0], t[1]).catch(r.noop)
                            },
                            [o],
                        )
                    if (c.error && (0, r.shouldThrowError)(o.options.throwOnError, [c.error])) throw c.error
                    return { ...c, mutate: l, mutateAsync: c.mutate }
                },
            ],
            25852,
        )
    },
    98750,
    5816,
    85573,
    (t) => {
        'use strict'
        var e = t.i(63502),
            s = t.i(60687),
            r = t.i(85473),
            i = t.i(14860),
            a = t.i(33217),
            n = t.i(30216),
            u = t.i(36021),
            o = t.i(14437)
        function c(t, c, l) {
            let h = (0, r.useIsRestoring)(),
                d = (0, i.useQueryErrorResetBoundary)(),
                p = (0, s.useQueryClient)(l),
                f = p.defaultQueryOptions(t),
                m = p.getQueryCache().get(f.queryHash),
                y = !1 !== t.subscribed
            ;((f._optimisticResults = h ? 'isRestoring' : y ? 'optimistic' : void 0),
                (0, e.ensureSuspenseTimers)(f),
                (0, a.ensurePreventErrorBoundaryRetry)(f, d, m),
                (0, a.useClearResetErrorBoundary)(d))
            let [v] = n.useState(() => new c(p, f)),
                g = v.getOptimisticResult(f),
                b = !h && y
            if (
                (n.useSyncExternalStore(
                    n.useCallback(
                        (t) => {
                            let e = b ? v.subscribe(o.notifyManager.batchCalls(t)) : u.noop
                            return (v.updateResult(), e)
                        },
                        [v, b],
                    ),
                    () => v.getCurrentResult(),
                    () => v.getCurrentResult(),
                ),
                n.useEffect(() => {
                    v.setOptions(f)
                }, [f, v]),
                (0, e.shouldSuspend)(f, g))
            )
                throw (0, e.fetchOptimistic)(f, v, d)
            if ((0, a.getHasError)({ result: g, errorResetBoundary: d, throwOnError: f.throwOnError, query: m, suspense: f.suspense })) throw g.error
            return f.notifyOnChangeProps ? g : v.trackResult(g)
        }
        t.s(['useBaseQuery', 0, c], 5816)
        var l = t.i(78774),
            h = t.i(28875),
            d = t.i(66519),
            p = t.i(82870),
            f = t.i(73045),
            m = class extends d.Subscribable {
                #t
                #n = void 0
                #u = void 0
                #e = void 0
                #o
                #c
                #l
                #h
                #d
                #p
                #f
                #m
                #y
                #v = new Set()
                constructor(t, e) {
                    ;(super(), (this.options = e), (this.#t = t), (this.#l = null), this.bindMethods(), this.setOptions(e))
                }
                bindMethods() {
                    this.refetch = this.refetch.bind(this)
                }
                onSubscribe() {
                    1 === this.listeners.size && (this.#n.addObserver(this), y(this.#n, this.options) ? this.#g() : this.updateResult(), this.#b())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.destroy()
                }
                shouldFetchOnReconnect() {
                    return v(this.#n, this.options, this.options.refetchOnReconnect)
                }
                shouldFetchOnWindowFocus() {
                    return v(this.#n, this.options, this.options.refetchOnWindowFocus)
                }
                destroy() {
                    ;((this.listeners = new Set()), this.#R(), this.#S(), this.#n.removeObserver(this))
                }
                setOptions(t) {
                    let e = this.options,
                        s = this.#n
                    if (
                        ((this.options = this.#t.defaultQueryOptions(t)),
                        void 0 !== this.options.enabled &&
                            'boolean' != typeof this.options.enabled &&
                            'function' != typeof this.options.enabled &&
                            'boolean' != typeof (0, u.resolveQueryBoolean)(this.options.enabled, this.#n))
                    )
                        throw Error('Expected enabled to be a boolean or a callback that returns a boolean')
                    ;(this.#x(),
                        this.#n.setOptions(this.options),
                        e._defaulted &&
                            !(0, u.shallowEqualObjects)(this.options, e) &&
                            this.#t.getQueryCache().notify({ type: 'observerOptionsUpdated', query: this.#n, observer: this }))
                    let r = this.hasListeners()
                    ;(r && g(this.#n, s, this.options, e) && this.#g(),
                        this.updateResult(),
                        r &&
                            (this.#n !== s ||
                                (0, u.resolveQueryBoolean)(this.options.enabled, this.#n) !== (0, u.resolveQueryBoolean)(e.enabled, this.#n) ||
                                (0, u.resolveStaleTime)(this.options.staleTime, this.#n) !== (0, u.resolveStaleTime)(e.staleTime, this.#n)) &&
                            this.#E())
                    let i = this.#Q()
                    r &&
                        (this.#n !== s ||
                            (0, u.resolveQueryBoolean)(this.options.enabled, this.#n) !== (0, u.resolveQueryBoolean)(e.enabled, this.#n) ||
                            i !== this.#y) &&
                        this.#O(i)
                }
                getOptimisticResult(t) {
                    var e, s
                    let r = this.#t.getQueryCache().build(this.#t, t),
                        i = this.createResult(r, t)
                    return (
                        (e = this),
                        (s = i),
                        (0, u.shallowEqualObjects)(e.getCurrentResult(), s) || ((this.#e = i), (this.#c = this.options), (this.#o = this.#n.state)),
                        i
                    )
                }
                getCurrentResult() {
                    return this.#e
                }
                trackResult(t, e) {
                    return new Proxy(t, { get: (t, s) => (this.trackProp(s), e?.(s), Reflect.get(t, s)) })
                }
                trackProp(t) {
                    this.#v.add(t)
                }
                getCurrentQuery() {
                    return this.#n
                }
                refetch({ ...t } = {}) {
                    return this.fetch({ ...t })
                }
                fetchOptimistic(t) {
                    let e,
                        s = this.#t.defaultQueryOptions(t),
                        r = this.#t.getQueryCache().build(this.#t, s),
                        i = () => {},
                        a = new Promise((t) => {
                            ;((e = t),
                                (i = this.#t.getQueryCache().subscribe((e) => {
                                    'updated' === e.type &&
                                        e.query.queryHash === r.queryHash &&
                                        void 0 !== r.state.data &&
                                        (i(), t(this.createResult(r, s)))
                                })))
                        })
                    return Promise.race([
                        r
                            .fetch()
                            .then(() => {
                                let t = this.createResult(r, s)
                                return (e?.(t), t)
                            })
                            .finally(() => {
                                i()
                            }),
                        a,
                    ])
                }
                fetch(t) {
                    return this.#g({ ...t, cancelRefetch: t.cancelRefetch ?? !0 }).then(() => (this.updateResult(), this.#e))
                }
                #g(t) {
                    this.#x()
                    let e = this.#n.fetch(this.options, t)
                    return (t?.throwOnError || (e = e.catch(u.noop)), e)
                }
                #E() {
                    this.#R()
                    let t = (0, u.resolveStaleTime)(this.options.staleTime, this.#n)
                    if (h.environmentManager.isServer() || this.#e.isStale || !(0, u.isValidTimeout)(t)) return
                    let e = (0, u.timeUntilStale)(this.#e.dataUpdatedAt, t) + 1
                    this.#f = l.timeoutManager.setTimeout(() => {
                        this.#e.isStale || this.updateResult()
                    }, e)
                }
                #Q() {
                    return (
                        ('function' == typeof this.options.refetchInterval ? this.options.refetchInterval(this.#n) : this.options.refetchInterval) ??
                        !1
                    )
                }
                #O(t) {
                    ;(this.#S(),
                        (this.#y = t),
                        !h.environmentManager.isServer() &&
                            !1 !== (0, u.resolveQueryBoolean)(this.options.enabled, this.#n) &&
                            (0, u.isValidTimeout)(this.#y) &&
                            0 !== this.#y &&
                            (this.#m = l.timeoutManager.setInterval(() => {
                                ;(this.options.refetchIntervalInBackground || p.focusManager.isFocused()) && this.#g()
                            }, this.#y)))
                }
                #b() {
                    ;(this.#E(), this.#O(this.#Q()))
                }
                #R() {
                    void 0 !== this.#f && (l.timeoutManager.clearTimeout(this.#f), (this.#f = void 0))
                }
                #S() {
                    void 0 !== this.#m && (l.timeoutManager.clearInterval(this.#m), (this.#m = void 0))
                }
                createResult(t, e) {
                    let s,
                        r = this.#n,
                        i = this.options,
                        a = this.#e,
                        n = this.#o,
                        o = this.#c,
                        c = t !== r ? t.state : this.#u,
                        { state: l } = t,
                        h = { ...l },
                        d = !1
                    if (e._optimisticResults) {
                        let s = this.hasListeners(),
                            a = !s && y(t, e),
                            n = s && g(t, r, e, i)
                        ;((a || n) && (h = { ...h, ...(0, f.fetchState)(l.data, t.options) }),
                            'isRestoring' === e._optimisticResults && (h.fetchStatus = 'idle'))
                    }
                    let { error: p, errorUpdatedAt: m, status: v } = h
                    s = h.data
                    let R = !1
                    if (void 0 !== e.placeholderData && void 0 === s && 'pending' === v) {
                        let t
                        ;(a?.isPlaceholderData && e.placeholderData === o?.placeholderData
                            ? ((t = a.data), (R = !0))
                            : (t = 'function' == typeof e.placeholderData ? e.placeholderData(this.#p?.state.data, this.#p) : e.placeholderData),
                            void 0 !== t && ((v = 'success'), (s = (0, u.replaceData)(a?.data, t, e)), (d = !0)))
                    }
                    if (e.select && void 0 !== s && !R)
                        if (a && s === n?.data && e.select === this.#h) s = this.#d
                        else
                            try {
                                ;((this.#h = e.select), (s = e.select(s)), (s = (0, u.replaceData)(a?.data, s, e)), (this.#d = s), (this.#l = null))
                            } catch (t) {
                                this.#l = t
                            }
                    else void 0 === s && (this.#l = null)
                    this.#l && ((p = this.#l), (s = this.#d), (m = Date.now()), (v = 'error'), (d = !1))
                    let S = 'fetching' === h.fetchStatus,
                        x = 'pending' === v,
                        E = 'error' === v,
                        Q = x && S,
                        O = void 0 !== s
                    return {
                        status: v,
                        fetchStatus: h.fetchStatus,
                        isPending: x,
                        isSuccess: 'success' === v,
                        isError: E,
                        isInitialLoading: Q,
                        isLoading: Q,
                        data: s,
                        dataUpdatedAt: h.dataUpdatedAt,
                        error: p,
                        errorUpdatedAt: m,
                        failureCount: h.fetchFailureCount,
                        failureReason: h.fetchFailureReason,
                        errorUpdateCount: h.errorUpdateCount,
                        isFetched: t.isFetched(),
                        isFetchedAfterMount: h.dataUpdateCount > c.dataUpdateCount || h.errorUpdateCount > c.errorUpdateCount,
                        isFetching: S,
                        isRefetching: S && !x,
                        isLoadingError: E && !O,
                        isPaused: 'paused' === h.fetchStatus,
                        isPlaceholderData: d,
                        isRefetchError: E && O,
                        isStale: b(t, e),
                        refetch: this.refetch,
                        isEnabled: !1 !== (0, u.resolveQueryBoolean)(e.enabled, t),
                    }
                }
                updateResult() {
                    let t = this.#e,
                        e = this.createResult(this.#n, this.options)
                    if (
                        ((this.#o = this.#n.state),
                        (this.#c = this.options),
                        void 0 !== this.#o.data && (this.#p = this.#n),
                        (0, u.shallowEqualObjects)(e, t))
                    )
                        return
                    this.#e = e
                    let s = () => {
                        if (!t) return !0
                        let { notifyOnChangeProps: e } = this.options,
                            s = 'function' == typeof e ? e() : e
                        if ('all' === s || (!s && !this.#v.size)) return !0
                        let r = new Set(s ?? this.#v)
                        return (this.options.throwOnError && r.add('error'), Object.keys(this.#e).some((e) => this.#e[e] !== t[e] && r.has(e)))
                    }
                    this.#a({ listeners: s() })
                }
                #x() {
                    let t = this.#t.getQueryCache().build(this.#t, this.options)
                    if (t === this.#n) return
                    let e = this.#n
                    ;((this.#n = t), (this.#u = t.state), this.hasListeners() && (e?.removeObserver(this), t.addObserver(this)))
                }
                onQueryUpdate() {
                    ;(this.updateResult(), this.hasListeners() && this.#b())
                }
                #a(t) {
                    o.notifyManager.batch(() => {
                        ;(t.listeners &&
                            this.listeners.forEach((t) => {
                                t(this.#e)
                            }),
                            this.#t.getQueryCache().notify({ query: this.#n, type: 'observerResultsUpdated' }))
                    })
                }
            }
        function y(t, e) {
            return (
                (!1 !== (0, u.resolveQueryBoolean)(e.enabled, t) &&
                    void 0 === t.state.data &&
                    ('error' !== t.state.status || !1 !== (0, u.resolveQueryBoolean)(e.retryOnMount, t))) ||
                (void 0 !== t.state.data && v(t, e, e.refetchOnMount))
            )
        }
        function v(t, e, s) {
            if (!1 !== (0, u.resolveQueryBoolean)(e.enabled, t) && 'static' !== (0, u.resolveStaleTime)(e.staleTime, t)) {
                let r = 'function' == typeof s ? s(t) : s
                return 'always' === r || (!1 !== r && b(t, e))
            }
            return !1
        }
        function g(t, e, s, r) {
            return (t !== e || !1 === (0, u.resolveQueryBoolean)(r.enabled, t)) && (!s.suspense || 'error' !== t.state.status) && b(t, s)
        }
        function b(t, e) {
            return !1 !== (0, u.resolveQueryBoolean)(e.enabled, t) && t.isStaleByTime((0, u.resolveStaleTime)(e.staleTime, t))
        }
        ;(t.s(['QueryObserver', 0, m], 85573),
            t.s(
                [
                    'useSuspenseQuery',
                    0,
                    function (t, s) {
                        return c({ ...t, enabled: !0, suspense: !0, throwOnError: e.defaultThrowOnError, placeholderData: void 0 }, m, s)
                    },
                ],
                98750,
            ))
    },
])
