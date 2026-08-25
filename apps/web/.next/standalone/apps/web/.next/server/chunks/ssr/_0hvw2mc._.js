module.exports = [
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
    86271,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(32802),
            d = a.i(77010),
            e = a.i(87432),
            f = a.i(57773),
            g = a.i(97789)
        let h = e.z.union([
            e.z.object({ success: e.z.literal(!0) }),
            e.z.object({ success: e.z.literal(!1), error: e.z.object({ code: e.z.string(), message: e.z.string() }) }),
        ])
        a.s([
            'SetupForm',
            0,
            ({ mode: a }) => {
                let [e, i] = (0, d.useState)(''),
                    [j, k] = (0, d.useState)(null),
                    [l, m] = (0, d.useState)(!1),
                    n = (0, c.useRouter)(),
                    o = async (a) => {
                        ;(a.preventDefault(), m(!0), k(null))
                        try {
                            let a = await fetch('/api/session', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ password: e }),
                                }),
                                b = h.parse(await a.json())
                            if (!b.success) return void k(b.error.message)
                            ;(n.replace('/chats'), n.refresh())
                        } catch {
                            k('요청을 처리하지 못했습니다. API 서버 상태를 확인하세요')
                        } finally {
                            m(!1)
                        }
                    }
                return (0, b.jsxs)('form', {
                    onSubmit: o,
                    className: 'flex flex-col gap-3',
                    noValidate: !0,
                    children: [
                        (0, b.jsxs)('label', {
                            htmlFor: 'password',
                            className: 'text-xs text-muted-foreground',
                            children: ['패스워드 ', 'setup' === a ? '(최소 8자 — 이 값으로 초기 설정됩니다)' : ''],
                        }),
                        (0, b.jsx)(g.Input, {
                            id: 'password',
                            type: 'password',
                            value: e,
                            onChange: (a) => i(a.target.value),
                            autoComplete: 'setup' === a ? 'new-password' : 'current-password',
                            autoFocus: !0,
                            required: !0,
                        }),
                        j ? (0, b.jsx)('p', { className: 'text-xs text-destructive', children: j }) : null,
                        (0, b.jsx)(f.Button, { type: 'submit', disabled: l || 0 === e.length, children: 'setup' === a ? '초기 설정' : '로그인' }),
                    ],
                })
            },
        ])
    },
    26755,
    (a, b, c) => {
        'use strict'
        Object.defineProperty(c, '__esModule', { value: !0 })
        var d = {
            actionAsyncStorage: function () {
                return f.actionAsyncStorage
            },
            workAsyncStorage: function () {
                return g.workAsyncStorage
            },
            workUnitAsyncStorage: function () {
                return h.workUnitAsyncStorage
            },
        }
        for (var e in d) Object.defineProperty(c, e, { enumerable: !0, get: d[e] })
        let f = a.r(20635),
            g = a.r(56704),
            h = a.r(32319)
        ;('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }), Object.assign(c.default, c), (b.exports = c.default))
    },
]

//# sourceMappingURL=_0hvw2mc._.js.map
