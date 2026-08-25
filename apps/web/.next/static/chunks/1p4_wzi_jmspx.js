;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    28218,
    (e) => {
        'use strict'
        var t = e.i(83782),
            s = e.i(66476),
            r = e.i(98750),
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
            u = e.i(54037)
        let l = (e) => {
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
                        ((a = (0, s.queryOptions)({
                            queryKey: n.QUERY_KEY.CHAT.MESSAGES(e, i),
                            queryFn: async () => l(await (0, u.apiFetch)(`/chats/${e}/messages?page=${i.page}&limit=${i.limit}`)),
                        })),
                            (o[0] = e),
                            (o[1] = i),
                            (o[2] = a))
                    else a = o[2]
                    return (0, r.useSuspenseQuery)(a)
                },
                'useSearchMessages',
                0,
                (e) => {
                    let i,
                        a = (0, t.c)(2)
                    if (a[0] !== e)
                        ((i = (0, s.queryOptions)({
                            queryKey: n.QUERY_KEY.MESSAGE.SEARCH(e),
                            queryFn: async () => {
                                let t = new URLSearchParams({ page: String(e.page), limit: String(e.limit) })
                                return (e.q && t.set('q', e.q), l(await (0, u.apiFetch)(`/messages?${t.toString()}`)))
                            },
                        })),
                            (a[0] = e),
                            (a[1] = i))
                    else i = a[1]
                    return (0, r.useSuspenseQuery)(i)
                },
            ],
            28218,
        )
    },
    30232,
    57027,
    54722,
    (e) => {
        'use strict'
        var t = e.i(48607),
            s = e.i(83782),
            r = e.i(1718)
        function i(e) {
            return (0, t.jsx)(
                'th',
                {
                    scope: 'col',
                    style: e.width ? { width: e.width } : void 0,
                    className: (0, r.cn)('p-2 text-left font-medium text-muted-foreground', 'right' === e.align && 'text-right'),
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
                        c = (0, s.c)(18),
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
                                          className: (0, r.cn)('border-b', f && 'cursor-pointer hover:bg-accent'),
                                          children: h.map((s) =>
                                              (0, t.jsx)(
                                                  'td',
                                                  {
                                                      className: (0, r.cn)(
                                                          'p-2 align-middle',
                                                          'right' === s.align && 'text-right tabular-nums',
                                                          s.mono && 'font-mono',
                                                          s.flexible && 'max-w-0 truncate',
                                                      ),
                                                      children: s.render(e),
                                                  },
                                                  s.key,
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
                    let r,
                        i,
                        n,
                        o,
                        u,
                        l,
                        c = (0, s.c)(19),
                        { page: h, totalPages: d, onPageChange: p } = e,
                        f = Math.max(d, 1)
                    c[0] !== h || c[1] !== f
                        ? ((r = (0, t.jsxs)('span', { className: 'text-2xs text-muted-foreground tabular-nums', children: [h, ' / ', f] })),
                          (c[0] = h),
                          (c[1] = f),
                          (c[2] = r))
                        : (r = c[2])
                    let m = h <= 1
                    ;(c[3] !== p || c[4] !== h ? ((i = () => p(h - 1)), (c[3] = p), (c[4] = h), (c[5] = i)) : (i = c[5]),
                        c[6] !== m || c[7] !== i
                            ? ((n = (0, t.jsx)(a.Button, { variant: 'ghost', size: 'sm', disabled: m, onClick: i, children: '이전' })),
                              (c[6] = m),
                              (c[7] = i),
                              (c[8] = n))
                            : (n = c[8]))
                    let y = h >= d
                    return (
                        c[9] !== p || c[10] !== h ? ((o = () => p(h + 1)), (c[9] = p), (c[10] = h), (c[11] = o)) : (o = c[11]),
                        c[12] !== y || c[13] !== o
                            ? ((u = (0, t.jsx)(a.Button, { variant: 'ghost', size: 'sm', disabled: y, onClick: o, children: '다음' })),
                              (c[12] = y),
                              (c[13] = o),
                              (c[14] = u))
                            : (u = c[14]),
                        c[15] !== r || c[16] !== n || c[17] !== u
                            ? ((l = (0, t.jsxs)('div', { className: 'flex items-center justify-end gap-2', children: [r, n, u] })),
                              (c[15] = r),
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
                        d = (0, s.c)(15),
                        { variant: p, title: f, description: m } = e,
                        y = 'error' === p ? u : o,
                        g = 'error' === p && 'text-destructive'
                    return (
                        d[0] !== g ? ((i = (0, r.cn)('size-6', g)), (d[0] = g), (d[1] = i)) : (i = d[1]),
                        d[2] !== y || d[3] !== i ? ((a = (0, t.jsx)(y, { className: i })), (d[2] = y), (d[3] = i), (d[4] = a)) : (a = d[4]),
                        d[5] !== f ? ((n = (0, t.jsx)('p', { className: 'text-sm font-medium', children: f })), (d[5] = f), (d[6] = n)) : (n = d[6]),
                        d[7] !== m
                            ? ((l = m ? (0, t.jsx)('p', { className: 'text-xs text-muted-foreground', children: m }) : null), (d[7] = m), (d[8] = l))
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
    40350,
    (e) => {
        'use strict'
        var t = e.i(48607),
            s = e.i(83782),
            r = e.i(1718)
        e.s([
            'Input',
            0,
            function (e) {
                let i,
                    a,
                    n,
                    o,
                    u,
                    l = (0, s.c)(10)
                return (
                    l[0] !== e
                        ? (({ className: i, type: n, ...a } = e), (l[0] = e), (l[1] = i), (l[2] = a), (l[3] = n))
                        : ((i = l[1]), (a = l[2]), (n = l[3])),
                    l[4] !== i
                        ? ((o = (0, r.cn)(
                              'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
                              'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                              'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                              i,
                          )),
                          (l[4] = i),
                          (l[5] = o))
                        : (o = l[5]),
                    l[6] !== a || l[7] !== o || l[8] !== n
                        ? ((u = (0, t.jsx)('input', { type: n, 'data-slot': 'input', className: o, ...a })),
                          (l[6] = a),
                          (l[7] = o),
                          (l[8] = n),
                          (l[9] = u))
                        : (u = l[9]),
                    u
                )
            },
        ])
    },
    39422,
    (e) => {
        'use strict'
        var t = e.i(48607),
            s = e.i(83782),
            r = e.i(33698),
            i = e.i(98899),
            a = e.i(30216),
            n = e.i(28218),
            o = e.i(30232),
            u = e.i(68915),
            l = e.i(3569),
            c = e.i(57027),
            h = e.i(54722),
            d = e.i(56507),
            p = e.i(44659),
            f = e.i(40350)
        let m = [
            {
                key: 'sentAt',
                label: '시각',
                width: 160,
                mono: !0,
                render: (e) => (0, t.jsx)('span', { suppressHydrationWarning: !0, children: (0, d.formatDateTime)(e.sentAt) }),
            },
            {
                key: 'sender',
                label: '발신',
                width: 160,
                mono: !0,
                render: (e) => (e.isFromMe ? (0, t.jsx)('span', { className: 'text-muted-foreground', children: '나' }) : (e.senderAddress ?? '-')),
            },
            {
                key: 'text',
                label: '내용',
                flexible: !0,
                render: (e) => e.text ?? (0, t.jsx)('span', { className: 'text-muted-foreground', children: '(본문 없음)' }),
            },
            {
                key: 'chat',
                label: '대화',
                width: 80,
                align: 'right',
                mono: !0,
                render: (e) =>
                    null === e.chatSourceRowId
                        ? '-'
                        : (0, t.jsx)(r.default, {
                              href: `/chats/${e.chatSourceRowId}`,
                              className: 'hover:underline',
                              onClick: (e) => e.stopPropagation(),
                              children: e.chatSourceRowId,
                          }),
            },
        ]
        function y(e) {
            return e.sourceRowId
        }
        e.s([
            'MessageSearchWidget',
            0,
            (e) => {
                let r,
                    g,
                    v,
                    b,
                    x,
                    R,
                    S,
                    Q,
                    E = (0, s.c)(20),
                    { params: w } = e,
                    [T, C] = (0, a.useState)(w.q ?? ''),
                    O = (0, i.useRouter)(),
                    { data: I } = (0, n.useSearchMessages)(w)
                E[0] !== O
                    ? ((r = (e, t) => {
                          let s = new URLSearchParams({ page: String(e) })
                          ;(t && s.set('q', t), O.push(`/messages?${s.toString()}`))
                      }),
                      (E[0] = O),
                      (E[1] = r))
                    : (r = E[1])
                let j = r
                E[2] !== T || E[3] !== j
                    ? ((g = (e) => {
                          ;(e.preventDefault(), j(1, T.trim()))
                      }),
                      (E[2] = T),
                      (E[3] = j),
                      (E[4] = g))
                    : (g = E[4])
                let A = g
                return (
                    E[5] === Symbol.for('react.memo_cache_sentinel') ? ((v = (e) => C(e.target.value)), (E[5] = v)) : (v = E[5]),
                    E[6] !== T
                        ? ((b = (0, t.jsx)(f.Input, {
                              value: T,
                              onChange: v,
                              placeholder: '메시지 본문 검색 (비우면 최근 메시지)',
                              'aria-label': '메시지 검색',
                              className: 'font-mono text-xs',
                          })),
                          (E[6] = T),
                          (E[7] = b))
                        : (b = E[7]),
                    E[8] === Symbol.for('react.memo_cache_sentinel')
                        ? ((x = (0, t.jsx)(p.Button, { type: 'submit', size: 'sm', children: '검색' })), (E[8] = x))
                        : (x = E[8]),
                    E[9] !== A || E[10] !== b
                        ? ((R = (0, t.jsx)(l.PanelCard, {
                              contentClassName: 'flex flex-wrap items-center gap-2',
                              children: (0, t.jsxs)('form', { onSubmit: A, className: 'flex min-w-0 flex-1 items-center gap-2', children: [b, x] }),
                          })),
                          (E[9] = A),
                          (E[10] = b),
                          (E[11] = R))
                        : (R = E[11]),
                    E[12] !== I.data || E[13] !== I.pagination || E[14] !== w.q || E[15] !== j
                        ? ((S =
                              0 === I.data.length
                                  ? (0, t.jsx)(h.StateCard, {
                                        variant: 'empty',
                                        title: w.q ? '검색 결과가 없습니다' : '동기화된 메시지가 없습니다',
                                        description: w.q ? '다른 검색어를 시도하세요' : void 0,
                                    })
                                  : (0, t.jsxs)(l.PanelCard, {
                                        title: w.q
                                            ? `"${w.q}" 검색 결과 ${(0, d.formatCount)(I.pagination.total)}건`
                                            : `최근 메시지 ${(0, d.formatCount)(I.pagination.total)}건`,
                                        contentClassName: 'flex flex-col gap-2',
                                        children: [
                                            (0, t.jsx)(o.DataTable, { columns: m, rows: I.data, rowKey: y }),
                                            (0, t.jsx)(c.Pager, {
                                                page: I.pagination.page,
                                                totalPages: I.pagination.totalPages,
                                                onPageChange: (e) => j(e, w.q ?? ''),
                                            }),
                                        ],
                                    })),
                          (E[12] = I.data),
                          (E[13] = I.pagination),
                          (E[14] = w.q),
                          (E[15] = j),
                          (E[16] = S))
                        : (S = E[16]),
                    E[17] !== R || E[18] !== S
                        ? ((Q = (0, t.jsxs)(u.PageRoot, { children: [R, S] })), (E[17] = R), (E[18] = S), (E[19] = Q))
                        : (Q = E[19]),
                    Q
                )
            },
        ])
    },
    62522,
    (e) => {
        'use strict'
        var t = e.i(60687),
            s = e.i(30216),
            r = e.i(36021)
        function i(e, t, s) {
            let i = e.getMutationCache(),
                a = e.getQueryCache(),
                n = s?.defaultOptions?.deserializeData ?? e.getDefaultOptions().hydrate?.deserializeData
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
                        f = void 0 === p ? p : n ? n(p) : p,
                        m = a.get(o),
                        y = m?.state.status === 'pending',
                        g = m?.state.fetchStatus === 'fetching'
                    if (m) {
                        let e = d && void 0 !== c && c > m.state.dataUpdatedAt
                        if (i.dataUpdatedAt > m.state.dataUpdatedAt || e) {
                            let { fetchStatus: e, ...t } = i
                            m.setState({
                                ...t,
                                data: f,
                                ...('pending' === i.status &&
                                    void 0 !== f && { status: 'success', dataUpdatedAt: c ?? Date.now(), ...(!g && { fetchStatus: 'idle' }) }),
                            })
                        }
                    } else
                        m = a.build(
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
                        g ||
                        (void 0 !== c && !(c > m.state.dataUpdatedAt)) ||
                        m.fetch(void 0, { initialPromise: Promise.resolve(l).then(n) }).catch(r.noop)
                }))
        }
        e.s(
            [
                'HydrationBoundary',
                0,
                ({ children: e, options: r = {}, state: a, queryClient: n }) => {
                    let o = (0, t.useQueryClient)(n),
                        u = s.useRef(r)
                    s.useEffect(() => {
                        u.current = r
                    })
                    let l = s.useMemo(() => {
                        if (a) {
                            if ('object' != typeof a) return
                            let e = o.getQueryCache(),
                                t = a.queries || [],
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
                    }, [o, a])
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
        var a = e.i(36021)
        e.s(
            [
                'ensurePreventErrorBoundaryRetry',
                0,
                (e, t, s) => {
                    let r =
                        s?.state.error && 'function' == typeof e.throwOnError
                            ? (0, a.shouldThrowError)(e.throwOnError, [s.state.error, s])
                            : e.throwOnError
                    ;(e.suspense || r) && !t.isReset() && (e.retryOnMount = !1)
                },
                'getHasError',
                0,
                ({ result: e, errorResetBoundary: t, throwOnError: s, query: r, suspense: i }) =>
                    e.isError && !t.isReset() && !e.isFetching && r && ((i && void 0 === e.data) || (0, a.shouldThrowError)(s, [e.error, r])),
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
        class s extends Error {
            code
            status
            constructor(e, t, s) {
                ;(super(t), (this.code = e), (this.status = s), (this.name = 'ApiError'))
            }
        }
        let r = t.z.object({ success: t.z.literal(!1), error: t.z.object({ code: t.z.string(), message: t.z.string() }) }),
            i = async (e, t) => fetch(`/api/be${e}`, t),
            a = async (e, t) => {
                let a = await i(e, t),
                    n = await a.json(),
                    o = r.safeParse(n)
                if (o.success) throw new s(o.data.error.code, o.data.error.message, a.status)
                if (!a.ok) throw new s(`HTTP_${a.status}`, a.statusText, a.status)
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
                        s = (0, o.c)(2),
                        { children: r } = e
                    return (
                        s[0] !== r
                            ? ((t = (0, n.jsx)('div', { className: 'flex flex-col gap-px', children: r })), (s[0] = r), (s[1] = t))
                            : (t = s[1]),
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
                        s,
                        r,
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
                        a[2] !== c ? ((s = (0, u.cn)('px-3', c)), (a[2] = c), (a[3] = s)) : (s = a[3]),
                        a[4] !== h || a[5] !== s
                            ? ((r = (0, n.jsx)('div', { className: s, children: h })), (a[4] = h), (a[5] = s), (a[6] = r))
                            : (r = a[6]),
                        a[7] !== t || a[8] !== r
                            ? ((i = (0, n.jsxs)('section', { className: 'flex flex-col gap-3 bg-card py-3', children: [t, r] })),
                              (a[7] = t),
                              (a[8] = r),
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
    98750,
    5816,
    85573,
    (e) => {
        'use strict'
        var t = e.i(63502),
            s = e.i(60687),
            r = e.i(85473),
            i = e.i(14860),
            a = e.i(33217),
            n = e.i(30216),
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
                (0, a.ensurePreventErrorBoundaryRetry)(f, d, m),
                (0, a.useClearResetErrorBoundary)(d))
            let [g] = n.useState(() => new l(p, f)),
                v = g.getOptimisticResult(f),
                b = !h && y
            if (
                (n.useSyncExternalStore(
                    n.useCallback(
                        (e) => {
                            let t = b ? g.subscribe(u.notifyManager.batchCalls(e)) : o.noop
                            return (g.updateResult(), t)
                        },
                        [g, b],
                    ),
                    () => g.getCurrentResult(),
                    () => g.getCurrentResult(),
                ),
                n.useEffect(() => {
                    g.setOptions(f)
                }, [f, g]),
                (0, t.shouldSuspend)(f, v))
            )
                throw (0, t.fetchOptimistic)(f, g, d)
            if ((0, a.getHasError)({ result: v, errorResetBoundary: d, throwOnError: f.throwOnError, query: m, suspense: f.suspense })) throw v.error
            return f.notifyOnChangeProps ? v : g.trackResult(v)
        }
        e.s(['useBaseQuery', 0, l], 5816)
        var c = e.i(78774),
            h = e.i(28875),
            d = e.i(66519),
            p = e.i(82870),
            f = e.i(73045),
            m = class extends d.Subscribable {
                #e
                #t = void 0
                #s = void 0
                #r = void 0
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
                    1 === this.listeners.size && (this.#t.addObserver(this), y(this.#t, this.options) ? this.#f() : this.updateResult(), this.#m())
                }
                onUnsubscribe() {
                    this.hasListeners() || this.destroy()
                }
                shouldFetchOnReconnect() {
                    return g(this.#t, this.options, this.options.refetchOnReconnect)
                }
                shouldFetchOnWindowFocus() {
                    return g(this.#t, this.options, this.options.refetchOnWindowFocus)
                }
                destroy() {
                    ;((this.listeners = new Set()), this.#y(), this.#g(), this.#t.removeObserver(this))
                }
                setOptions(e) {
                    let t = this.options,
                        s = this.#t
                    if (
                        ((this.options = this.#e.defaultQueryOptions(e)),
                        void 0 !== this.options.enabled &&
                            'boolean' != typeof this.options.enabled &&
                            'function' != typeof this.options.enabled &&
                            'boolean' != typeof (0, o.resolveQueryBoolean)(this.options.enabled, this.#t))
                    )
                        throw Error('Expected enabled to be a boolean or a callback that returns a boolean')
                    ;(this.#v(),
                        this.#t.setOptions(this.options),
                        t._defaulted &&
                            !(0, o.shallowEqualObjects)(this.options, t) &&
                            this.#e.getQueryCache().notify({ type: 'observerOptionsUpdated', query: this.#t, observer: this }))
                    let r = this.hasListeners()
                    ;(r && v(this.#t, s, this.options, t) && this.#f(),
                        this.updateResult(),
                        r &&
                            (this.#t !== s ||
                                (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) !== (0, o.resolveQueryBoolean)(t.enabled, this.#t) ||
                                (0, o.resolveStaleTime)(this.options.staleTime, this.#t) !== (0, o.resolveStaleTime)(t.staleTime, this.#t)) &&
                            this.#b())
                    let i = this.#x()
                    r &&
                        (this.#t !== s ||
                            (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) !== (0, o.resolveQueryBoolean)(t.enabled, this.#t) ||
                            i !== this.#d) &&
                        this.#R(i)
                }
                getOptimisticResult(e) {
                    var t, s
                    let r = this.#e.getQueryCache().build(this.#e, e),
                        i = this.createResult(r, e)
                    return (
                        (t = this),
                        (s = i),
                        (0, o.shallowEqualObjects)(t.getCurrentResult(), s) || ((this.#r = i), (this.#a = this.options), (this.#i = this.#t.state)),
                        i
                    )
                }
                getCurrentResult() {
                    return this.#r
                }
                trackResult(e, t) {
                    return new Proxy(e, { get: (e, s) => (this.trackProp(s), t?.(s), Reflect.get(e, s)) })
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
                        s = this.#e.defaultQueryOptions(e),
                        r = this.#e.getQueryCache().build(this.#e, s),
                        i = () => {},
                        a = new Promise((e) => {
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
                        a,
                    ])
                }
                fetch(e) {
                    return this.#f({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(() => (this.updateResult(), this.#r))
                }
                #f(e) {
                    this.#v()
                    let t = this.#t.fetch(this.options, e)
                    return (e?.throwOnError || (t = t.catch(o.noop)), t)
                }
                #b() {
                    this.#y()
                    let e = (0, o.resolveStaleTime)(this.options.staleTime, this.#t)
                    if (h.environmentManager.isServer() || this.#r.isStale || !(0, o.isValidTimeout)(e)) return
                    let t = (0, o.timeUntilStale)(this.#r.dataUpdatedAt, e) + 1
                    this.#c = c.timeoutManager.setTimeout(() => {
                        this.#r.isStale || this.updateResult()
                    }, t)
                }
                #x() {
                    return (
                        ('function' == typeof this.options.refetchInterval ? this.options.refetchInterval(this.#t) : this.options.refetchInterval) ??
                        !1
                    )
                }
                #R(e) {
                    ;(this.#g(),
                        (this.#d = e),
                        !h.environmentManager.isServer() &&
                            !1 !== (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) &&
                            (0, o.isValidTimeout)(this.#d) &&
                            0 !== this.#d &&
                            (this.#h = c.timeoutManager.setInterval(() => {
                                ;(this.options.refetchIntervalInBackground || p.focusManager.isFocused()) && this.#f()
                            }, this.#d)))
                }
                #m() {
                    ;(this.#b(), this.#R(this.#x()))
                }
                #y() {
                    void 0 !== this.#c && (c.timeoutManager.clearTimeout(this.#c), (this.#c = void 0))
                }
                #g() {
                    void 0 !== this.#h && (c.timeoutManager.clearInterval(this.#h), (this.#h = void 0))
                }
                createResult(e, t) {
                    let s,
                        r = this.#t,
                        i = this.options,
                        a = this.#r,
                        n = this.#i,
                        u = this.#a,
                        l = e !== r ? e.state : this.#s,
                        { state: c } = e,
                        h = { ...c },
                        d = !1
                    if (t._optimisticResults) {
                        let s = this.hasListeners(),
                            a = !s && y(e, t),
                            n = s && v(e, r, t, i)
                        ;((a || n) && (h = { ...h, ...(0, f.fetchState)(c.data, e.options) }),
                            'isRestoring' === t._optimisticResults && (h.fetchStatus = 'idle'))
                    }
                    let { error: p, errorUpdatedAt: m, status: g } = h
                    s = h.data
                    let x = !1
                    if (void 0 !== t.placeholderData && void 0 === s && 'pending' === g) {
                        let e
                        ;(a?.isPlaceholderData && t.placeholderData === u?.placeholderData
                            ? ((e = a.data), (x = !0))
                            : (e = 'function' == typeof t.placeholderData ? t.placeholderData(this.#l?.state.data, this.#l) : t.placeholderData),
                            void 0 !== e && ((g = 'success'), (s = (0, o.replaceData)(a?.data, e, t)), (d = !0)))
                    }
                    if (t.select && void 0 !== s && !x)
                        if (a && s === n?.data && t.select === this.#o) s = this.#u
                        else
                            try {
                                ;((this.#o = t.select), (s = t.select(s)), (s = (0, o.replaceData)(a?.data, s, t)), (this.#u = s), (this.#n = null))
                            } catch (e) {
                                this.#n = e
                            }
                    else void 0 === s && (this.#n = null)
                    this.#n && ((p = this.#n), (s = this.#u), (m = Date.now()), (g = 'error'), (d = !1))
                    let R = 'fetching' === h.fetchStatus,
                        S = 'pending' === g,
                        Q = 'error' === g,
                        E = S && R,
                        w = void 0 !== s
                    return {
                        status: g,
                        fetchStatus: h.fetchStatus,
                        isPending: S,
                        isSuccess: 'success' === g,
                        isError: Q,
                        isInitialLoading: E,
                        isLoading: E,
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
                        isRefetching: R && !S,
                        isLoadingError: Q && !w,
                        isPaused: 'paused' === h.fetchStatus,
                        isPlaceholderData: d,
                        isRefetchError: Q && w,
                        isStale: b(e, t),
                        refetch: this.refetch,
                        isEnabled: !1 !== (0, o.resolveQueryBoolean)(t.enabled, e),
                    }
                }
                updateResult() {
                    let e = this.#r,
                        t = this.createResult(this.#t, this.options)
                    if (
                        ((this.#i = this.#t.state),
                        (this.#a = this.options),
                        void 0 !== this.#i.data && (this.#l = this.#t),
                        (0, o.shallowEqualObjects)(t, e))
                    )
                        return
                    this.#r = t
                    let s = () => {
                        if (!e) return !0
                        let { notifyOnChangeProps: t } = this.options,
                            s = 'function' == typeof t ? t() : t
                        if ('all' === s || (!s && !this.#p.size)) return !0
                        let r = new Set(s ?? this.#p)
                        return (this.options.throwOnError && r.add('error'), Object.keys(this.#r).some((t) => this.#r[t] !== e[t] && r.has(t)))
                    }
                    this.#S({ listeners: s() })
                }
                #v() {
                    let e = this.#e.getQueryCache().build(this.#e, this.options)
                    if (e === this.#t) return
                    let t = this.#t
                    ;((this.#t = e), (this.#s = e.state), this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)))
                }
                onQueryUpdate() {
                    ;(this.updateResult(), this.hasListeners() && this.#m())
                }
                #S(e) {
                    u.notifyManager.batch(() => {
                        ;(e.listeners &&
                            this.listeners.forEach((e) => {
                                e(this.#r)
                            }),
                            this.#e.getQueryCache().notify({ query: this.#t, type: 'observerResultsUpdated' }))
                    })
                }
            }
        function y(e, t) {
            return (
                (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) &&
                    void 0 === e.state.data &&
                    ('error' !== e.state.status || !1 !== (0, o.resolveQueryBoolean)(t.retryOnMount, e))) ||
                (void 0 !== e.state.data && g(e, t, t.refetchOnMount))
            )
        }
        function g(e, t, s) {
            if (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) && 'static' !== (0, o.resolveStaleTime)(t.staleTime, e)) {
                let r = 'function' == typeof s ? s(e) : s
                return 'always' === r || (!1 !== r && b(e, t))
            }
            return !1
        }
        function v(e, t, s, r) {
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
