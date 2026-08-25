;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    69842,
    3004,
    (e) => {
        'use strict'
        var t = e.i(83782),
            a = e.i(66476),
            r = e.i(98750),
            i = e.i(68280)
        let n = i.z.object({ address: i.z.string(), service: i.z.string().nullable() }),
            s = i.z.object({
                sourceRowId: i.z.number(),
                guid: i.z.string(),
                identifier: i.z.string().nullable(),
                serviceName: i.z.string().nullable(),
                displayName: i.z.string().nullable(),
                isGroup: i.z.boolean(),
                participants: i.z.array(n),
            })
        var o = e.i(4526),
            l = e.i(15400),
            d = e.i(54037)
        e.s(
            [
                'useGetChat',
                0,
                (e) => {
                    let n,
                        c = (0, t.c)(2)
                    if (c[0] !== e)
                        ((n = (0, a.queryOptions)({
                            queryKey: o.QUERY_KEY.CHAT.DETAIL(e),
                            queryFn: async () =>
                                (0, l.successEnvelopeSchema)(i.z.object({ chat: s })).parse(await (0, d.apiFetch)(`/chats/${e}`)).data.chat,
                        })),
                            (c[0] = e),
                            (c[1] = n))
                    else n = c[1]
                    return (0, r.useSuspenseQuery)(n)
                },
                'useGetChatList',
                0,
                (e) => {
                    let i,
                        n = (0, t.c)(2)
                    if (n[0] !== e)
                        ((i = (0, a.queryOptions)({
                            queryKey: o.QUERY_KEY.CHAT.LIST(e),
                            queryFn: async () => {
                                let t = (0, l.paginatedEnvelopeSchema)(s).parse(await (0, d.apiFetch)(`/chats?page=${e.page}&limit=${e.limit}`))
                                return { data: t.data, pagination: t.pagination }
                            },
                        })),
                            (n[0] = e),
                            (n[1] = i))
                    else i = n[1]
                    return (0, r.useSuspenseQuery)(i)
                },
            ],
            69842,
        )
        var c = e.i(48607),
            u = e.i(7298),
            p = e.i(70596),
            g = e.i(1718)
        let m = (0, u.cva)(
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
                    let a,
                        r,
                        i,
                        n,
                        s,
                        o,
                        l = (0, t.c)(13)
                    l[0] !== e
                        ? (({ className: a, variant: i, asChild: n, ...r } = e), (l[0] = e), (l[1] = a), (l[2] = r), (l[3] = i), (l[4] = n))
                        : ((a = l[1]), (r = l[2]), (i = l[3]), (n = l[4]))
                    let d = void 0 === i ? 'default' : i,
                        u = void 0 !== n && n ? p.Slot.Root : 'span'
                    return (
                        l[5] !== a || l[6] !== d ? ((s = (0, g.cn)(m({ variant: d }), a)), (l[5] = a), (l[6] = d), (l[7] = s)) : (s = l[7]),
                        l[8] !== u || l[9] !== r || l[10] !== s || l[11] !== d
                            ? ((o = (0, c.jsx)(u, { 'data-slot': 'badge', 'data-variant': d, className: s, ...r })),
                              (l[8] = u),
                              (l[9] = r),
                              (l[10] = s),
                              (l[11] = d),
                              (l[12] = o))
                            : (o = l[12]),
                        o
                    )
                },
            ],
            3004,
        )
    },
    35820,
    (e) => {
        'use strict'
        var t = e.i(48607),
            a = e.i(83782),
            r = e.i(33698),
            i = e.i(98899),
            n = e.i(66476),
            s = e.i(5816),
            o = e.i(85573),
            l = e.i(68280)
        let d = l.z.object({
            sourceRowId: l.z.number(),
            messageSourceRowId: l.z.number(),
            guid: l.z.string().nullable(),
            transferName: l.z.string().nullable(),
            mimeType: l.z.string().nullable(),
            totalBytes: l.z.number().nullable(),
        })
        var c = e.i(4526),
            u = e.i(15400),
            p = e.i(54037)
        let g = (e) => `/api/be/attachments/${e}/file`
        var m = e.i(69842),
            h = e.i(28218),
            f = e.i(30232),
            v = e.i(68915),
            b = e.i(3569),
            y = e.i(57027),
            x = e.i(54722),
            j = e.i(56507),
            w = e.i(3004)
        let z = [
            {
                key: 'sentAt',
                label: '시각',
                width: 160,
                mono: !0,
                render: (e) => (0, t.jsx)('span', { suppressHydrationWarning: !0, children: (0, j.formatDateTime)(e.sentAt) }),
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
                render: (e) => (e.hasAttachments ? (0, t.jsx)(w.Badge, { variant: 'secondary', children: '있음' }) : null),
            },
        ]
        function N(e) {
            return e.hasAttachments
        }
        function C(e) {
            return e.sourceRowId
        }
        function R(e) {
            return e.mimeType?.startsWith('image/')
        }
        function T(e) {
            return e.address
        }
        function S(e) {
            return e.address
        }
        function A(e) {
            return e.sourceRowId
        }
        function E(e) {
            return (0, t.jsx)(
                'a',
                {
                    href: g(e.sourceRowId),
                    target: '_blank',
                    rel: 'noreferrer',
                    children: (0, t.jsx)('img', {
                        src: g(e.sourceRowId),
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
                    let g,
                        I,
                        k = (0, a.c)(37),
                        { chatId: G, params: P } = e,
                        $ = (0, i.useRouter)(),
                        q = (0, m.useGetChat)(G).data,
                        { data: K } = (0, h.useGetChatMessages)(G, P)
                    k[0] !== K.data ? ((g = K.data.filter(N).map(C)), (k[0] = K.data), (k[1] = g)) : (g = k[1])
                    let B = ((e) => {
                        var t
                        let r,
                            i,
                            g = (0, a.c)(5)
                        if (g[0] !== e)
                            ((r = (0, n.queryOptions)({
                                queryKey: c.QUERY_KEY.ATTACHMENT.BY_MESSAGES(e),
                                queryFn: async () =>
                                    (0, u.successEnvelopeSchema)(l.z.object({ attachments: l.z.array(d) })).parse(
                                        await (0, p.apiFetch)(`/attachments?messageIds=${e.join(',')}`),
                                    ).data.attachments,
                            })),
                                (g[0] = e),
                                (g[1] = r))
                        else r = g[1]
                        let m = e.length > 0
                        return (
                            g[2] !== r || g[3] !== m ? ((i = { ...r, enabled: m }), (g[2] = r), (g[3] = m), (g[4] = i)) : (i = g[4]),
                            (t = i),
                            (0, s.useBaseQuery)(t, o.QueryObserver, void 0)
                        )
                    })(g)
                    if (
                        k[2] !== B.data ||
                        k[3] !== q.displayName ||
                        k[4] !== q.identifier ||
                        k[5] !== q.isGroup ||
                        k[6] !== q.participants ||
                        k[7] !== G ||
                        k[8] !== K.data ||
                        k[9] !== K.pagination ||
                        k[10] !== $
                    ) {
                        let e,
                            a,
                            i,
                            n,
                            s,
                            o,
                            l,
                            d,
                            c,
                            u = (B.data ?? []).filter(R)
                        ;(k[12] === Symbol.for('react.memo_cache_sentinel')
                            ? ((e = (0, t.jsx)(r.default, {
                                  href: '/chats',
                                  className: 'text-xs text-muted-foreground hover:underline',
                                  children: '목록',
                              })),
                              (k[12] = e))
                            : (e = k[12]),
                            k[13] !== q.displayName || k[14] !== q.identifier || k[15] !== q.participants
                                ? ((a = q.displayName ?? q.identifier ?? q.participants.map(T).join(', ')),
                                  (k[13] = q.displayName),
                                  (k[14] = q.identifier),
                                  (k[15] = q.participants),
                                  (k[16] = a))
                                : (a = k[16]),
                            k[17] !== a
                                ? ((i = (0, t.jsx)('h2', { className: 'truncate text-sm font-medium', children: a })), (k[17] = a), (k[18] = i))
                                : (i = k[18]))
                        let p = q.isGroup ? 'secondary' : 'outline',
                            g = q.isGroup ? '그룹' : '1:1'
                        ;(k[19] !== p || k[20] !== g
                            ? ((n = (0, t.jsx)(w.Badge, { variant: p, children: g })), (k[19] = p), (k[20] = g), (k[21] = n))
                            : (n = k[21]),
                            k[22] !== i || k[23] !== n
                                ? ((s = (0, t.jsxs)('div', { className: 'flex items-center gap-2', children: [e, i, n] })),
                                  (k[22] = i),
                                  (k[23] = n),
                                  (k[24] = s))
                                : (s = k[24]),
                            k[25] !== q.participants ? ((o = q.participants.map(S).join(' · ')), (k[25] = q.participants), (k[26] = o)) : (o = k[26]),
                            k[27] !== o
                                ? ((l = (0, t.jsx)('p', { className: 'font-mono text-xs text-muted-foreground', children: o })),
                                  (k[27] = o),
                                  (k[28] = l))
                                : (l = k[28]),
                            k[29] !== l || k[30] !== s
                                ? ((d = (0, t.jsxs)(b.PanelCard, { contentClassName: 'flex flex-col gap-2', children: [s, l] })),
                                  (k[29] = l),
                                  (k[30] = s),
                                  (k[31] = d))
                                : (d = k[31]),
                            k[32] !== G || k[33] !== K.data || k[34] !== K.pagination || k[35] !== $
                                ? ((c =
                                      0 === K.data.length
                                          ? (0, t.jsx)(x.StateCard, { variant: 'empty', title: '메시지가 없습니다' })
                                          : (0, t.jsxs)(b.PanelCard, {
                                                title: `메시지 ${(0, j.formatCount)(K.pagination.total)}건`,
                                                contentClassName: 'flex flex-col gap-2',
                                                children: [
                                                    (0, t.jsx)(f.DataTable, { columns: z, rows: K.data, rowKey: A }),
                                                    (0, t.jsx)(y.Pager, {
                                                        page: K.pagination.page,
                                                        totalPages: K.pagination.totalPages,
                                                        onPageChange: (e) => $.push(`/chats/${G}?page=${e}`),
                                                    }),
                                                ],
                                            })),
                                  (k[32] = G),
                                  (k[33] = K.data),
                                  (k[34] = K.pagination),
                                  (k[35] = $),
                                  (k[36] = c))
                                : (c = k[36]),
                            (I = (0, t.jsxs)(v.PageRoot, {
                                children: [
                                    d,
                                    c,
                                    u.length > 0
                                        ? (0, t.jsx)(b.PanelCard, {
                                              title: `이미지 첨부 ${u.length}개`,
                                              contentClassName: 'flex flex-wrap gap-2',
                                              children: u.map(E),
                                          })
                                        : null,
                                ],
                            })),
                            (k[2] = B.data),
                            (k[3] = q.displayName),
                            (k[4] = q.identifier),
                            (k[5] = q.isGroup),
                            (k[6] = q.participants),
                            (k[7] = G),
                            (k[8] = K.data),
                            (k[9] = K.pagination),
                            (k[10] = $),
                            (k[11] = I))
                    } else I = k[11]
                    return I
                },
            ],
            35820,
        )
    },
])
