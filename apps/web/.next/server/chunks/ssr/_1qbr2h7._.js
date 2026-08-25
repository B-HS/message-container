module.exports = [
    82840,
    61216,
    (a) => {
        'use strict'
        var b = a.i(88406),
            c = a.i(76386),
            d = a.i(87432)
        let e = d.z.object({ address: d.z.string(), service: d.z.string().nullable() }),
            f = d.z.object({
                sourceRowId: d.z.number(),
                guid: d.z.string(),
                identifier: d.z.string().nullable(),
                serviceName: d.z.string().nullable(),
                displayName: d.z.string().nullable(),
                isGroup: d.z.boolean(),
                participants: d.z.array(e),
            })
        var g = a.i(55335),
            h = a.i(44958),
            i = a.i(45473)
        a.s(
            [
                'useGetChat',
                0,
                (a) =>
                    (0, c.useSuspenseQuery)(
                        (0, b.queryOptions)({
                            queryKey: g.QUERY_KEY.CHAT.DETAIL(a),
                            queryFn: async () =>
                                (0, h.successEnvelopeSchema)(d.z.object({ chat: f })).parse(await (0, i.apiFetch)(`/chats/${a}`)).data.chat,
                        }),
                    ),
                'useGetChatList',
                0,
                (a) =>
                    (0, c.useSuspenseQuery)(
                        (0, b.queryOptions)({
                            queryKey: g.QUERY_KEY.CHAT.LIST(a),
                            queryFn: async () => {
                                let b = (0, h.paginatedEnvelopeSchema)(f).parse(await (0, i.apiFetch)(`/chats?page=${a.page}&limit=${a.limit}`))
                                return { data: b.data, pagination: b.pagination }
                            },
                        }),
                    ),
            ],
            82840,
        )
        var j = a.i(90329),
            k = a.i(13801),
            l = a.i(16224),
            m = a.i(30583)
        let n = (0, k.cva)(
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
        a.s(
            [
                'Badge',
                0,
                function ({ className: a, variant: b = 'default', asChild: c = !1, ...d }) {
                    let e = c ? l.Slot.Root : 'span'
                    return (0, j.jsx)(e, { 'data-slot': 'badge', 'data-variant': b, className: (0, m.cn)(n({ variant: b }), a), ...d })
                },
            ],
            61216,
        )
    },
    51685,
    (a) => {
        'use strict'
        var b = a.i(88406),
            c = a.i(76386),
            d = a.i(87432)
        let e = d.z.object({
            sourceRowId: d.z.number(),
            guid: d.z.string(),
            chatSourceRowId: d.z.number().nullable(),
            senderAddress: d.z.string().nullable(),
            isFromMe: d.z.boolean(),
            text: d.z.string().nullable(),
            service: d.z.string().nullable(),
            sentAt: d.z.string(),
            hasAttachments: d.z.boolean(),
        })
        var f = a.i(55335),
            g = a.i(44958),
            h = a.i(45473)
        let i = (a) => {
            let b = (0, g.paginatedEnvelopeSchema)(e).parse(a)
            return { data: b.data, pagination: b.pagination }
        }
        a.s(
            [
                'useGetChatMessages',
                0,
                (a, d) =>
                    (0, c.useSuspenseQuery)(
                        (0, b.queryOptions)({
                            queryKey: f.QUERY_KEY.CHAT.MESSAGES(a, d),
                            queryFn: async () => i(await (0, h.apiFetch)(`/chats/${a}/messages?page=${d.page}&limit=${d.limit}`)),
                        }),
                    ),
                'useSearchMessages',
                0,
                (a) =>
                    (0, c.useSuspenseQuery)(
                        (0, b.queryOptions)({
                            queryKey: f.QUERY_KEY.MESSAGE.SEARCH(a),
                            queryFn: async () => {
                                let b = new URLSearchParams({ page: String(a.page), limit: String(a.limit) })
                                return (a.q && b.set('q', a.q), i(await (0, h.apiFetch)(`/messages?${b.toString()}`)))
                            },
                        }),
                    ),
            ],
            51685,
        )
    },
    72817,
    59246,
    84543,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(30583)
        a.s(
            [
                'DataTable',
                0,
                ({ columns: a, rows: d, rowKey: e, onRowClick: f }) =>
                    (0, b.jsx)('div', {
                        className: 'overflow-x-auto',
                        children: (0, b.jsxs)('table', {
                            className: 'w-full text-xs',
                            children: [
                                (0, b.jsx)('thead', {
                                    children: (0, b.jsx)('tr', {
                                        children: a.map((a) =>
                                            (0, b.jsx)(
                                                'th',
                                                {
                                                    scope: 'col',
                                                    style: a.width ? { width: a.width } : void 0,
                                                    className: (0, c.cn)(
                                                        'p-2 text-left font-medium text-muted-foreground',
                                                        'right' === a.align && 'text-right',
                                                    ),
                                                    children: a.label,
                                                },
                                                a.key,
                                            ),
                                        ),
                                    }),
                                }),
                                (0, b.jsx)('tbody', {
                                    children: d.map((d) =>
                                        (0, b.jsx)(
                                            'tr',
                                            {
                                                onClick: f ? () => f(d) : void 0,
                                                className: (0, c.cn)('border-b', f && 'cursor-pointer hover:bg-accent'),
                                                children: a.map((a) =>
                                                    (0, b.jsx)(
                                                        'td',
                                                        {
                                                            className: (0, c.cn)(
                                                                'p-2 align-middle',
                                                                'right' === a.align && 'text-right tabular-nums',
                                                                a.mono && 'font-mono',
                                                                a.flexible && 'max-w-0 truncate',
                                                            ),
                                                            children: a.render(d),
                                                        },
                                                        a.key,
                                                    ),
                                                ),
                                            },
                                            e(d),
                                        ),
                                    ),
                                }),
                            ],
                        }),
                    }),
            ],
            72817,
        )
        var d = a.i(57773)
        a.s(
            [
                'Pager',
                0,
                ({ page: a, totalPages: c, onPageChange: e }) =>
                    (0, b.jsxs)('div', {
                        className: 'flex items-center justify-end gap-2',
                        children: [
                            (0, b.jsxs)('span', { className: 'text-2xs text-muted-foreground tabular-nums', children: [a, ' / ', Math.max(c, 1)] }),
                            (0, b.jsx)(d.Button, { variant: 'ghost', size: 'sm', disabled: a <= 1, onClick: () => e(a - 1), children: '이전' }),
                            (0, b.jsx)(d.Button, { variant: 'ghost', size: 'sm', disabled: a >= c, onClick: () => e(a + 1), children: '다음' }),
                        ],
                    }),
            ],
            59246,
        )
        var e = a.i(66373)
        let f = (0, e.default)('inbox', [
                ['polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12', key: 'o97t9d' }],
                [
                    'path',
                    {
                        d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
                        key: 'oot6mr',
                    },
                ],
            ]),
            g = (0, e.default)('triangle-alert', [
                ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
                ['path', { d: 'M12 9v4', key: 'juzpu7' }],
                ['path', { d: 'M12 17h.01', key: 'p32p05' }],
            ])
        a.s(
            [
                'StateCard',
                0,
                ({ variant: a, title: d, description: e }) =>
                    (0, b.jsxs)('section', {
                        className: 'flex flex-col items-center justify-center gap-6 bg-card px-3 py-12 text-center text-balance',
                        children: [
                            (0, b.jsx)('error' === a ? g : f, { className: (0, c.cn)('size-6', 'error' === a && 'text-destructive') }),
                            (0, b.jsxs)('div', {
                                className: 'flex flex-col gap-1',
                                children: [
                                    (0, b.jsx)('p', { className: 'text-sm font-medium', children: d }),
                                    e ? (0, b.jsx)('p', { className: 'text-xs text-muted-foreground', children: e }) : null,
                                ],
                            }),
                        ],
                    }),
            ],
            84543,
        )
    },
    40518,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(94805),
            d = a.i(32802),
            e = a.i(88406),
            f = a.i(80873),
            g = a.i(30217),
            h = a.i(87432)
        let i = h.z.object({
            sourceRowId: h.z.number(),
            messageSourceRowId: h.z.number(),
            guid: h.z.string().nullable(),
            transferName: h.z.string().nullable(),
            mimeType: h.z.string().nullable(),
            totalBytes: h.z.number().nullable(),
        })
        var j = a.i(55335),
            k = a.i(44958),
            l = a.i(45473)
        let m = (a) => `/api/be/attachments/${a}/file`
        var n = a.i(82840),
            o = a.i(51685),
            p = a.i(72817),
            q = a.i(35711),
            r = a.i(76846),
            s = a.i(59246),
            t = a.i(84543),
            u = a.i(83443),
            v = a.i(61216)
        let w = [
            {
                key: 'sentAt',
                label: '시각',
                width: 160,
                mono: !0,
                render: (a) => (0, b.jsx)('span', { suppressHydrationWarning: !0, children: (0, u.formatDateTime)(a.sentAt) }),
            },
            {
                key: 'sender',
                label: '발신',
                width: 160,
                mono: !0,
                render: (a) => (a.isFromMe ? (0, b.jsx)('span', { className: 'text-muted-foreground', children: '나' }) : (a.senderAddress ?? '-')),
            },
            {
                key: 'text',
                label: '내용',
                flexible: !0,
                render: (a) => a.text ?? (0, b.jsx)('span', { className: 'text-muted-foreground', children: '(본문 없음)' }),
            },
            {
                key: 'attachments',
                label: '첨부',
                width: 64,
                align: 'right',
                render: (a) => (a.hasAttachments ? (0, b.jsx)(v.Badge, { variant: 'secondary', children: '있음' }) : null),
            },
        ]
        a.s(
            [
                'ChatMessagesWidget',
                0,
                ({ chatId: a, params: x }) => {
                    var y, z
                    let A,
                        B = (0, d.useRouter)(),
                        C = (0, n.useGetChat)(a).data,
                        { data: D } = (0, o.useGetChatMessages)(a, x),
                        E = (
                            ((z = {
                                ...((A = y = D.data.filter((a) => a.hasAttachments).map((a) => a.sourceRowId)),
                                (0, e.queryOptions)({
                                    queryKey: j.QUERY_KEY.ATTACHMENT.BY_MESSAGES(A),
                                    queryFn: async () =>
                                        (0, k.successEnvelopeSchema)(h.z.object({ attachments: h.z.array(i) })).parse(
                                            await (0, l.apiFetch)(`/attachments?messageIds=${A.join(',')}`),
                                        ).data.attachments,
                                })),
                                enabled: y.length > 0,
                            }),
                            (0, f.useBaseQuery)(z, g.QueryObserver, void 0)).data ?? []
                        ).filter((a) => a.mimeType?.startsWith('image/'))
                    return (0, b.jsxs)(q.PageRoot, {
                        children: [
                            (0, b.jsxs)(r.PanelCard, {
                                contentClassName: 'flex flex-col gap-2',
                                children: [
                                    (0, b.jsxs)('div', {
                                        className: 'flex items-center gap-2',
                                        children: [
                                            (0, b.jsx)(c.default, {
                                                href: '/chats',
                                                className: 'text-xs text-muted-foreground hover:underline',
                                                children: '목록',
                                            }),
                                            (0, b.jsx)('h2', {
                                                className: 'truncate text-sm font-medium',
                                                children: C.displayName ?? C.identifier ?? C.participants.map((a) => a.address).join(', '),
                                            }),
                                            (0, b.jsx)(v.Badge, {
                                                variant: C.isGroup ? 'secondary' : 'outline',
                                                children: C.isGroup ? '그룹' : '1:1',
                                            }),
                                        ],
                                    }),
                                    (0, b.jsx)('p', {
                                        className: 'font-mono text-xs text-muted-foreground',
                                        children: C.participants.map((a) => a.address).join(' · '),
                                    }),
                                ],
                            }),
                            0 === D.data.length
                                ? (0, b.jsx)(t.StateCard, { variant: 'empty', title: '메시지가 없습니다' })
                                : (0, b.jsxs)(r.PanelCard, {
                                      title: `메시지 ${(0, u.formatCount)(D.pagination.total)}건`,
                                      contentClassName: 'flex flex-col gap-2',
                                      children: [
                                          (0, b.jsx)(p.DataTable, { columns: w, rows: D.data, rowKey: (a) => a.sourceRowId }),
                                          (0, b.jsx)(s.Pager, {
                                              page: D.pagination.page,
                                              totalPages: D.pagination.totalPages,
                                              onPageChange: (b) => B.push(`/chats/${a}?page=${b}`),
                                          }),
                                      ],
                                  }),
                            E.length > 0
                                ? (0, b.jsx)(r.PanelCard, {
                                      title: `이미지 첨부 ${E.length}개`,
                                      contentClassName: 'flex flex-wrap gap-2',
                                      children: E.map((a) =>
                                          (0, b.jsx)(
                                              'a',
                                              {
                                                  href: m(a.sourceRowId),
                                                  target: '_blank',
                                                  rel: 'noreferrer',
                                                  children: (0, b.jsx)('img', {
                                                      src: m(a.sourceRowId),
                                                      alt: a.transferName ?? `attachment-${a.sourceRowId}`,
                                                      loading: 'lazy',
                                                      className: 'h-40 bg-muted object-contain',
                                                  }),
                                              },
                                              a.sourceRowId,
                                          ),
                                      ),
                                  })
                                : null,
                        ],
                    })
                },
            ],
            40518,
        )
    },
    12723,
    (a) => {
        a.v((b) => Promise.all(['server/chunks/ssr/12-l_next_0-pn88c._.js'].map((b) => a.l(b))).then(() => b(65504)))
    },
]

//# sourceMappingURL=_1qbr2h7._.js.map
