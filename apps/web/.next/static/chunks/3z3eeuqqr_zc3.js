;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    69842,
    3004,
    (e) => {
        'use strict'
        var t = e.i(83782),
            r = e.i(66476),
            s = e.i(98750),
            a = e.i(68280)
        let i = a.z.object({ address: a.z.string(), service: a.z.string().nullable() }),
            n = a.z.object({
                sourceRowId: a.z.number(),
                guid: a.z.string(),
                identifier: a.z.string().nullable(),
                serviceName: a.z.string().nullable(),
                displayName: a.z.string().nullable(),
                isGroup: a.z.boolean(),
                participants: a.z.array(i),
            })
        var o = e.i(4526),
            u = e.i(15400),
            l = e.i(54037)
        e.s(
            [
                'useGetChat',
                0,
                (e) => {
                    let i,
                        c = (0, t.c)(2)
                    if (c[0] !== e)
                        ((i = (0, r.queryOptions)({
                            queryKey: o.QUERY_KEY.CHAT.DETAIL(e),
                            queryFn: async () =>
                                (0, u.successEnvelopeSchema)(a.z.object({ chat: n })).parse(await (0, l.apiFetch)(`/chats/${e}`)).data.chat,
                        })),
                            (c[0] = e),
                            (c[1] = i))
                    else i = c[1]
                    return (0, s.useSuspenseQuery)(i)
                },
                'useGetChatList',
                0,
                (e) => {
                    let a,
                        i = (0, t.c)(2)
                    if (i[0] !== e)
                        ((a = (0, r.queryOptions)({
                            queryKey: o.QUERY_KEY.CHAT.LIST(e),
                            queryFn: async () => {
                                let t = (0, u.paginatedEnvelopeSchema)(n).parse(await (0, l.apiFetch)(`/chats?page=${e.page}&limit=${e.limit}`))
                                return { data: t.data, pagination: t.pagination }
                            },
                        })),
                            (i[0] = e),
                            (i[1] = a))
                    else a = i[1]
                    return (0, s.useSuspenseQuery)(a)
                },
            ],
            69842,
        )
        var c = e.i(48607),
            d = e.i(7298),
            h = e.i(70596),
            p = e.i(1718)
        let f = (0, d.cva)(
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
                        a,
                        i,
                        n,
                        o,
                        u = (0, t.c)(13)
                    u[0] !== e
                        ? (({ className: r, variant: a, asChild: i, ...s } = e), (u[0] = e), (u[1] = r), (u[2] = s), (u[3] = a), (u[4] = i))
                        : ((r = u[1]), (s = u[2]), (a = u[3]), (i = u[4]))
                    let l = void 0 === a ? 'default' : a,
                        d = void 0 !== i && i ? h.Slot.Root : 'span'
                    return (
                        u[5] !== r || u[6] !== l ? ((n = (0, p.cn)(f({ variant: l }), r)), (u[5] = r), (u[6] = l), (u[7] = n)) : (n = u[7]),
                        u[8] !== d || u[9] !== s || u[10] !== n || u[11] !== l
                            ? ((o = (0, c.jsx)(d, { 'data-slot': 'badge', 'data-variant': l, className: n, ...s })),
                              (u[8] = d),
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
    28218,
    (e) => {
        'use strict'
        var t = e.i(83782),
            r = e.i(66476),
            s = e.i(98750),
            a = e.i(68280)
        let i = a.z.object({
            sourceRowId: a.z.number(),
            guid: a.z.string(),
            chatSourceRowId: a.z.number().nullable(),
            senderAddress: a.z.string().nullable(),
            isFromMe: a.z.boolean(),
            text: a.z.string().nullable(),
            service: a.z.string().nullable(),
            sentAt: a.z.string(),
            hasAttachments: a.z.boolean(),
        })
        var n = e.i(4526),
            o = e.i(15400),
            u = e.i(54037)
        let l = (e) => {
            let t = (0, o.paginatedEnvelopeSchema)(i).parse(e)
            return { data: t.data, pagination: t.pagination }
        }
        e.s(
            [
                'useGetChatMessages',
                0,
                (e, a) => {
                    let i,
                        o = (0, t.c)(3)
                    if (o[0] !== e || o[1] !== a)
                        ((i = (0, r.queryOptions)({
                            queryKey: n.QUERY_KEY.CHAT.MESSAGES(e, a),
                            queryFn: async () => l(await (0, u.apiFetch)(`/chats/${e}/messages?page=${a.page}&limit=${a.limit}`)),
                        })),
                            (o[0] = e),
                            (o[1] = a),
                            (o[2] = i))
                    else i = o[2]
                    return (0, s.useSuspenseQuery)(i)
                },
                'useSearchMessages',
                0,
                (e) => {
                    let a,
                        i = (0, t.c)(2)
                    if (i[0] !== e)
                        ((a = (0, r.queryOptions)({
                            queryKey: n.QUERY_KEY.MESSAGE.SEARCH(e),
                            queryFn: async () => {
                                let t = new URLSearchParams({ page: String(e.page), limit: String(e.limit) })
                                return (e.q && t.set('q', e.q), l(await (0, u.apiFetch)(`/messages?${t.toString()}`)))
                            },
                        })),
                            (i[0] = e),
                            (i[1] = a))
                    else a = i[1]
                    return (0, s.useSuspenseQuery)(a)
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
            r = e.i(83782),
            s = e.i(1718)
        function a(e) {
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
                    let i,
                        n,
                        o,
                        u,
                        l,
                        c = (0, r.c)(18),
                        { columns: d, rows: h, rowKey: p, onRowClick: f } = e
                    if (
                        (c[0] !== d ? ((i = d.map(a)), (c[0] = d), (c[1] = i)) : (i = c[1]),
                        c[2] !== i
                            ? ((n = (0, t.jsx)('thead', { children: (0, t.jsx)('tr', { children: i }) })), (c[2] = i), (c[3] = n))
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
        var i = e.i(44659)
        e.s(
            [
                'Pager',
                0,
                (e) => {
                    let s,
                        a,
                        n,
                        o,
                        u,
                        l,
                        c = (0, r.c)(19),
                        { page: d, totalPages: h, onPageChange: p } = e,
                        f = Math.max(h, 1)
                    c[0] !== d || c[1] !== f
                        ? ((s = (0, t.jsxs)('span', { className: 'text-2xs text-muted-foreground tabular-nums', children: [d, ' / ', f] })),
                          (c[0] = d),
                          (c[1] = f),
                          (c[2] = s))
                        : (s = c[2])
                    let m = d <= 1
                    ;(c[3] !== p || c[4] !== d ? ((a = () => p(d - 1)), (c[3] = p), (c[4] = d), (c[5] = a)) : (a = c[5]),
                        c[6] !== m || c[7] !== a
                            ? ((n = (0, t.jsx)(i.Button, { variant: 'ghost', size: 'sm', disabled: m, onClick: a, children: '이전' })),
                              (c[6] = m),
                              (c[7] = a),
                              (c[8] = n))
                            : (n = c[8]))
                    let y = d >= h
                    return (
                        c[9] !== p || c[10] !== d ? ((o = () => p(d + 1)), (c[9] = p), (c[10] = d), (c[11] = o)) : (o = c[11]),
                        c[12] !== y || c[13] !== o
                            ? ((u = (0, t.jsx)(i.Button, { variant: 'ghost', size: 'sm', disabled: y, onClick: o, children: '다음' })),
                              (c[12] = y),
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
                    let a,
                        i,
                        n,
                        l,
                        c,
                        d,
                        h = (0, r.c)(15),
                        { variant: p, title: f, description: m } = e,
                        y = 'error' === p ? u : o,
                        g = 'error' === p && 'text-destructive'
                    return (
                        h[0] !== g ? ((a = (0, s.cn)('size-6', g)), (h[0] = g), (h[1] = a)) : (a = h[1]),
                        h[2] !== y || h[3] !== a ? ((i = (0, t.jsx)(y, { className: a })), (h[2] = y), (h[3] = a), (h[4] = i)) : (i = h[4]),
                        h[5] !== f ? ((n = (0, t.jsx)('p', { className: 'text-sm font-medium', children: f })), (h[5] = f), (h[6] = n)) : (n = h[6]),
                        h[7] !== m
                            ? ((l = m ? (0, t.jsx)('p', { className: 'text-xs text-muted-foreground', children: m }) : null), (h[7] = m), (h[8] = l))
                            : (l = h[8]),
                        h[9] !== n || h[10] !== l
                            ? ((c = (0, t.jsxs)('div', { className: 'flex flex-col gap-1', children: [n, l] })), (h[9] = n), (h[10] = l), (h[11] = c))
                            : (c = h[11]),
                        h[12] !== i || h[13] !== c
                            ? ((d = (0, t.jsxs)('section', {
                                  className: 'flex flex-col items-center justify-center gap-6 bg-card px-3 py-12 text-center text-balance',
                                  children: [i, c],
                              })),
                              (h[12] = i),
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
    35820,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            s = e.i(33698),
            a = e.i(98899),
            i = e.i(66476),
            n = e.i(5816),
            o = e.i(85573),
            u = e.i(68280)
        let l = u.z.object({
            sourceRowId: u.z.number(),
            messageSourceRowId: u.z.number(),
            guid: u.z.string().nullable(),
            transferName: u.z.string().nullable(),
            mimeType: u.z.string().nullable(),
            totalBytes: u.z.number().nullable(),
        })
        var c = e.i(4526),
            d = e.i(15400),
            h = e.i(54037)
        let p = (e) => `/api/be/attachments/${e}/file`
        var f = e.i(69842),
            m = e.i(28218),
            y = e.i(30232),
            g = e.i(68915),
            v = e.i(3569),
            b = e.i(57027),
            x = e.i(54722),
            R = e.i(56507),
            S = e.i(3004)
        let Q = [
            {
                key: 'sentAt',
                label: '시각',
                width: 160,
                mono: !0,
                render: (e) => (0, t.jsx)('span', { suppressHydrationWarning: !0, children: (0, R.formatDateTime)(e.sentAt) }),
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
                key: 'attachments',
                label: '첨부',
                width: 64,
                align: 'right',
                render: (e) => (e.hasAttachments ? (0, t.jsx)(S.Badge, { variant: 'secondary', children: '있음' }) : null),
            },
        ]
        function E(e) {
            return e.hasAttachments
        }
        function w(e) {
            return e.sourceRowId
        }
        function T(e) {
            return e.mimeType?.startsWith('image/')
        }
        function j(e) {
            return e.address
        }
        function C(e) {
            return e.address
        }
        function O(e) {
            return e.sourceRowId
        }
        function I(e) {
            return (0, t.jsx)(
                'a',
                {
                    href: p(e.sourceRowId),
                    target: '_blank',
                    rel: 'noreferrer',
                    children: (0, t.jsx)('img', {
                        src: p(e.sourceRowId),
                        alt: e.transferName ?? `attachment-${e.sourceRowId}`,
                        loading: 'lazy',
                        className: 'h-40 bg-muted object-contain',
                    }),
                },
                e.sourceRowId,
            )
        }
        e.s(
            [
                'ChatMessagesWidget',
                0,
                (e) => {
                    let p,
                        z,
                        A = (0, r.c)(37),
                        { chatId: N, params: M } = e,
                        q = (0, a.useRouter)(),
                        P = (0, f.useGetChat)(N).data,
                        { data: U } = (0, m.useGetChatMessages)(N, M)
                    A[0] !== U.data ? ((p = U.data.filter(E).map(w)), (A[0] = U.data), (A[1] = p)) : (p = A[1])
                    let k = ((e) => {
                        var t
                        let s,
                            a,
                            p = (0, r.c)(5)
                        if (p[0] !== e)
                            ((s = (0, i.queryOptions)({
                                queryKey: c.QUERY_KEY.ATTACHMENT.BY_MESSAGES(e),
                                queryFn: async () =>
                                    (0, d.successEnvelopeSchema)(u.z.object({ attachments: u.z.array(l) })).parse(
                                        await (0, h.apiFetch)(`/attachments?messageIds=${e.join(',')}`),
                                    ).data.attachments,
                            })),
                                (p[0] = e),
                                (p[1] = s))
                        else s = p[1]
                        let f = e.length > 0
                        return (
                            p[2] !== s || p[3] !== f ? ((a = { ...s, enabled: f }), (p[2] = s), (p[3] = f), (p[4] = a)) : (a = p[4]),
                            (t = a),
                            (0, n.useBaseQuery)(t, o.QueryObserver, void 0)
                        )
                    })(p)
                    if (
                        A[2] !== k.data ||
                        A[3] !== P.displayName ||
                        A[4] !== P.identifier ||
                        A[5] !== P.isGroup ||
                        A[6] !== P.participants ||
                        A[7] !== N ||
                        A[8] !== U.data ||
                        A[9] !== U.pagination ||
                        A[10] !== q
                    ) {
                        let e,
                            r,
                            a,
                            i,
                            n,
                            o,
                            u,
                            l,
                            c,
                            d = (k.data ?? []).filter(T)
                        ;(A[12] === Symbol.for('react.memo_cache_sentinel')
                            ? ((e = (0, t.jsx)(s.default, {
                                  href: '/chats',
                                  className: 'text-xs text-muted-foreground hover:underline',
                                  children: '목록',
                              })),
                              (A[12] = e))
                            : (e = A[12]),
                            A[13] !== P.displayName || A[14] !== P.identifier || A[15] !== P.participants
                                ? ((r = P.displayName ?? P.identifier ?? P.participants.map(j).join(', ')),
                                  (A[13] = P.displayName),
                                  (A[14] = P.identifier),
                                  (A[15] = P.participants),
                                  (A[16] = r))
                                : (r = A[16]),
                            A[17] !== r
                                ? ((a = (0, t.jsx)('h2', { className: 'truncate text-sm font-medium', children: r })), (A[17] = r), (A[18] = a))
                                : (a = A[18]))
                        let h = P.isGroup ? 'secondary' : 'outline',
                            p = P.isGroup ? '그룹' : '1:1'
                        ;(A[19] !== h || A[20] !== p
                            ? ((i = (0, t.jsx)(S.Badge, { variant: h, children: p })), (A[19] = h), (A[20] = p), (A[21] = i))
                            : (i = A[21]),
                            A[22] !== a || A[23] !== i
                                ? ((n = (0, t.jsxs)('div', { className: 'flex items-center gap-2', children: [e, a, i] })),
                                  (A[22] = a),
                                  (A[23] = i),
                                  (A[24] = n))
                                : (n = A[24]),
                            A[25] !== P.participants ? ((o = P.participants.map(C).join(' · ')), (A[25] = P.participants), (A[26] = o)) : (o = A[26]),
                            A[27] !== o
                                ? ((u = (0, t.jsx)('p', { className: 'font-mono text-xs text-muted-foreground', children: o })),
                                  (A[27] = o),
                                  (A[28] = u))
                                : (u = A[28]),
                            A[29] !== u || A[30] !== n
                                ? ((l = (0, t.jsxs)(v.PanelCard, { contentClassName: 'flex flex-col gap-2', children: [n, u] })),
                                  (A[29] = u),
                                  (A[30] = n),
                                  (A[31] = l))
                                : (l = A[31]),
                            A[32] !== N || A[33] !== U.data || A[34] !== U.pagination || A[35] !== q
                                ? ((c =
                                      0 === U.data.length
                                          ? (0, t.jsx)(x.StateCard, { variant: 'empty', title: '메시지가 없습니다' })
                                          : (0, t.jsxs)(v.PanelCard, {
                                                title: `메시지 ${(0, R.formatCount)(U.pagination.total)}건`,
                                                contentClassName: 'flex flex-col gap-2',
                                                children: [
                                                    (0, t.jsx)(y.DataTable, { columns: Q, rows: U.data, rowKey: O }),
                                                    (0, t.jsx)(b.Pager, {
                                                        page: U.pagination.page,
                                                        totalPages: U.pagination.totalPages,
                                                        onPageChange: (e) => q.push(`/chats/${N}?page=${e}`),
                                                    }),
                                                ],
                                            })),
                                  (A[32] = N),
                                  (A[33] = U.data),
                                  (A[34] = U.pagination),
                                  (A[35] = q),
                                  (A[36] = c))
                                : (c = A[36]),
                            (z = (0, t.jsxs)(g.PageRoot, {
                                children: [
                                    l,
                                    c,
                                    d.length > 0
                                        ? (0, t.jsx)(v.PanelCard, {
                                              title: `이미지 첨부 ${d.length}개`,
                                              contentClassName: 'flex flex-wrap gap-2',
                                              children: d.map(I),
                                          })
                                        : null,
                                ],
                            })),
                            (A[2] = k.data),
                            (A[3] = P.displayName),
                            (A[4] = P.identifier),
                            (A[5] = P.isGroup),
                            (A[6] = P.participants),
                            (A[7] = N),
                            (A[8] = U.data),
                            (A[9] = U.pagination),
                            (A[10] = q),
                            (A[11] = z))
                    } else z = A[11]
                    return z
                },
            ],
            35820,
        )
    },
    62522,
    (e) => {
        'use strict'
        var t = e.i(60687),
            r = e.i(30216),
            s = e.i(36021)
        function a(e, t, r) {
            let a = e.getMutationCache(),
                i = e.getQueryCache(),
                n = r?.defaultOptions?.deserializeData ?? e.getDefaultOptions().hydrate?.deserializeData
            ;(t.mutations?.forEach(({ state: t, ...s }) => {
                a.build(e, { ...e.getDefaultOptions().hydrate?.mutations, ...r?.defaultOptions?.mutations, ...s }, t)
            }),
                t.queries?.forEach(({ queryKey: t, state: a, queryHash: o, meta: u, promise: l, dehydratedAt: c, queryType: d }) => {
                    let h = l
                            ? (function (e) {
                                  let t
                                  if ((e.then((e) => ((t = e), e), s.noop)?.catch?.(s.noop), void 0 !== t)) return { data: t }
                              })(l)
                            : void 0,
                        p = void 0 === a.data ? h?.data : a.data,
                        f = void 0 === p ? p : n ? n(p) : p,
                        m = i.get(o),
                        y = m?.state.status === 'pending',
                        g = m?.state.fetchStatus === 'fetching'
                    if (m) {
                        let e = h && void 0 !== c && c > m.state.dataUpdatedAt
                        if (a.dataUpdatedAt > m.state.dataUpdatedAt || e) {
                            let { fetchStatus: e, ...t } = a
                            m.setState({
                                ...t,
                                data: f,
                                ...('pending' === a.status &&
                                    void 0 !== f && { status: 'success', dataUpdatedAt: c ?? Date.now(), ...(!g && { fetchStatus: 'idle' }) }),
                            })
                        }
                    } else
                        m = i.build(
                            e,
                            {
                                ...e.getDefaultOptions().hydrate?.queries,
                                ...r?.defaultOptions?.queries,
                                queryKey: t,
                                queryHash: o,
                                meta: u,
                                _type: d,
                            },
                            {
                                ...a,
                                data: f,
                                fetchStatus: 'idle',
                                status: 'pending' === a.status && void 0 !== f ? 'success' : a.status,
                                ...('pending' === a.status && void 0 !== f && { dataUpdatedAt: c ?? Date.now() }),
                            },
                        )
                    !l ||
                        h ||
                        y ||
                        g ||
                        (void 0 !== c && !(c > m.state.dataUpdatedAt)) ||
                        m.fetch(void 0, { initialPromise: Promise.resolve(l).then(n) }).catch(s.noop)
                }))
        }
        e.s(
            [
                'HydrationBoundary',
                0,
                ({ children: e, options: s = {}, state: i, queryClient: n }) => {
                    let o = (0, t.useQueryClient)(n),
                        u = r.useRef(s)
                    r.useEffect(() => {
                        u.current = s
                    })
                    let l = r.useMemo(() => {
                        if (i) {
                            if ('object' != typeof i) return
                            let e = o.getQueryCache(),
                                t = i.queries || [],
                                r = [],
                                s = []
                            for (let a of t) {
                                let t = e.get(a.queryHash)
                                t
                                    ? (a.state.dataUpdatedAt > t.state.dataUpdatedAt ||
                                          (a.promise &&
                                              'pending' !== t.state.status &&
                                              'fetching' !== t.state.fetchStatus &&
                                              void 0 !== a.dehydratedAt &&
                                              a.dehydratedAt > t.state.dataUpdatedAt)) &&
                                      s.push(a)
                                    : r.push(a)
                            }
                            if ((r.length > 0 && a(o, { queries: r }, u.current), s.length > 0)) return s
                        }
                    }, [o, i])
                    return (
                        r.useEffect(() => {
                            l && a(o, { queries: l }, u.current)
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
        let a = r.createContext(
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
        e.s(['useQueryErrorResetBoundary', 0, () => r.useContext(a)], 14860)
        var i = e.i(36021)
        e.s(
            [
                'ensurePreventErrorBoundaryRetry',
                0,
                (e, t, r) => {
                    let s =
                        r?.state.error && 'function' == typeof e.throwOnError
                            ? (0, i.shouldThrowError)(e.throwOnError, [r.state.error, r])
                            : e.throwOnError
                    ;(e.suspense || s) && !t.isReset() && (e.retryOnMount = !1)
                },
                'getHasError',
                0,
                ({ result: e, errorResetBoundary: t, throwOnError: r, query: s, suspense: a }) =>
                    e.isError && !t.isReset() && !e.isFetching && s && ((a && void 0 === e.data) || (0, i.shouldThrowError)(r, [e.error, s])),
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
            a = async (e, t) => fetch(`/api/be${e}`, t),
            i = async (e, t) => {
                let i = await a(e, t),
                    n = await i.json(),
                    o = s.safeParse(n)
                if (o.success) throw new r(o.data.error.code, o.data.error.message, i.status)
                if (!i.ok) throw new r(`HTTP_${i.status}`, i.statusText, i.status)
                return n
            }
        e.s(['apiFetch', 0, i], 54037)
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
                        a,
                        i = (0, o.c)(10),
                        { title: l, contentClassName: c, children: d } = e
                    return (
                        i[0] !== l
                            ? ((t = l
                                  ? (0, n.jsx)('header', {
                                        className: 'px-3',
                                        children: (0, n.jsx)('h2', { className: 'text-sm font-medium', children: l }),
                                    })
                                  : null),
                              (i[0] = l),
                              (i[1] = t))
                            : (t = i[1]),
                        i[2] !== c ? ((r = (0, u.cn)('px-3', c)), (i[2] = c), (i[3] = r)) : (r = i[3]),
                        i[4] !== d || i[5] !== r
                            ? ((s = (0, n.jsx)('div', { className: r, children: d })), (i[4] = d), (i[5] = r), (i[6] = s))
                            : (s = i[6]),
                        i[7] !== t || i[8] !== s
                            ? ((a = (0, n.jsxs)('section', { className: 'flex flex-col gap-3 bg-card py-3', children: [t, s] })),
                              (i[7] = t),
                              (i[8] = s),
                              (i[9] = a))
                            : (a = i[9]),
                        a
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
            a = e.i(14860),
            i = e.i(33217),
            n = e.i(30216),
            o = e.i(36021),
            u = e.i(14437)
        function l(e, l, c) {
            let d = (0, s.useIsRestoring)(),
                h = (0, a.useQueryErrorResetBoundary)(),
                p = (0, r.useQueryClient)(c),
                f = p.defaultQueryOptions(e),
                m = p.getQueryCache().get(f.queryHash),
                y = !1 !== e.subscribed
            ;((f._optimisticResults = d ? 'isRestoring' : y ? 'optimistic' : void 0),
                (0, t.ensureSuspenseTimers)(f),
                (0, i.ensurePreventErrorBoundaryRetry)(f, h, m),
                (0, i.useClearResetErrorBoundary)(h))
            let [g] = n.useState(() => new l(p, f)),
                v = g.getOptimisticResult(f),
                b = !d && y
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
                throw (0, t.fetchOptimistic)(f, g, h)
            if ((0, i.getHasError)({ result: v, errorResetBoundary: h, throwOnError: f.throwOnError, query: m, suspense: f.suspense })) throw v.error
            return f.notifyOnChangeProps ? v : g.trackResult(v)
        }
        e.s(['useBaseQuery', 0, l], 5816)
        var c = e.i(78774),
            d = e.i(28875),
            h = e.i(66519),
            p = e.i(82870),
            f = e.i(73045),
            m = class extends h.Subscribable {
                #e
                #t = void 0
                #r = void 0
                #s = void 0
                #a
                #i
                #n
                #o
                #u
                #l
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
                        r = this.#t
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
                    let s = this.hasListeners()
                    ;(s && v(this.#t, r, this.options, t) && this.#f(),
                        this.updateResult(),
                        s &&
                            (this.#t !== r ||
                                (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) !== (0, o.resolveQueryBoolean)(t.enabled, this.#t) ||
                                (0, o.resolveStaleTime)(this.options.staleTime, this.#t) !== (0, o.resolveStaleTime)(t.staleTime, this.#t)) &&
                            this.#b())
                    let a = this.#x()
                    s &&
                        (this.#t !== r ||
                            (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) !== (0, o.resolveQueryBoolean)(t.enabled, this.#t) ||
                            a !== this.#h) &&
                        this.#R(a)
                }
                getOptimisticResult(e) {
                    var t, r
                    let s = this.#e.getQueryCache().build(this.#e, e),
                        a = this.createResult(s, e)
                    return (
                        (t = this),
                        (r = a),
                        (0, o.shallowEqualObjects)(t.getCurrentResult(), r) || ((this.#s = a), (this.#i = this.options), (this.#a = this.#t.state)),
                        a
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
                        a = () => {},
                        i = new Promise((e) => {
                            ;((t = e),
                                (a = this.#e.getQueryCache().subscribe((t) => {
                                    'updated' === t.type &&
                                        t.query.queryHash === s.queryHash &&
                                        void 0 !== s.state.data &&
                                        (a(), e(this.createResult(s, r)))
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
                                a()
                            }),
                        i,
                    ])
                }
                fetch(e) {
                    return this.#f({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(() => (this.updateResult(), this.#s))
                }
                #f(e) {
                    this.#v()
                    let t = this.#t.fetch(this.options, e)
                    return (e?.throwOnError || (t = t.catch(o.noop)), t)
                }
                #b() {
                    this.#y()
                    let e = (0, o.resolveStaleTime)(this.options.staleTime, this.#t)
                    if (d.environmentManager.isServer() || this.#s.isStale || !(0, o.isValidTimeout)(e)) return
                    let t = (0, o.timeUntilStale)(this.#s.dataUpdatedAt, e) + 1
                    this.#c = c.timeoutManager.setTimeout(() => {
                        this.#s.isStale || this.updateResult()
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
                        (this.#h = e),
                        !d.environmentManager.isServer() &&
                            !1 !== (0, o.resolveQueryBoolean)(this.options.enabled, this.#t) &&
                            (0, o.isValidTimeout)(this.#h) &&
                            0 !== this.#h &&
                            (this.#d = c.timeoutManager.setInterval(() => {
                                ;(this.options.refetchIntervalInBackground || p.focusManager.isFocused()) && this.#f()
                            }, this.#h)))
                }
                #m() {
                    ;(this.#b(), this.#R(this.#x()))
                }
                #y() {
                    void 0 !== this.#c && (c.timeoutManager.clearTimeout(this.#c), (this.#c = void 0))
                }
                #g() {
                    void 0 !== this.#d && (c.timeoutManager.clearInterval(this.#d), (this.#d = void 0))
                }
                createResult(e, t) {
                    let r,
                        s = this.#t,
                        a = this.options,
                        i = this.#s,
                        n = this.#a,
                        u = this.#i,
                        l = e !== s ? e.state : this.#r,
                        { state: c } = e,
                        d = { ...c },
                        h = !1
                    if (t._optimisticResults) {
                        let r = this.hasListeners(),
                            i = !r && y(e, t),
                            n = r && v(e, s, t, a)
                        ;((i || n) && (d = { ...d, ...(0, f.fetchState)(c.data, e.options) }),
                            'isRestoring' === t._optimisticResults && (d.fetchStatus = 'idle'))
                    }
                    let { error: p, errorUpdatedAt: m, status: g } = d
                    r = d.data
                    let x = !1
                    if (void 0 !== t.placeholderData && void 0 === r && 'pending' === g) {
                        let e
                        ;(i?.isPlaceholderData && t.placeholderData === u?.placeholderData
                            ? ((e = i.data), (x = !0))
                            : (e = 'function' == typeof t.placeholderData ? t.placeholderData(this.#l?.state.data, this.#l) : t.placeholderData),
                            void 0 !== e && ((g = 'success'), (r = (0, o.replaceData)(i?.data, e, t)), (h = !0)))
                    }
                    if (t.select && void 0 !== r && !x)
                        if (i && r === n?.data && t.select === this.#o) r = this.#u
                        else
                            try {
                                ;((this.#o = t.select), (r = t.select(r)), (r = (0, o.replaceData)(i?.data, r, t)), (this.#u = r), (this.#n = null))
                            } catch (e) {
                                this.#n = e
                            }
                    else void 0 === r && (this.#n = null)
                    this.#n && ((p = this.#n), (r = this.#u), (m = Date.now()), (g = 'error'), (h = !1))
                    let R = 'fetching' === d.fetchStatus,
                        S = 'pending' === g,
                        Q = 'error' === g,
                        E = S && R,
                        w = void 0 !== r
                    return {
                        status: g,
                        fetchStatus: d.fetchStatus,
                        isPending: S,
                        isSuccess: 'success' === g,
                        isError: Q,
                        isInitialLoading: E,
                        isLoading: E,
                        data: r,
                        dataUpdatedAt: d.dataUpdatedAt,
                        error: p,
                        errorUpdatedAt: m,
                        failureCount: d.fetchFailureCount,
                        failureReason: d.fetchFailureReason,
                        errorUpdateCount: d.errorUpdateCount,
                        isFetched: e.isFetched(),
                        isFetchedAfterMount: d.dataUpdateCount > l.dataUpdateCount || d.errorUpdateCount > l.errorUpdateCount,
                        isFetching: R,
                        isRefetching: R && !S,
                        isLoadingError: Q && !w,
                        isPaused: 'paused' === d.fetchStatus,
                        isPlaceholderData: h,
                        isRefetchError: Q && w,
                        isStale: b(e, t),
                        refetch: this.refetch,
                        isEnabled: !1 !== (0, o.resolveQueryBoolean)(t.enabled, e),
                    }
                }
                updateResult() {
                    let e = this.#s,
                        t = this.createResult(this.#t, this.options)
                    if (
                        ((this.#a = this.#t.state),
                        (this.#i = this.options),
                        void 0 !== this.#a.data && (this.#l = this.#t),
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
                #v() {
                    let e = this.#e.getQueryCache().build(this.#e, this.options)
                    if (e === this.#t) return
                    let t = this.#t
                    ;((this.#t = e), (this.#r = e.state), this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)))
                }
                onQueryUpdate() {
                    ;(this.updateResult(), this.hasListeners() && this.#m())
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
        function y(e, t) {
            return (
                (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) &&
                    void 0 === e.state.data &&
                    ('error' !== e.state.status || !1 !== (0, o.resolveQueryBoolean)(t.retryOnMount, e))) ||
                (void 0 !== e.state.data && g(e, t, t.refetchOnMount))
            )
        }
        function g(e, t, r) {
            if (!1 !== (0, o.resolveQueryBoolean)(t.enabled, e) && 'static' !== (0, o.resolveStaleTime)(t.staleTime, e)) {
                let s = 'function' == typeof r ? r(e) : r
                return 'always' === s || (!1 !== s && b(e, t))
            }
            return !1
        }
        function v(e, t, r, s) {
            return (e !== t || !1 === (0, o.resolveQueryBoolean)(s.enabled, e)) && (!r.suspense || 'error' !== e.state.status) && b(e, r)
        }
        function b(e, t) {
            return !1 !== (0, o.resolveQueryBoolean)(t.enabled, e) && e.isStaleByTime((0, o.resolveStaleTime)(t.staleTime, e))
        }
        ;(e.s(['QueryObserver', 0, m], 85573),
            e.s(
                [
                    'useSuspenseQuery',
                    0,
                    function (e, r) {
                        return l({ ...e, enabled: !0, suspense: !0, throwOnError: t.defaultThrowOnError, placeholderData: void 0 }, m, r)
                    },
                ],
                98750,
            ))
    },
])
