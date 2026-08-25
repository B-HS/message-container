;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    28802,
    (e) => {
        'use strict'
        var t = e.i(48607),
            r = e.i(83782),
            n = e.i(33698),
            a = e.i(98899),
            o = e.i(30216),
            i = e.i(82339)
        let s = (0, i.default)('log-out', [
                ['path', { d: 'm16 17 5-5-5-5', key: '1bji2h' }],
                ['path', { d: 'M21 12H9', key: 'dn1m92' }],
                ['path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', key: '1uf3rs' }],
            ]),
            l = (0, i.default)('messages-square', [
                [
                    'path',
                    {
                        d: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
                        key: '1n2ejm',
                    },
                ],
                [
                    'path',
                    { d: 'M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1', key: '1qfcsi' },
                ],
            ]),
            c = (0, i.default)('moon', [
                [
                    'path',
                    {
                        d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
                        key: 'kfwtm',
                    },
                ],
            ]),
            u = (0, i.default)('panel-left', [
                ['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' }],
                ['path', { d: 'M9 3v18', key: 'fh3hqa' }],
            ]),
            f = (0, i.default)('refresh-cw', [
                ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
                ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
                ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
                ['path', { d: 'M8 16H3v5', key: '1cv678' }],
            ]),
            d = (0, i.default)('search', [
                ['path', { d: 'm21 21-4.34-4.34', key: '14j7rj' }],
                ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
            ]),
            h = (0, i.default)('settings', [
                [
                    'path',
                    {
                        d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
                        key: '1i5ecw',
                    },
                ],
                ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
            ]),
            p = (0, i.default)('sun', [
                ['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
                ['path', { d: 'M12 2v2', key: 'tus03m' }],
                ['path', { d: 'M12 20v2', key: '1lh1kg' }],
                ['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
                ['path', { d: 'm17.66 17.66 1.41 1.41', key: 'ptbguv' }],
                ['path', { d: 'M2 12h2', key: '1t8f8n' }],
                ['path', { d: 'M20 12h2', key: '1q8mjw' }],
                ['path', { d: 'm6.34 17.66-1.41 1.41', key: '1m8zz5' }],
                ['path', { d: 'm19.07 4.93-1.41 1.41', key: '1shlcs' }],
            ])
        var m = e.i(76229),
            y = e.i(1718)
        let g = [
                { href: '/chats', label: '대화', icon: l },
                { href: '/messages', label: '메시지 검색', icon: d },
                { href: '/sync', label: '동기화', icon: f },
                { href: '/settings', label: '설정', icon: h },
            ],
            b = (e) => {
                let o,
                    i,
                    l,
                    u,
                    f,
                    d,
                    h,
                    b,
                    x,
                    v,
                    k,
                    j,
                    _ = (0, r.c)(24),
                    { onNavigate: N } = e,
                    w = (0, a.usePathname)(),
                    E = (0, a.useRouter)()
                _[0] !== E
                    ? ((o = async () => {
                          ;(await fetch('/api/session', { method: 'DELETE' }), E.replace('/setup'))
                      }),
                      (_[0] = E),
                      (_[1] = o))
                    : (o = _[1])
                let P = o,
                    { resolvedTheme: C, setTheme: S } = (0, m.useTheme)()
                return (
                    _[2] === Symbol.for('react.memo_cache_sentinel')
                        ? ((i = (0, t.jsx)('header', {
                              className: 'flex h-12 shrink-0 items-center px-3',
                              children: (0, t.jsx)('span', {
                                  className: 'truncate text-sm font-semibold tracking-tight',
                                  children: 'message-container',
                              }),
                          })),
                          (_[2] = i))
                        : (i = _[2]),
                    _[3] !== N || _[4] !== w
                        ? ((l = g.map((e) =>
                              (0, t.jsxs)(
                                  n.default,
                                  {
                                      href: e.href,
                                      onClick: N,
                                      'aria-current': w === e.href ? 'page' : void 0,
                                      className: (0, y.cn)(
                                          'flex h-9 shrink-0 items-center gap-3 rounded-none px-3 text-sm font-medium',
                                          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                          w === e.href && 'bg-sidebar-accent text-sidebar-accent-foreground',
                                      ),
                                      children: [
                                          (0, t.jsx)(e.icon, { className: 'size-4 shrink-0' }),
                                          (0, t.jsx)('span', { className: 'truncate', children: e.label }),
                                      ],
                                  },
                                  e.href,
                              ),
                          )),
                          (_[3] = N),
                          (_[4] = w),
                          (_[5] = l))
                        : (l = _[5]),
                    _[6] !== l
                        ? ((u = (0, t.jsx)('nav', { className: 'flex min-h-0 flex-1 flex-col overflow-y-auto', children: l })),
                          (_[6] = l),
                          (_[7] = u))
                        : (u = _[7]),
                    _[8] !== C || _[9] !== S ? ((f = () => S('dark' === C ? 'light' : 'dark')), (_[8] = C), (_[9] = S), (_[10] = f)) : (f = _[10]),
                    _[11] === Symbol.for('react.memo_cache_sentinel')
                        ? ((d = (0, t.jsx)(p, { className: 'size-4 dark:hidden' })),
                          (h = (0, t.jsx)(c, { className: 'hidden size-4 dark:block' })),
                          (_[11] = d),
                          (_[12] = h))
                        : ((d = _[11]), (h = _[12])),
                    _[13] !== f
                        ? ((b = (0, t.jsxs)('button', {
                              type: 'button',
                              'aria-label': '테마 전환',
                              onClick: f,
                              className: 'flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                              children: [d, h],
                          })),
                          (_[13] = f),
                          (_[14] = b))
                        : (b = _[14]),
                    _[15] === Symbol.for('react.memo_cache_sentinel') ? ((x = (0, t.jsx)(s, { className: 'size-4' })), (_[15] = x)) : (x = _[15]),
                    _[16] !== P
                        ? ((v = (0, t.jsx)('button', {
                              type: 'button',
                              'aria-label': '로그아웃',
                              onClick: P,
                              className: 'flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                              children: x,
                          })),
                          (_[16] = P),
                          (_[17] = v))
                        : (v = _[17]),
                    _[18] !== v || _[19] !== b
                        ? ((k = (0, t.jsxs)('footer', { className: 'flex h-12 shrink-0 items-center justify-end gap-1 px-3', children: [b, v] })),
                          (_[18] = v),
                          (_[19] = b),
                          (_[20] = k))
                        : (k = _[20]),
                    _[21] !== k || _[22] !== u
                        ? ((j = (0, t.jsxs)(t.Fragment, { children: [i, u, k] })), (_[21] = k), (_[22] = u), (_[23] = j))
                        : (j = _[23]),
                    j
                )
            }
        e.s(
            [
                'Rail',
                0,
                () => {
                    let e,
                        n,
                        a,
                        i,
                        s,
                        l,
                        c,
                        f,
                        d,
                        h,
                        p = (0, r.c)(16),
                        [m, y] = (0, o.useState)(!1)
                    return (
                        p[0] !== m
                            ? ((e = () => {
                                  if (!m) return
                                  let e = (e) => {
                                      'Escape' === e.key && y(!1)
                                  }
                                  return (window.addEventListener('keydown', e), () => window.removeEventListener('keydown', e))
                              }),
                              (n = [m]),
                              (p[0] = m),
                              (p[1] = e),
                              (p[2] = n))
                            : ((e = p[1]), (n = p[2])),
                        (0, o.useEffect)(e, n),
                        p[3] === Symbol.for('react.memo_cache_sentinel')
                            ? ((a = (0, t.jsx)('aside', {
                                  className: 'fixed inset-y-0 left-0 z-10 hidden w-64 flex-col bg-sidebar text-sidebar-foreground md:flex',
                                  children: (0, t.jsx)(b, {}),
                              })),
                              (p[3] = a))
                            : (a = p[3]),
                        p[4] === Symbol.for('react.memo_cache_sentinel') ? ((i = () => y(!0)), (p[4] = i)) : (i = p[4]),
                        p[5] === Symbol.for('react.memo_cache_sentinel') ? ((s = (0, t.jsx)(u, { className: 'size-4' })), (p[5] = s)) : (s = p[5]),
                        p[6] !== m
                            ? ((l = (0, t.jsx)('button', {
                                  type: 'button',
                                  'aria-label': '내비게이션 열기',
                                  'aria-expanded': m,
                                  onClick: i,
                                  className: 'flex size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                  children: s,
                              })),
                              (p[6] = m),
                              (p[7] = l))
                            : (l = p[7]),
                        p[8] === Symbol.for('react.memo_cache_sentinel')
                            ? ((c = (0, t.jsx)('span', {
                                  className: 'truncate text-sm font-semibold tracking-tight',
                                  children: 'message-container',
                              })),
                              (p[8] = c))
                            : (c = p[8]),
                        p[9] !== l
                            ? ((f = (0, t.jsxs)('div', {
                                  className:
                                      'fixed inset-x-0 top-0 z-10 flex h-12 items-center gap-2 bg-sidebar px-3 text-sidebar-foreground md:hidden',
                                  children: [l, c],
                              })),
                              (p[9] = l),
                              (p[10] = f))
                            : (f = p[10]),
                        p[11] !== m
                            ? ((d = m
                                  ? (0, t.jsxs)('div', {
                                        className: 'fixed inset-0 z-50 md:hidden',
                                        children: [
                                            (0, t.jsx)('button', {
                                                type: 'button',
                                                'aria-label': '내비게이션 닫기',
                                                className: 'absolute inset-0',
                                                style: { background: 'oklch(0 0 0 / 50%)' },
                                                onClick: () => y(!1),
                                            }),
                                            (0, t.jsx)('aside', {
                                                className: 'absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar text-sidebar-foreground',
                                                children: (0, t.jsx)(b, { onNavigate: () => y(!1) }),
                                            }),
                                        ],
                                    })
                                  : null),
                              (p[11] = m),
                              (p[12] = d))
                            : (d = p[12]),
                        p[13] !== f || p[14] !== d
                            ? ((h = (0, t.jsxs)(t.Fragment, { children: [a, f, d] })), (p[13] = f), (p[14] = d), (p[15] = h))
                            : (h = p[15]),
                        h
                    )
                },
            ],
            28802,
        )
    },
    82339,
    (e) => {
        'use strict'
        var t = e.i(30216)
        let r = (...e) =>
                e
                    .filter((e, t, r) => !!e && '' !== e.trim() && r.indexOf(e) === t)
                    .join(' ')
                    .trim(),
            n = (e) => {
                let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) => (r ? r.toUpperCase() : t.toLowerCase()))
                return t.charAt(0).toUpperCase() + t.slice(1)
            }
        var a = {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        }
        let o = (0, t.createContext)({}),
            i = (0, t.forwardRef)(
                ({ color: e, size: n, strokeWidth: i, absoluteStrokeWidth: s, className: l = '', children: c, iconNode: u, ...f }, d) => {
                    let {
                            size: h = 24,
                            strokeWidth: p = 2,
                            absoluteStrokeWidth: m = !1,
                            color: y = 'currentColor',
                            className: g = '',
                        } = (0, t.useContext)(o) ?? {},
                        b = (s ?? m) ? (24 * Number(i ?? p)) / Number(n ?? h) : (i ?? p)
                    return (0, t.createElement)(
                        'svg',
                        {
                            ref: d,
                            ...a,
                            width: n ?? h ?? a.width,
                            height: n ?? h ?? a.height,
                            stroke: e ?? y,
                            strokeWidth: b,
                            className: r('lucide', g, l),
                            ...(!c &&
                                !((e) => {
                                    for (let t in e) if (t.startsWith('aria-') || 'role' === t || 'title' === t) return !0
                                    return !1
                                })(f) && { 'aria-hidden': 'true' }),
                            ...f,
                        },
                        [...u.map(([e, r]) => (0, t.createElement)(e, r)), ...(Array.isArray(c) ? c : [c])],
                    )
                },
            )
        e.s(
            [
                'default',
                0,
                (e, a) => {
                    let o = (0, t.forwardRef)(({ className: o, ...s }, l) =>
                        (0, t.createElement)(i, {
                            ref: l,
                            iconNode: a,
                            className: r(
                                `lucide-${n(e)
                                    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                                    .toLowerCase()}`,
                                `lucide-${e}`,
                                o,
                            ),
                            ...s,
                        }),
                    )
                    return ((o.displayName = n(e)), o)
                },
            ],
            82339,
        )
    },
    33698,
    (e, t, r) => {
        'use strict'
        ;(e.i(5058), Object.defineProperty(r, '__esModule', { value: !0 }))
        var n = {
            default: function () {
                return g
            },
            useLinkStatus: function () {
                return x
            },
        }
        for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] })
        let o = e.r(88802),
            i = e.r(48607),
            s = o._(e.r(30216)),
            l = e.r(8298),
            c = e.r(35538),
            u = e.r(23496),
            f = e.r(16125),
            d = e.r(10329),
            h = e.r(99930),
            p = e.r(86557),
            m = e.r(5147),
            y = e.r(89392)
        function g(t) {
            var r
            let n,
                a,
                o,
                [g, x] = (0, s.useOptimistic)(p.IDLE_LINK_STATUS),
                v = (0, s.useRef)(null),
                {
                    href: k,
                    as: j,
                    children: _,
                    prefetch: N = null,
                    passHref: w,
                    replace: E,
                    shallow: P,
                    scroll: C,
                    onClick: S,
                    onMouseEnter: O,
                    onTouchStart: M,
                    legacyBehavior: T = !1,
                    onNavigate: L,
                    transitionTypes: R,
                    ref: A,
                    unstable_dynamicOnHover: z,
                    ...$
                } = t
            ;((n = _), T && ('string' == typeof n || 'number' == typeof n) && (n = (0, i.jsx)('a', { children: n })))
            let U = s.default.useContext(c.AppRouterContext),
                I = !1 !== N,
                F = !1 === N ? 'none' : !0 === N ? 'full' : 'auto',
                B = 'none' !== F ? ('auto' === F ? y.FetchStrategy.PPR : y.FetchStrategy.Full) : y.FetchStrategy.PPR,
                D = 'string' == typeof (r = j || k) ? r : (0, l.formatUrl)(r)
            if (T) {
                if (n?.$$typeof === Symbol.for('react.lazy'))
                    throw Object.defineProperty(
                        Error(
                            "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag.",
                        ),
                        '__NEXT_ERROR_CODE',
                        { value: 'E863', enumerable: !1, configurable: !0 },
                    )
                a = s.default.Children.only(n)
            }
            let K = T ? a && 'object' == typeof a && a.ref : A,
                W,
                q = s.default.useCallback(
                    (e) => (
                        null !== U && (v.current = (0, p.mountLinkInstance)(e, D, U, B, I, x, W)),
                        () => {
                            ;(v.current && ((0, p.unmountLinkForCurrentNavigation)(v.current), (v.current = null)),
                                (0, p.unmountPrefetchableInstance)(e))
                        }
                    ),
                    [I, D, U, B, x, W],
                ),
                H = {
                    ref: (0, u.useMergedRef)(q, K),
                    onClick(t) {
                        ;(T || 'function' != typeof S || S(t),
                            T && a.props && 'function' == typeof a.props.onClick && a.props.onClick(t),
                            !U ||
                                t.defaultPrevented ||
                                (function (t, r, n, a, o, i, l, c = 'none') {
                                    if ('u' > typeof window) {
                                        let u,
                                            { nodeName: f } = t.currentTarget
                                        if (
                                            ('A' === f.toUpperCase() &&
                                                (((u = t.currentTarget.getAttribute('target')) && '_self' !== u) ||
                                                    t.metaKey ||
                                                    t.ctrlKey ||
                                                    t.shiftKey ||
                                                    t.altKey ||
                                                    (t.nativeEvent && 2 === t.nativeEvent.which))) ||
                                            t.currentTarget.hasAttribute('download')
                                        )
                                            return
                                        if (!(0, m.isLocalURL)(r)) {
                                            a && (t.preventDefault(), location.replace(r))
                                            return
                                        }
                                        if ((t.preventDefault(), i)) {
                                            let e = !1
                                            if (
                                                (i({
                                                    preventDefault: () => {
                                                        e = !0
                                                    },
                                                }),
                                                e)
                                            )
                                                return
                                        }
                                        let { dispatchNavigateAction: d } = e.r(90930)
                                        s.default.startTransition(() => {
                                            d(
                                                r,
                                                a ? 'replace' : 'push',
                                                !1 === o ? h.ScrollBehavior.NoScroll : h.ScrollBehavior.Default,
                                                n.current,
                                                l,
                                                c,
                                            )
                                        })
                                    }
                                })(t, D, v, E, C, L, R, F))
                    },
                    onMouseEnter(e) {
                        ;(T || 'function' != typeof O || O(e),
                            T && a.props && 'function' == typeof a.props.onMouseEnter && a.props.onMouseEnter(e),
                            U && I && (0, p.onNavigationIntent)(e.currentTarget, !0 === z))
                    },
                    onTouchStart: function (e) {
                        ;(T || 'function' != typeof M || M(e),
                            T && a.props && 'function' == typeof a.props.onTouchStart && a.props.onTouchStart(e),
                            U && I && (0, p.onNavigationIntent)(e.currentTarget, !0 === z))
                    },
                }
            return (
                (0, f.isAbsoluteUrl)(D) ? (H.href = D) : (T && !w && ('a' !== a.type || 'href' in a.props)) || (H.href = (0, d.addBasePath)(D)),
                (o = T ? s.default.cloneElement(a, H) : (0, i.jsx)('a', { ...$, ...H, children: n })),
                (0, i.jsx)(b.Provider, { value: g, children: o })
            )
        }
        let b = (0, s.createContext)(p.IDLE_LINK_STATUS),
            x = () => (0, s.useContext)(b)
        ;('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
            void 0 === r.default.__esModule &&
            (Object.defineProperty(r.default, '__esModule', { value: !0 }), Object.assign(r.default, r), (t.exports = r.default))
    },
    23496,
    (e, t, r) => {
        'use strict'
        ;(Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'useMergedRef', {
                enumerable: !0,
                get: function () {
                    return a
                },
            }))
        let n = e.r(30216)
        function a(e, t) {
            let r = (0, n.useRef)(null),
                a = (0, n.useRef)(null)
            return (0, n.useCallback)(
                (n) => {
                    if (null === n) {
                        let e = r.current
                        e && ((r.current = null), e())
                        let t = a.current
                        t && ((a.current = null), t())
                    } else (e && (r.current = o(e, n)), t && (a.current = o(t, n)))
                },
                [e, t],
            )
        }
        function o(e, t) {
            if ('function' != typeof e)
                return (
                    (e.current = t),
                    () => {
                        e.current = null
                    }
                )
            {
                let r = e(t)
                return 'function' == typeof r ? r : () => e(null)
            }
        }
        ;('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
            void 0 === r.default.__esModule &&
            (Object.defineProperty(r.default, '__esModule', { value: !0 }), Object.assign(r.default, r), (t.exports = r.default))
    },
    16125,
    (e, t, r) => {
        'use strict'
        ;(e.i(5058), Object.defineProperty(r, '__esModule', { value: !0 }))
        var n = {
            DecodeError: function () {
                return g
            },
            MiddlewareNotFoundError: function () {
                return k
            },
            MissingStaticPage: function () {
                return v
            },
            NormalizeError: function () {
                return b
            },
            PageNotFoundError: function () {
                return x
            },
            SP: function () {
                return m
            },
            ST: function () {
                return y
            },
            WEB_VITALS: function () {
                return o
            },
            execOnce: function () {
                return i
            },
            getDisplayName: function () {
                return f
            },
            getLocationOrigin: function () {
                return c
            },
            getURL: function () {
                return u
            },
            isAbsoluteUrl: function () {
                return l
            },
            isResSent: function () {
                return d
            },
            loadGetInitialProps: function () {
                return p
            },
            normalizeRepeatedSlashes: function () {
                return h
            },
            stringifyError: function () {
                return j
            },
        }
        for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] })
        let o = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']
        function i(e) {
            let t,
                r = !1
            return (...n) => (r || ((r = !0), (t = e(...n))), t)
        }
        let s = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
            l = (e) => {
                let t = e.charCodeAt(0)
                return !!((t >= 65 && t <= 90) || (t >= 97 && t <= 122)) && s.test(e)
            }
        function c() {
            let { protocol: e, hostname: t, port: r } = window.location
            return `${e}//${t}${r ? ':' + r : ''}`
        }
        function u() {
            let { href: e } = window.location,
                t = c()
            return e.substring(t.length)
        }
        function f(e) {
            return 'string' == typeof e ? e : e.displayName || e.name || 'Unknown'
        }
        function d(e) {
            return e.finished || e.headersSent
        }
        function h(e) {
            let t = e.split('?')
            return t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') + (t[1] ? `?${t.slice(1).join('?')}` : '')
        }
        async function p(e, t) {
            let r = t.res || (t.ctx && t.ctx.res)
            if (!e.getInitialProps) return t.ctx && t.Component ? { pageProps: await p(t.Component, t.ctx) } : {}
            let n = await e.getInitialProps(t)
            if (r && d(r)) return n
            if (!n)
                throw Object.defineProperty(
                    Error(`"${f(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),
                    '__NEXT_ERROR_CODE',
                    { value: 'E1025', enumerable: !1, configurable: !0 },
                )
            return n
        }
        let m = 'u' > typeof performance,
            y = m && ['mark', 'measure', 'getEntriesByName'].every((e) => 'function' == typeof performance[e])
        class g extends Error {}
        class b extends Error {}
        class x extends Error {
            constructor(e) {
                ;(super(), (this.code = 'ENOENT'), (this.name = 'PageNotFoundError'), (this.message = `Cannot find module for page: ${e}`))
            }
        }
        class v extends Error {
            constructor(e, t) {
                ;(super(), (this.message = `Failed to load static file for page: ${e} ${t}`))
            }
        }
        class k extends Error {
            constructor() {
                ;(super(), (this.code = 'ENOENT'), (this.message = 'Cannot find the middleware module'))
            }
        }
        function j(e) {
            return JSON.stringify({ message: e.message, stack: e.stack })
        }
    },
    5147,
    (e, t, r) => {
        'use strict'
        ;(Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'isLocalURL', {
                enumerable: !0,
                get: function () {
                    return o
                },
            }))
        let n = e.r(16125),
            a = e.r(40450)
        function o(e) {
            if (!(0, n.isAbsoluteUrl)(e)) return !0
            try {
                let t = (0, n.getLocationOrigin)(),
                    r = new URL(e, t)
                return r.origin === t && (0, a.hasBasePath)(r.pathname)
            } catch (e) {
                return !1
            }
        }
    },
    1283,
    (e, t, r) => {
        'use strict'
        Object.defineProperty(r, '__esModule', { value: !0 })
        var n = {
            assign: function () {
                return l
            },
            searchParamsToUrlQuery: function () {
                return o
            },
            urlQueryToSearchParams: function () {
                return s
            },
        }
        for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] })
        function o(e) {
            let t = {}
            for (let [r, n] of e.entries()) {
                let e = t[r]
                void 0 === e ? (t[r] = n) : Array.isArray(e) ? e.push(n) : (t[r] = [e, n])
            }
            return t
        }
        function i(e) {
            return 'string' == typeof e ? e : ('number' != typeof e || isNaN(e)) && 'boolean' != typeof e ? '' : String(e)
        }
        function s(e) {
            let t = new URLSearchParams()
            for (let [r, n] of Object.entries(e))
                if (Array.isArray(n)) for (let e of n) t.append(r, i(e))
                else t.set(r, i(n))
            return t
        }
        function l(e, ...t) {
            for (let r of t) {
                for (let t of r.keys()) e.delete(t)
                for (let [t, n] of r.entries()) e.append(t, n)
            }
            return e
        }
    },
    8298,
    (e, t, r) => {
        'use strict'
        ;(e.i(5058), Object.defineProperty(r, '__esModule', { value: !0 }))
        var n = {
            formatUrl: function () {
                return s
            },
            formatWithValidation: function () {
                return c
            },
            urlObjectKeys: function () {
                return l
            },
        }
        for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] })
        let o = e.r(88802)._(e.r(1283)),
            i = /https?|ftp|gopher|file/
        function s(e) {
            let { auth: t, hostname: r } = e,
                n = e.protocol || '',
                a = e.pathname || '',
                s = e.hash || '',
                l = e.query || '',
                c = !1
            ;((t = t ? encodeURIComponent(t).replace(/%3A/i, ':') + '@' : ''),
                e.host ? (c = t + e.host) : r && ((c = t + (~r.indexOf(':') ? `[${r}]` : r)), e.port && (c += ':' + e.port)),
                l && 'object' == typeof l && (l = String(o.urlQueryToSearchParams(l))))
            let u = e.search || (l && `?${l}`) || ''
            return (
                n && !n.endsWith(':') && (n += ':'),
                e.slashes || ((!n || i.test(n)) && !1 !== c) ? ((c = '//' + (c || '')), a && '/' !== a[0] && (a = '/' + a)) : c || (c = ''),
                s && '#' !== s[0] && (s = '#' + s),
                u && '?' !== u[0] && (u = '?' + u),
                (a = a.replace(/[?#]/g, encodeURIComponent)),
                (u = u.replace('#', '%23')),
                `${n}${c}${a}${u}${s}`
            )
        }
        let l = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes']
        function c(e) {
            return s(e)
        }
    },
    98899,
    (e, t, r) => {
        t.exports = e.r(303)
    },
])
