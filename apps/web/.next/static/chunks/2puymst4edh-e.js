;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    28218,
    (e) => {
        'use strict'
        var t = e.i(83782),
            r = e.i(66476),
            s = e.i(98750),
            i = e.i(68280)
        let a = i.z.object({
            sourceRowId: i.z.number(),
            guid: i.z.string(),
            chatSourceRowId: i.z.number().nullable(),
            senderAddress: i.z.string().nullable(),
            isFromMe: i.z.boolean(),
            text: i.z.string().nullable(),
            service: i.z.string().nullable(),
            sentAt: i.z.string(),
            hasAttachments: i.z.boolean(),
        })
        var n = e.i(4526),
            o = e.i(15400),
            l = e.i(54037)
        let u = (e) => {
            let t = (0, o.paginatedEnvelopeSchema)(a).parse(e)
            return { data: t.data, pagination: t.pagination }
        }
        e.s(
            [
                'useGetChatMessages',
                0,
                (e, i) => {
                    let a,
                        o = (0, t.c)(3)
                    if (o[0] !== e || o[1] !== i)
                        ((a = (0, r.queryOptions)({
                            queryKey: n.QUERY_KEY.CHAT.MESSAGES(e, i),
                            queryFn: async () => u(await (0, l.apiFetch)(`/chats/${e}/messages?page=${i.page}&limit=${i.limit}`)),
                        })),
                            (o[0] = e),
                            (o[1] = i),
                            (o[2] = a))
                    else a = o[2]
                    return (0, s.useSuspenseQuery)(a)
                },
                'useSearchMessages',
                0,
                (e) => {
                    let i,
                        a = (0, t.c)(2)
                    if (a[0] !== e)
                        ((i = (0, r.queryOptions)({
                            queryKey: n.QUERY_KEY.MESSAGE.SEARCH(e),
                            queryFn: async () => {
                                let t = new URLSearchParams({ page: String(e.page), limit: String(e.limit) })
                                return (e.q && t.set('q', e.q), u(await (0, l.apiFetch)(`/messages?${t.toString()}`)))
                            },
                        })),
                            (a[0] = e),
                            (a[1] = i))
                    else i = a[1]
                    return (0, s.useSuspenseQuery)(i)
                },
            ],
            28218,
        )
    },
    30232,
    57027,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            s = e.i(1718)
        function i(e) {
            return (0, t.jsx)(
                'th',
                {
                    scope: 'col',
                    style: e.width ? { width: e.width } : void 0,
                    className: (0, s.cn)('p-2 text-left font-medium text-muted-foreground', 'right' === e.align && 'text-right'),
                    children: e.label,
                },
                e.key,
            )
        }
        e.s(
            [
                'DataTable',
                0,
                (e) => {
                    let a,
                        n,
                        o,
                        l,
                        u,
                        c = (0, r.c)(18),
                        { columns: d, rows: h, rowKey: p, onRowClick: f } = e
                    if (
                        (c[0] !== d ? ((a = d.map(i)), (c[0] = d), (c[1] = a)) : (a = c[1]),
                        c[2] !== a
                            ? ((n = (0, t.jsx)('thead', { children: (0, t.jsx)('tr', { children: a }) })), (c[2] = a), (c[3] = n))
                            : (n = c[3]),
                        c[4] !== d || c[5] !== f || c[6] !== p || c[7] !== h)
                    ) {
                        let e
                        ;(c[9] !== d || c[10] !== f || c[11] !== p
                            ? ((e = (e) =>
                                  (0, t.jsx)(
                                      'tr',
                                      {
                                          onClick: f ? () => f(e) : void 0,
                                          className: (0, s.cn)('border-b', f && 'cursor-pointer hover:bg-accent'),
                                          children: d.map((r) =>
                                              (0, t.jsx)(
                                                  'td',
                                                  {
                                                      className: (0, s.cn)(
                                                          'p-2 align-middle',
                                                          'right' === r.align && 'text-right tabular-nums',
                                                          r.mono && 'font-mono',
                                                          r.flexible && 'max-w-0 truncate',
                                                      ),
                                                      children: r.render(e),
                                                  },
                                                  r.key,
                                              ),
                                          ),
                                      },
                                      p(e),
                                  )),
                              (c[9] = d),
                              (c[10] = f),
                              (c[11] = p),
                              (c[12] = e))
                            : (e = c[12]),
                            (o = h.map(e)),
                            (c[4] = d),
                            (c[5] = f),
                            (c[6] = p),
                            (c[7] = h),
                            (c[8] = o))
                    } else o = c[8]
                    return (
                        c[13] !== o ? ((l = (0, t.jsx)('tbody', { children: o })), (c[13] = o), (c[14] = l)) : (l = c[14]),
                        c[15] !== n || c[16] !== l
                            ? ((u = (0, t.jsx)('div', {
                                  className: 'overflow-x-auto',
                                  children: (0, t.jsxs)('table', { className: 'w-full text-xs', children: [n, l] }),
                              })),
                              (c[15] = n),
                              (c[16] = l),
                              (c[17] = u))
                            : (u = c[17]),
                        u
                    )
                },
            ],
            30232,
        )
        var a = e.i(44659)
        e.s(
            [
                'Pager',
                0,
                (e) => {
                    let s,
                        i,
                        n,
                        o,
                        l,
                        u,
                        c = (0, r.c)(19),
                        { page: d, totalPages: h, onPageChange: p } = e,
                        f = Math.max(h, 1)
                    c[0] !== d || c[1] !== f
                        ? ((s = (0, t.jsxs)('span', { className: 'text-2xs text-muted-foreground tabular-nums', children: [d, ' / ', f] })),
                          (c[0] = d),
                          (c[1] = f),
                          (c[2] = s))
                        : (s = c[2])
                    let y = d <= 1
                    ;(c[3] !== p || c[4] !== d ? ((i = () => p(d - 1)), (c[3] = p), (c[4] = d), (c[5] = i)) : (i = c[5]),
                        c[6] !== y || c[7] !== i
                            ? ((n = (0, t.jsx)(a.Button, { variant: 'ghost', size: 'sm', disabled: y, onClick: i, children: '이전' })),
                              (c[6] = y),
                              (c[7] = i),
                              (c[8] = n))
                            : (n = c[8]))
                    let v = d >= h
                    return (
                        c[9] !== p || c[10] !== d ? ((o = () => p(d + 1)), (c[9] = p), (c[10] = d), (c[11] = o)) : (o = c[11]),
                        c[12] !== v || c[13] !== o
                            ? ((l = (0, t.jsx)(a.Button, { variant: 'ghost', size: 'sm', disabled: v, onClick: o, children: '다음' })),
                              (c[12] = v),
                              (c[13] = o),
                              (c[14] = l))
                            : (l = c[14]),
                        c[15] !== s || c[16] !== n || c[17] !== l
                            ? ((u = (0, t.jsxs)('div', { className: 'flex items-center justify-end gap-2', children: [s, n, l] })),
                              (c[15] = s),
                              (c[16] = n),
                              (c[17] = l),
                              (c[18] = u))
                            : (u = c[18]),
                        u
                    )
                },
            ],
            57027,
        )
    },
    68915,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782)
        e.s([
            'PageRoot',
            0,
            (e) => {
                let s,
                    i = (0, r.c)(2),
                    { children: a } = e
                return (
                    i[0] !== a ? ((s = (0, t.jsx)('div', { className: 'flex flex-col gap-px', children: a })), (i[0] = a), (i[1] = s)) : (s = i[1]),
                    s
                )
            },
        ])
    },
    54722,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            s = e.i(82339)
        let i = (0, s.default)('inbox', [
                ['polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12', key: 'o97t9d' }],
                [
                    'path',
                    {
                        d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
                        key: 'oot6mr',
                    },
                ],
            ]),
            a = (0, s.default)('triangle-alert', [
                ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
                ['path', { d: 'M12 9v4', key: 'juzpu7' }],
                ['path', { d: 'M12 17h.01', key: 'p32p05' }],
            ])
        var n = e.i(1718)
        e.s(
            [
                'StateCard',
                0,
                (e) => {
                    let s,
                        o,
                        l,
                        u,
                        c,
                        d,
                        h = (0, r.c)(15),
                        { variant: p, title: f, description: y } = e,
                        v = 'error' === p ? a : i,
                        m = 'error' === p && 'text-destructive'
                    return (
                        h[0] !== m ? ((s = (0, n.cn)('size-6', m)), (h[0] = m), (h[1] = s)) : (s = h[1]),
                        h[2] !== v || h[3] !== s ? ((o = (0, t.jsx)(v, { className: s })), (h[2] = v), (h[3] = s), (h[4] = o)) : (o = h[4]),
                        h[5] !== f ? ((l = (0, t.jsx)('p', { className: 'text-sm font-medium', children: f })), (h[5] = f), (h[6] = l)) : (l = h[6]),
                        h[7] !== y
                            ? ((u = y ? (0, t.jsx)('p', { className: 'text-xs text-muted-foreground', children: y }) : null), (h[7] = y), (h[8] = u))
                            : (u = h[8]),
                        h[9] !== l || h[10] !== u
                            ? ((c = (0, t.jsxs)('div', { className: 'flex flex-col gap-1', children: [l, u] })), (h[9] = l), (h[10] = u), (h[11] = c))
                            : (c = h[11]),
                        h[12] !== o || h[13] !== c
                            ? ((d = (0, t.jsxs)('section', {
                                  className: 'flex flex-col items-center justify-center gap-6 bg-card px-3 py-12 text-center text-balance',
                                  children: [o, c],
                              })),
                              (h[12] = o),
                              (h[13] = c),
                              (h[14] = d))
                            : (d = h[14]),
                        d
                    )
                },
            ],
            54722,
        )
    },
    8800,
    (e) => {
        'use strict'
        class t extends Error {
            code
            status
            constructor(e, t, r) {
                ;(super(t), (this.code = e), (this.status = r), (this.name = 'ApiError'))
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
            r = e.i(83782),
            s = e.i(70733)
        let i = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
            a = s.clsx,
            n = (e, t) => (r) => {
                var s
                if ((null == t ? void 0 : t.variants) == null) return a(e, null == r ? void 0 : r.class, null == r ? void 0 : r.className)
                let { variants: n, defaultVariants: o } = t,
                    l = Object.keys(n).map((e) => {
                        let t = null == r ? void 0 : r[e],
                            s = null == o ? void 0 : o[e]
                        if (null === t) return null
                        let a = i(t) || i(s)
                        return n[e][a]
                    }),
                    u =
                        r &&
                        Object.entries(r).reduce((e, t) => {
                            let [r, s] = t
                            return (void 0 === s || (e[r] = s), e)
                        }, {})
                return a(
                    e,
                    l,
                    null == t || null == (s = t.compoundVariants)
                        ? void 0
                        : s.reduce((e, t) => {
                              let { class: r, className: s, ...i } = t
                              return Object.entries(i).every((e) => {
                                  let [t, r] = e
                                  return Array.isArray(r) ? r.includes({ ...o, ...u }[t]) : { ...o, ...u }[t] === r
                              })
                                  ? [...e, r, s]
                                  : e
                          }, []),
                    null == r ? void 0 : r.class,
                    null == r ? void 0 : r.className,
                )
            }
        e.s(['cva', 0, n], 7298)
        var o = e.i(30216),
            l = Object.defineProperty,
            u = (e, t) => l(e, 'name', { value: t, configurable: !0 })
        function c(e, t) {
            if ('function' == typeof e) return e(t)
            null != e && (e.current = t)
        }
        function d(...e) {
            return (t) => {
                let r = !1,
                    s = e.map((e) => {
                        let s = c(e, t)
                        return (r || 'function' != typeof s || (r = !0), s)
                    })
                if (r)
                    return () => {
                        for (let t = 0; t < s.length; t++) {
                            let r = s[t]
                            'function' == typeof r ? r() : c(e[t], null)
                        }
                    }
            }
        }
        function h(...e) {
            return o.useCallback(d(...e), e)
        }
        ;(u(c, 'setRef'), u(d, 'composeRefs'), u(h, 'useComposedRefs'))
        var p = Object.defineProperty,
            f = (e, t) => p(e, 'name', { value: t, configurable: !0 })
        function y(e) {
            let t = o.forwardRef((t, r) => {
                let { children: s, ...i } = t,
                    a = null,
                    n = !1,
                    l = []
                ;(O(s) && 'function' == typeof j && (s = j(s._payload)),
                    o.Children.forEach(s, (e) => {
                        if (E(e)) {
                            n = !0
                            let t = 'child' in e.props ? e.props.child : e.props.children
                            ;(O(t) && 'function' == typeof j && (t = j(t._payload)), (a = R(e, t)), l.push(a?.props?.children))
                        } else l.push(e)
                    }),
                    a ? (a = o.cloneElement(a, void 0, l)) : !n && 1 === o.Children.count(s) && o.isValidElement(s) && (a = s))
                let u = a ? x(a) : void 0,
                    c = h(r, u)
                if (!a) {
                    if (s || 0 === s) throw Error(n ? C(e) : w(e))
                    return s
                }
                let d = S(i, a.props ?? {})
                return (a.type !== o.Fragment && (d.ref = r ? c : u), o.cloneElement(a, d))
            })
            return ((t.displayName = `${e}.Slot`), t)
        }
        f(y, 'createSlot')
        var v = y('Slot'),
            m = Symbol.for('radix.slottable')
        function g(e) {
            let t = f((e) => ('child' in e ? e.children(e.child) : e.children), 'Slottable')
            return ((t.displayName = `${e}.Slottable`), (t.__radixId = m), t)
        }
        f(g, 'createSlottable')
        var b = g('Slottable'),
            R = f((e, t) => {
                if ('child' in e.props) {
                    let t = e.props.child
                    return o.isValidElement(t) ? o.cloneElement(t, void 0, e.props.children(t.props.children)) : null
                }
                return o.isValidElement(t) ? t : null
            }, 'getSlottableElementFromSlottable')
        function S(e, t) {
            let r = { ...t }
            for (let s in t) {
                let i = e[s],
                    a = t[s]
                ;/^on[A-Z]/.test(s)
                    ? i && a
                        ? (r[s] = (...e) => {
                              let t = a(...e)
                              return (i(...e), t)
                          })
                        : i && (r[s] = i)
                    : 'style' === s
                      ? (r[s] = { ...i, ...a })
                      : 'className' === s && (r[s] = [i, a].filter(Boolean).join(' '))
            }
            return { ...e, ...r }
        }
        function x(e) {
            let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
                r = t && 'isReactWarning' in t && t.isReactWarning
            return r
                ? e.ref
                : (r = (t = Object.getOwnPropertyDescriptor(e, 'ref')?.get) && 'isReactWarning' in t && t.isReactWarning)
                  ? e.props.ref
                  : e.props.ref || e.ref
        }
        function E(e) {
            return o.isValidElement(e) && 'function' == typeof e.type && '__radixId' in e.type && e.type.__radixId === m
        }
        ;(f(S, 'mergeProps'), f(x, 'getElementRef'), f(E, 'isSlottable'))
        var Q = Symbol.for('react.lazy')
        function O(e) {
            return null != e && 'object' == typeof e && '$$typeof' in e && e.$$typeof === Q && '_payload' in e && T(e._payload)
        }
        function T(e) {
            return 'object' == typeof e && null !== e && 'then' in e
        }
        ;(f(O, 'isLazyComponent'), f(T, 'isPromiseLike'))
        var w = f((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, 'createSlotError'),
            C = f(
                (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
                'createSlottableError',
            ),
            j = o[' use '.trim().toString()]
        e.s(['Root', 0, v, 'Slot', 0, v, 'Slottable', 0, b, 'createSlot', 0, y, 'createSlottable', 0, g], 89762)
        var z = e.i(89762)
        e.s(['Slot', 0, z], 70596)
        var z = z,
            I = e.i(1718)
        let A = n(
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
                    let s,
                        i,
                        a,
                        n,
                        o,
                        l,
                        u,
                        c = (0, r.c)(16)
                    c[0] !== e
                        ? (({ className: s, variant: a, size: n, asChild: o, ...i } = e),
                          (c[0] = e),
                          (c[1] = s),
                          (c[2] = i),
                          (c[3] = a),
                          (c[4] = n),
                          (c[5] = o))
                        : ((s = c[1]), (i = c[2]), (a = c[3]), (n = c[4]), (o = c[5]))
                    let d = void 0 === a ? 'default' : a,
                        h = void 0 === n ? 'default' : n,
                        p = void 0 !== o && o ? z.Root : 'button'
                    return (
                        c[6] !== s || c[7] !== h || c[8] !== d
                            ? ((l = (0, I.cn)(A({ variant: d, size: h, className: s }))), (c[6] = s), (c[7] = h), (c[8] = d), (c[9] = l))
                            : (l = c[9]),
                        c[10] !== p || c[11] !== i || c[12] !== h || c[13] !== l || c[14] !== d
                            ? ((u = (0, t.jsx)(p, { 'data-slot': 'button', 'data-variant': d, 'data-size': h, className: l, ...i })),
                              (c[10] = p),
                              (c[11] = i),
                              (c[12] = h),
                              (c[13] = l),
                              (c[14] = d),
                              (c[15] = u))
                            : (u = c[15]),
                        u
                    )
                },
            ],
            44659,
        )
    },
    62522,
    (e) => {
        'use strict'
        var t = e.i(60687),
            r = e.i(30216),
            s = e.i(36021)
        function i(e, t, r) {
            let i = e.getMutationCache(),
                a = e.getQueryCache(),
                n = r?.defaultOptions?.deserializeData ?? e.getDefaultOptions().hydrate?.deserializeData
            ;(t.mutations?.forEach(({ state: t, ...s }) => {
                i.build(e, { ...e.getDefaultOptions().hydrate?.mutations, ...r?.defaultOptions?.mutations, ...s }, t)
            }),
                t.queries?.forEach(({ queryKey: t, state: i, queryHash: o, meta: l, promise: u, dehydratedAt: c, queryType: d }) => {
                    let h = u
                            ? (function (e) {
                                  let t
                                  if ((e.then((e) => ((t = e), e), s.noop)?.catch?.(s.noop), void 0 !== t)) return { data: t }
                              })(u)
                            : void 0,
                        p = void 0 === i.data ? h?.data : i.data,
                        f = void 0 === p ? p : n ? n(p) : p,
                        y = a.get(o),
                        v = y?.state.status === 'pending',
                        m = y?.state.fetchStatus === 'fetching'
                    if (y) {
                        let e = h && void 0 !== c && c > y.state.dataUpdatedAt
                        if (i.dataUpdatedAt > y.state.dataUpdatedAt || e) {
                            let { fetchStatus: e, ...t } = i
                            y.setState({
                                ...t,
                                data: f,
                                ...('pending' === i.status &&
                                    void 0 !== f && { status: 'success', dataUpdatedAt: c ?? Date.now(), ...(!m && { fetchStatus: 'idle' }) }),
                            })
                        }
                    } else
                        y = a.build(
                            e,
                            {
                                ...e.getDefaultOptions().hydrate?.queries,
                                ...r?.defaultOptions?.queries,
                                queryKey: t,
                                queryHash: o,
                                meta: l,
                                _type: d,
                            },
                            {
                                ...i,
                                data: f,
                                fetchStatus: 'idle',
                                status: 'pending' === i.status && void 0 !== f ? 'success' : i.status,
                                ...('pending' === i.status && void 0 !== f && { dataUpdatedAt: c ?? Date.now() }),
                            },
                        )
                    !u ||
                        h ||
                        v ||
                        m ||
                        (void 0 !== c && !(c > y.state.dataUpdatedAt)) ||
                        y.fetch(void 0, { initialPromise: Promise.resolve(u).then(n) }).catch(s.noop)
                }))
        }
        e.s(
            [
                'HydrationBoundary',
                0,
                ({ children: e, options: s = {}, state: a, queryClient: n }) => {
                    let o = (0, t.useQueryClient)(n),
                        l = r.useRef(s)
                    r.useEffect(() => {
                        l.current = s
                    })
                    let u = r.useMemo(() => {
                        if (a) {
                            if ('object' != typeof a) return
                            let e = o.getQueryCache(),
                                t = a.queries || [],
                                r = [],
                                s = []
                            for (let i of t) {
                                let t = e.get(i.queryHash)
                                t
                                    ? (i.state.dataUpdatedAt > t.state.dataUpdatedAt ||
                                          (i.promise &&
                                              'pending' !== t.state.status &&
                                              'fetching' !== t.state.fetchStatus &&
                                              void 0 !== i.dehydratedAt &&
                                              i.dehydratedAt > t.state.dataUpdatedAt)) &&
                                      s.push(i)
                                    : r.push(i)
                            }
                            if ((r.length > 0 && i(o, { queries: r }, l.current), s.length > 0)) return s
                        }
                    }, [o, a])
                    return (
                        r.useEffect(() => {
                            u && i(o, { queries: u }, l.current)
                        }, [o, u]),
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
        var r = e.i(30216)
        let s = r.createContext(!1)
        ;(s.Provider, e.s(['useIsRestoring', 0, () => r.useContext(s)], 85473), e.i(48607))
        let i = r.createContext(
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
        e.s(['useQueryErrorResetBoundary', 0, () => r.useContext(i)], 14860)
        var a = e.i(36021)
        e.s(
            [
                'ensurePreventErrorBoundaryRetry',
                0,
                (e, t, r) => {
                    let s =
                        r?.state.error && 'function' == typeof e.throwOnError
                            ? (0, a.shouldThrowError)(e.throwOnError, [r.state.error, r])
                            : e.throwOnError
                    ;(e.suspense || s) && !t.isReset() && (e.retryOnMount = !1)
                },
                'getHasError',
                0,
                ({ result: e, errorResetBoundary: t, throwOnError: r, query: s, suspense: i }) =>
                    e.isError && !t.isReset() && !e.isFetching && s && ((i && void 0 === e.data) || (0, a.shouldThrowError)(r, [e.error, s])),
                'useClearResetErrorBoundary',
                0,
                (e) => {
                    r.useEffect(() => {
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
        var r = e.i(8800)
        let s = t.z.object({ success: t.z.literal(!1), error: t.z.object({ code: t.z.string(), message: t.z.string() }) }),
            i = async (e, t) => fetch(`/api/be${e}`, t),
            a = async (e, t) => {
                let a = await i(e, t),
                    n = await a.json(),
                    o = s.safeParse(n)
                if (o.success) throw new r.ApiError(o.data.error.code, o.data.error.message, a.status)
                if (!a.ok) throw new r.ApiError(`HTTP_${a.status}`, a.statusText, a.status)
                return n
            }
        e.s(['apiFetch', 0, a], 54037)
        var n = e.i(48607),
            o = e.i(83782),
            l = e.i(1718)
        e.s(
            [
                'PanelCard',
                0,
                (e) => {
                    let t,
                        r,
                        s,
                        i,
                        a = (0, o.c)(10),
                        { title: u, contentClassName: c, children: d } = e
                    return (
                        a[0] !== u
                            ? ((t = u
                                  ? (0, n.jsx)('header', {
                                        className: 'px-3',
                                        children: (0, n.jsx)('h2', { className: 'text-sm font-medium', children: u }),
                                    })
                                  : null),
                              (a[0] = u),
                              (a[1] = t))
                            : (t = a[1]),
                        a[2] !== c ? ((r = (0, l.cn)('px-3', c)), (a[2] = c), (a[3] = r)) : (r = a[3]),
                        a[4] !== d || a[5] !== r
                            ? ((s = (0, n.jsx)('div', { className: r, children: d })), (a[4] = d), (a[5] = r), (a[6] = s))
                            : (s = a[6]),
                        a[7] !== t || a[8] !== s
                            ? ((i = (0, n.jsxs)('section', { className: 'flex flex-col gap-3 bg-card py-3', children: [t, s] })),
                              (a[7] = t),
                              (a[8] = s),
                              (a[9] = i))
                            : (i = a[9]),
                        i
                    )
                },
            ],
            3569,
        )
        let u = (e) => String(e).padStart(2, '0')
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
                    return `${t.getFullYear()}-${u(t.getMonth() + 1)}-${u(t.getDate())} ${u(t.getHours())}:${u(t.getMinutes())}:${u(t.getSeconds())}`
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
                        r = e.staleTime
                    ;((e.staleTime = 'function' == typeof r ? (...e) => t(r(...e)) : t(r)),
                        'number' == typeof e.gcTime && (e.gcTime = Math.max(e.gcTime, 1e3)))
                }
            },
            'fetchOptimistic',
            0,
            (e, t, r) =>
                t.fetchOptimistic(e).catch(() => {
                    r.clearReset()
                }),
            'shouldSuspend',
            0,
            (e, t) => e?.suspense && t.isPending,
        ])
    },
    98750,
    5816,
    85573,
    (e) => {
        'use strict'
        var t = e.i(63502),
            r = e.i(60687),
            s = e.i(85473),
            i = e.i(14860),
            a = e.i(33217),
            n = e.i(30216),
            o = e.i(36021),
            l = e.i(14437)
        function u(e, u, c) {
            let d = (0, s.useIsRestoring)(),
                h = (0, i.useQueryErrorResetBoundary)(),
                p = (0, r.useQueryClient)(c),
                f = p.defaultQueryOptions(e),
                y = p.getQueryCache().get(f.queryHash),
                v = !1 !== e.subscribed
            ;((f._optimisticResults = d ? 'isRestoring' : v ? 'optimistic' : void 0),
                (0, t.ensureSuspenseTimers)(f),
                (0, a.ensurePreventErrorBoundaryRetry)(f, h, y),
                (0, a.useClearResetErrorBoundary)(h))
            let [m] = n.useState(() => new u(p, f)),
                g = m.getOptimisticResult(f),
                b = !d && v
            if (
                (n.useSyncExternalStore(
                    n.useCallback(
                        (e) => {
                            let t = b ? m.subscribe(l.notifyManager.batchCalls(e)) : o.noop
                            return (m.updateResult(), t)
                        },
                        [m, b],
                    ),
                    () => m.getCurrentResult(),
                    () => m.getCurrentResult(),
                ),
                n.useEffect(() => {
                    m.setOptions(f)
                }, [f, m]),
                (0, t.shouldSuspend)(f, g))
            )
                throw (0, t.fetchOptimistic)(f, m, h)
            if ((0, a.getHasError)({ result: g, errorResetBoundary: h, throwOnError: f.throwOnError, query: y, suspense: f.suspense })) throw g.error
            return f.notifyOnChangeProps ? g : m.trackResult(g)
        }
        e.s(['useBaseQuery', 0, u], 5816)
        var c = e.i(78774),
            d = e.i(28875),
            h = e.i(66519),
            p = e.i(82870),
            f = e.i(73045),
            y = class extends h.Subscribable {
                #e
                #t = void 0
                #r = void 0
                #s = void 0
                #i
                #a
                #n
                #o
                #l
                #u
                #c
                #d
                #h
                #p = new Set()
                constructor(e, t) {
                    ;(super(), (this.options = t), (this.#e = e), (this.#n = null), this.bindMethods(), this.setOptions(t))
                }
                bindMethods() {
                    this.refetch = this.refetch.bind(this)
                }
                onSubscribe() {
                    1 === this.listeners.size && (this.#t.addObserver(this), v(this.#t, this.options) ? this.#f() : this.updateResult(), this.#y())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.destroy()
                }
                shouldFetchOnReconnect() {
                    return m(this.#t, this.options, this.options.refetchOnReconnect)
                }
                shouldFetchOnWindowFocus() {
                    return m(this.#t, this.options, this.options.refetchOnWindowFocus)
                }
                destroy() {
                    ;((this.listeners = new Set()), this.#v(), this.#m(), this.#t.removeObserver(this))
                }
                setOptions(e) {
                    let t = this.options,
                        r = this.#t
                    if (
                        ((this.options = this.#e.defaultQueryOptions(e)),
                        void 0 !== this.options.enabled &&
                            'boolean' != typeof this.options.enabled &&
                            'function' != typeof this.options.enabled &&
                            'boolean' != typeof (0, o.resolveQueryBoolean)(this.options.enabled, this.#t))
                    )
                        throw Error('Expected enabled to be a boolean or a callback that returns a boolean')
                    ;(this.#g(),
                        this.#t.setOptions(this.options),
                        t._defaulted &&
                            !(0, o.shallowEqualObjects)(this.options, t) &&
                            this.#e.getQueryCache().notify({ type: 'observerOptionsUpdated', query: this.#t, observer: this }))
                    let s = this.hasListeners()
                    ;(s && g(this.#t, r, this.options, t) && this.#f(),
                        this.updateResult(),
                        s &&
                            (this.#t !== r ||
                                (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) !== (0, o.resolveQueryBoolean)(t.enabled, this.#t) ||
                                (0, o.resolveStaleTime)(this.options.staleTime, this.#t) !== (0, o.resolveStaleTime)(t.staleTime, this.#t)) &&
                            this.#b())
                    let i = this.#R()
                    s &&
                        (this.#t !== r ||
                            (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) !== (0, o.resolveQueryBoolean)(t.enabled, this.#t) ||
                            i !== this.#h) &&
                        this.#S(i)
                }
                getOptimisticResult(e) {
                    var t, r
                    let s = this.#e.getQueryCache().build(this.#e, e),
                        i = this.createResult(s, e)
                    return (
                        (t = this),
                        (r = i),
                        (0, o.shallowEqualObjects)(t.getCurrentResult(), r) || ((this.#s = i), (this.#a = this.options), (this.#i = this.#t.state)),
                        i
                    )
                }
                getCurrentResult() {
                    return this.#s
                }
                trackResult(e, t) {
                    return new Proxy(e, { get: (e, r) => (this.trackProp(r), t?.(r), Reflect.get(e, r)) })
                }
                trackProp(e) {
                    this.#p.add(e)
                }
                getCurrentQuery() {
                    return this.#t
                }
                refetch({ ...e } = {}) {
                    return this.fetch({ ...e })
                }
                fetchOptimistic(e) {
                    let t,
                        r = this.#e.defaultQueryOptions(e),
                        s = this.#e.getQueryCache().build(this.#e, r),
                        i = () => {},
                        a = new Promise((e) => {
                            ;((t = e),
                                (i = this.#e.getQueryCache().subscribe((t) => {
                                    'updated' === t.type &&
                                        t.query.queryHash === s.queryHash &&
                                        void 0 !== s.state.data &&
                                        (i(), e(this.createResult(s, r)))
                                })))
                        })
                    return Promise.race([
                        s
                            .fetch()
                            .then(() => {
                                let e = this.createResult(s, r)
                                return (t?.(e), e)
                            })
                            .finally(() => {
                                i()
                            }),
                        a,
                    ])
                }
                fetch(e) {
                    return this.#f({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(() => (this.updateResult(), this.#s))
                }
                #f(e) {
                    this.#g()
                    let t = this.#t.fetch(this.options, e)
                    return (e?.throwOnError || (t = t.catch(o.noop)), t)
                }
                #b() {
                    this.#v()
                    let e = (0, o.resolveStaleTime)(this.options.staleTime, this.#t)
                    if (d.environmentManager.isServer() || this.#s.isStale || !(0, o.isValidTimeout)(e)) return
                    let t = (0, o.timeUntilStale)(this.#s.dataUpdatedAt, e) + 1
                    this.#c = c.timeoutManager.setTimeout(() => {
                        this.#s.isStale || this.updateResult()
                    }, t)
                }
                #R() {
                    return (
                        ('function' == typeof this.options.refetchInterval ? this.options.refetchInterval(this.#t) : this.options.refetchInterval) ??
                        !1
                    )
                }
                #S(e) {
                    ;(this.#m(),
                        (this.#h = e),
                        !d.environmentManager.isServer() &&
                            !1 !== (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) &&
                            (0, o.isValidTimeout)(this.#h) &&
                            0 !== this.#h &&
                            (this.#d = c.timeoutManager.setInterval(() => {
                                ;(this.options.refetchIntervalInBackground || p.focusManager.isFocused()) && this.#f()
                            }, this.#h)))
                }
                #y() {
                    ;(this.#b(), this.#S(this.#R()))
                }
                #v() {
                    void 0 !== this.#c && (c.timeoutManager.clearTimeout(this.#c), (this.#c = void 0))
                }
                #m() {
                    void 0 !== this.#d && (c.timeoutManager.clearInterval(this.#d), (this.#d = void 0))
                }
                createResult(e, t) {
                    let r,
                        s = this.#t,
                        i = this.options,
                        a = this.#s,
                        n = this.#i,
                        l = this.#a,
                        u = e !== s ? e.state : this.#r,
                        { state: c } = e,
                        d = { ...c },
                        h = !1
                    if (t._optimisticResults) {
                        let r = this.hasListeners(),
                            a = !r && v(e, t),
                            n = r && g(e, s, t, i)
                        ;((a || n) && (d = { ...d, ...(0, f.fetchState)(c.data, e.options) }),
                            'isRestoring' === t._optimisticResults && (d.fetchStatus = 'idle'))
                    }
                    let { error: p, errorUpdatedAt: y, status: m } = d
                    r = d.data
                    let R = !1
                    if (void 0 !== t.placeholderData && void 0 === r && 'pending' === m) {
                        let e
                        ;(a?.isPlaceholderData && t.placeholderData === l?.placeholderData
                            ? ((e = a.data), (R = !0))
                            : (e = 'function' == typeof t.placeholderData ? t.placeholderData(this.#u?.state.data, this.#u) : t.placeholderData),
                            void 0 !== e && ((m = 'success'), (r = (0, o.replaceData)(a?.data, e, t)), (h = !0)))
                    }
                    if (t.select && void 0 !== r && !R)
                        if (a && r === n?.data && t.select === this.#o) r = this.#l
                        else
                            try {
                                ;((this.#o = t.select), (r = t.select(r)), (r = (0, o.replaceData)(a?.data, r, t)), (this.#l = r), (this.#n = null))
                            } catch (e) {
                                this.#n = e
                            }
                    else void 0 === r && (this.#n = null)
                    this.#n && ((p = this.#n), (r = this.#l), (y = Date.now()), (m = 'error'), (h = !1))
                    let S = 'fetching' === d.fetchStatus,
                        x = 'pending' === m,
                        E = 'error' === m,
                        Q = x && S,
                        O = void 0 !== r
                    return {
                        status: m,
                        fetchStatus: d.fetchStatus,
                        isPending: x,
                        isSuccess: 'success' === m,
                        isError: E,
                        isInitialLoading: Q,
                        isLoading: Q,
                        data: r,
                        dataUpdatedAt: d.dataUpdatedAt,
                        error: p,
                        errorUpdatedAt: y,
                        failureCount: d.fetchFailureCount,
                        failureReason: d.fetchFailureReason,
                        errorUpdateCount: d.errorUpdateCount,
                        isFetched: e.isFetched(),
                        isFetchedAfterMount: d.dataUpdateCount > u.dataUpdateCount || d.errorUpdateCount > u.errorUpdateCount,
                        isFetching: S,
                        isRefetching: S && !x,
                        isLoadingError: E && !O,
                        isPaused: 'paused' === d.fetchStatus,
                        isPlaceholderData: h,
                        isRefetchError: E && O,
                        isStale: b(e, t),
                        refetch: this.refetch,
                        isEnabled: !1 !== (0, o.resolveQueryBoolean)(t.enabled, e),
                    }
                }
                updateResult() {
                    let e = this.#s,
                        t = this.createResult(this.#t, this.options)
                    if (
                        ((this.#i = this.#t.state),
                        (this.#a = this.options),
                        void 0 !== this.#i.data && (this.#u = this.#t),
                        (0, o.shallowEqualObjects)(t, e))
                    )
                        return
                    this.#s = t
                    let r = () => {
                        if (!e) return !0
                        let { notifyOnChangeProps: t } = this.options,
                            r = 'function' == typeof t ? t() : t
                        if ('all' === r || (!r && !this.#p.size)) return !0
                        let s = new Set(r ?? this.#p)
                        return (this.options.throwOnError && s.add('error'), Object.keys(this.#s).some((t) => this.#s[t] !== e[t] && s.has(t)))
                    }
                    this.#x({ listeners: r() })
                }
                #g() {
                    let e = this.#e.getQueryCache().build(this.#e, this.options)
                    if (e === this.#t) return
                    let t = this.#t
                    ;((this.#t = e), (this.#r = e.state), this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)))
                }
                onQueryUpdate() {
                    ;(this.updateResult(), this.hasListeners() && this.#y())
                }
                #x(e) {
                    l.notifyManager.batch(() => {
                        ;(e.listeners &&
                            this.listeners.forEach((e) => {
                                e(this.#s)
                            }),
                            this.#e.getQueryCache().notify({ query: this.#t, type: 'observerResultsUpdated' }))
                    })
                }
            }
        function v(e, t) {
            return (
                (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) &&
                    void 0 === e.state.data &&
                    ('error' !== e.state.status || !1 !== (0, o.resolveQueryBoolean)(t.retryOnMount, e))) ||
                (void 0 !== e.state.data && m(e, t, t.refetchOnMount))
            )
        }
        function m(e, t, r) {
            if (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) && 'static' !== (0, o.resolveStaleTime)(t.staleTime, e)) {
                let s = 'function' == typeof r ? r(e) : r
                return 'always' === s || (!1 !== s && b(e, t))
            }
            return !1
        }
        function g(e, t, r, s) {
            return (e !== t || !1 === (0, o.resolveQueryBoolean)(s.enabled, e)) && (!r.suspense || 'error' !== e.state.status) && b(e, r)
        }
        function b(e, t) {
            return !1 !== (0, o.resolveQueryBoolean)(t.enabled, e) && e.isStaleByTime((0, o.resolveStaleTime)(t.staleTime, e))
        }
        ;(e.s(['QueryObserver', 0, y], 85573),
            e.s(
                [
                    'useSuspenseQuery',
                    0,
                    function (e, r) {
                        return u({ ...e, enabled: !0, suspense: !0, throwOnError: t.defaultThrowOnError, placeholderData: void 0 }, y, r)
                    },
                ],
                98750,
            ))
    },
])
