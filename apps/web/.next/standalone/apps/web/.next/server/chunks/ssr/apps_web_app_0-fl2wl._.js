module.exports = [
    92221,
    (a) => {
        'use strict'
        a.s(['AppProviders', () => b])
        let b = (0, a.i(22227).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call AppProviders() from the server but AppProviders is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                )
            },
            '[project]/apps/web/app/providers.tsx',
            'AppProviders',
        )
    },
    57752,
    (a) => {
        'use strict'
        var b = a.i(92221)
        a.n(b)
    },
    28992,
    (a) => {
        'use strict'
        var b = a.i(88870),
            c = a.i(57752)
        a.s([
            'default',
            0,
            ({ children: a }) =>
                (0, b.jsx)('html', {
                    lang: 'ko',
                    suppressHydrationWarning: !0,
                    children: (0, b.jsx)('body', { children: (0, b.jsx)(c.AppProviders, { children: a }) }),
                }),
            'metadata',
            0,
            { title: 'message-container', description: 'macOS Messages 조회 대시보드' },
        ])
    },
    44665,
    function (a) {
        a.n(a.i(28992))
    },
]

//# sourceMappingURL=apps_web_app_0-fl2wl._.js.map
