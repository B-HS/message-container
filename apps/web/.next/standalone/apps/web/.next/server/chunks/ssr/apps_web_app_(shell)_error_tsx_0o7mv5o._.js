module.exports = [
    87079,
    (a) => {
        'use strict'
        a.s(['default', () => b])
        let b = (0, a.i(22227).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/apps/web/app/(shell)/error.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
                )
            },
            '[project]/apps/web/app/(shell)/error.tsx',
            'default',
        )
    },
    80789,
    (a) => {
        'use strict'
        var b = a.i(87079)
        a.n(b)
    },
    75167,
    function (a) {
        a.n(a.i(80789))
    },
]

//# sourceMappingURL=apps_web_app_%28shell%29_error_tsx_0o7mv5o._.js.map
