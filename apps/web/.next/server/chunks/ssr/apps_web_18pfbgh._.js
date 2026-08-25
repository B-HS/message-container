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
    },
    35711,
    (a) => {
        'use strict'
        var b = a.i(90329)
        a.s(['PageRoot', 0, ({ children: a }) => (0, b.jsx)('div', { className: 'flex flex-col gap-px', children: a })])
    },
    84543,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(66373)
        let d = (0, c.default)('inbox', [
                ['polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12', key: 'o97t9d' }],
                [
                    'path',
                    {
                        d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
                        key: 'oot6mr',
                    },
                ],
            ]),
            e = (0, c.default)('triangle-alert', [
                ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
                ['path', { d: 'M12 9v4', key: 'juzpu7' }],
                ['path', { d: 'M12 17h.01', key: 'p32p05' }],
            ])
        var f = a.i(30583)
        a.s(
            [
                'StateCard',
                0,
                ({ variant: a, title: c, description: g }) =>
                    (0, b.jsxs)('section', {
                        className: 'flex flex-col items-center justify-center gap-6 bg-card px-3 py-12 text-center text-balance',
                        children: [
                            (0, b.jsx)('error' === a ? e : d, { className: (0, f.cn)('size-6', 'error' === a && 'text-destructive') }),
                            (0, b.jsxs)('div', {
                                className: 'flex flex-col gap-1',
                                children: [
                                    (0, b.jsx)('p', { className: 'text-sm font-medium', children: c }),
                                    g ? (0, b.jsx)('p', { className: 'text-xs text-muted-foreground', children: g }) : null,
                                ],
                            }),
                        ],
                    }),
            ],
            84543,
        )
    },
    27,
    (a) => {
        'use strict'
        class b extends Error {
            code
            status
            constructor(a, b, c) {
                ;(super(b), (this.code = a), (this.status = c), (this.name = 'ApiError'))
            }
        }
        a.s(['ApiError', 0, b, 'isApiError', 0, (a) => a instanceof b])
    },
    57773,
    13801,
    16224,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(86934)
        let d = (a) => ('boolean' == typeof a ? `${a}` : 0 === a ? '0' : a),
            e = c.clsx,
            f = (a, b) => (c) => {
                var f
                if ((null == b ? void 0 : b.variants) == null) return e(a, null == c ? void 0 : c.class, null == c ? void 0 : c.className)
                let { variants: g, defaultVariants: h } = b,
                    i = Object.keys(g).map((a) => {
                        let b = null == c ? void 0 : c[a],
                            e = null == h ? void 0 : h[a]
                        if (null === b) return null
                        let f = d(b) || d(e)
                        return g[a][f]
                    }),
                    j =
                        c &&
                        Object.entries(c).reduce((a, b) => {
                            let [c, d] = b
                            return (void 0 === d || (a[c] = d), a)
                        }, {})
                return e(
                    a,
                    i,
                    null == b || null == (f = b.compoundVariants)
                        ? void 0
                        : f.reduce((a, b) => {
                              let { class: c, className: d, ...e } = b
                              return Object.entries(e).every((a) => {
                                  let [b, c] = a
                                  return Array.isArray(c) ? c.includes({ ...h, ...j }[b]) : { ...h, ...j }[b] === c
                              })
                                  ? [...a, c, d]
                                  : a
                          }, []),
                    null == c ? void 0 : c.class,
                    null == c ? void 0 : c.className,
                )
            }
        a.s(['cva', 0, f], 13801)
        var g = a.i(77010),
            h = Object.defineProperty,
            i = (a, b) => h(a, 'name', { value: b, configurable: !0 })
        function j(a, b) {
            if ('function' == typeof a) return a(b)
            null != a && (a.current = b)
        }
        function k(...a) {
            return (b) => {
                let c = !1,
                    d = a.map((a) => {
                        let d = j(a, b)
                        return (c || 'function' != typeof d || (c = !0), d)
                    })
                if (c)
                    return () => {
                        for (let b = 0; b < d.length; b++) {
                            let c = d[b]
                            'function' == typeof c ? c() : j(a[b], null)
                        }
                    }
            }
        }
        function l(...a) {
            return g.useCallback(k(...a), a)
        }
        ;(i(j, 'setRef'), i(k, 'composeRefs'), i(l, 'useComposedRefs'))
        var m = Object.defineProperty,
            n = (a, b) => m(a, 'name', { value: b, configurable: !0 })
        function o(a) {
            let b = g.forwardRef((b, c) => {
                let { children: d, ...e } = b,
                    f = null,
                    h = !1,
                    i = []
                ;(y(d) && 'function' == typeof C && (d = C(d._payload)),
                    g.Children.forEach(d, (a) => {
                        if (w(a)) {
                            h = !0
                            let b = 'child' in a.props ? a.props.child : a.props.children
                            ;(y(b) && 'function' == typeof C && (b = C(b._payload)), (f = t(a, b)), i.push(f?.props?.children))
                        } else i.push(a)
                    }),
                    f ? (f = g.cloneElement(f, void 0, i)) : !h && 1 === g.Children.count(d) && g.isValidElement(d) && (f = d))
                let j = f ? v(f) : void 0,
                    k = l(c, j)
                if (!f) {
                    if (d || 0 === d) throw Error(h ? B(a) : A(a))
                    return d
                }
                let m = u(e, f.props ?? {})
                return (f.type !== g.Fragment && (m.ref = c ? k : j), g.cloneElement(f, m))
            })
            return ((b.displayName = `${a}.Slot`), b)
        }
        n(o, 'createSlot')
        var p = o('Slot'),
            q = Symbol.for('radix.slottable')
        function r(a) {
            let b = n((a) => ('child' in a ? a.children(a.child) : a.children), 'Slottable')
            return ((b.displayName = `${a}.Slottable`), (b.__radixId = q), b)
        }
        n(r, 'createSlottable')
        var s = r('Slottable'),
            t = n((a, b) => {
                if ('child' in a.props) {
                    let b = a.props.child
                    return g.isValidElement(b) ? g.cloneElement(b, void 0, a.props.children(b.props.children)) : null
                }
                return g.isValidElement(b) ? b : null
            }, 'getSlottableElementFromSlottable')
        function u(a, b) {
            let c = { ...b }
            for (let d in b) {
                let e = a[d],
                    f = b[d]
                ;/^on[A-Z]/.test(d)
                    ? e && f
                        ? (c[d] = (...a) => {
                              let b = f(...a)
                              return (e(...a), b)
                          })
                        : e && (c[d] = e)
                    : 'style' === d
                      ? (c[d] = { ...e, ...f })
                      : 'className' === d && (c[d] = [e, f].filter(Boolean).join(' '))
            }
            return { ...a, ...c }
        }
        function v(a) {
            let b = Object.getOwnPropertyDescriptor(a.props, 'ref')?.get,
                c = b && 'isReactWarning' in b && b.isReactWarning
            return c
                ? a.ref
                : (c = (b = Object.getOwnPropertyDescriptor(a, 'ref')?.get) && 'isReactWarning' in b && b.isReactWarning)
                  ? a.props.ref
                  : a.props.ref || a.ref
        }
        function w(a) {
            return g.isValidElement(a) && 'function' == typeof a.type && '__radixId' in a.type && a.type.__radixId === q
        }
        ;(n(u, 'mergeProps'), n(v, 'getElementRef'), n(w, 'isSlottable'))
        var x = Symbol.for('react.lazy')
        function y(a) {
            return null != a && 'object' == typeof a && '$$typeof' in a && a.$$typeof === x && '_payload' in a && z(a._payload)
        }
        function z(a) {
            return 'object' == typeof a && null !== a && 'then' in a
        }
        ;(n(y, 'isLazyComponent'), n(z, 'isPromiseLike'))
        var A = n((a) => `${a} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, 'createSlotError'),
            B = n(
                (a) => `${a} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
                'createSlottableError',
            ),
            C = g[' use '.trim().toString()]
        a.s(['Root', 0, p, 'Slot', 0, p, 'Slottable', 0, s, 'createSlot', 0, o, 'createSlottable', 0, r], 2954)
        var D = a.i(2954)
        a.s(['Slot', 0, D], 16224)
        var D = D,
            E = a.i(30583)
        let F = f(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            {
                variants: {
                    variant: {
                        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                        destructive:
                            'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
                        outline:
                            'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
                        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                        link: 'text-primary underline-offset-4 hover:underline',
                    },
                    size: {
                        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
                        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
                        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                        icon: 'size-9',
                        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
                        'icon-sm': 'size-8',
                        'icon-lg': 'size-10',
                    },
                },
                defaultVariants: { variant: 'default', size: 'default' },
            },
        )
        a.s(
            [
                'Button',
                0,
                function ({ className: a, variant: c = 'default', size: d = 'default', asChild: e = !1, ...f }) {
                    let g = e ? D.Root : 'button'
                    return (0, b.jsx)(g, {
                        'data-slot': 'button',
                        'data-variant': c,
                        'data-size': d,
                        className: (0, E.cn)(F({ variant: c, size: d, className: a })),
                        ...f,
                    })
                },
            ],
            57773,
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
]

//# sourceMappingURL=apps_web_18pfbgh._.js.map
