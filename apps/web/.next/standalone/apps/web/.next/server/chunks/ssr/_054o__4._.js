module.exports = [
    36545,
    (a) => {
        'use strict'
        var b = a.i(90329),
            c = a.i(97355),
            d = a.i(80998),
            e = a.i(88801),
            f = a.i(34877),
            g = a.i(57141),
            h = a.i(48890),
            i = class extends g.Subscribable {
                #a
                #b
                #c
                constructor(a = {}) {
                    ;(super(), (this.config = a), (this.#a = new Set()), (this.#b = new Map()), (this.#c = 0))
                }
                build(a, b, c) {
                    let d = new h.Mutation({ client: a, mutationCache: this, mutationId: ++this.#c, options: a.defaultMutationOptions(b), state: c })
                    return (this.add(d), d)
                }
                add(a) {
                    this.#a.add(a)
                    let b = j(a)
                    if ('string' == typeof b) {
                        let c = this.#b.get(b)
                        c ? c.push(a) : this.#b.set(b, [a])
                    }
                    this.notify({ type: 'added', mutation: a })
                }
                remove(a) {
                    if (this.#a.delete(a)) {
                        let b = j(a)
                        if ('string' == typeof b) {
                            let c = this.#b.get(b)
                            if (c)
                                if (c.length > 1) {
                                    let b = c.indexOf(a)
                                    ;-1 !== b && c.splice(b, 1)
                                } else c[0] === a && this.#b.delete(b)
                        }
                    }
                    this.notify({ type: 'removed', mutation: a })
                }
                canRun(a) {
                    let b = j(a)
                    if ('string' != typeof b) return !0
                    {
                        let c = this.#b.get(b)?.find((a) => 'pending' === a.state.status)
                        return !c || c === a
                    }
                }
                runNext(a) {
                    let b = j(a)
                    return 'string' == typeof b
                        ? (this.#b
                              .get(b)
                              ?.find((b) => b !== a && b.state.isPaused)
                              ?.continue() ?? Promise.resolve())
                        : Promise.resolve()
                }
                clear() {
                    e.notifyManager.batch(() => {
                        ;(this.#a.forEach((a) => {
                            this.notify({ type: 'removed', mutation: a })
                        }),
                            this.#a.clear(),
                            this.#b.clear())
                    })
                }
                getAll() {
                    return Array.from(this.#a)
                }
                find(a) {
                    let b = { exact: !0, ...a }
                    return this.getAll().find((a) => (0, c.matchMutation)(b, a))
                }
                findAll(a = {}) {
                    return this.getAll().filter((b) => (0, c.matchMutation)(a, b))
                }
                notify(a) {
                    e.notifyManager.batch(() => {
                        this.listeners.forEach((b) => {
                            b(a)
                        })
                    })
                }
                resumePausedMutations() {
                    let a = this.getAll().filter((a) => a.state.isPaused)
                    return e.notifyManager.batch(() => Promise.all(a.map((a) => a.continue().catch(c.noop))))
                }
            }
        function j(a) {
            return a.options.scope?.id
        }
        var k = g,
            l = a.i(7711),
            m = class extends k.Subscribable {
                #d
                constructor(a = {}) {
                    ;(super(), (this.config = a), (this.#d = new Map()))
                }
                build(a, b, d) {
                    let e = b.queryKey,
                        f = b.queryHash ?? (0, c.hashQueryKeyByOptions)(e, b),
                        g = this.get(f)
                    return (
                        g ||
                            ((g = new l.Query({
                                client: a,
                                queryKey: e,
                                queryHash: f,
                                options: a.defaultQueryOptions(b),
                                state: d,
                                defaultOptions: a.getQueryDefaults(e),
                            })),
                            this.add(g)),
                        g
                    )
                }
                add(a) {
                    this.#d.has(a.queryHash) || (this.#d.set(a.queryHash, a), this.notify({ type: 'added', query: a }))
                }
                remove(a) {
                    let b = this.#d.get(a.queryHash)
                    b && (a.destroy(), b === a && this.#d.delete(a.queryHash), this.notify({ type: 'removed', query: a }))
                }
                clear() {
                    e.notifyManager.batch(() => {
                        this.getAll().forEach((a) => {
                            this.remove(a)
                        })
                    })
                }
                get(a) {
                    return this.#d.get(a)
                }
                getAll() {
                    return [...this.#d.values()]
                }
                find(a) {
                    let b = { exact: !0, ...a }
                    return this.getAll().find((a) => (0, c.matchQuery)(b, a))
                }
                findAll(a = {}) {
                    let b = this.getAll()
                    return Object.keys(a).length > 0 ? b.filter((b) => (0, c.matchQuery)(a, b)) : b
                }
                notify(a) {
                    e.notifyManager.batch(() => {
                        this.listeners.forEach((b) => {
                            b(a)
                        })
                    })
                }
                onFocus() {
                    e.notifyManager.batch(() => {
                        this.getAll().forEach((a) => {
                            a.onFocus()
                        })
                    })
                }
                onOnline() {
                    e.notifyManager.batch(() => {
                        this.getAll().forEach((a) => {
                            a.onOnline()
                        })
                    })
                }
            },
            n = class {
                #e
                #f
                #g
                #h
                #i
                #j
                #k
                #l
                constructor(a = {}) {
                    ;((this.#e = a.queryCache || new m()),
                        (this.#f = a.mutationCache || new i()),
                        (this.#g = a.defaultOptions || {}),
                        (this.#h = new Map()),
                        (this.#i = new Map()),
                        (this.#j = 0))
                }
                mount() {
                    ;(this.#j++,
                        1 === this.#j &&
                            ((this.#k = d.focusManager.subscribe(async (a) => {
                                a && (await this.resumePausedMutations(), this.#e.onFocus())
                            })),
                            (this.#l = f.onlineManager.subscribe(async (a) => {
                                a && (await this.resumePausedMutations(), this.#e.onOnline())
                            }))))
                }
                unmount() {
                    ;(this.#j--, 0 === this.#j && (this.#k?.(), (this.#k = void 0), this.#l?.(), (this.#l = void 0)))
                }
                isFetching(a) {
                    return this.#e.findAll({ ...a, fetchStatus: 'fetching' }).length
                }
                isMutating(a) {
                    return this.#f.findAll({ ...a, status: 'pending' }).length
                }
                getQueryData(a) {
                    let b = this.defaultQueryOptions({ queryKey: a })
                    return this.#e.get(b.queryHash)?.state.data
                }
                ensureQueryData(a) {
                    let b = this.defaultQueryOptions(a),
                        d = this.#e.build(this, b),
                        e = d.state.data
                    return void 0 === e
                        ? this.fetchQuery(a)
                        : (a.revalidateIfStale && d.isStaleByTime((0, c.resolveStaleTime)(b.staleTime, d)) && this.prefetchQuery(b),
                          Promise.resolve(e))
                }
                getQueriesData(a) {
                    return this.#e.findAll(a).map(({ queryKey: a, state: b }) => [a, b.data])
                }
                setQueryData(a, b, d) {
                    let e = this.defaultQueryOptions({ queryKey: a }),
                        f = this.#e.get(e.queryHash)?.state.data,
                        g = (0, c.functionalUpdate)(b, f)
                    if (void 0 !== g) return this.#e.build(this, e).setData(g, { ...d, manual: !0 })
                }
                setQueriesData(a, b, c) {
                    return e.notifyManager.batch(() => this.#e.findAll(a).map(({ queryKey: a }) => [a, this.setQueryData(a, b, c)]))
                }
                getQueryState(a) {
                    let b = this.defaultQueryOptions({ queryKey: a })
                    return this.#e.get(b.queryHash)?.state
                }
                removeQueries(a) {
                    let b = this.#e
                    e.notifyManager.batch(() => {
                        b.findAll(a).forEach((a) => {
                            b.remove(a)
                        })
                    })
                }
                resetQueries(a, b) {
                    let c = this.#e
                    return e.notifyManager.batch(() => {
                        let d = c.findAll(a),
                            e = new Set(d)
                        return (
                            d.forEach((a) => {
                                a.reset()
                            }),
                            this.refetchQueries({ type: 'active', predicate: (a) => e.has(a) }, b)
                        )
                    })
                }
                cancelQueries(a, b = {}) {
                    let d = { revert: !0, ...b }
                    return Promise.all(e.notifyManager.batch(() => this.#e.findAll(a).map((a) => a.cancel(d))))
                        .then(c.noop)
                        .catch(c.noop)
                }
                invalidateQueries(a, b = {}) {
                    return e.notifyManager.batch(() =>
                        (this.#e.findAll(a).forEach((a) => {
                            a.invalidate()
                        }),
                        a?.refetchType === 'none')
                            ? Promise.resolve()
                            : this.refetchQueries({ ...a, type: a?.refetchType ?? a?.type ?? 'active' }, b),
                    )
                }
                refetchQueries(a, b = {}) {
                    let d = { ...b, cancelRefetch: b.cancelRefetch ?? !0 }
                    return Promise.all(
                        e.notifyManager.batch(() =>
                            this.#e
                                .findAll(a)
                                .filter((a) => !a.isDisabled() && !a.isStatic())
                                .map((a) => {
                                    let b = a.fetch(void 0, d)
                                    return (d.throwOnError || (b = b.catch(c.noop)), 'paused' === a.state.fetchStatus ? Promise.resolve() : b)
                                }),
                        ),
                    ).then(c.noop)
                }
                async query(a) {
                    let b = this.defaultQueryOptions(a)
                    void 0 === b.retry && (b.retry = !1)
                    let d = this.#e.build(this, b),
                        e = d.isStaleByTime((0, c.resolveStaleTime)(b.staleTime, d)) ? await d.fetch(b) : d.state.data,
                        f = b.select
                    return f ? f(e) : e
                }
                fetchQuery(a) {
                    let b = this.defaultQueryOptions(a)
                    void 0 === b.retry && (b.retry = !1)
                    let d = this.#e.build(this, b)
                    return d.isStaleByTime((0, c.resolveStaleTime)(b.staleTime, d)) ? d.fetch(b) : Promise.resolve(d.state.data)
                }
                prefetchQuery(a) {
                    return this.fetchQuery(a).then(c.noop).catch(c.noop)
                }
                infiniteQuery(a) {
                    return ((a._type = 'infinite'), this.query(a))
                }
                fetchInfiniteQuery(a) {
                    return ((a._type = 'infinite'), this.fetchQuery(a))
                }
                prefetchInfiniteQuery(a) {
                    return this.fetchInfiniteQuery(a).then(c.noop).catch(c.noop)
                }
                ensureInfiniteQueryData(a) {
                    return ((a._type = 'infinite'), this.ensureQueryData(a))
                }
                resumePausedMutations() {
                    return f.onlineManager.isOnline() ? this.#f.resumePausedMutations() : Promise.resolve()
                }
                getQueryCache() {
                    return this.#e
                }
                getMutationCache() {
                    return this.#f
                }
                getDefaultOptions() {
                    return this.#g
                }
                setDefaultOptions(a) {
                    this.#g = a
                }
                setQueryDefaults(a, b) {
                    this.#h.set((0, c.hashKey)(a), { queryKey: a, defaultOptions: b })
                }
                getQueryDefaults(a) {
                    let b = [...this.#h.values()],
                        d = {}
                    return (
                        b.forEach((b) => {
                            ;(0, c.partialMatchKey)(a, b.queryKey) && Object.assign(d, b.defaultOptions)
                        }),
                        d
                    )
                }
                setMutationDefaults(a, b) {
                    this.#i.set((0, c.hashKey)(a), { mutationKey: a, defaultOptions: b })
                }
                getMutationDefaults(a) {
                    let b = [...this.#i.values()],
                        d = {}
                    return (
                        b.forEach((b) => {
                            ;(0, c.partialMatchKey)(a, b.mutationKey) && Object.assign(d, b.defaultOptions)
                        }),
                        d
                    )
                }
                defaultQueryOptions(a) {
                    if (a._defaulted) return a
                    let b = { ...this.#g.queries, ...this.getQueryDefaults(a.queryKey), ...a, _defaulted: !0 }
                    return (
                        b.queryHash || (b.queryHash = (0, c.hashQueryKeyByOptions)(b.queryKey, b)),
                        void 0 === b.refetchOnReconnect && (b.refetchOnReconnect = 'always' !== b.networkMode),
                        void 0 === b.throwOnError && (b.throwOnError = !!b.suspense),
                        !b.networkMode && b.persister && (b.networkMode = 'offlineFirst'),
                        b.queryFn === c.skipToken && (b.enabled = !1),
                        b
                    )
                }
                defaultMutationOptions(a) {
                    return a?._defaulted
                        ? a
                        : { ...this.#g.mutations, ...(a?.mutationKey && this.getMutationDefaults(a.mutationKey)), ...a, _defaulted: !0 }
                }
                clear() {
                    ;(this.#e.clear(), this.#f.clear())
                }
            },
            o = a.i(31894),
            p = a.i(28396)
        a.s(
            [
                'AppProviders',
                0,
                ({ children: a }) => {
                    let c = new n({ defaultOptions: { queries: { staleTime: 6e4 } } })
                    return (0, b.jsx)(p.ThemeProvider, {
                        attribute: 'class',
                        defaultTheme: 'light',
                        enableSystem: !1,
                        disableTransitionOnChange: !0,
                        children: (0, b.jsx)(o.QueryClientProvider, { client: c, children: a }),
                    })
                },
            ],
            36545,
        )
    },
    48890,
    (a) => {
        'use strict'
        var b = a.i(88801),
            c = a.i(71674),
            d = a.i(26644),
            e = class extends d.Removable {
                #m
                #n
                #f
                #o
                constructor(a) {
                    ;(super(),
                        (this.#m = a.client),
                        (this.mutationId = a.mutationId),
                        (this.#f = a.mutationCache),
                        (this.#n = []),
                        (this.state = a.state || f()),
                        this.setOptions(a.options),
                        this.scheduleGc())
                }
                setOptions(a) {
                    ;((this.options = a), this.updateGcTime(this.options.gcTime))
                }
                get meta() {
                    return this.options.meta
                }
                addObserver(a) {
                    this.#n.includes(a) ||
                        (this.#n.push(a), this.clearGcTimeout(), this.#f.notify({ type: 'observerAdded', mutation: this, observer: a }))
                }
                removeObserver(a) {
                    ;((this.#n = this.#n.filter((b) => b !== a)),
                        this.scheduleGc(),
                        this.#f.notify({ type: 'observerRemoved', mutation: this, observer: a }))
                }
                optionalRemove() {
                    this.#n.length || ('pending' === this.state.status ? this.scheduleGc() : this.#f.remove(this))
                }
                continue() {
                    return this.#o?.continue() ?? ('pending' === this.state.status ? this.execute(this.state.variables) : Promise.resolve())
                }
                async execute(a) {
                    let b = () => {
                            this.#p({ type: 'continue' })
                        },
                        d = { client: this.#m, meta: this.options.meta, mutationKey: this.options.mutationKey },
                        e = (this.#o = (0, c.createRetryer)({
                            fn: () => (this.options.mutationFn ? this.options.mutationFn(a, d) : Promise.reject(Error('No mutationFn found'))),
                            onFail: (a, b) => {
                                this.#p({ type: 'failed', failureCount: a, error: b })
                            },
                            onPause: () => {
                                this.#p({ type: 'pause' })
                            },
                            onContinue: b,
                            retry: this.options.retry ?? 0,
                            retryDelay: this.options.retryDelay,
                            networkMode: this.options.networkMode,
                            canRun: () => this.#f.canRun(this),
                        })),
                        f = 'pending' === this.state.status,
                        g = !e.canStart()
                    try {
                        if (f) b()
                        else {
                            ;(this.#p({ type: 'pending', variables: a, isPaused: g }),
                                this.#f.config.onMutate && (await this.#f.config.onMutate(a, this, d)))
                            let b = await this.options.onMutate?.(a, d)
                            b !== this.state.context && this.#p({ type: 'pending', context: b, variables: a, isPaused: g })
                        }
                        let c = await e.start()
                        return (
                            await this.#f.config.onSuccess?.(c, a, this.state.context, this, d),
                            await this.options.onSuccess?.(c, a, this.state.context, d),
                            await this.#f.config.onSettled?.(c, null, this.state.variables, this.state.context, this, d),
                            await this.options.onSettled?.(c, null, a, this.state.context, d),
                            this.#p({ type: 'success', data: c }),
                            c
                        )
                    } catch (b) {
                        try {
                            await this.#f.config.onError?.(b, a, this.state.context, this, d)
                        } catch (a) {
                            Promise.reject(a)
                        }
                        try {
                            await this.options.onError?.(b, a, this.state.context, d)
                        } catch (a) {
                            Promise.reject(a)
                        }
                        try {
                            await this.#f.config.onSettled?.(void 0, b, this.state.variables, this.state.context, this, d)
                        } catch (a) {
                            Promise.reject(a)
                        }
                        try {
                            await this.options.onSettled?.(void 0, b, a, this.state.context, d)
                        } catch (a) {
                            Promise.reject(a)
                        }
                        throw (this.#p({ type: 'error', error: b }), b)
                    } finally {
                        ;(this.#o === e && (this.#o = void 0), this.#f.runNext(this))
                    }
                }
                #p(a) {
                    ;((this.state = ((b) => {
                        switch (a.type) {
                            case 'failed':
                                return { ...b, failureCount: a.failureCount, failureReason: a.error }
                            case 'pause':
                                return { ...b, isPaused: !0 }
                            case 'continue':
                                return { ...b, isPaused: !1 }
                            case 'pending':
                                return {
                                    ...b,
                                    context: a.context,
                                    data: void 0,
                                    failureCount: 0,
                                    failureReason: null,
                                    error: null,
                                    isPaused: a.isPaused,
                                    status: 'pending',
                                    variables: a.variables,
                                    submittedAt: Date.now(),
                                }
                            case 'success':
                                return { ...b, data: a.data, failureCount: 0, failureReason: null, error: null, status: 'success', isPaused: !1 }
                            case 'error':
                                return {
                                    ...b,
                                    data: void 0,
                                    error: a.error,
                                    failureCount: b.failureCount + 1,
                                    failureReason: a.error,
                                    isPaused: !1,
                                    status: 'error',
                                }
                        }
                    })(this.state)),
                        b.notifyManager.batch(() => {
                            ;(this.#n.forEach((b) => {
                                b.onMutationUpdate(a)
                            }),
                                this.#f.notify({ mutation: this, type: 'updated', action: a }))
                        }))
                }
            }
        function f() {
            return {
                context: void 0,
                data: void 0,
                error: null,
                failureCount: 0,
                failureReason: null,
                isPaused: !1,
                status: 'idle',
                variables: void 0,
                submittedAt: 0,
            }
        }
        a.s(['Mutation', 0, e, 'getDefaultState', 0, f])
    },
    28396,
    (a) => {
        'use strict'
        var b = a.i(77010),
            c = (a, b, c, d, e, f, g, h) => {
                let i = document.documentElement,
                    j = ['light', 'dark']
                function k(b) {
                    var c
                    ;((Array.isArray(a) ? a : [a]).forEach((a) => {
                        let c = 'class' === a,
                            d = c && f ? e.map((a) => f[a] || a) : e
                        c ? (i.classList.remove(...d), i.classList.add(f && f[b] ? f[b] : b)) : i.setAttribute(a, b)
                    }),
                        (c = b),
                        h && j.includes(c) && (i.style.colorScheme = c))
                }
                if (d) k(d)
                else
                    try {
                        let a = localStorage.getItem(b) || c,
                            d = g && 'system' === a ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : a
                        k(d)
                    } catch (a) {}
            },
            d = ['light', 'dark'],
            e = '(prefers-color-scheme: dark)',
            f = b.createContext(void 0),
            g = { setTheme: (a) => {}, themes: [] },
            h = ['light', 'dark'],
            i = ({
                forcedTheme: a,
                disableTransitionOnChange: c = !1,
                enableSystem: g = !0,
                enableColorScheme: i = !0,
                storageKey: n = 'theme',
                themes: o = h,
                defaultTheme: p = g ? 'system' : 'light',
                attribute: q = 'data-theme',
                value: r,
                children: s,
                nonce: t,
                scriptProps: u,
            }) => {
                let [v, w] = b.useState(() => k(n, p)),
                    [x, y] = b.useState(() => ('system' === v ? m() : v)),
                    z = r ? Object.values(r) : o,
                    A = b.useCallback(
                        (a) => {
                            let b = a
                            if (!b) return
                            'system' === a && g && (b = m())
                            let e = r ? r[b] : b,
                                f = c ? l(t) : null,
                                h = document.documentElement,
                                j = (a) => {
                                    'class' === a
                                        ? (h.classList.remove(...z), e && h.classList.add(e))
                                        : a.startsWith('data-') && (e ? h.setAttribute(a, e) : h.removeAttribute(a))
                                }
                            if ((Array.isArray(q) ? q.forEach(j) : j(q), i)) {
                                let a = d.includes(p) ? p : null,
                                    c = d.includes(b) ? b : a
                                h.style.colorScheme = c
                            }
                            null == f || f()
                        },
                        [t],
                    ),
                    B = b.useCallback(
                        (a) => {
                            let b = 'function' == typeof a ? a(v) : a
                            w(b)
                            try {
                                localStorage.setItem(n, b)
                            } catch (a) {}
                        },
                        [v],
                    ),
                    C = b.useCallback(
                        (b) => {
                            ;(y(m(b)), 'system' === v && g && !a && A('system'))
                        },
                        [v, a],
                    )
                ;(b.useEffect(() => {
                    let a = window.matchMedia(e)
                    return (a.addListener(C), C(a), () => a.removeListener(C))
                }, [C]),
                    b.useEffect(() => {
                        let a = (a) => {
                            a.key === n && (a.newValue ? w(a.newValue) : B(p))
                        }
                        return (window.addEventListener('storage', a), () => window.removeEventListener('storage', a))
                    }, [B]),
                    b.useEffect(() => {
                        A(null != a ? a : v)
                    }, [a, v]))
                let D = b.useMemo(
                    () => ({
                        theme: v,
                        setTheme: B,
                        forcedTheme: a,
                        resolvedTheme: 'system' === v ? x : v,
                        themes: g ? [...o, 'system'] : o,
                        systemTheme: g ? x : void 0,
                    }),
                    [v, B, a, x, g, o],
                )
                return b.createElement(
                    f.Provider,
                    { value: D },
                    b.createElement(j, {
                        forcedTheme: a,
                        storageKey: n,
                        attribute: q,
                        enableSystem: g,
                        enableColorScheme: i,
                        defaultTheme: p,
                        value: r,
                        themes: o,
                        nonce: t,
                        scriptProps: u,
                    }),
                    s,
                )
            },
            j = b.memo(
                ({
                    forcedTheme: a,
                    storageKey: d,
                    attribute: e,
                    enableSystem: f,
                    enableColorScheme: g,
                    defaultTheme: h,
                    value: i,
                    themes: j,
                    nonce: k,
                    scriptProps: l,
                }) => {
                    let m = JSON.stringify([e, d, h, a, j, i, f, g]).slice(1, -1)
                    return b.createElement('script', {
                        ...l,
                        suppressHydrationWarning: !0,
                        nonce: k,
                        dangerouslySetInnerHTML: { __html: `(${c.toString()})(${m})` },
                    })
                },
            ),
            k = (a, b) => {},
            l = (a) => {
                let b = document.createElement('style')
                return (
                    a && b.setAttribute('nonce', a),
                    b.appendChild(
                        document.createTextNode(
                            '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}',
                        ),
                    ),
                    document.head.appendChild(b),
                    () => {
                        ;(window.getComputedStyle(document.body),
                            setTimeout(() => {
                                document.head.removeChild(b)
                            }, 1))
                    }
                )
            },
            m = (a) => (a || (a = window.matchMedia(e)), a.matches ? 'dark' : 'light')
        a.s([
            'ThemeProvider',
            0,
            (a) => (b.useContext(f) ? b.createElement(b.Fragment, null, a.children) : b.createElement(i, { ...a })),
            'useTheme',
            0,
            () => {
                var a
                return null != (a = b.useContext(f)) ? a : g
            },
        ])
    },
]

//# sourceMappingURL=_054o__4._.js.map
