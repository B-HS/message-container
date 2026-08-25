;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    69842,
    3004,
    (e) => {
        'use strict'
        var t = e.i(83782),
            r = e.i(66476),
            s = e.i(98750),
            i = e.i(68280)
        let a = i.z.object({ address: i.z.string(), service: i.z.string().nullable() }),
            n = i.z.object({
                sourceRowId: i.z.number(),
                guid: i.z.string(),
                identifier: i.z.string().nullable(),
                serviceName: i.z.string().nullable(),
                displayName: i.z.string().nullable(),
                isGroup: i.z.boolean(),
                participants: i.z.array(a),
            })
        var o = e.i(4526),
            u = e.i(15400),
            l = e.i(54037)
        e.s(
            [
                'useGetChat',
                0,
                (e) => {
                    let a,
                        c = (0, t.c)(2)
                    if (c[0] !== e)
                        ((a = (0, r.queryOptions)({
                            queryKey: o.QUERY_KEY.CHAT.DETAIL(e),
                            queryFn: async () =>
                                (0, u.successEnvelopeSchema)(i.z.object({ chat: n })).parse(await (0, l.apiFetch)(`/chats/${e}`)).data.chat,
                        })),
                            (c[0] = e),
                            (c[1] = a))
                    else a = c[1]
                    return (0, s.useSuspenseQuery)(a)
                },
                'useGetChatList',
                0,
                (e) => {
                    let i,
                        a = (0, t.c)(2)
                    if (a[0] !== e)
                        ((i = (0, r.queryOptions)({
                            queryKey: o.QUERY_KEY.CHAT.LIST(e),
                            queryFn: async () => {
                                let t = (0, u.paginatedEnvelopeSchema)(n).parse(await (0, l.apiFetch)(`/chats?page=${e.page}&limit=${e.limit}`))
                                return { data: t.data, pagination: t.pagination }
                            },
                        })),
                            (a[0] = e),
                            (a[1] = i))
                    else i = a[1]
                    return (0, s.useSuspenseQuery)(i)
                },
            ],
            69842,
        )
        var c = e.i(48607),
            h = e.i(7298),
            d = e.i(70596),
            p = e.i(1718)
        let f = (0, h.cva)(
            'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
            {
                variants: {
                    variant: {
                        default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                        secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                        destructive:
                            'bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
                        outline: 'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
                        ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
                        link: 'text-primary underline-offset-4 [a&]:hover:underline',
                    },
                },
                defaultVariants: { variant: 'default' },
            },
        )
        e.s(
            [
                'Badge',
                0,
                function (e) {
                    let r,
                        s,
                        i,
                        a,
                        n,
                        o,
                        u = (0, t.c)(13)
                    u[0] !== e
                        ? (({ className: r, variant: i, asChild: a, ...s } = e), (u[0] = e), (u[1] = r), (u[2] = s), (u[3] = i), (u[4] = a))
                        : ((r = u[1]), (s = u[2]), (i = u[3]), (a = u[4]))
                    let l = void 0 === i ? 'default' : i,
                        h = void 0 !== a && a ? d.Slot.Root : 'span'
                    return (
                        u[5] !== r || u[6] !== l ? ((n = (0, p.cn)(f({ variant: l }), r)), (u[5] = r), (u[6] = l), (u[7] = n)) : (n = u[7]),
                        u[8] !== h || u[9] !== s || u[10] !== n || u[11] !== l
                            ? ((o = (0, c.jsx)(h, { 'data-slot': 'badge', 'data-variant': l, className: n, ...s })),
                              (u[8] = h),
                              (u[9] = s),
                              (u[10] = n),
                              (u[11] = l),
                              (u[12] = o))
                            : (o = u[12]),
                        o
                    )
                },
            ],
            3004,
        )
    },
    30232,
    57027,
    54722,
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
                        u,
                        l,
                        c = (0, r.c)(18),
                        { columns: h, rows: d, rowKey: p, onRowClick: f } = e
                    if (
                        (c[0] !== h ? ((a = h.map(i)), (c[0] = h), (c[1] = a)) : (a = c[1]),
                        c[2] !== a
                            ? ((n = (0, t.jsx)('thead', { children: (0, t.jsx)('tr', { children: a }) })), (c[2] = a), (c[3] = n))
                            : (n = c[3]),
                        c[4] !== h || c[5] !== f || c[6] !== p || c[7] !== d)
                    ) {
                        let e
                        ;(c[9] !== h || c[10] !== f || c[11] !== p
                            ? ((e = (e) =>
                                  (0, t.jsx)(
                                      'tr',
                                      {
                                          onClick: f ? () => f(e) : void 0,
                                          className: (0, s.cn)('border-b', f && 'cursor-pointer hover:bg-accent'),
                                          children: h.map((r) =>
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
                              (c[9] = h),
                              (c[10] = f),
                              (c[11] = p),
                              (c[12] = e))
                            : (e = c[12]),
                            (o = d.map(e)),
                            (c[4] = h),
                            (c[5] = f),
                            (c[6] = p),
                            (c[7] = d),
                            (c[8] = o))
                    } else o = c[8]
                    return (
                        c[13] !== o ? ((u = (0, t.jsx)('tbody', { children: o })), (c[13] = o), (c[14] = u)) : (u = c[14]),
                        c[15] !== n || c[16] !== u
                            ? ((l = (0, t.jsx)('div', {
                                  className: 'overflow-x-auto',
                                  children: (0, t.jsxs)('table', { className: 'w-full text-xs', children: [n, u] }),
                              })),
                              (c[15] = n),
                              (c[16] = u),
                              (c[17] = l))
                            : (l = c[17]),
                        l
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
                        u,
                        l,
                        c = (0, r.c)(19),
                        { page: h, totalPages: d, onPageChange: p } = e,
                        f = Math.max(d, 1)
                    c[0] !== h || c[1] !== f
                        ? ((s = (0, t.jsxs)('span', { className: 'text-2xs text-muted-foreground tabular-nums', children: [h, ' / ', f] })),
                          (c[0] = h),
                          (c[1] = f),
                          (c[2] = s))
                        : (s = c[2])
                    let y = h <= 1
                    ;(c[3] !== p || c[4] !== h ? ((i = () => p(h - 1)), (c[3] = p), (c[4] = h), (c[5] = i)) : (i = c[5]),
                        c[6] !== y || c[7] !== i
                            ? ((n = (0, t.jsx)(a.Button, { variant: 'ghost', size: 'sm', disabled: y, onClick: i, children: '이전' })),
                              (c[6] = y),
                              (c[7] = i),
                              (c[8] = n))
                            : (n = c[8]))
                    let g = h >= d
                    return (
                        c[9] !== p || c[10] !== h ? ((o = () => p(h + 1)), (c[9] = p), (c[10] = h), (c[11] = o)) : (o = c[11]),
                        c[12] !== g || c[13] !== o
                            ? ((u = (0, t.jsx)(a.Button, { variant: 'ghost', size: 'sm', disabled: g, onClick: o, children: '다음' })),
                              (c[12] = g),
                              (c[13] = o),
                              (c[14] = u))
                            : (u = c[14]),
                        c[15] !== s || c[16] !== n || c[17] !== u
                            ? ((l = (0, t.jsxs)('div', { className: 'flex items-center justify-end gap-2', children: [s, n, u] })),
                              (c[15] = s),
                              (c[16] = n),
                              (c[17] = u),
                              (c[18] = l))
                            : (l = c[18]),
                        l
                    )
                },
            ],
            57027,
        )
        var n = e.i(82339)
        let o = (0, n.default)('inbox', [
                ['polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12', key: 'o97t9d' }],
                [
                    'path',
                    {
                        d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
                        key: 'oot6mr',
                    },
                ],
            ]),
            u = (0, n.default)('triangle-alert', [
                ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
                ['path', { d: 'M12 9v4', key: 'juzpu7' }],
                ['path', { d: 'M12 17h.01', key: 'p32p05' }],
            ])
        e.s(
            [
                'StateCard',
                0,
                (e) => {
                    let i,
                        a,
                        n,
                        l,
                        c,
                        h,
                        d = (0, r.c)(15),
                        { variant: p, title: f, description: y } = e,
                        g = 'error' === p ? u : o,
                        v = 'error' === p && 'text-destructive'
                    return (
                        d[0] !== v ? ((i = (0, s.cn)('size-6', v)), (d[0] = v), (d[1] = i)) : (i = d[1]),
                        d[2] !== g || d[3] !== i ? ((a = (0, t.jsx)(g, { className: i })), (d[2] = g), (d[3] = i), (d[4] = a)) : (a = d[4]),
                        d[5] !== f ? ((n = (0, t.jsx)('p', { className: 'text-sm font-medium', children: f })), (d[5] = f), (d[6] = n)) : (n = d[6]),
                        d[7] !== y
                            ? ((l = y ? (0, t.jsx)('p', { className: 'text-xs text-muted-foreground', children: y }) : null), (d[7] = y), (d[8] = l))
                            : (l = d[8]),
                        d[9] !== n || d[10] !== l
                            ? ((c = (0, t.jsxs)('div', { className: 'flex flex-col gap-1', children: [n, l] })), (d[9] = n), (d[10] = l), (d[11] = c))
                            : (c = d[11]),
                        d[12] !== a || d[13] !== c
                            ? ((h = (0, t.jsxs)('section', {
                                  className: 'flex flex-col items-center justify-center gap-6 bg-card px-3 py-12 text-center text-balance',
                                  children: [a, c],
                              })),
                              (d[12] = a),
                              (d[13] = c),
                              (d[14] = h))
                            : (h = d[14]),
                        h
                    )
                },
            ],
            54722,
        )
    },
    25584,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            s = e.i(98899),
            i = e.i(69842),
            a = e.i(30232),
            n = e.i(68915),
            o = e.i(3569),
            u = e.i(57027),
            l = e.i(54722),
            c = e.i(56507),
            h = e.i(3004)
        let d = [
            { key: 'id', label: 'ID', width: 64, align: 'right', mono: !0, render: (e) => e.sourceRowId },
            {
                key: 'name',
                label: '대화',
                flexible: !0,
                render: (e) => e.displayName ?? e.identifier ?? e.participants.map((e) => e.address).join(', '),
            },
            {
                key: 'type',
                label: '유형',
                width: 80,
                render: (e) => (0, t.jsx)(h.Badge, { variant: e.isGroup ? 'secondary' : 'outline', children: e.isGroup ? '그룹' : '1:1' }),
            },
            { key: 'service', label: '서비스', width: 96, render: (e) => e.serviceName ?? '-' },
            { key: 'participants', label: '참여자', width: 96, align: 'right', render: (e) => e.participants.length },
        ]
        function p(e) {
            return e.sourceRowId
        }
        e.s([
            'ChatListWidget',
            0,
            (e) => {
                let h,
                    f,
                    y,
                    g,
                    v,
                    m,
                    b = (0, r.c)(18),
                    { params: R } = e,
                    x = (0, s.useRouter)(),
                    { data: S } = (0, i.useGetChatList)(R)
                if (0 === S.data.length) {
                    let e
                    return (
                        b[0] === Symbol.for('react.memo_cache_sentinel')
                            ? ((e = (0, t.jsx)(n.PageRoot, {
                                  children: (0, t.jsx)(l.StateCard, {
                                      variant: 'empty',
                                      title: '동기화된 대화가 없습니다',
                                      description: '동기화 화면에서 상태를 확인하세요',
                                  }),
                              })),
                              (b[0] = e))
                            : (e = b[0]),
                        e
                    )
                }
                b[1] !== S.pagination.total ? ((h = (0, c.formatCount)(S.pagination.total)), (b[1] = S.pagination.total), (b[2] = h)) : (h = b[2])
                let Q = `대화 ${h}개`
                return (
                    b[3] !== x ? ((f = (e) => x.push(`/chats/${e.sourceRowId}`)), (b[3] = x), (b[4] = f)) : (f = b[4]),
                    b[5] !== S.data || b[6] !== f
                        ? ((y = (0, t.jsx)(a.DataTable, { columns: d, rows: S.data, rowKey: p, onRowClick: f })),
                          (b[5] = S.data),
                          (b[6] = f),
                          (b[7] = y))
                        : (y = b[7]),
                    b[8] !== x ? ((g = (e) => x.push(`/chats?page=${e}`)), (b[8] = x), (b[9] = g)) : (g = b[9]),
                    b[10] !== S.pagination.page || b[11] !== S.pagination.totalPages || b[12] !== g
                        ? ((v = (0, t.jsx)(u.Pager, { page: S.pagination.page, totalPages: S.pagination.totalPages, onPageChange: g })),
                          (b[10] = S.pagination.page),
                          (b[11] = S.pagination.totalPages),
                          (b[12] = g),
                          (b[13] = v))
                        : (v = b[13]),
                    b[14] !== Q || b[15] !== y || b[16] !== v
                        ? ((m = (0, t.jsx)(n.PageRoot, {
                              children: (0, t.jsxs)(o.PanelCard, { title: Q, contentClassName: 'flex flex-col gap-2', children: [y, v] }),
                          })),
                          (b[14] = Q),
                          (b[15] = y),
                          (b[16] = v),
                          (b[17] = m))
                        : (m = b[17]),
                    m
                )
            },
        ])
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
                t.queries?.forEach(({ queryKey: t, state: i, queryHash: o, meta: u, promise: l, dehydratedAt: c, queryType: h }) => {
                    let d = l
                            ? (function (e) {
                                  let t
                                  if ((e.then((e) => ((t = e), e), s.noop)?.catch?.(s.noop), void 0 !== t)) return { data: t }
                              })(l)
                            : void 0,
                        p = void 0 === i.data ? d?.data : i.data,
                        f = void 0 === p ? p : n ? n(p) : p,
                        y = a.get(o),
                        g = y?.state.status === 'pending',
                        v = y?.state.fetchStatus === 'fetching'
                    if (y) {
                        let e = d && void 0 !== c && c > y.state.dataUpdatedAt
                        if (i.dataUpdatedAt > y.state.dataUpdatedAt || e) {
                            let { fetchStatus: e, ...t } = i
                            y.setState({
                                ...t,
                                data: f,
                                ...('pending' === i.status &&
                                    void 0 !== f && { status: 'success', dataUpdatedAt: c ?? Date.now(), ...(!v && { fetchStatus: 'idle' }) }),
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
                        g ||
                        v ||
                        (void 0 !== c && !(c > y.state.dataUpdatedAt)) ||
                        y.fetch(void 0, { initialPromise: Promise.resolve(l).then(n) }).catch(s.noop)
                }))
        }
        e.s(
            [
                'HydrationBoundary',
                0,
                ({ children: e, options: s = {}, state: a, queryClient: n }) => {
                    let o = (0, t.useQueryClient)(n),
                        u = r.useRef(s)
                    r.useEffect(() => {
                        u.current = s
                    })
                    let l = r.useMemo(() => {
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
                            if ((r.length > 0 && i(o, { queries: r }, u.current), s.length > 0)) return s
                        }
                    }, [o, a])
                    return (
                        r.useEffect(() => {
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
    68915,
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
        class r extends Error {
            code
            status
            constructor(e, t, r) {
                ;(super(t), (this.code = e), (this.status = r), (this.name = 'ApiError'))
            }
        }
        let s = t.z.object({ success: t.z.literal(!1), error: t.z.object({ code: t.z.string(), message: t.z.string() }) }),
            i = async (e, t) => fetch(`/api/be${e}`, t),
            a = async (e, t) => {
                let a = await i(e, t),
                    n = await a.json(),
                    o = s.safeParse(n)
                if (o.success) throw new r(o.data.error.code, o.data.error.message, a.status)
                if (!a.ok) throw new r(`HTTP_${a.status}`, a.statusText, a.status)
                return n
            }
        e.s(['apiFetch', 0, a], 54037)
        var n = e.i(48607),
            o = e.i(83782)
        e.s(
            [
                'PageRoot',
                0,
                (e) => {
                    let t,
                        r = (0, o.c)(2),
                        { children: s } = e
                    return (
                        r[0] !== s
                            ? ((t = (0, n.jsx)('div', { className: 'flex flex-col gap-px', children: s })), (r[0] = s), (r[1] = t))
                            : (t = r[1]),
                        t
                    )
                },
            ],
            68915,
        )
        var u = e.i(1718)
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
                        { title: l, contentClassName: c, children: h } = e
                    return (
                        a[0] !== l
                            ? ((t = l
                                  ? (0, n.jsx)('header', {
                                        className: 'px-3',
                                        children: (0, n.jsx)('h2', { className: 'text-sm font-medium', children: l }),
                                    })
                                  : null),
                              (a[0] = l),
                              (a[1] = t))
                            : (t = a[1]),
                        a[2] !== c ? ((r = (0, u.cn)('px-3', c)), (a[2] = c), (a[3] = r)) : (r = a[3]),
                        a[4] !== h || a[5] !== r
                            ? ((s = (0, n.jsx)('div', { className: r, children: h })), (a[4] = h), (a[5] = r), (a[6] = s))
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
            u = e.i(14437)
        function l(e, l, c) {
            let h = (0, s.useIsRestoring)(),
                d = (0, i.useQueryErrorResetBoundary)(),
                p = (0, r.useQueryClient)(c),
                f = p.defaultQueryOptions(e),
                y = p.getQueryCache().get(f.queryHash),
                g = !1 !== e.subscribed
            ;((f._optimisticResults = h ? 'isRestoring' : g ? 'optimistic' : void 0),
                (0, t.ensureSuspenseTimers)(f),
                (0, a.ensurePreventErrorBoundaryRetry)(f, d, y),
                (0, a.useClearResetErrorBoundary)(d))
            let [v] = n.useState(() => new l(p, f)),
                m = v.getOptimisticResult(f),
                b = !h && g
            if (
                (n.useSyncExternalStore(
                    n.useCallback(
                        (e) => {
                            let t = b ? v.subscribe(u.notifyManager.batchCalls(e)) : o.noop
                            return (v.updateResult(), t)
                        },
                        [v, b],
                    ),
                    () => v.getCurrentResult(),
                    () => v.getCurrentResult(),
                ),
                n.useEffect(() => {
                    v.setOptions(f)
                }, [f, v]),
                (0, t.shouldSuspend)(f, m))
            )
                throw (0, t.fetchOptimistic)(f, v, d)
            if ((0, a.getHasError)({ result: m, errorResetBoundary: d, throwOnError: f.throwOnError, query: y, suspense: f.suspense })) throw m.error
            return f.notifyOnChangeProps ? m : v.trackResult(m)
        }
        e.s(['useBaseQuery', 0, l], 5816)
        var c = e.i(78774),
            h = e.i(28875),
            d = e.i(66519),
            p = e.i(82870),
            f = e.i(73045),
            y = class extends d.Subscribable {
                #e
                #t = void 0
                #r = void 0
                #s = void 0
                #i
                #a
                #n
                #o
                #u
                #l
                #c
                #h
                #d
                #p = new Set()
                constructor(e, t) {
                    ;(super(), (this.options = t), (this.#e = e), (this.#n = null), this.bindMethods(), this.setOptions(t))
                }
                bindMethods() {
                    this.refetch = this.refetch.bind(this)
                }
                onSubscribe() {
                    1 === this.listeners.size && (this.#t.addObserver(this), g(this.#t, this.options) ? this.#f() : this.updateResult(), this.#y())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.destroy()
                }
                shouldFetchOnReconnect() {
                    return v(this.#t, this.options, this.options.refetchOnReconnect)
                }
                shouldFetchOnWindowFocus() {
                    return v(this.#t, this.options, this.options.refetchOnWindowFocus)
                }
                destroy() {
                    ;((this.listeners = new Set()), this.#g(), this.#v(), this.#t.removeObserver(this))
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
                    ;(this.#m(),
                        this.#t.setOptions(this.options),
                        t._defaulted &&
                            !(0, o.shallowEqualObjects)(this.options, t) &&
                            this.#e.getQueryCache().notify({ type: 'observerOptionsUpdated', query: this.#t, observer: this }))
                    let s = this.hasListeners()
                    ;(s && m(this.#t, r, this.options, t) && this.#f(),
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
                            i !== this.#d) &&
                        this.#x(i)
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
                    this.#m()
                    let t = this.#t.fetch(this.options, e)
                    return (e?.throwOnError || (t = t.catch(o.noop)), t)
                }
                #b() {
                    this.#g()
                    let e = (0, o.resolveStaleTime)(this.options.staleTime, this.#t)
                    if (h.environmentManager.isServer() || this.#s.isStale || !(0, o.isValidTimeout)(e)) return
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
                #x(e) {
                    ;(this.#v(),
                        (this.#d = e),
                        !h.environmentManager.isServer() &&
                            !1 !== (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) &&
                            (0, o.isValidTimeout)(this.#d) &&
                            0 !== this.#d &&
                            (this.#h = c.timeoutManager.setInterval(() => {
                                ;(this.options.refetchIntervalInBackground || p.focusManager.isFocused()) && this.#f()
                            }, this.#d)))
                }
                #y() {
                    ;(this.#b(), this.#x(this.#R()))
                }
                #g() {
                    void 0 !== this.#c && (c.timeoutManager.clearTimeout(this.#c), (this.#c = void 0))
                }
                #v() {
                    void 0 !== this.#h && (c.timeoutManager.clearInterval(this.#h), (this.#h = void 0))
                }
                createResult(e, t) {
                    let r,
                        s = this.#t,
                        i = this.options,
                        a = this.#s,
                        n = this.#i,
                        u = this.#a,
                        l = e !== s ? e.state : this.#r,
                        { state: c } = e,
                        h = { ...c },
                        d = !1
                    if (t._optimisticResults) {
                        let r = this.hasListeners(),
                            a = !r && g(e, t),
                            n = r && m(e, s, t, i)
                        ;((a || n) && (h = { ...h, ...(0, f.fetchState)(c.data, e.options) }),
                            'isRestoring' === t._optimisticResults && (h.fetchStatus = 'idle'))
                    }
                    let { error: p, errorUpdatedAt: y, status: v } = h
                    r = h.data
                    let R = !1
                    if (void 0 !== t.placeholderData && void 0 === r && 'pending' === v) {
                        let e
                        ;(a?.isPlaceholderData && t.placeholderData === u?.placeholderData
                            ? ((e = a.data), (R = !0))
                            : (e = 'function' == typeof t.placeholderData ? t.placeholderData(this.#l?.state.data, this.#l) : t.placeholderData),
                            void 0 !== e && ((v = 'success'), (r = (0, o.replaceData)(a?.data, e, t)), (d = !0)))
                    }
                    if (t.select && void 0 !== r && !R)
                        if (a && r === n?.data && t.select === this.#o) r = this.#u
                        else
                            try {
                                ;((this.#o = t.select), (r = t.select(r)), (r = (0, o.replaceData)(a?.data, r, t)), (this.#u = r), (this.#n = null))
                            } catch (e) {
                                this.#n = e
                            }
                    else void 0 === r && (this.#n = null)
                    this.#n && ((p = this.#n), (r = this.#u), (y = Date.now()), (v = 'error'), (d = !1))
                    let x = 'fetching' === h.fetchStatus,
                        S = 'pending' === v,
                        Q = 'error' === v,
                        E = S && x,
                        T = void 0 !== r
                    return {
                        status: v,
                        fetchStatus: h.fetchStatus,
                        isPending: S,
                        isSuccess: 'success' === v,
                        isError: Q,
                        isInitialLoading: E,
                        isLoading: E,
                        data: r,
                        dataUpdatedAt: h.dataUpdatedAt,
                        error: p,
                        errorUpdatedAt: y,
                        failureCount: h.fetchFailureCount,
                        failureReason: h.fetchFailureReason,
                        errorUpdateCount: h.errorUpdateCount,
                        isFetched: e.isFetched(),
                        isFetchedAfterMount: h.dataUpdateCount > l.dataUpdateCount || h.errorUpdateCount > l.errorUpdateCount,
                        isFetching: x,
                        isRefetching: x && !S,
                        isLoadingError: Q && !T,
                        isPaused: 'paused' === h.fetchStatus,
                        isPlaceholderData: d,
                        isRefetchError: Q && T,
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
                        void 0 !== this.#i.data && (this.#l = this.#t),
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
                    this.#S({ listeners: r() })
                }
                #m() {
                    let e = this.#e.getQueryCache().build(this.#e, this.options)
                    if (e === this.#t) return
                    let t = this.#t
                    ;((this.#t = e), (this.#r = e.state), this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)))
                }
                onQueryUpdate() {
                    ;(this.updateResult(), this.hasListeners() && this.#y())
                }
                #S(e) {
                    u.notifyManager.batch(() => {
                        ;(e.listeners &&
                            this.listeners.forEach((e) => {
                                e(this.#s)
                            }),
                            this.#e.getQueryCache().notify({ query: this.#t, type: 'observerResultsUpdated' }))
                    })
                }
            }
        function g(e, t) {
            return (
                (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) &&
                    void 0 === e.state.data &&
                    ('error' !== e.state.status || !1 !== (0, o.resolveQueryBoolean)(t.retryOnMount, e))) ||
                (void 0 !== e.state.data && v(e, t, t.refetchOnMount))
            )
        }
        function v(e, t, r) {
            if (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) && 'static' !== (0, o.resolveStaleTime)(t.staleTime, e)) {
                let s = 'function' == typeof r ? r(e) : r
                return 'always' === s || (!1 !== s && b(e, t))
            }
            return !1
        }
        function m(e, t, r, s) {
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
                        return l({ ...e, enabled: !0, suspense: !0, throwOnError: t.defaultThrowOnError, placeholderData: void 0 }, y, r)
                    },
                ],
                98750,
            ))
    },
])
