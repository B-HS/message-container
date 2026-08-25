;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    3138,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            i = e.i(98899),
            n = e.i(30216),
            l = e.i(68915),
            o = e.i(1718)
        function s(e) {
            let i,
                n,
                l,
                s,
                a = (0, r.c)(8)
            return (
                a[0] !== e ? (({ className: i, ...n } = e), (a[0] = e), (a[1] = i), (a[2] = n)) : ((i = a[1]), (n = a[2])),
                a[3] !== i ? ((l = (0, o.cn)('animate-pulse rounded-md bg-accent', i)), (a[3] = i), (a[4] = l)) : (l = a[4]),
                a[5] !== n || a[6] !== l
                    ? ((s = (0, t.jsx)('div', { 'data-slot': 'skeleton', className: l, ...n })), (a[5] = n), (a[6] = l), (a[7] = s))
                    : (s = a[7]),
                s
            )
        }
        let a = () => {
            let e,
                i = (0, r.c)(1)
            return (
                i[0] === Symbol.for('react.memo_cache_sentinel')
                    ? ((e = (0, t.jsx)('div', {
                          className: 'flex flex-col gap-px',
                          children: (0, t.jsx)('section', { className: 'bg-card p-3', children: (0, t.jsx)(s, { className: 'h-96 w-full' }) }),
                      })),
                      (i[0] = e))
                    : (e = i[0]),
                e
            )
        }
        var c = e.i(54722),
            d = e.i(8800),
            u = e.i(44659)
        e.s(
            [
                'default',
                0,
                (e) => {
                    let o,
                        s,
                        p,
                        f,
                        v,
                        m = (0, r.c)(10),
                        { error: h, reset: g } = e
                    m[0] !== h
                        ? ((o = ((0, d.isApiError)(h) && 'UNAUTHORIZED' === h.code) || h.message.includes('API 키')), (m[0] = h), (m[1] = o))
                        : (o = m[1])
                    let b = o,
                        x = (0, i.useRouter)()
                    if (
                        (m[2] !== b || m[3] !== x
                            ? ((s = () => {
                                  b && x.replace('/setup')
                              }),
                              (p = [b, x]),
                              (m[2] = b),
                              (m[3] = x),
                              (m[4] = s),
                              (m[5] = p))
                            : ((s = m[4]), (p = m[5])),
                        (0, n.useEffect)(s, p),
                        b)
                    ) {
                        let e
                        return (m[6] === Symbol.for('react.memo_cache_sentinel') ? ((e = (0, t.jsx)(a, {})), (m[6] = e)) : (e = m[6]), e)
                    }
                    return (
                        m[7] === Symbol.for('react.memo_cache_sentinel')
                            ? ((f = (0, t.jsx)(c.StateCard, {
                                  variant: 'error',
                                  title: '데이터를 불러오지 못했습니다',
                                  description: '요청이 실패했습니다. 잠시 후 다시 시도하세요.',
                              })),
                              (m[7] = f))
                            : (f = m[7]),
                        m[8] !== g
                            ? ((v = (0, t.jsxs)(l.PageRoot, {
                                  children: [
                                      f,
                                      (0, t.jsx)('section', {
                                          className: 'flex justify-center bg-card p-3',
                                          children: (0, t.jsx)(u.Button, {
                                              size: 'sm',
                                              variant: 'outline',
                                              onClick: () => g(),
                                              children: '다시 시도',
                                          }),
                                      }),
                                  ],
                              })),
                              (m[8] = g),
                              (m[9] = v))
                            : (v = m[9]),
                        v
                    )
                },
            ],
            3138,
        )
    },
    68915,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782)
        e.s([
            'PageRoot',
            0,
            (e) => {
                let i,
                    n = (0, r.c)(2),
                    { children: l } = e
                return (
                    n[0] !== l ? ((i = (0, t.jsx)('div', { className: 'flex flex-col gap-px', children: l })), (n[0] = l), (n[1] = i)) : (i = n[1]),
                    i
                )
            },
        ])
    },
    54722,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            i = e.i(82339)
        let n = (0, i.default)('inbox', [
                ['polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12', key: 'o97t9d' }],
                [
                    'path',
                    {
                        d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
                        key: 'oot6mr',
                    },
                ],
            ]),
            l = (0, i.default)('triangle-alert', [
                ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', key: 'wmoenq' }],
                ['path', { d: 'M12 9v4', key: 'juzpu7' }],
                ['path', { d: 'M12 17h.01', key: 'p32p05' }],
            ])
        var o = e.i(1718)
        e.s(
            [
                'StateCard',
                0,
                (e) => {
                    let i,
                        s,
                        a,
                        c,
                        d,
                        u,
                        p = (0, r.c)(15),
                        { variant: f, title: v, description: m } = e,
                        h = 'error' === f ? l : n,
                        g = 'error' === f && 'text-destructive'
                    return (
                        p[0] !== g ? ((i = (0, o.cn)('size-6', g)), (p[0] = g), (p[1] = i)) : (i = p[1]),
                        p[2] !== h || p[3] !== i ? ((s = (0, t.jsx)(h, { className: i })), (p[2] = h), (p[3] = i), (p[4] = s)) : (s = p[4]),
                        p[5] !== v ? ((a = (0, t.jsx)('p', { className: 'text-sm font-medium', children: v })), (p[5] = v), (p[6] = a)) : (a = p[6]),
                        p[7] !== m
                            ? ((c = m ? (0, t.jsx)('p', { className: 'text-xs text-muted-foreground', children: m }) : null), (p[7] = m), (p[8] = c))
                            : (c = p[8]),
                        p[9] !== a || p[10] !== c
                            ? ((d = (0, t.jsxs)('div', { className: 'flex flex-col gap-1', children: [a, c] })), (p[9] = a), (p[10] = c), (p[11] = d))
                            : (d = p[11]),
                        p[12] !== s || p[13] !== d
                            ? ((u = (0, t.jsxs)('section', {
                                  className: 'flex flex-col items-center justify-center gap-6 bg-card px-3 py-12 text-center text-balance',
                                  children: [s, d],
                              })),
                              (p[12] = s),
                              (p[13] = d),
                              (p[14] = u))
                            : (u = p[14]),
                        u
                    )
                },
            ],
            54722,
        )
    },
    8800,
    (e) => {
        'use strict'
        class t extends Error {
            code
            status
            constructor(e, t, r) {
                ;(super(t), (this.code = e), (this.status = r), (this.name = 'ApiError'))
            }
        }
        e.s(['ApiError', 0, t, 'isApiError', 0, (e) => e instanceof t])
    },
    44659,
    7298,
    70596,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            i = e.i(70733)
        let n = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
            l = i.clsx,
            o = (e, t) => (r) => {
                var i
                if ((null == t ? void 0 : t.variants) == null) return l(e, null == r ? void 0 : r.class, null == r ? void 0 : r.className)
                let { variants: o, defaultVariants: s } = t,
                    a = Object.keys(o).map((e) => {
                        let t = null == r ? void 0 : r[e],
                            i = null == s ? void 0 : s[e]
                        if (null === t) return null
                        let l = n(t) || n(i)
                        return o[e][l]
                    }),
                    c =
                        r &&
                        Object.entries(r).reduce((e, t) => {
                            let [r, i] = t
                            return (void 0 === i || (e[r] = i), e)
                        }, {})
                return l(
                    e,
                    a,
                    null == t || null == (i = t.compoundVariants)
                        ? void 0
                        : i.reduce((e, t) => {
                              let { class: r, className: i, ...n } = t
                              return Object.entries(n).every((e) => {
                                  let [t, r] = e
                                  return Array.isArray(r) ? r.includes({ ...s, ...c }[t]) : { ...s, ...c }[t] === r
                              })
                                  ? [...e, r, i]
                                  : e
                          }, []),
                    null == r ? void 0 : r.class,
                    null == r ? void 0 : r.className,
                )
            }
        e.s(['cva', 0, o], 7298)
        var s = e.i(30216),
            a = Object.defineProperty,
            c = (e, t) => a(e, 'name', { value: t, configurable: !0 })
        function d(e, t) {
            if ('function' == typeof e) return e(t)
            null != e && (e.current = t)
        }
        function u(...e) {
            return (t) => {
                let r = !1,
                    i = e.map((e) => {
                        let i = d(e, t)
                        return (r || 'function' != typeof i || (r = !0), i)
                    })
                if (r)
                    return () => {
                        for (let t = 0; t < i.length; t++) {
                            let r = i[t]
                            'function' == typeof r ? r() : d(e[t], null)
                        }
                    }
            }
        }
        function p(...e) {
            return s.useCallback(u(...e), e)
        }
        ;(c(d, 'setRef'), c(u, 'composeRefs'), c(p, 'useComposedRefs'))
        var f = Object.defineProperty,
            v = (e, t) => f(e, 'name', { value: t, configurable: !0 })
        function m(e) {
            let t = s.forwardRef((t, r) => {
                let { children: i, ...n } = t,
                    l = null,
                    o = !1,
                    a = []
                ;(_(i) && 'function' == typeof A && (i = A(i._payload)),
                    s.Children.forEach(i, (e) => {
                        if (E(e)) {
                            o = !0
                            let t = 'child' in e.props ? e.props.child : e.props.children
                            ;(_(t) && 'function' == typeof A && (t = A(t._payload)), (l = y(e, t)), a.push(l?.props?.children))
                        } else a.push(e)
                    }),
                    l ? (l = s.cloneElement(l, void 0, a)) : !o && 1 === s.Children.count(i) && s.isValidElement(i) && (l = i))
                let c = l ? S(l) : void 0,
                    d = p(r, c)
                if (!l) {
                    if (i || 0 === i) throw Error(o ? R(e) : N(e))
                    return i
                }
                let u = j(n, l.props ?? {})
                return (l.type !== s.Fragment && (u.ref = r ? d : c), s.cloneElement(l, u))
            })
            return ((t.displayName = `${e}.Slot`), t)
        }
        v(m, 'createSlot')
        var h = m('Slot'),
            g = Symbol.for('radix.slottable')
        function b(e) {
            let t = v((e) => ('child' in e ? e.children(e.child) : e.children), 'Slottable')
            return ((t.displayName = `${e}.Slottable`), (t.__radixId = g), t)
        }
        v(b, 'createSlottable')
        var x = b('Slottable'),
            y = v((e, t) => {
                if ('child' in e.props) {
                    let t = e.props.child
                    return s.isValidElement(t) ? s.cloneElement(t, void 0, e.props.children(t.props.children)) : null
                }
                return s.isValidElement(t) ? t : null
            }, 'getSlottableElementFromSlottable')
        function j(e, t) {
            let r = { ...t }
            for (let i in t) {
                let n = e[i],
                    l = t[i]
                ;/^on[A-Z]/.test(i)
                    ? n && l
                        ? (r[i] = (...e) => {
                              let t = l(...e)
                              return (n(...e), t)
                          })
                        : n && (r[i] = n)
                    : 'style' === i
                      ? (r[i] = { ...n, ...l })
                      : 'className' === i && (r[i] = [n, l].filter(Boolean).join(' '))
            }
            return { ...e, ...r }
        }
        function S(e) {
            let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
                r = t && 'isReactWarning' in t && t.isReactWarning
            return r
                ? e.ref
                : (r = (t = Object.getOwnPropertyDescriptor(e, 'ref')?.get) && 'isReactWarning' in t && t.isReactWarning)
                  ? e.props.ref
                  : e.props.ref || e.ref
        }
        function E(e) {
            return s.isValidElement(e) && 'function' == typeof e.type && '__radixId' in e.type && e.type.__radixId === g
        }
        ;(v(j, 'mergeProps'), v(S, 'getElementRef'), v(E, 'isSlottable'))
        var k = Symbol.for('react.lazy')
        function _(e) {
            return null != e && 'object' == typeof e && '$$typeof' in e && e.$$typeof === k && '_payload' in e && z(e._payload)
        }
        function z(e) {
            return 'object' == typeof e && null !== e && 'then' in e
        }
        ;(v(_, 'isLazyComponent'), v(z, 'isPromiseLike'))
        var N = v((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, 'createSlotError'),
            R = v(
                (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
                'createSlottableError',
            ),
            A = s[' use '.trim().toString()]
        e.s(['Root', 0, h, 'Slot', 0, h, 'Slottable', 0, x, 'createSlot', 0, m, 'createSlottable', 0, b], 89762)
        var O = e.i(89762)
        e.s(['Slot', 0, O], 70596)
        var O = O,
            C = e.i(1718)
        let P = o(
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
        e.s(
            [
                'Button',
                0,
                function (e) {
                    let i,
                        n,
                        l,
                        o,
                        s,
                        a,
                        c,
                        d = (0, r.c)(16)
                    d[0] !== e
                        ? (({ className: i, variant: l, size: o, asChild: s, ...n } = e),
                          (d[0] = e),
                          (d[1] = i),
                          (d[2] = n),
                          (d[3] = l),
                          (d[4] = o),
                          (d[5] = s))
                        : ((i = d[1]), (n = d[2]), (l = d[3]), (o = d[4]), (s = d[5]))
                    let u = void 0 === l ? 'default' : l,
                        p = void 0 === o ? 'default' : o,
                        f = void 0 !== s && s ? O.Root : 'button'
                    return (
                        d[6] !== i || d[7] !== p || d[8] !== u
                            ? ((a = (0, C.cn)(P({ variant: u, size: p, className: i }))), (d[6] = i), (d[7] = p), (d[8] = u), (d[9] = a))
                            : (a = d[9]),
                        d[10] !== f || d[11] !== n || d[12] !== p || d[13] !== a || d[14] !== u
                            ? ((c = (0, t.jsx)(f, { 'data-slot': 'button', 'data-variant': u, 'data-size': p, className: a, ...n })),
                              (d[10] = f),
                              (d[11] = n),
                              (d[12] = p),
                              (d[13] = a),
                              (d[14] = u),
                              (d[15] = c))
                            : (c = d[15]),
                        c
                    )
                },
            ],
            44659,
        )
    },
])
