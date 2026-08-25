;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    44659,
    7298,
    70596,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            i = e.i(70733)
        let n = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
            o = i.clsx,
            l = (e, t) => (r) => {
                var i
                if ((null == t ? void 0 : t.variants) == null) return o(e, null == r ? void 0 : r.class, null == r ? void 0 : r.className)
                let { variants: l, defaultVariants: s } = t,
                    a = Object.keys(l).map((e) => {
                        let t = null == r ? void 0 : r[e],
                            i = null == s ? void 0 : s[e]
                        if (null === t) return null
                        let o = n(t) || n(i)
                        return l[e][o]
                    }),
                    d =
                        r &&
                        Object.entries(r).reduce((e, t) => {
                            let [r, i] = t
                            return (void 0 === i || (e[r] = i), e)
                        }, {})
                return o(
                    e,
                    a,
                    null == t || null == (i = t.compoundVariants)
                        ? void 0
                        : i.reduce((e, t) => {
                              let { class: r, className: i, ...n } = t
                              return Object.entries(n).every((e) => {
                                  let [t, r] = e
                                  return Array.isArray(r) ? r.includes({ ...s, ...d }[t]) : { ...s, ...d }[t] === r
                              })
                                  ? [...e, r, i]
                                  : e
                          }, []),
                    null == r ? void 0 : r.class,
                    null == r ? void 0 : r.className,
                )
            }
        e.s(['cva', 0, l], 7298)
        var s = e.i(30216),
            a = Object.defineProperty,
            d = (e, t) => a(e, 'name', { value: t, configurable: !0 })
        function u(e, t) {
            if ('function' == typeof e) return e(t)
            null != e && (e.current = t)
        }
        function c(...e) {
            return (t) => {
                let r = !1,
                    i = e.map((e) => {
                        let i = u(e, t)
                        return (r || 'function' != typeof i || (r = !0), i)
                    })
                if (r)
                    return () => {
                        for (let t = 0; t < i.length; t++) {
                            let r = i[t]
                            'function' == typeof r ? r() : u(e[t], null)
                        }
                    }
            }
        }
        function p(...e) {
            return s.useCallback(c(...e), e)
        }
        ;(d(u, 'setRef'), d(c, 'composeRefs'), d(p, 'useComposedRefs'))
        var f = Object.defineProperty,
            v = (e, t) => f(e, 'name', { value: t, configurable: !0 })
        function b(e) {
            let t = s.forwardRef((t, r) => {
                let { children: i, ...n } = t,
                    o = null,
                    l = !1,
                    a = []
                ;(k(i) && 'function' == typeof O && (i = O(i._payload)),
                    s.Children.forEach(i, (e) => {
                        if (z(e)) {
                            l = !0
                            let t = 'child' in e.props ? e.props.child : e.props.children
                            ;(k(t) && 'function' == typeof O && (t = O(t._payload)), (o = x(e, t)), a.push(o?.props?.children))
                        } else a.push(e)
                    }),
                    o ? (o = s.cloneElement(o, void 0, a)) : !l && 1 === s.Children.count(i) && s.isValidElement(i) && (o = i))
                let d = o ? j(o) : void 0,
                    u = p(r, d)
                if (!o) {
                    if (i || 0 === i) throw Error(l ? _(e) : E(e))
                    return i
                }
                let c = S(n, o.props ?? {})
                return (o.type !== s.Fragment && (c.ref = r ? u : d), s.cloneElement(o, c))
            })
            return ((t.displayName = `${e}.Slot`), t)
        }
        v(b, 'createSlot')
        var g = b('Slot'),
            m = Symbol.for('radix.slottable')
        function h(e) {
            let t = v((e) => ('child' in e ? e.children(e.child) : e.children), 'Slottable')
            return ((t.displayName = `${e}.Slottable`), (t.__radixId = m), t)
        }
        v(h, 'createSlottable')
        var y = h('Slottable'),
            x = v((e, t) => {
                if ('child' in e.props) {
                    let t = e.props.child
                    return s.isValidElement(t) ? s.cloneElement(t, void 0, e.props.children(t.props.children)) : null
                }
                return s.isValidElement(t) ? t : null
            }, 'getSlottableElementFromSlottable')
        function S(e, t) {
            let r = { ...t }
            for (let i in t) {
                let n = e[i],
                    o = t[i]
                ;/^on[A-Z]/.test(i)
                    ? n && o
                        ? (r[i] = (...e) => {
                              let t = o(...e)
                              return (n(...e), t)
                          })
                        : n && (r[i] = n)
                    : 'style' === i
                      ? (r[i] = { ...n, ...o })
                      : 'className' === i && (r[i] = [n, o].filter(Boolean).join(' '))
            }
            return { ...e, ...r }
        }
        function j(e) {
            let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
                r = t && 'isReactWarning' in t && t.isReactWarning
            return r
                ? e.ref
                : (r = (t = Object.getOwnPropertyDescriptor(e, 'ref')?.get) && 'isReactWarning' in t && t.isReactWarning)
                  ? e.props.ref
                  : e.props.ref || e.ref
        }
        function z(e) {
            return s.isValidElement(e) && 'function' == typeof e.type && '__radixId' in e.type && e.type.__radixId === m
        }
        ;(v(S, 'mergeProps'), v(j, 'getElementRef'), v(z, 'isSlottable'))
        var w = Symbol.for('react.lazy')
        function k(e) {
            return null != e && 'object' == typeof e && '$$typeof' in e && e.$$typeof === w && '_payload' in e && R(e._payload)
        }
        function R(e) {
            return 'object' == typeof e && null !== e && 'then' in e
        }
        ;(v(k, 'isLazyComponent'), v(R, 'isPromiseLike'))
        var E = v((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, 'createSlotError'),
            _ = v(
                (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
                'createSlottableError',
            ),
            O = s[' use '.trim().toString()]
        e.s(['Root', 0, g, 'Slot', 0, g, 'Slottable', 0, y, 'createSlot', 0, b, 'createSlottable', 0, h], 89762)
        var N = e.i(89762)
        e.s(['Slot', 0, N], 70596)
        var N = N,
            C = e.i(1718)
        let P = l(
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
                        o,
                        l,
                        s,
                        a,
                        d,
                        u = (0, r.c)(16)
                    u[0] !== e
                        ? (({ className: i, variant: o, size: l, asChild: s, ...n } = e),
                          (u[0] = e),
                          (u[1] = i),
                          (u[2] = n),
                          (u[3] = o),
                          (u[4] = l),
                          (u[5] = s))
                        : ((i = u[1]), (n = u[2]), (o = u[3]), (l = u[4]), (s = u[5]))
                    let c = void 0 === o ? 'default' : o,
                        p = void 0 === l ? 'default' : l,
                        f = void 0 !== s && s ? N.Root : 'button'
                    return (
                        u[6] !== i || u[7] !== p || u[8] !== c
                            ? ((a = (0, C.cn)(P({ variant: c, size: p, className: i }))), (u[6] = i), (u[7] = p), (u[8] = c), (u[9] = a))
                            : (a = u[9]),
                        u[10] !== f || u[11] !== n || u[12] !== p || u[13] !== a || u[14] !== c
                            ? ((d = (0, t.jsx)(f, { 'data-slot': 'button', 'data-variant': c, 'data-size': p, className: a, ...n })),
                              (u[10] = f),
                              (u[11] = n),
                              (u[12] = p),
                              (u[13] = a),
                              (u[14] = c),
                              (u[15] = d))
                            : (d = u[15]),
                        d
                    )
                },
            ],
            44659,
        )
    },
    40350,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            i = e.i(1718)
        e.s([
            'Input',
            0,
            function (e) {
                let n,
                    o,
                    l,
                    s,
                    a,
                    d = (0, r.c)(10)
                return (
                    d[0] !== e
                        ? (({ className: n, type: l, ...o } = e), (d[0] = e), (d[1] = n), (d[2] = o), (d[3] = l))
                        : ((n = d[1]), (o = d[2]), (l = d[3])),
                    d[4] !== n
                        ? ((s = (0, i.cn)(
                              'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
                              'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                              'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                              n,
                          )),
                          (d[4] = n),
                          (d[5] = s))
                        : (s = d[5]),
                    d[6] !== o || d[7] !== s || d[8] !== l
                        ? ((a = (0, t.jsx)('input', { type: l, 'data-slot': 'input', className: s, ...o })),
                          (d[6] = o),
                          (d[7] = s),
                          (d[8] = l),
                          (d[9] = a))
                        : (a = d[9]),
                    a
                )
            },
        ])
    },
    72234,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(98899),
            i = e.i(30216),
            n = e.i(68280),
            o = e.i(44659),
            l = e.i(40350)
        let s = n.z.union([
            n.z.object({ success: n.z.literal(!0) }),
            n.z.object({ success: n.z.literal(!1), error: n.z.object({ code: n.z.string(), message: n.z.string() }) }),
        ])
        e.s([
            'SetupForm',
            0,
            ({ mode: e }) => {
                let [n, a] = (0, i.useState)(''),
                    [d, u] = (0, i.useState)(null),
                    [c, p] = (0, i.useState)(!1),
                    f = (0, r.useRouter)(),
                    v = async (e) => {
                        ;(e.preventDefault(), p(!0), u(null))
                        try {
                            let e = await fetch('/api/session', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ password: n }),
                                }),
                                t = s.parse(await e.json())
                            if (!t.success) return void u(t.error.message)
                            ;(f.replace('/chats'), f.refresh())
                        } catch {
                            u('요청을 처리하지 못했습니다. API 서버 상태를 확인하세요')
                        } finally {
                            p(!1)
                        }
                    }
                return (0, t.jsxs)('form', {
                    onSubmit: v,
                    className: 'flex flex-col gap-3',
                    noValidate: !0,
                    children: [
                        (0, t.jsxs)('label', {
                            htmlFor: 'password',
                            className: 'text-xs text-muted-foreground',
                            children: ['패스워드 ', 'setup' === e ? '(최소 8자 — 이 값으로 초기 설정됩니다)' : ''],
                        }),
                        (0, t.jsx)(l.Input, {
                            id: 'password',
                            type: 'password',
                            value: n,
                            onChange: (e) => a(e.target.value),
                            autoComplete: 'setup' === e ? 'new-password' : 'current-password',
                            autoFocus: !0,
                            required: !0,
                        }),
                        d ? (0, t.jsx)('p', { className: 'text-xs text-destructive', children: d }) : null,
                        (0, t.jsx)(o.Button, { type: 'submit', disabled: c || 0 === n.length, children: 'setup' === e ? '초기 설정' : '로그인' }),
                    ],
                })
            },
        ])
    },
    98899,
    (e, t, r) => {
        t.exports = e.r(303)
    },
])
