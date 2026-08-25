;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    40350,
    (e) => {
        'use strict'
        var t = e.i(48607),
            s = e.i(83782),
            r = e.i(1718)
        e.s([
            'Input',
            0,
            function (e) {
                let i,
                    a,
                    n,
                    o,
                    l,
                    u = (0, s.c)(10)
                return (
                    u[0] !== e
                        ? (({ className: i, type: n, ...a } = e), (u[0] = e), (u[1] = i), (u[2] = a), (u[3] = n))
                        : ((i = u[1]), (a = u[2]), (n = u[3])),
                    u[4] !== i
                        ? ((o = (0, r.cn)(
                              'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
                              'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                              'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                              i,
                          )),
                          (u[4] = i),
                          (u[5] = o))
                        : (o = u[5]),
                    u[6] !== a || u[7] !== o || u[8] !== n
                        ? ((l = (0, t.jsx)('input', { type: n, 'data-slot': 'input', className: o, ...a })),
                          (u[6] = a),
                          (u[7] = o),
                          (u[8] = n),
                          (u[9] = l))
                        : (l = u[9]),
                    l
                )
            },
        ])
    },
    72234,
    (e) => {
        'use strict'
        var t = e.i(48607),
            s = e.i(98899),
            r = e.i(30216),
            i = e.i(68280),
            a = e.i(44659),
            n = e.i(40350)
        let o = i.z.union([
            i.z.object({ success: i.z.literal(!0) }),
            i.z.object({ success: i.z.literal(!1), error: i.z.object({ code: i.z.string(), message: i.z.string() }) }),
        ])
        e.s([
            'SetupForm',
            0,
            ({ mode: e }) => {
                let [i, l] = (0, r.useState)(''),
                    [u, d] = (0, r.useState)(null),
                    [c, p] = (0, r.useState)(!1),
                    b = (0, s.useRouter)(),
                    f = async (e) => {
                        ;(e.preventDefault(), p(!0), d(null))
                        try {
                            let e = await fetch('/api/session', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ password: i }),
                                }),
                                t = o.parse(await e.json())
                            if (!t.success) return void d(t.error.message)
                            ;(b.replace('/chats'), b.refresh())
                        } catch {
                            d('요청을 처리하지 못했습니다. API 서버 상태를 확인하세요')
                        } finally {
                            p(!1)
                        }
                    }
                return (0, t.jsxs)('form', {
                    onSubmit: f,
                    className: 'flex flex-col gap-3',
                    noValidate: !0,
                    children: [
                        (0, t.jsxs)('label', {
                            htmlFor: 'password',
                            className: 'text-xs text-muted-foreground',
                            children: ['패스워드 ', 'setup' === e ? '(최소 8자 — 이 값으로 초기 설정됩니다)' : ''],
                        }),
                        (0, t.jsx)(n.Input, {
                            id: 'password',
                            type: 'password',
                            value: i,
                            onChange: (e) => l(e.target.value),
                            autoComplete: 'setup' === e ? 'new-password' : 'current-password',
                            autoFocus: !0,
                            required: !0,
                        }),
                        u ? (0, t.jsx)('p', { className: 'text-xs text-destructive', children: u }) : null,
                        (0, t.jsx)(a.Button, { type: 'submit', disabled: c || 0 === i.length, children: 'setup' === e ? '초기 설정' : '로그인' }),
                    ],
                })
            },
        ])
    },
    98899,
    (e, t, s) => {
        t.exports = e.r(303)
    },
])
