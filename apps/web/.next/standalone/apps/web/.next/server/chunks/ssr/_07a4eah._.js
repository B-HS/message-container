module.exports = [
    35711,
    (a) => {
        'use strict'
        var b = a.i(90329)
        a.s(['PageRoot', 0, ({ children: a }) => (0, b.jsx)('div', { className: 'flex flex-col gap-px', children: a })])
    },
    27,
    (a) => {
        'use strict'
        class b extends Error {
            code
            status
            constructor(a, b, c) {
                ;(super(b), (this.code = a), (this.status = c), (this.name = 'ApiError'))
            }
        }
        a.s(['ApiError', 0, b, 'isApiError', 0, (a) => a instanceof b])
    },
    57773,
    13801,
    16224,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(86934)
        let d = (a) => ('boolean' == typeof a ? `${a}` : 0 === a ? '0' : a),
            e = c.clsx,
            f = (a, b) => (c) => {
                var f
                if ((null == b ? void 0 : b.variants) == null) return e(a, null == c ? void 0 : c.class, null == c ? void 0 : c.className)
                let { variants: g, defaultVariants: h } = b,
                    i = Object.keys(g).map((a) => {
                        let b = null == c ? void 0 : c[a],
                            e = null == h ? void 0 : h[a]
                        if (null === b) return null
                        let f = d(b) || d(e)
                        return g[a][f]
                    }),
                    j =
                        c &&
                        Object.entries(c).reduce((a, b) => {
                            let [c, d] = b
                            return (void 0 === d || (a[c] = d), a)
                        }, {})
                return e(
                    a,
                    i,
                    null == b || null == (f = b.compoundVariants)
                        ? void 0
                        : f.reduce((a, b) => {
                              let { class: c, className: d, ...e } = b
                              return Object.entries(e).every((a) => {
                                  let [b, c] = a
                                  return Array.isArray(c) ? c.includes({ ...h, ...j }[b]) : { ...h, ...j }[b] === c
                              })
                                  ? [...a, c, d]
                                  : a
                          }, []),
                    null == c ? void 0 : c.class,
                    null == c ? void 0 : c.className,
                )
            }
        a.s(['cva', 0, f], 13801)
        var g = a.i(77010),
            h = Object.defineProperty,
            i = (a, b) => h(a, 'name', { value: b, configurable: !0 })
        function j(a, b) {
            if ('function' == typeof a) return a(b)
            null != a && (a.current = b)
        }
        function k(...a) {
            return (b) => {
                let c = !1,
                    d = a.map((a) => {
                        let d = j(a, b)
                        return (c || 'function' != typeof d || (c = !0), d)
                    })
                if (c)
                    return () => {
                        for (let b = 0; b < d.length; b++) {
                            let c = d[b]
                            'function' == typeof c ? c() : j(a[b], null)
                        }
                    }
            }
        }
        function l(...a) {
            return g.useCallback(k(...a), a)
        }
        ;(i(j, 'setRef'), i(k, 'composeRefs'), i(l, 'useComposedRefs'))
        var m = Object.defineProperty,
            n = (a, b) => m(a, 'name', { value: b, configurable: !0 })
        function o(a) {
            let b = g.forwardRef((b, c) => {
                let { children: d, ...e } = b,
                    f = null,
                    h = !1,
                    i = []
                ;(y(d) && 'function' == typeof C && (d = C(d._payload)),
                    g.Children.forEach(d, (a) => {
                        if (w(a)) {
                            h = !0
                            let b = 'child' in a.props ? a.props.child : a.props.children
                            ;(y(b) && 'function' == typeof C && (b = C(b._payload)), (f = t(a, b)), i.push(f?.props?.children))
                        } else i.push(a)
                    }),
                    f ? (f = g.cloneElement(f, void 0, i)) : !h && 1 === g.Children.count(d) && g.isValidElement(d) && (f = d))
                let j = f ? v(f) : void 0,
                    k = l(c, j)
                if (!f) {
                    if (d || 0 === d) throw Error(h ? B(a) : A(a))
                    return d
                }
                let m = u(e, f.props ?? {})
                return (f.type !== g.Fragment && (m.ref = c ? k : j), g.cloneElement(f, m))
            })
            return ((b.displayName = `${a}.Slot`), b)
        }
        n(o, 'createSlot')
        var p = o('Slot'),
            q = Symbol.for('radix.slottable')
        function r(a) {
            let b = n((a) => ('child' in a ? a.children(a.child) : a.children), 'Slottable')
            return ((b.displayName = `${a}.Slottable`), (b.__radixId = q), b)
        }
        n(r, 'createSlottable')
        var s = r('Slottable'),
            t = n((a, b) => {
                if ('child' in a.props) {
                    let b = a.props.child
                    return g.isValidElement(b) ? g.cloneElement(b, void 0, a.props.children(b.props.children)) : null
                }
                return g.isValidElement(b) ? b : null
            }, 'getSlottableElementFromSlottable')
        function u(a, b) {
            let c = { ...b }
            for (let d in b) {
                let e = a[d],
                    f = b[d]
                ;/^on[A-Z]/.test(d)
                    ? e && f
                        ? (c[d] = (...a) => {
                              let b = f(...a)
                              return (e(...a), b)
                          })
                        : e && (c[d] = e)
                    : 'style' === d
                      ? (c[d] = { ...e, ...f })
                      : 'className' === d && (c[d] = [e, f].filter(Boolean).join(' '))
            }
            return { ...a, ...c }
        }
        function v(a) {
            let b = Object.getOwnPropertyDescriptor(a.props, 'ref')?.get,
                c = b && 'isReactWarning' in b && b.isReactWarning
            return c
                ? a.ref
                : (c = (b = Object.getOwnPropertyDescriptor(a, 'ref')?.get) && 'isReactWarning' in b && b.isReactWarning)
                  ? a.props.ref
                  : a.props.ref || a.ref
        }
        function w(a) {
            return g.isValidElement(a) && 'function' == typeof a.type && '__radixId' in a.type && a.type.__radixId === q
        }
        ;(n(u, 'mergeProps'), n(v, 'getElementRef'), n(w, 'isSlottable'))
        var x = Symbol.for('react.lazy')
        function y(a) {
            return null != a && 'object' == typeof a && '$$typeof' in a && a.$$typeof === x && '_payload' in a && z(a._payload)
        }
        function z(a) {
            return 'object' == typeof a && null !== a && 'then' in a
        }
        ;(n(y, 'isLazyComponent'), n(z, 'isPromiseLike'))
        var A = n((a) => `${a} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, 'createSlotError'),
            B = n(
                (a) => `${a} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
                'createSlottableError',
            ),
            C = g[' use '.trim().toString()]
        a.s(['Root', 0, p, 'Slot', 0, p, 'Slottable', 0, s, 'createSlot', 0, o, 'createSlottable', 0, r], 2954)
        var D = a.i(2954)
        a.s(['Slot', 0, D], 16224)
        var D = D,
            E = a.i(30583)
        let F = f(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            {
                variants: {
                    variant: {
                        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                        destructive:
                            'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
                        outline:
                            'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
                        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                        link: 'text-primary underline-offset-4 hover:underline',
                    },
                    size: {
                        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
                        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
                        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                        icon: 'size-9',
                        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
                        'icon-sm': 'size-8',
                        'icon-lg': 'size-10',
                    },
                },
                defaultVariants: { variant: 'default', size: 'default' },
            },
        )
        a.s(
            [
                'Button',
                0,
                function ({ className: a, variant: c = 'default', size: d = 'default', asChild: e = !1, ...f }) {
                    let g = e ? D.Root : 'button'
                    return (0, b.jsx)(g, {
                        'data-slot': 'button',
                        'data-variant': c,
                        'data-size': d,
                        className: (0, E.cn)(F({ variant: c, size: d, className: a })),
                        ...f,
                    })
                },
            ],
            57773,
        )
    },
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
]

//# sourceMappingURL=_07a4eah._.js.map
