;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    68915,
    (e) => {
        'use strict'
        var t = e.i(48607),
            s = e.i(83782)
        e.s([
            'PageRoot',
            0,
            (e) => {
                let r,
                    i = (0, s.c)(2),
                    { children: n } = e
                return (
                    i[0] !== n ? ((r = (0, t.jsx)('div', { className: 'flex flex-col gap-px', children: n })), (i[0] = n), (i[1] = r)) : (r = i[1]),
                    r
                )
            },
        ])
    },
    8800,
    (e) => {
        'use strict'
        class t extends Error {
            code
            status
            constructor(e, t, s) {
                ;(super(t), (this.code = e), (this.status = s), (this.name = 'ApiError'))
            }
        }
        e.s(['ApiError', 0, t, 'isApiError', 0, (e) => e instanceof t])
    },
    44659,
    7298,
    70596,
    (e) => {
        'use strict'
        var t = e.i(48607),
            s = e.i(83782),
            r = e.i(70733)
        let i = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
            n = r.clsx,
            a = (e, t) => (s) => {
                var r
                if ((null == t ? void 0 : t.variants) == null) return n(e, null == s ? void 0 : s.class, null == s ? void 0 : s.className)
                let { variants: a, defaultVariants: o } = t,
                    u = Object.keys(a).map((e) => {
                        let t = null == s ? void 0 : s[e],
                            r = null == o ? void 0 : o[e]
                        if (null === t) return null
                        let n = i(t) || i(r)
                        return a[e][n]
                    }),
                    l =
                        s &&
                        Object.entries(s).reduce((e, t) => {
                            let [s, r] = t
                            return (void 0 === r || (e[s] = r), e)
                        }, {})
                return n(
                    e,
                    u,
                    null == t || null == (r = t.compoundVariants)
                        ? void 0
                        : r.reduce((e, t) => {
                              let { class: s, className: r, ...i } = t
                              return Object.entries(i).every((e) => {
                                  let [t, s] = e
                                  return Array.isArray(s) ? s.includes({ ...o, ...l }[t]) : { ...o, ...l }[t] === s
                              })
                                  ? [...e, s, r]
                                  : e
                          }, []),
                    null == s ? void 0 : s.class,
                    null == s ? void 0 : s.className,
                )
            }
        e.s(['cva', 0, a], 7298)
        var o = e.i(30216),
            u = Object.defineProperty,
            l = (e, t) => u(e, 'name', { value: t, configurable: !0 })
        function c(e, t) {
            if ('function' == typeof e) return e(t)
            null != e && (e.current = t)
        }
        function h(...e) {
            return (t) => {
                let s = !1,
                    r = e.map((e) => {
                        let r = c(e, t)
                        return (s || 'function' != typeof r || (s = !0), r)
                    })
                if (s)
                    return () => {
                        for (let t = 0; t < r.length; t++) {
                            let s = r[t]
                            'function' == typeof s ? s() : c(e[t], null)
                        }
                    }
            }
        }
        function d(...e) {
            return o.useCallback(h(...e), e)
        }
        ;(l(c, 'setRef'), l(h, 'composeRefs'), l(d, 'useComposedRefs'))
        var p = Object.defineProperty,
            f = (e, t) => p(e, 'name', { value: t, configurable: !0 })
        function m(e) {
            let t = o.forwardRef((t, s) => {
                let { children: r, ...i } = t,
                    n = null,
                    a = !1,
                    u = []
                ;(O(r) && 'function' == typeof w && (r = w(r._payload)),
                    o.Children.forEach(r, (e) => {
                        if (E(e)) {
                            a = !0
                            let t = 'child' in e.props ? e.props.child : e.props.children
                            ;(O(t) && 'function' == typeof w && (t = w(t._payload)), (n = S(e, t)), u.push(n?.props?.children))
                        } else u.push(e)
                    }),
                    n ? (n = o.cloneElement(n, void 0, u)) : !a && 1 === o.Children.count(r) && o.isValidElement(r) && (n = r))
                let l = n ? x(n) : void 0,
                    c = d(s, l)
                if (!n) {
                    if (r || 0 === r) throw Error(a ? j(e) : T(e))
                    return r
                }
                let h = R(i, n.props ?? {})
                return (n.type !== o.Fragment && (h.ref = s ? c : l), o.cloneElement(n, h))
            })
            return ((t.displayName = `${e}.Slot`), t)
        }
        f(m, 'createSlot')
        var y = m('Slot'),
            v = Symbol.for('radix.slottable')
        function g(e) {
            let t = f((e) => ('child' in e ? e.children(e.child) : e.children), 'Slottable')
            return ((t.displayName = `${e}.Slottable`), (t.__radixId = v), t)
        }
        f(g, 'createSlottable')
        var b = g('Slottable'),
            S = f((e, t) => {
                if ('child' in e.props) {
                    let t = e.props.child
                    return o.isValidElement(t) ? o.cloneElement(t, void 0, e.props.children(t.props.children)) : null
                }
                return o.isValidElement(t) ? t : null
            }, 'getSlottableElementFromSlottable')
        function R(e, t) {
            let s = { ...t }
            for (let r in t) {
                let i = e[r],
                    n = t[r]
                ;/^on[A-Z]/.test(r)
                    ? i && n
                        ? (s[r] = (...e) => {
                              let t = n(...e)
                              return (i(...e), t)
                          })
                        : i && (s[r] = i)
                    : 'style' === r
                      ? (s[r] = { ...i, ...n })
                      : 'className' === r && (s[r] = [i, n].filter(Boolean).join(' '))
            }
            return { ...e, ...s }
        }
        function x(e) {
            let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
                s = t && 'isReactWarning' in t && t.isReactWarning
            return s
                ? e.ref
                : (s = (t = Object.getOwnPropertyDescriptor(e, 'ref')?.get) && 'isReactWarning' in t && t.isReactWarning)
                  ? e.props.ref
                  : e.props.ref || e.ref
        }
        function E(e) {
            return o.isValidElement(e) && 'function' == typeof e.type && '__radixId' in e.type && e.type.__radixId === v
        }
        ;(f(R, 'mergeProps'), f(x, 'getElementRef'), f(E, 'isSlottable'))
        var Q = Symbol.for('react.lazy')
        function O(e) {
            return null != e && 'object' == typeof e && '$$typeof' in e && e.$$typeof === Q && '_payload' in e && C(e._payload)
        }
        function C(e) {
            return 'object' == typeof e && null !== e && 'then' in e
        }
        ;(f(O, 'isLazyComponent'), f(C, 'isPromiseLike'))
        var T = f((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, 'createSlotError'),
            j = f(
                (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
                'createSlottableError',
            ),
            w = o[' use '.trim().toString()]
        e.s(['Root', 0, y, 'Slot', 0, y, 'Slottable', 0, b, 'createSlot', 0, m, 'createSlottable', 0, g], 89762)
        var I = e.i(89762)
        e.s(['Slot', 0, I], 70596)
        var I = I,
            M = e.i(1718)
        let A = a(
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
        e.s(
            [
                'Button',
                0,
                function (e) {
                    let r,
                        i,
                        n,
                        a,
                        o,
                        u,
                        l,
                        c = (0, s.c)(16)
                    c[0] !== e
                        ? (({ className: r, variant: n, size: a, asChild: o, ...i } = e),
                          (c[0] = e),
                          (c[1] = r),
                          (c[2] = i),
                          (c[3] = n),
                          (c[4] = a),
                          (c[5] = o))
                        : ((r = c[1]), (i = c[2]), (n = c[3]), (a = c[4]), (o = c[5]))
                    let h = void 0 === n ? 'default' : n,
                        d = void 0 === a ? 'default' : a,
                        p = void 0 !== o && o ? I.Root : 'button'
                    return (
                        c[6] !== r || c[7] !== d || c[8] !== h
                            ? ((u = (0, M.cn)(A({ variant: h, size: d, className: r }))), (c[6] = r), (c[7] = d), (c[8] = h), (c[9] = u))
                            : (u = c[9]),
                        c[10] !== p || c[11] !== i || c[12] !== d || c[13] !== u || c[14] !== h
                            ? ((l = (0, t.jsx)(p, { 'data-slot': 'button', 'data-variant': h, 'data-size': d, className: u, ...i })),
                              (c[10] = p),
                              (c[11] = i),
                              (c[12] = d),
                              (c[13] = u),
                              (c[14] = h),
                              (c[15] = l))
                            : (l = c[15]),
                        l
                    )
                },
            ],
            44659,
        )
    },
    5697,
    (e) => {
        'use strict'
        var t = e.i(48607),
            s = e.i(83782),
            r = e.i(66476),
            i = e.i(25852),
            n = e.i(60687),
            a = e.i(98750),
            o = e.i(68280)
        let u = o.z.object({
            cursor: o.z.number(),
            lastSyncAt: o.z.string().nullable(),
            lastError: o.z.string().nullable(),
            counts: o.z.object({ chats: o.z.number(), messages: o.z.number(), attachments: o.z.number() }),
        })
        var l = e.i(4526),
            c = e.i(15400),
            h = e.i(54037)
        async function d() {
            return (0, c.successEnvelopeSchema)(o.z.object({ synced: o.z.number() })).parse(await (0, h.apiFetch)('/sync/run', { method: 'POST' }))
                .data
        }
        var p = e.i(68915),
            f = e.i(3569),
            m = e.i(1718)
        let y = { warning: 'text-warning', danger: 'text-destructive' },
            v = (e) => {
                let r,
                    i,
                    n,
                    a,
                    o,
                    u = (0, s.c)(13),
                    { label: l, value: c, hint: h, accent: d } = e
                u[0] !== l ? ((r = (0, t.jsx)('p', { className: 'text-xs text-muted-foreground', children: l })), (u[0] = l), (u[1] = r)) : (r = u[1])
                let p = d && y[d]
                return (
                    u[2] !== p ? ((i = (0, m.cn)('text-2xl font-semibold tracking-tight tabular-nums', p)), (u[2] = p), (u[3] = i)) : (i = u[3]),
                    u[4] !== i || u[5] !== c
                        ? ((n = (0, t.jsx)('p', { className: i, children: c })), (u[4] = i), (u[5] = c), (u[6] = n))
                        : (n = u[6]),
                    u[7] !== h
                        ? ((a = h ? (0, t.jsx)('p', { className: 'text-xs text-muted-foreground', children: h }) : null), (u[7] = h), (u[8] = a))
                        : (a = u[8]),
                    u[9] !== r || u[10] !== n || u[11] !== a
                        ? ((o = (0, t.jsxs)('article', { className: 'flex h-full flex-col items-start gap-1 bg-card p-3', children: [r, n, a] })),
                          (u[9] = r),
                          (u[10] = n),
                          (u[11] = a),
                          (u[12] = o))
                        : (o = u[12]),
                    o
                )
            }
        var g = e.i(56507),
            b = e.i(44659)
        e.s(
            [
                'SyncStatusWidget',
                0,
                () => {
                    let e,
                        o,
                        m,
                        y,
                        S,
                        R,
                        x,
                        E,
                        Q,
                        O,
                        C,
                        T,
                        j,
                        w,
                        I,
                        M,
                        A,
                        z,
                        P,
                        U,
                        D,
                        _,
                        N,
                        k,
                        B,
                        F,
                        q,
                        L = (0, s.c)(51),
                        { data: K } =
                            ((k = (0, s.c)(1))[0] === Symbol.for('react.memo_cache_sentinel')
                                ? ((N = {
                                      ...(0, r.queryOptions)({
                                          queryKey: l.QUERY_KEY.SYNC.STATUS,
                                          queryFn: async () => (0, c.successEnvelopeSchema)(u).parse(await (0, h.apiFetch)('/sync/status')).data,
                                      }),
                                      refetchInterval: 5e3,
                                  }),
                                  (k[0] = N))
                                : (N = k[0]),
                            (0, a.useSuspenseQuery)(N)),
                        $ =
                            ((F = (0, s.c)(2)),
                            (q = (0, n.useQueryClient)()),
                            F[0] !== q
                                ? ((B = {
                                      mutationFn: d,
                                      onSuccess: () => {
                                          ;(q.invalidateQueries({ queryKey: l.QUERY_KEY.SYNC.STATUS }),
                                              q.invalidateQueries({ queryKey: l.QUERY_KEY.CHAT.ALL }),
                                              q.invalidateQueries({ queryKey: l.QUERY_KEY.MESSAGE.ALL }))
                                      },
                                  }),
                                  (F[0] = q),
                                  (F[1] = B))
                                : (B = F[1]),
                            (0, i.useMutation)(B))
                    return (
                        L[0] !== K.counts.chats ? ((e = (0, g.formatCount)(K.counts.chats)), (L[0] = K.counts.chats), (L[1] = e)) : (e = L[1]),
                        L[2] !== e ? ((o = (0, t.jsx)(v, { label: '대화', value: e })), (L[2] = e), (L[3] = o)) : (o = L[3]),
                        L[4] !== K.counts.messages
                            ? ((m = (0, g.formatCount)(K.counts.messages)), (L[4] = K.counts.messages), (L[5] = m))
                            : (m = L[5]),
                        L[6] !== m ? ((y = (0, t.jsx)(v, { label: '메시지', value: m })), (L[6] = m), (L[7] = y)) : (y = L[7]),
                        L[8] !== K.counts.attachments
                            ? ((S = (0, g.formatCount)(K.counts.attachments)), (L[8] = K.counts.attachments), (L[9] = S))
                            : (S = L[9]),
                        L[10] !== S ? ((R = (0, t.jsx)(v, { label: '첨부파일', value: S })), (L[10] = S), (L[11] = R)) : (R = L[11]),
                        L[12] !== K.cursor ? ((x = (0, g.formatCount)(K.cursor)), (L[12] = K.cursor), (L[13] = x)) : (x = L[13]),
                        L[14] !== x ? ((E = (0, t.jsx)(v, { label: '커서 (message ROWID)', value: x })), (L[14] = x), (L[15] = E)) : (E = L[15]),
                        L[16] !== o || L[17] !== y || L[18] !== R || L[19] !== E
                            ? ((Q = (0, t.jsxs)('div', { className: 'grid grid-cols-2 gap-px md:grid-cols-4', children: [o, y, R, E] })),
                              (L[16] = o),
                              (L[17] = y),
                              (L[18] = R),
                              (L[19] = E),
                              (L[20] = Q))
                            : (Q = L[20]),
                        L[21] === Symbol.for('react.memo_cache_sentinel')
                            ? ((O = (0, t.jsx)('span', { className: 'text-muted-foreground', children: '마지막 동기화' })), (L[21] = O))
                            : (O = L[21]),
                        L[22] !== K.lastSyncAt ? ((C = (0, g.formatDateTime)(K.lastSyncAt)), (L[22] = K.lastSyncAt), (L[23] = C)) : (C = L[23]),
                        L[24] !== C
                            ? ((T = (0, t.jsxs)('div', {
                                  className: 'flex flex-wrap items-center gap-2 text-xs',
                                  children: [
                                      O,
                                      (0, t.jsx)('span', { className: 'font-mono tabular-nums', suppressHydrationWarning: !0, children: C }),
                                  ],
                              })),
                              (L[24] = C),
                              (L[25] = T))
                            : (T = L[25]),
                        L[26] === Symbol.for('react.memo_cache_sentinel')
                            ? ((j = (0, t.jsx)('span', { className: 'text-muted-foreground', children: '마지막 에러' })), (L[26] = j))
                            : (j = L[26]),
                        L[27] !== K.lastError
                            ? ((w = (0, t.jsxs)('div', {
                                  className: 'flex flex-wrap items-center gap-2 text-xs',
                                  children: [
                                      j,
                                      K.lastError
                                          ? (0, t.jsx)('span', { className: 'font-mono text-destructive', children: K.lastError })
                                          : (0, t.jsx)('span', { className: 'text-muted-foreground', children: '없음' }),
                                  ],
                              })),
                              (L[27] = K.lastError),
                              (L[28] = w))
                            : (w = L[28]),
                        L[29] !== $ ? ((I = () => $.mutate()), (L[29] = $), (L[30] = I)) : (I = L[30]),
                        L[31] !== $.isPending || L[32] !== I
                            ? ((M = (0, t.jsx)(b.Button, { size: 'sm', disabled: $.isPending, onClick: I, children: '지금 동기화' })),
                              (L[31] = $.isPending),
                              (L[32] = I),
                              (L[33] = M))
                            : (M = L[33]),
                        L[34] !== $.data || L[35] !== $.isSuccess
                            ? ((A = $.isSuccess
                                  ? (0, t.jsxs)('span', {
                                        className: 'text-xs text-muted-foreground tabular-nums',
                                        children: [(0, g.formatCount)($.data.synced), '건 동기화됨'],
                                    })
                                  : null),
                              (L[34] = $.data),
                              (L[35] = $.isSuccess),
                              (L[36] = A))
                            : (A = L[36]),
                        L[37] !== $.isError
                            ? ((z = $.isError
                                  ? (0, t.jsx)('span', { className: 'text-xs text-destructive', children: '동기화 실행에 실패했습니다' })
                                  : null),
                              (L[37] = $.isError),
                              (L[38] = z))
                            : (z = L[38]),
                        L[39] !== M || L[40] !== A || L[41] !== z
                            ? ((P = (0, t.jsxs)('div', { className: 'flex items-center gap-2', children: [M, A, z] })),
                              (L[39] = M),
                              (L[40] = A),
                              (L[41] = z),
                              (L[42] = P))
                            : (P = L[42]),
                        L[43] === Symbol.for('react.memo_cache_sentinel')
                            ? ((U = (0, t.jsx)('p', {
                                  className: 'text-xs text-muted-foreground',
                                  children: '동기화는 서버에서 주기적으로 자동 실행되며, 이 화면은 5초마다 상태를 갱신합니다.',
                              })),
                              (L[43] = U))
                            : (U = L[43]),
                        L[44] !== T || L[45] !== w || L[46] !== P
                            ? ((D = (0, t.jsxs)(f.PanelCard, {
                                  title: '동기화 상태',
                                  contentClassName: 'flex flex-col gap-2',
                                  children: [T, w, P, U],
                              })),
                              (L[44] = T),
                              (L[45] = w),
                              (L[46] = P),
                              (L[47] = D))
                            : (D = L[47]),
                        L[48] !== D || L[49] !== Q
                            ? ((_ = (0, t.jsxs)(p.PageRoot, { children: [Q, D] })), (L[48] = D), (L[49] = Q), (L[50] = _))
                            : (_ = L[50]),
                        _
                    )
                },
            ],
            5697,
        )
    },
    62522,
    (e) => {
        'use strict'
        var t = e.i(60687),
            s = e.i(30216),
            r = e.i(36021)
        function i(e, t, s) {
            let i = e.getMutationCache(),
                n = e.getQueryCache(),
                a = s?.defaultOptions?.deserializeData ?? e.getDefaultOptions().hydrate?.deserializeData
            ;(t.mutations?.forEach(({ state: t, ...r }) => {
                i.build(e, { ...e.getDefaultOptions().hydrate?.mutations, ...s?.defaultOptions?.mutations, ...r }, t)
            }),
                t.queries?.forEach(({ queryKey: t, state: i, queryHash: o, meta: u, promise: l, dehydratedAt: c, queryType: h }) => {
                    let d = l
                            ? (function (e) {
                                  let t
                                  if ((e.then((e) => ((t = e), e), r.noop)?.catch?.(r.noop), void 0 !== t)) return { data: t }
                              })(l)
                            : void 0,
                        p = void 0 === i.data ? d?.data : i.data,
                        f = void 0 === p ? p : a ? a(p) : p,
                        m = n.get(o),
                        y = m?.state.status === 'pending',
                        v = m?.state.fetchStatus === 'fetching'
                    if (m) {
                        let e = d && void 0 !== c && c > m.state.dataUpdatedAt
                        if (i.dataUpdatedAt > m.state.dataUpdatedAt || e) {
                            let { fetchStatus: e, ...t } = i
                            m.setState({
                                ...t,
                                data: f,
                                ...('pending' === i.status &&
                                    void 0 !== f && { status: 'success', dataUpdatedAt: c ?? Date.now(), ...(!v && { fetchStatus: 'idle' }) }),
                            })
                        }
                    } else
                        m = n.build(
                            e,
                            {
                                ...e.getDefaultOptions().hydrate?.queries,
                                ...s?.defaultOptions?.queries,
                                queryKey: t,
                                queryHash: o,
                                meta: u,
                                _type: h,
                            },
                            {
                                ...i,
                                data: f,
                                fetchStatus: 'idle',
                                status: 'pending' === i.status && void 0 !== f ? 'success' : i.status,
                                ...('pending' === i.status && void 0 !== f && { dataUpdatedAt: c ?? Date.now() }),
                            },
                        )
                    !l ||
                        d ||
                        y ||
                        v ||
                        (void 0 !== c && !(c > m.state.dataUpdatedAt)) ||
                        m.fetch(void 0, { initialPromise: Promise.resolve(l).then(a) }).catch(r.noop)
                }))
        }
        e.s(
            [
                'HydrationBoundary',
                0,
                ({ children: e, options: r = {}, state: n, queryClient: a }) => {
                    let o = (0, t.useQueryClient)(a),
                        u = s.useRef(r)
                    s.useEffect(() => {
                        u.current = r
                    })
                    let l = s.useMemo(() => {
                        if (n) {
                            if ('object' != typeof n) return
                            let e = o.getQueryCache(),
                                t = n.queries || [],
                                s = [],
                                r = []
                            for (let i of t) {
                                let t = e.get(i.queryHash)
                                t
                                    ? (i.state.dataUpdatedAt > t.state.dataUpdatedAt ||
                                          (i.promise &&
                                              'pending' !== t.state.status &&
                                              'fetching' !== t.state.fetchStatus &&
                                              void 0 !== i.dehydratedAt &&
                                              i.dehydratedAt > t.state.dataUpdatedAt)) &&
                                      r.push(i)
                                    : s.push(i)
                            }
                            if ((s.length > 0 && i(o, { queries: s }, u.current), r.length > 0)) return r
                        }
                    }, [o, n])
                    return (
                        s.useEffect(() => {
                            l && i(o, { queries: l }, u.current)
                        }, [o, l]),
                        e
                    )
                },
            ],
            62522,
        )
    },
    85473,
    14860,
    33217,
    (e) => {
        'use strict'
        let t
        var s = e.i(30216)
        let r = s.createContext(!1)
        ;(r.Provider, e.s(['useIsRestoring', 0, () => s.useContext(r)], 85473), e.i(48607))
        let i = s.createContext(
            ((t = !1),
            {
                clearReset: () => {
                    t = !1
                },
                reset: () => {
                    t = !0
                },
                isReset: () => t,
            }),
        )
        e.s(['useQueryErrorResetBoundary', 0, () => s.useContext(i)], 14860)
        var n = e.i(36021)
        e.s(
            [
                'ensurePreventErrorBoundaryRetry',
                0,
                (e, t, s) => {
                    let r =
                        s?.state.error && 'function' == typeof e.throwOnError
                            ? (0, n.shouldThrowError)(e.throwOnError, [s.state.error, s])
                            : e.throwOnError
                    ;(e.suspense || r) && !t.isReset() && (e.retryOnMount = !1)
                },
                'getHasError',
                0,
                ({ result: e, errorResetBoundary: t, throwOnError: s, query: r, suspense: i }) =>
                    e.isError && !t.isReset() && !e.isFetching && r && ((i && void 0 === e.data) || (0, n.shouldThrowError)(s, [e.error, r])),
                'useClearResetErrorBoundary',
                0,
                (e) => {
                    s.useEffect(() => {
                        e.clearReset()
                    }, [e])
                },
            ],
            33217,
        )
    },
    66476,
    4526,
    15400,
    54037,
    3569,
    56507,
    (e) => {
        'use strict'
        ;(e.s(
            [
                'queryOptions',
                0,
                function (e) {
                    return e
                },
            ],
            66476,
        ),
            e.s(
                [
                    'QUERY_KEY',
                    0,
                    {
                        AUTH: { STATUS: ['auth', 'status'] },
                        CHAT: {
                            ALL: ['chat'],
                            LIST: (e) => ['chat', 'list', e],
                            DETAIL: (e) => ['chat', 'detail', e],
                            MESSAGES: (e, t) => ['chat', 'messages', e, t],
                        },
                        MESSAGE: { ALL: ['message'], SEARCH: (e) => ['message', 'search', e] },
                        ATTACHMENT: { BY_MESSAGES: (e) => ['attachment', 'by-messages', e] },
                        SYNC: { STATUS: ['sync', 'status'] },
                    },
                ],
                4526,
            ))
        var t = e.i(68280)
        e.s(
            [
                'paginatedEnvelopeSchema',
                0,
                (e) =>
                    t.z.object({
                        success: t.z.literal(!0),
                        data: t.z.array(e),
                        pagination: t.z.object({ page: t.z.number(), limit: t.z.number(), total: t.z.number(), totalPages: t.z.number() }),
                    }),
                'successEnvelopeSchema',
                0,
                (e) => t.z.object({ success: t.z.literal(!0), data: e }),
            ],
            15400,
        )
        var s = e.i(8800)
        let r = t.z.object({ success: t.z.literal(!1), error: t.z.object({ code: t.z.string(), message: t.z.string() }) }),
            i = async (e, t) => fetch(`/api/be${e}`, t),
            n = async (e, t) => {
                let n = await i(e, t),
                    a = await n.json(),
                    o = r.safeParse(a)
                if (o.success) throw new s.ApiError(o.data.error.code, o.data.error.message, n.status)
                if (!n.ok) throw new s.ApiError(`HTTP_${n.status}`, n.statusText, n.status)
                return a
            }
        e.s(['apiFetch', 0, n], 54037)
        var a = e.i(48607),
            o = e.i(83782),
            u = e.i(1718)
        e.s(
            [
                'PanelCard',
                0,
                (e) => {
                    let t,
                        s,
                        r,
                        i,
                        n = (0, o.c)(10),
                        { title: l, contentClassName: c, children: h } = e
                    return (
                        n[0] !== l
                            ? ((t = l
                                  ? (0, a.jsx)('header', {
                                        className: 'px-3',
                                        children: (0, a.jsx)('h2', { className: 'text-sm font-medium', children: l }),
                                    })
                                  : null),
                              (n[0] = l),
                              (n[1] = t))
                            : (t = n[1]),
                        n[2] !== c ? ((s = (0, u.cn)('px-3', c)), (n[2] = c), (n[3] = s)) : (s = n[3]),
                        n[4] !== h || n[5] !== s
                            ? ((r = (0, a.jsx)('div', { className: s, children: h })), (n[4] = h), (n[5] = s), (n[6] = r))
                            : (r = n[6]),
                        n[7] !== t || n[8] !== r
                            ? ((i = (0, a.jsxs)('section', { className: 'flex flex-col gap-3 bg-card py-3', children: [t, r] })),
                              (n[7] = t),
                              (n[8] = r),
                              (n[9] = i))
                            : (i = n[9]),
                        i
                    )
                },
            ],
            3569,
        )
        let l = (e) => String(e).padStart(2, '0')
        e.s(
            [
                'formatCount',
                0,
                (e) => e.toLocaleString('ko-KR'),
                'formatDateTime',
                0,
                (e) => {
                    if (!e) return '-'
                    let t = new Date(e)
                    return `${t.getFullYear()}-${l(t.getMonth() + 1)}-${l(t.getDate())} ${l(t.getHours())}:${l(t.getMinutes())}:${l(t.getSeconds())}`
                },
            ],
            56507,
        )
    },
    63502,
    (e) => {
        'use strict'
        e.s([
            'defaultThrowOnError',
            0,
            (e, t) => void 0 === t.state.data,
            'ensureSuspenseTimers',
            0,
            (e) => {
                if (e.suspense) {
                    let t = (e) => ('static' === e ? e : Math.max(e ?? 1e3, 1e3)),
                        s = e.staleTime
                    ;((e.staleTime = 'function' == typeof s ? (...e) => t(s(...e)) : t(s)),
                        'number' == typeof e.gcTime && (e.gcTime = Math.max(e.gcTime, 1e3)))
                }
            },
            'fetchOptimistic',
            0,
            (e, t, s) =>
                t.fetchOptimistic(e).catch(() => {
                    s.clearReset()
                }),
            'shouldSuspend',
            0,
            (e, t) => e?.suspense && t.isPending,
        ])
    },
    25852,
    (e) => {
        'use strict'
        var t = e.i(60687),
            s = e.i(30216),
            r = e.i(36021),
            i = e.i(66519),
            n = e.i(14437),
            a = e.i(57783),
            o = class extends i.Subscribable {
                #e
                #t = void 0
                #s
                #r
                constructor(e, t) {
                    ;(super(), (this.#e = e), this.setOptions(t), this.bindMethods(), this.#i())
                }
                bindMethods() {
                    ;((this.mutate = this.mutate.bind(this)), (this.reset = this.reset.bind(this)))
                }
                setOptions(e) {
                    let t = this.options
                    ;((this.options = this.#e.defaultMutationOptions(e)),
                        (0, r.shallowEqualObjects)(this.options, t) ||
                            this.#e.getMutationCache().notify({ type: 'observerOptionsUpdated', mutation: this.#s, observer: this }),
                        t?.mutationKey && this.options.mutationKey && (0, r.hashKey)(t.mutationKey) !== (0, r.hashKey)(this.options.mutationKey)
                            ? this.reset()
                            : this.#s?.state.status === 'pending' && this.#s.setOptions(this.options))
                }
                onSubscribe() {
                    1 === this.listeners.size && this.#s && (this.#s.addObserver(this), this.#i())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.#s?.removeObserver(this)
                }
                onMutationUpdate(e) {
                    ;(this.#i(), this.#n(e))
                }
                getCurrentResult() {
                    return this.#t
                }
                reset() {
                    ;(this.#s?.removeObserver(this), (this.#s = void 0), this.#i(), this.#n())
                }
                mutate(e, t) {
                    return (
                        (this.#r = t),
                        this.#s?.removeObserver(this),
                        (this.#s = this.#e.getMutationCache().build(this.#e, this.options)),
                        this.#s.addObserver(this),
                        this.#s.execute(e)
                    )
                }
                #i() {
                    let e = this.#s?.state ?? (0, a.getDefaultState)()
                    this.#t = {
                        ...e,
                        isPending: 'pending' === e.status,
                        isSuccess: 'success' === e.status,
                        isError: 'error' === e.status,
                        isIdle: 'idle' === e.status,
                        mutate: this.mutate,
                        reset: this.reset,
                    }
                }
                #n(e) {
                    n.notifyManager.batch(() => {
                        if (this.#r && this.hasListeners()) {
                            let t = this.#t.variables,
                                s = this.#t.context,
                                r = { client: this.#e, meta: this.options.meta, mutationKey: this.options.mutationKey }
                            if (e?.type === 'success') {
                                try {
                                    this.#r.onSuccess?.(e.data, t, s, r)
                                } catch (e) {
                                    Promise.reject(e)
                                }
                                try {
                                    this.#r.onSettled?.(e.data, null, t, s, r)
                                } catch (e) {
                                    Promise.reject(e)
                                }
                            } else if (e?.type === 'error') {
                                try {
                                    this.#r.onError?.(e.error, t, s, r)
                                } catch (e) {
                                    Promise.reject(e)
                                }
                                try {
                                    this.#r.onSettled?.(void 0, e.error, t, s, r)
                                } catch (e) {
                                    Promise.reject(e)
                                }
                            }
                        }
                        this.listeners.forEach((e) => {
                            e(this.#t)
                        })
                    })
                }
            }
        e.s(
            [
                'useMutation',
                0,
                function (e, i) {
                    let a = (0, t.useQueryClient)(i),
                        [u] = s.useState(() => new o(a, e))
                    s.useEffect(() => {
                        u.setOptions(e)
                    }, [u, e])
                    let l = s.useSyncExternalStore(
                            s.useCallback((e) => u.subscribe(n.notifyManager.batchCalls(e)), [u]),
                            () => u.getCurrentResult(),
                            () => u.getCurrentResult(),
                        ),
                        c = s.useCallback(
                            (...e) => {
                                u.mutate(e[0], e[1]).catch(r.noop)
                            },
                            [u],
                        )
                    if (l.error && (0, r.shouldThrowError)(u.options.throwOnError, [l.error])) throw l.error
                    return { ...l, mutate: c, mutateAsync: l.mutate }
                },
            ],
            25852,
        )
    },
    98750,
    5816,
    85573,
    (e) => {
        'use strict'
        var t = e.i(63502),
            s = e.i(60687),
            r = e.i(85473),
            i = e.i(14860),
            n = e.i(33217),
            a = e.i(30216),
            o = e.i(36021),
            u = e.i(14437)
        function l(e, l, c) {
            let h = (0, r.useIsRestoring)(),
                d = (0, i.useQueryErrorResetBoundary)(),
                p = (0, s.useQueryClient)(c),
                f = p.defaultQueryOptions(e),
                m = p.getQueryCache().get(f.queryHash),
                y = !1 !== e.subscribed
            ;((f._optimisticResults = h ? 'isRestoring' : y ? 'optimistic' : void 0),
                (0, t.ensureSuspenseTimers)(f),
                (0, n.ensurePreventErrorBoundaryRetry)(f, d, m),
                (0, n.useClearResetErrorBoundary)(d))
            let [v] = a.useState(() => new l(p, f)),
                g = v.getOptimisticResult(f),
                b = !h && y
            if (
                (a.useSyncExternalStore(
                    a.useCallback(
                        (e) => {
                            let t = b ? v.subscribe(u.notifyManager.batchCalls(e)) : o.noop
                            return (v.updateResult(), t)
                        },
                        [v, b],
                    ),
                    () => v.getCurrentResult(),
                    () => v.getCurrentResult(),
                ),
                a.useEffect(() => {
                    v.setOptions(f)
                }, [f, v]),
                (0, t.shouldSuspend)(f, g))
            )
                throw (0, t.fetchOptimistic)(f, v, d)
            if ((0, n.getHasError)({ result: g, errorResetBoundary: d, throwOnError: f.throwOnError, query: m, suspense: f.suspense })) throw g.error
            return f.notifyOnChangeProps ? g : v.trackResult(g)
        }
        e.s(['useBaseQuery', 0, l], 5816)
        var c = e.i(78774),
            h = e.i(28875),
            d = e.i(66519),
            p = e.i(82870),
            f = e.i(73045),
            m = class extends d.Subscribable {
                #e
                #a = void 0
                #o = void 0
                #t = void 0
                #u
                #l
                #c
                #h
                #d
                #p
                #f
                #m
                #y
                #v = new Set()
                constructor(e, t) {
                    ;(super(), (this.options = t), (this.#e = e), (this.#c = null), this.bindMethods(), this.setOptions(t))
                }
                bindMethods() {
                    this.refetch = this.refetch.bind(this)
                }
                onSubscribe() {
                    1 === this.listeners.size && (this.#a.addObserver(this), y(this.#a, this.options) ? this.#g() : this.updateResult(), this.#b())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.destroy()
                }
                shouldFetchOnReconnect() {
                    return v(this.#a, this.options, this.options.refetchOnReconnect)
                }
                shouldFetchOnWindowFocus() {
                    return v(this.#a, this.options, this.options.refetchOnWindowFocus)
                }
                destroy() {
                    ;((this.listeners = new Set()), this.#S(), this.#R(), this.#a.removeObserver(this))
                }
                setOptions(e) {
                    let t = this.options,
                        s = this.#a
                    if (
                        ((this.options = this.#e.defaultQueryOptions(e)),
                        void 0 !== this.options.enabled &&
                            'boolean' != typeof this.options.enabled &&
                            'function' != typeof this.options.enabled &&
                            'boolean' != typeof (0, o.resolveQueryBoolean)(this.options.enabled, this.#a))
                    )
                        throw Error('Expected enabled to be a boolean or a callback that returns a boolean')
                    ;(this.#x(),
                        this.#a.setOptions(this.options),
                        t._defaulted &&
                            !(0, o.shallowEqualObjects)(this.options, t) &&
                            this.#e.getQueryCache().notify({ type: 'observerOptionsUpdated', query: this.#a, observer: this }))
                    let r = this.hasListeners()
                    ;(r && g(this.#a, s, this.options, t) && this.#g(),
                        this.updateResult(),
                        r &&
                            (this.#a !== s ||
                                (0, o.resolveQueryBoolean)(this.options.enabled, this.#a) !== (0, o.resolveQueryBoolean)(t.enabled, this.#a) ||
                                (0, o.resolveStaleTime)(this.options.staleTime, this.#a) !== (0, o.resolveStaleTime)(t.staleTime, this.#a)) &&
                            this.#E())
                    let i = this.#Q()
                    r &&
                        (this.#a !== s ||
                            (0, o.resolveQueryBoolean)(this.options.enabled, this.#a) !== (0, o.resolveQueryBoolean)(t.enabled, this.#a) ||
                            i !== this.#y) &&
                        this.#O(i)
                }
                getOptimisticResult(e) {
                    var t, s
                    let r = this.#e.getQueryCache().build(this.#e, e),
                        i = this.createResult(r, e)
                    return (
                        (t = this),
                        (s = i),
                        (0, o.shallowEqualObjects)(t.getCurrentResult(), s) || ((this.#t = i), (this.#l = this.options), (this.#u = this.#a.state)),
                        i
                    )
                }
                getCurrentResult() {
                    return this.#t
                }
                trackResult(e, t) {
                    return new Proxy(e, { get: (e, s) => (this.trackProp(s), t?.(s), Reflect.get(e, s)) })
                }
                trackProp(e) {
                    this.#v.add(e)
                }
                getCurrentQuery() {
                    return this.#a
                }
                refetch({ ...e } = {}) {
                    return this.fetch({ ...e })
                }
                fetchOptimistic(e) {
                    let t,
                        s = this.#e.defaultQueryOptions(e),
                        r = this.#e.getQueryCache().build(this.#e, s),
                        i = () => {},
                        n = new Promise((e) => {
                            ;((t = e),
                                (i = this.#e.getQueryCache().subscribe((t) => {
                                    'updated' === t.type &&
                                        t.query.queryHash === r.queryHash &&
                                        void 0 !== r.state.data &&
                                        (i(), e(this.createResult(r, s)))
                                })))
                        })
                    return Promise.race([
                        r
                            .fetch()
                            .then(() => {
                                let e = this.createResult(r, s)
                                return (t?.(e), e)
                            })
                            .finally(() => {
                                i()
                            }),
                        n,
                    ])
                }
                fetch(e) {
                    return this.#g({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(() => (this.updateResult(), this.#t))
                }
                #g(e) {
                    this.#x()
                    let t = this.#a.fetch(this.options, e)
                    return (e?.throwOnError || (t = t.catch(o.noop)), t)
                }
                #E() {
                    this.#S()
                    let e = (0, o.resolveStaleTime)(this.options.staleTime, this.#a)
                    if (h.environmentManager.isServer() || this.#t.isStale || !(0, o.isValidTimeout)(e)) return
                    let t = (0, o.timeUntilStale)(this.#t.dataUpdatedAt, e) + 1
                    this.#f = c.timeoutManager.setTimeout(() => {
                        this.#t.isStale || this.updateResult()
                    }, t)
                }
                #Q() {
                    return (
                        ('function' == typeof this.options.refetchInterval ? this.options.refetchInterval(this.#a) : this.options.refetchInterval) ??
                        !1
                    )
                }
                #O(e) {
                    ;(this.#R(),
                        (this.#y = e),
                        !h.environmentManager.isServer() &&
                            !1 !== (0, o.resolveQueryBoolean)(this.options.enabled, this.#a) &&
                            (0, o.isValidTimeout)(this.#y) &&
                            0 !== this.#y &&
                            (this.#m = c.timeoutManager.setInterval(() => {
                                ;(this.options.refetchIntervalInBackground || p.focusManager.isFocused()) && this.#g()
                            }, this.#y)))
                }
                #b() {
                    ;(this.#E(), this.#O(this.#Q()))
                }
                #S() {
                    void 0 !== this.#f && (c.timeoutManager.clearTimeout(this.#f), (this.#f = void 0))
                }
                #R() {
                    void 0 !== this.#m && (c.timeoutManager.clearInterval(this.#m), (this.#m = void 0))
                }
                createResult(e, t) {
                    let s,
                        r = this.#a,
                        i = this.options,
                        n = this.#t,
                        a = this.#u,
                        u = this.#l,
                        l = e !== r ? e.state : this.#o,
                        { state: c } = e,
                        h = { ...c },
                        d = !1
                    if (t._optimisticResults) {
                        let s = this.hasListeners(),
                            n = !s && y(e, t),
                            a = s && g(e, r, t, i)
                        ;((n || a) && (h = { ...h, ...(0, f.fetchState)(c.data, e.options) }),
                            'isRestoring' === t._optimisticResults && (h.fetchStatus = 'idle'))
                    }
                    let { error: p, errorUpdatedAt: m, status: v } = h
                    s = h.data
                    let S = !1
                    if (void 0 !== t.placeholderData && void 0 === s && 'pending' === v) {
                        let e
                        ;(n?.isPlaceholderData && t.placeholderData === u?.placeholderData
                            ? ((e = n.data), (S = !0))
                            : (e = 'function' == typeof t.placeholderData ? t.placeholderData(this.#p?.state.data, this.#p) : t.placeholderData),
                            void 0 !== e && ((v = 'success'), (s = (0, o.replaceData)(n?.data, e, t)), (d = !0)))
                    }
                    if (t.select && void 0 !== s && !S)
                        if (n && s === a?.data && t.select === this.#h) s = this.#d
                        else
                            try {
                                ;((this.#h = t.select), (s = t.select(s)), (s = (0, o.replaceData)(n?.data, s, t)), (this.#d = s), (this.#c = null))
                            } catch (e) {
                                this.#c = e
                            }
                    else void 0 === s && (this.#c = null)
                    this.#c && ((p = this.#c), (s = this.#d), (m = Date.now()), (v = 'error'), (d = !1))
                    let R = 'fetching' === h.fetchStatus,
                        x = 'pending' === v,
                        E = 'error' === v,
                        Q = x && R,
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
                        isFetched: e.isFetched(),
                        isFetchedAfterMount: h.dataUpdateCount > l.dataUpdateCount || h.errorUpdateCount > l.errorUpdateCount,
                        isFetching: R,
                        isRefetching: R && !x,
                        isLoadingError: E && !O,
                        isPaused: 'paused' === h.fetchStatus,
                        isPlaceholderData: d,
                        isRefetchError: E && O,
                        isStale: b(e, t),
                        refetch: this.refetch,
                        isEnabled: !1 !== (0, o.resolveQueryBoolean)(t.enabled, e),
                    }
                }
                updateResult() {
                    let e = this.#t,
                        t = this.createResult(this.#a, this.options)
                    if (
                        ((this.#u = this.#a.state),
                        (this.#l = this.options),
                        void 0 !== this.#u.data && (this.#p = this.#a),
                        (0, o.shallowEqualObjects)(t, e))
                    )
                        return
                    this.#t = t
                    let s = () => {
                        if (!e) return !0
                        let { notifyOnChangeProps: t } = this.options,
                            s = 'function' == typeof t ? t() : t
                        if ('all' === s || (!s && !this.#v.size)) return !0
                        let r = new Set(s ?? this.#v)
                        return (this.options.throwOnError && r.add('error'), Object.keys(this.#t).some((t) => this.#t[t] !== e[t] && r.has(t)))
                    }
                    this.#n({ listeners: s() })
                }
                #x() {
                    let e = this.#e.getQueryCache().build(this.#e, this.options)
                    if (e === this.#a) return
                    let t = this.#a
                    ;((this.#a = e), (this.#o = e.state), this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)))
                }
                onQueryUpdate() {
                    ;(this.updateResult(), this.hasListeners() && this.#b())
                }
                #n(e) {
                    u.notifyManager.batch(() => {
                        ;(e.listeners &&
                            this.listeners.forEach((e) => {
                                e(this.#t)
                            }),
                            this.#e.getQueryCache().notify({ query: this.#a, type: 'observerResultsUpdated' }))
                    })
                }
            }
        function y(e, t) {
            return (
                (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) &&
                    void 0 === e.state.data &&
                    ('error' !== e.state.status || !1 !== (0, o.resolveQueryBoolean)(t.retryOnMount, e))) ||
                (void 0 !== e.state.data && v(e, t, t.refetchOnMount))
            )
        }
        function v(e, t, s) {
            if (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) && 'static' !== (0, o.resolveStaleTime)(t.staleTime, e)) {
                let r = 'function' == typeof s ? s(e) : s
                return 'always' === r || (!1 !== r && b(e, t))
            }
            return !1
        }
        function g(e, t, s, r) {
            return (e !== t || !1 === (0, o.resolveQueryBoolean)(r.enabled, e)) && (!s.suspense || 'error' !== e.state.status) && b(e, s)
        }
        function b(e, t) {
            return !1 !== (0, o.resolveQueryBoolean)(t.enabled, e) && e.isStaleByTime((0, o.resolveStaleTime)(t.staleTime, e))
        }
        ;(e.s(['QueryObserver', 0, m], 85573),
            e.s(
                [
                    'useSuspenseQuery',
                    0,
                    function (e, s) {
                        return l({ ...e, enabled: !0, suspense: !0, throwOnError: t.defaultThrowOnError, placeholderData: void 0 }, m, s)
                    },
                ],
                98750,
            ))
    },
])
