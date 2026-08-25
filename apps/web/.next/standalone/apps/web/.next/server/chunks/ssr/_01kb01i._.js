module.exports = [
    92021,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(88406),
            d = a.i(70225),
            e = a.i(31894),
            f = a.i(76386),
            g = a.i(87432)
        let h = g.z.object({
            cursor: g.z.number(),
            lastSyncAt: g.z.string().nullable(),
            lastError: g.z.string().nullable(),
            counts: g.z.object({ chats: g.z.number(), messages: g.z.number(), attachments: g.z.number() }),
        })
        var i = a.i(55335),
            j = a.i(44958),
            k = a.i(45473),
            l = a.i(35711),
            m = a.i(76846),
            n = a.i(30583)
        let o = { warning: 'text-warning', danger: 'text-destructive' },
            p = ({ label: a, value: c, hint: d, accent: e }) =>
                (0, b.jsxs)('article', {
                    className: 'flex h-full flex-col items-start gap-1 bg-card p-3',
                    children: [
                        (0, b.jsx)('p', { className: 'text-xs text-muted-foreground', children: a }),
                        (0, b.jsx)('p', { className: (0, n.cn)('text-2xl font-semibold tracking-tight tabular-nums', e && o[e]), children: c }),
                        d ? (0, b.jsx)('p', { className: 'text-xs text-muted-foreground', children: d }) : null,
                    ],
                })
        var q = a.i(83443),
            r = a.i(57773)
        a.s(
            [
                'SyncStatusWidget',
                0,
                () => {
                    let a,
                        { data: n } = (0, f.useSuspenseQuery)({
                            ...(0, c.queryOptions)({
                                queryKey: i.QUERY_KEY.SYNC.STATUS,
                                queryFn: async () => (0, j.successEnvelopeSchema)(h).parse(await (0, k.apiFetch)('/sync/status')).data,
                            }),
                            refetchInterval: 5e3,
                        }),
                        o =
                            ((a = (0, e.useQueryClient)()),
                            (0, d.useMutation)({
                                mutationFn: async () =>
                                    (0, j.successEnvelopeSchema)(g.z.object({ synced: g.z.number() })).parse(
                                        await (0, k.apiFetch)('/sync/run', { method: 'POST' }),
                                    ).data,
                                onSuccess: () => {
                                    ;(a.invalidateQueries({ queryKey: i.QUERY_KEY.SYNC.STATUS }),
                                        a.invalidateQueries({ queryKey: i.QUERY_KEY.CHAT.ALL }),
                                        a.invalidateQueries({ queryKey: i.QUERY_KEY.MESSAGE.ALL }))
                                },
                            }))
                    return (0, b.jsxs)(l.PageRoot, {
                        children: [
                            (0, b.jsxs)('div', {
                                className: 'grid grid-cols-2 gap-px md:grid-cols-4',
                                children: [
                                    (0, b.jsx)(p, { label: '대화', value: (0, q.formatCount)(n.counts.chats) }),
                                    (0, b.jsx)(p, { label: '메시지', value: (0, q.formatCount)(n.counts.messages) }),
                                    (0, b.jsx)(p, { label: '첨부파일', value: (0, q.formatCount)(n.counts.attachments) }),
                                    (0, b.jsx)(p, { label: '커서 (message ROWID)', value: (0, q.formatCount)(n.cursor) }),
                                ],
                            }),
                            (0, b.jsxs)(m.PanelCard, {
                                title: '동기화 상태',
                                contentClassName: 'flex flex-col gap-2',
                                children: [
                                    (0, b.jsxs)('div', {
                                        className: 'flex flex-wrap items-center gap-2 text-xs',
                                        children: [
                                            (0, b.jsx)('span', { className: 'text-muted-foreground', children: '마지막 동기화' }),
                                            (0, b.jsx)('span', {
                                                className: 'font-mono tabular-nums',
                                                suppressHydrationWarning: !0,
                                                children: (0, q.formatDateTime)(n.lastSyncAt),
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'flex flex-wrap items-center gap-2 text-xs',
                                        children: [
                                            (0, b.jsx)('span', { className: 'text-muted-foreground', children: '마지막 에러' }),
                                            n.lastError
                                                ? (0, b.jsx)('span', { className: 'font-mono text-destructive', children: n.lastError })
                                                : (0, b.jsx)('span', { className: 'text-muted-foreground', children: '없음' }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'flex items-center gap-2',
                                        children: [
                                            (0, b.jsx)(r.Button, {
                                                size: 'sm',
                                                disabled: o.isPending,
                                                onClick: () => o.mutate(),
                                                children: '지금 동기화',
                                            }),
                                            o.isSuccess
                                                ? (0, b.jsxs)('span', {
                                                      className: 'text-xs text-muted-foreground tabular-nums',
                                                      children: [(0, q.formatCount)(o.data.synced), '건 동기화됨'],
                                                  })
                                                : null,
                                            o.isError
                                                ? (0, b.jsx)('span', {
                                                      className: 'text-xs text-destructive',
                                                      children: '동기화 실행에 실패했습니다',
                                                  })
                                                : null,
                                        ],
                                    }),
                                    (0, b.jsx)('p', {
                                        className: 'text-xs text-muted-foreground',
                                        children: '동기화는 서버에서 주기적으로 자동 실행되며, 이 화면은 5초마다 상태를 갱신합니다.',
                                    }),
                                ],
                            }),
                        ],
                    })
                },
            ],
            92021,
        )
    },
    70225,
    (a) => {
        'use strict'
        var b = a.i(31894),
            c = a.i(77010),
            d = a.i(97355),
            e = a.i(57141),
            f = a.i(88801),
            g = a.i(48890),
            h = class extends e.Subscribable {
                #a
                #b = void 0
                #c
                #d
                constructor(a, b) {
                    ;(super(), (this.#a = a), this.setOptions(b), this.bindMethods(), this.#e())
                }
                bindMethods() {
                    ;((this.mutate = this.mutate.bind(this)), (this.reset = this.reset.bind(this)))
                }
                setOptions(a) {
                    let b = this.options
                    ;((this.options = this.#a.defaultMutationOptions(a)),
                        (0, d.shallowEqualObjects)(this.options, b) ||
                            this.#a.getMutationCache().notify({ type: 'observerOptionsUpdated', mutation: this.#c, observer: this }),
                        b?.mutationKey && this.options.mutationKey && (0, d.hashKey)(b.mutationKey) !== (0, d.hashKey)(this.options.mutationKey)
                            ? this.reset()
                            : this.#c?.state.status === 'pending' && this.#c.setOptions(this.options))
                }
                onSubscribe() {
                    1 === this.listeners.size && this.#c && (this.#c.addObserver(this), this.#e())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.#c?.removeObserver(this)
                }
                onMutationUpdate(a) {
                    ;(this.#e(), this.#f(a))
                }
                getCurrentResult() {
                    return this.#b
                }
                reset() {
                    ;(this.#c?.removeObserver(this), (this.#c = void 0), this.#e(), this.#f())
                }
                mutate(a, b) {
                    return (
                        (this.#d = b),
                        this.#c?.removeObserver(this),
                        (this.#c = this.#a.getMutationCache().build(this.#a, this.options)),
                        this.#c.addObserver(this),
                        this.#c.execute(a)
                    )
                }
                #e() {
                    let a = this.#c?.state ?? (0, g.getDefaultState)()
                    this.#b = {
                        ...a,
                        isPending: 'pending' === a.status,
                        isSuccess: 'success' === a.status,
                        isError: 'error' === a.status,
                        isIdle: 'idle' === a.status,
                        mutate: this.mutate,
                        reset: this.reset,
                    }
                }
                #f(a) {
                    f.notifyManager.batch(() => {
                        if (this.#d && this.hasListeners()) {
                            let b = this.#b.variables,
                                c = this.#b.context,
                                d = { client: this.#a, meta: this.options.meta, mutationKey: this.options.mutationKey }
                            if (a?.type === 'success') {
                                try {
                                    this.#d.onSuccess?.(a.data, b, c, d)
                                } catch (a) {
                                    Promise.reject(a)
                                }
                                try {
                                    this.#d.onSettled?.(a.data, null, b, c, d)
                                } catch (a) {
                                    Promise.reject(a)
                                }
                            } else if (a?.type === 'error') {
                                try {
                                    this.#d.onError?.(a.error, b, c, d)
                                } catch (a) {
                                    Promise.reject(a)
                                }
                                try {
                                    this.#d.onSettled?.(void 0, a.error, b, c, d)
                                } catch (a) {
                                    Promise.reject(a)
                                }
                            }
                        }
                        this.listeners.forEach((a) => {
                            a(this.#b)
                        })
                    })
                }
            }
        a.s(
            [
                'useMutation',
                0,
                function (a, e) {
                    let g = (0, b.useQueryClient)(e),
                        [i] = c.useState(() => new h(g, a))
                    c.useEffect(() => {
                        i.setOptions(a)
                    }, [i, a])
                    let j = c.useSyncExternalStore(
                            c.useCallback((a) => i.subscribe(f.notifyManager.batchCalls(a)), [i]),
                            () => i.getCurrentResult(),
                            () => i.getCurrentResult(),
                        ),
                        k = c.useCallback(
                            (...a) => {
                                i.mutate(a[0], a[1]).catch(d.noop)
                            },
                            [i],
                        )
                    if (j.error && (0, d.shouldThrowError)(i.options.throwOnError, [j.error])) throw j.error
                    return { ...j, mutate: k, mutateAsync: j.mutate }
                },
            ],
            70225,
        )
    },
    12723,
    (a) => {
        a.v((b) => Promise.all(['server/chunks/ssr/12-l_next_0-pn88c._.js'].map((b) => a.l(b))).then(() => b(65504)))
    },
]

//# sourceMappingURL=_01kb01i._.js.map
