module.exports = [
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
    97789,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(30583)
        a.s([
            'Input',
            0,
            function ({ className: a, type: d, ...e }) {
                return (0, b.jsx)('input', {
                    type: d,
                    'data-slot': 'input',
                    className: (0, c.cn)(
                        'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
                        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                        a,
                    ),
                    ...e,
                })
            },
        ])
    },
    73974,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(94805),
            d = a.i(32802),
            e = a.i(77010),
            f = a.i(51685),
            g = a.i(72817),
            h = a.i(35711),
            i = a.i(76846),
            j = a.i(59246),
            k = a.i(84543),
            l = a.i(83443),
            m = a.i(57773),
            n = a.i(97789)
        let o = [
            {
                key: 'sentAt',
                label: '시각',
                width: 160,
                mono: !0,
                render: (a) => (0, b.jsx)('span', { suppressHydrationWarning: !0, children: (0, l.formatDateTime)(a.sentAt) }),
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
                key: 'chat',
                label: '대화',
                width: 80,
                align: 'right',
                mono: !0,
                render: (a) =>
                    null === a.chatSourceRowId
                        ? '-'
                        : (0, b.jsx)(c.default, {
                              href: `/chats/${a.chatSourceRowId}`,
                              className: 'hover:underline',
                              onClick: (a) => a.stopPropagation(),
                              children: a.chatSourceRowId,
                          }),
            },
        ]
        a.s([
            'MessageSearchWidget',
            0,
            ({ params: a }) => {
                let [c, p] = (0, e.useState)(a.q ?? ''),
                    q = (0, d.useRouter)(),
                    { data: r } = (0, f.useSearchMessages)(a),
                    s = (a, b) => {
                        let c = new URLSearchParams({ page: String(a) })
                        ;(b && c.set('q', b), q.push(`/messages?${c.toString()}`))
                    }
                return (0, b.jsxs)(h.PageRoot, {
                    children: [
                        (0, b.jsx)(i.PanelCard, {
                            contentClassName: 'flex flex-wrap items-center gap-2',
                            children: (0, b.jsxs)('form', {
                                onSubmit: (a) => {
                                    ;(a.preventDefault(), s(1, c.trim()))
                                },
                                className: 'flex min-w-0 flex-1 items-center gap-2',
                                children: [
                                    (0, b.jsx)(n.Input, {
                                        value: c,
                                        onChange: (a) => p(a.target.value),
                                        placeholder: '메시지 본문 검색 (비우면 최근 메시지)',
                                        'aria-label': '메시지 검색',
                                        className: 'font-mono text-xs',
                                    }),
                                    (0, b.jsx)(m.Button, { type: 'submit', size: 'sm', children: '검색' }),
                                ],
                            }),
                        }),
                        0 === r.data.length
                            ? (0, b.jsx)(k.StateCard, {
                                  variant: 'empty',
                                  title: a.q ? '검색 결과가 없습니다' : '동기화된 메시지가 없습니다',
                                  description: a.q ? '다른 검색어를 시도하세요' : void 0,
                              })
                            : (0, b.jsxs)(i.PanelCard, {
                                  title: a.q
                                      ? `"${a.q}" 검색 결과 ${(0, l.formatCount)(r.pagination.total)}건`
                                      : `최근 메시지 ${(0, l.formatCount)(r.pagination.total)}건`,
                                  contentClassName: 'flex flex-col gap-2',
                                  children: [
                                      (0, b.jsx)(g.DataTable, { columns: o, rows: r.data, rowKey: (a) => a.sourceRowId }),
                                      (0, b.jsx)(j.Pager, {
                                          page: r.pagination.page,
                                          totalPages: r.pagination.totalPages,
                                          onPageChange: (b) => s(b, a.q ?? ''),
                                      }),
                                  ],
                              }),
                    ],
                })
            },
        ])
    },
    12723,
    (a) => {
        a.v((b) => Promise.all(['server/chunks/ssr/12-l_next_0-pn88c._.js'].map((b) => a.l(b))).then(() => b(65504)))
    },
]

//# sourceMappingURL=_0ru3l0f._.js.map
