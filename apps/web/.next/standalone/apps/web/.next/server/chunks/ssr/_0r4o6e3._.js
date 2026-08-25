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
    4203,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(32802),
            d = a.i(82840),
            e = a.i(72817),
            f = a.i(35711),
            g = a.i(76846),
            h = a.i(59246),
            i = a.i(84543),
            j = a.i(83443),
            k = a.i(61216)
        let l = [
            { key: 'id', label: 'ID', width: 64, align: 'right', mono: !0, render: (a) => a.sourceRowId },
            {
                key: 'name',
                label: '대화',
                flexible: !0,
                render: (a) => a.displayName ?? a.identifier ?? a.participants.map((a) => a.address).join(', '),
            },
            {
                key: 'type',
                label: '유형',
                width: 80,
                render: (a) => (0, b.jsx)(k.Badge, { variant: a.isGroup ? 'secondary' : 'outline', children: a.isGroup ? '그룹' : '1:1' }),
            },
            { key: 'service', label: '서비스', width: 96, render: (a) => a.serviceName ?? '-' },
            { key: 'participants', label: '참여자', width: 96, align: 'right', render: (a) => a.participants.length },
        ]
        a.s([
            'ChatListWidget',
            0,
            ({ params: a }) => {
                let k = (0, c.useRouter)(),
                    { data: m } = (0, d.useGetChatList)(a)
                return 0 === m.data.length
                    ? (0, b.jsx)(f.PageRoot, {
                          children: (0, b.jsx)(i.StateCard, {
                              variant: 'empty',
                              title: '동기화된 대화가 없습니다',
                              description: '동기화 화면에서 상태를 확인하세요',
                          }),
                      })
                    : (0, b.jsx)(f.PageRoot, {
                          children: (0, b.jsxs)(g.PanelCard, {
                              title: `대화 ${(0, j.formatCount)(m.pagination.total)}개`,
                              contentClassName: 'flex flex-col gap-2',
                              children: [
                                  (0, b.jsx)(e.DataTable, {
                                      columns: l,
                                      rows: m.data,
                                      rowKey: (a) => a.sourceRowId,
                                      onRowClick: (a) => k.push(`/chats/${a.sourceRowId}`),
                                  }),
                                  (0, b.jsx)(h.Pager, {
                                      page: m.pagination.page,
                                      totalPages: m.pagination.totalPages,
                                      onPageChange: (a) => k.push(`/chats?page=${a}`),
                                  }),
                              ],
                          }),
                      })
            },
        ])
    },
    12723,
    (a) => {
        a.v((b) => Promise.all(['server/chunks/ssr/12-l_next_0-pn88c._.js'].map((b) => a.l(b))).then(() => b(65504)))
    },
]

//# sourceMappingURL=_0r4o6e3._.js.map
