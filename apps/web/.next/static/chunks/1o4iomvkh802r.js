;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    40350,
    (e) => {
        'use strict'
        var t = e.i(48607),
            a = e.i(83782),
            i = e.i(1718)
        e.s([
            'Input',
            0,
            function (e) {
                let n,
                    r,
                    s,
                    o,
                    l,
                    d = (0, a.c)(10)
                return (
                    d[0] !== e
                        ? (({ className: n, type: s, ...r } = e), (d[0] = e), (d[1] = n), (d[2] = r), (d[3] = s))
                        : ((n = d[1]), (r = d[2]), (s = d[3])),
                    d[4] !== n
                        ? ((o = (0, i.cn)(
                              'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
                              'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                              'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                              n,
                          )),
                          (d[4] = n),
                          (d[5] = o))
                        : (o = d[5]),
                    d[6] !== r || d[7] !== o || d[8] !== s
                        ? ((l = (0, t.jsx)('input', { type: s, 'data-slot': 'input', className: o, ...r })),
                          (d[6] = r),
                          (d[7] = o),
                          (d[8] = s),
                          (d[9] = l))
                        : (l = d[9]),
                    l
                )
            },
        ])
    },
    39422,
    (e) => {
        'use strict'
        var t = e.i(48607),
            a = e.i(83782),
            i = e.i(33698),
            n = e.i(98899),
            r = e.i(30216),
            s = e.i(28218),
            o = e.i(30232),
            l = e.i(68915),
            d = e.i(3569),
            c = e.i(57027),
            u = e.i(54722),
            m = e.i(56507),
            g = e.i(44659),
            p = e.i(40350)
        let f = [
            {
                key: 'sentAt',
                label: '시각',
                width: 160,
                mono: !0,
                render: (e) => (0, t.jsx)('span', { suppressHydrationWarning: !0, children: (0, m.formatDateTime)(e.sentAt) }),
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
                        : (0, t.jsx)(i.default, {
                              href: `/chats/${e.chatSourceRowId}`,
                              className: 'hover:underline',
                              onClick: (e) => e.stopPropagation(),
                              children: e.chatSourceRowId,
                          }),
            },
        ]
        function h(e) {
            return e.sourceRowId
        }
        e.s([
            'MessageSearchWidget',
            0,
            (e) => {
                let i,
                    x,
                    b,
                    v,
                    w,
                    y,
                    j,
                    S,
                    C = (0, a.c)(20),
                    { params: P } = e,
                    [q, R] = (0, r.useState)(P.q ?? ''),
                    N = (0, n.useRouter)(),
                    { data: k } = (0, s.useSearchMessages)(P)
                C[0] !== N
                    ? ((i = (e, t) => {
                          let a = new URLSearchParams({ page: String(e) })
                          ;(t && a.set('q', t), N.push(`/messages?${a.toString()}`))
                      }),
                      (C[0] = N),
                      (C[1] = i))
                    : (i = C[1])
                let I = i
                C[2] !== q || C[3] !== I
                    ? ((x = (e) => {
                          ;(e.preventDefault(), I(1, q.trim()))
                      }),
                      (C[2] = q),
                      (C[3] = I),
                      (C[4] = x))
                    : (x = C[4])
                let T = x
                return (
                    C[5] === Symbol.for('react.memo_cache_sentinel') ? ((b = (e) => R(e.target.value)), (C[5] = b)) : (b = C[5]),
                    C[6] !== q
                        ? ((v = (0, t.jsx)(p.Input, {
                              value: q,
                              onChange: b,
                              placeholder: '메시지 본문 검색 (비우면 최근 메시지)',
                              'aria-label': '메시지 검색',
                              className: 'font-mono text-xs',
                          })),
                          (C[6] = q),
                          (C[7] = v))
                        : (v = C[7]),
                    C[8] === Symbol.for('react.memo_cache_sentinel')
                        ? ((w = (0, t.jsx)(g.Button, { type: 'submit', size: 'sm', children: '검색' })), (C[8] = w))
                        : (w = C[8]),
                    C[9] !== T || C[10] !== v
                        ? ((y = (0, t.jsx)(d.PanelCard, {
                              contentClassName: 'flex flex-wrap items-center gap-2',
                              children: (0, t.jsxs)('form', { onSubmit: T, className: 'flex min-w-0 flex-1 items-center gap-2', children: [v, w] }),
                          })),
                          (C[9] = T),
                          (C[10] = v),
                          (C[11] = y))
                        : (y = C[11]),
                    C[12] !== k.data || C[13] !== k.pagination || C[14] !== P.q || C[15] !== I
                        ? ((j =
                              0 === k.data.length
                                  ? (0, t.jsx)(u.StateCard, {
                                        variant: 'empty',
                                        title: P.q ? '검색 결과가 없습니다' : '동기화된 메시지가 없습니다',
                                        description: P.q ? '다른 검색어를 시도하세요' : void 0,
                                    })
                                  : (0, t.jsxs)(d.PanelCard, {
                                        title: P.q
                                            ? `"${P.q}" 검색 결과 ${(0, m.formatCount)(k.pagination.total)}건`
                                            : `최근 메시지 ${(0, m.formatCount)(k.pagination.total)}건`,
                                        contentClassName: 'flex flex-col gap-2',
                                        children: [
                                            (0, t.jsx)(o.DataTable, { columns: f, rows: k.data, rowKey: h }),
                                            (0, t.jsx)(c.Pager, {
                                                page: k.pagination.page,
                                                totalPages: k.pagination.totalPages,
                                                onPageChange: (e) => I(e, P.q ?? ''),
                                            }),
                                        ],
                                    })),
                          (C[12] = k.data),
                          (C[13] = k.pagination),
                          (C[14] = P.q),
                          (C[15] = I),
                          (C[16] = j))
                        : (j = C[16]),
                    C[17] !== y || C[18] !== j
                        ? ((S = (0, t.jsxs)(l.PageRoot, { children: [y, j] })), (C[17] = y), (C[18] = j), (C[19] = S))
                        : (S = C[19]),
                    S
                )
            },
        ])
    },
])
