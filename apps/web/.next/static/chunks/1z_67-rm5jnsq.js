;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    25584,
    (e) => {
        'use strict'
        var a = e.i(48607),
            t = e.i(83782),
            i = e.i(98899),
            n = e.i(69842),
            o = e.i(30232),
            r = e.i(68915),
            l = e.i(3569),
            s = e.i(57027),
            d = e.i(54722),
            g = e.i(56507),
            p = e.i(3004)
        let c = [
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
                render: (e) => (0, a.jsx)(p.Badge, { variant: e.isGroup ? 'secondary' : 'outline', children: e.isGroup ? '그룹' : '1:1' }),
            },
            { key: 'service', label: '서비스', width: 96, render: (e) => e.serviceName ?? '-' },
            { key: 'participants', label: '참여자', width: 96, align: 'right', render: (e) => e.participants.length },
        ]
        function h(e) {
            return e.sourceRowId
        }
        e.s([
            'ChatListWidget',
            0,
            (e) => {
                let p,
                    u,
                    m,
                    y,
                    b,
                    P,
                    w = (0, t.c)(18),
                    { params: x } = e,
                    C = (0, i.useRouter)(),
                    { data: f } = (0, n.useGetChatList)(x)
                if (0 === f.data.length) {
                    let e
                    return (
                        w[0] === Symbol.for('react.memo_cache_sentinel')
                            ? ((e = (0, a.jsx)(r.PageRoot, {
                                  children: (0, a.jsx)(d.StateCard, {
                                      variant: 'empty',
                                      title: '동기화된 대화가 없습니다',
                                      description: '동기화 화면에서 상태를 확인하세요',
                                  }),
                              })),
                              (w[0] = e))
                            : (e = w[0]),
                        e
                    )
                }
                w[1] !== f.pagination.total ? ((p = (0, g.formatCount)(f.pagination.total)), (w[1] = f.pagination.total), (w[2] = p)) : (p = w[2])
                let j = `대화 ${p}개`
                return (
                    w[3] !== C ? ((u = (e) => C.push(`/chats/${e.sourceRowId}`)), (w[3] = C), (w[4] = u)) : (u = w[4]),
                    w[5] !== f.data || w[6] !== u
                        ? ((m = (0, a.jsx)(o.DataTable, { columns: c, rows: f.data, rowKey: h, onRowClick: u })),
                          (w[5] = f.data),
                          (w[6] = u),
                          (w[7] = m))
                        : (m = w[7]),
                    w[8] !== C ? ((y = (e) => C.push(`/chats?page=${e}`)), (w[8] = C), (w[9] = y)) : (y = w[9]),
                    w[10] !== f.pagination.page || w[11] !== f.pagination.totalPages || w[12] !== y
                        ? ((b = (0, a.jsx)(s.Pager, { page: f.pagination.page, totalPages: f.pagination.totalPages, onPageChange: y })),
                          (w[10] = f.pagination.page),
                          (w[11] = f.pagination.totalPages),
                          (w[12] = y),
                          (w[13] = b))
                        : (b = w[13]),
                    w[14] !== j || w[15] !== m || w[16] !== b
                        ? ((P = (0, a.jsx)(r.PageRoot, {
                              children: (0, a.jsxs)(l.PanelCard, { title: j, contentClassName: 'flex flex-col gap-2', children: [m, b] }),
                          })),
                          (w[14] = j),
                          (w[15] = m),
                          (w[16] = b),
                          (w[17] = P))
                        : (P = w[17]),
                    P
                )
            },
        ])
    },
])
