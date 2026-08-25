module.exports = [
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

//# sourceMappingURL=_0su-rv0._.js.map
