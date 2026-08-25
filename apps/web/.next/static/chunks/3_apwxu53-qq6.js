;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    45744,
    (e) => {
        'use strict'
        let t
        var i = e.i(48607),
            s = e.i(83782),
            r = e.i(36021),
            n = e.i(82870),
            a = e.i(14437),
            o = e.i(31932),
            u = e.i(66519),
            h = e.i(57783),
            c = class extends u.Subscribable {
                #e
                #t
                #i
                constructor(e = {}) {
                    ;(super(), (this.config = e), (this.#e = new Set()), (this.#t = new Map()), (this.#i = 0))
                }
                build(e, t, i) {
                    let s = new h.Mutation({ client: e, mutationCache: this, mutationId: ++this.#i, options: e.defaultMutationOptions(t), state: i })
                    return (this.add(s), s)
                }
                add(e) {
                    this.#e.add(e)
                    let t = l(e)
                    if ('string' == typeof t) {
                        let i = this.#t.get(t)
                        i ? i.push(e) : this.#t.set(t, [e])
                    }
                    this.notify({ type: 'added', mutation: e })
                }
                remove(e) {
                    if (this.#e.delete(e)) {
                        let t = l(e)
                        if ('string' == typeof t) {
                            let i = this.#t.get(t)
                            if (i)
                                if (i.length > 1) {
                                    let t = i.indexOf(e)
                                    ;-1 !== t && i.splice(t, 1)
                                } else i[0] === e && this.#t.delete(t)
                        }
                    }
                    this.notify({ type: 'removed', mutation: e })
                }
                canRun(e) {
                    let t = l(e)
                    if ('string' != typeof t) return !0
                    {
                        let i = this.#t.get(t)?.find((e) => 'pending' === e.state.status)
                        return !i || i === e
                    }
                }
                runNext(e) {
                    let t = l(e)
                    return 'string' == typeof t
                        ? (this.#t
                              .get(t)
                              ?.find((t) => t !== e && t.state.isPaused)
                              ?.continue() ?? Promise.resolve())
                        : Promise.resolve()
                }
                clear() {
                    a.notifyManager.batch(() => {
                        ;(this.#e.forEach((e) => {
                            this.notify({ type: 'removed', mutation: e })
                        }),
                            this.#e.clear(),
                            this.#t.clear())
                    })
                }
                getAll() {
                    return Array.from(this.#e)
                }
                find(e) {
                    let t = { exact: !0, ...e }
                    return this.getAll().find((e) => (0, r.matchMutation)(t, e))
                }
                findAll(e = {}) {
                    return this.getAll().filter((t) => (0, r.matchMutation)(e, t))
                }
                notify(e) {
                    a.notifyManager.batch(() => {
                        this.listeners.forEach((t) => {
                            t(e)
                        })
                    })
                }
                resumePausedMutations() {
                    let e = this.getAll().filter((e) => e.state.isPaused)
                    return a.notifyManager.batch(() => Promise.all(e.map((e) => e.continue().catch(r.noop))))
                }
            }
        function l(e) {
            return e.options.scope?.id
        }
        var d = u,
            f = e.i(73045),
            y = class extends d.Subscribable {
                #s
                constructor(e = {}) {
                    ;(super(), (this.config = e), (this.#s = new Map()))
                }
                build(e, t, i) {
                    let s = t.queryKey,
                        n = t.queryHash ?? (0, r.hashQueryKeyByOptions)(s, t),
                        a = this.get(n)
                    return (
                        a ||
                            ((a = new f.Query({
                                client: e,
                                queryKey: s,
                                queryHash: n,
                                options: e.defaultQueryOptions(t),
                                state: i,
                                defaultOptions: e.getQueryDefaults(s),
                            })),
                            this.add(a)),
                        a
                    )
                }
                add(e) {
                    this.#s.has(e.queryHash) || (this.#s.set(e.queryHash, e), this.notify({ type: 'added', query: e }))
                }
                remove(e) {
                    let t = this.#s.get(e.queryHash)
                    t && (e.destroy(), t === e && this.#s.delete(e.queryHash), this.notify({ type: 'removed', query: e }))
                }
                clear() {
                    a.notifyManager.batch(() => {
                        this.getAll().forEach((e) => {
                            this.remove(e)
                        })
                    })
                }
                get(e) {
                    return this.#s.get(e)
                }
                getAll() {
                    return [...this.#s.values()]
                }
                find(e) {
                    let t = { exact: !0, ...e }
                    return this.getAll().find((e) => (0, r.matchQuery)(t, e))
                }
                findAll(e = {}) {
                    let t = this.getAll()
                    return Object.keys(e).length > 0 ? t.filter((t) => (0, r.matchQuery)(e, t)) : t
                }
                notify(e) {
                    a.notifyManager.batch(() => {
                        this.listeners.forEach((t) => {
                            t(e)
                        })
                    })
                }
                onFocus() {
                    a.notifyManager.batch(() => {
                        this.getAll().forEach((e) => {
                            e.onFocus()
                        })
                    })
                }
                onOnline() {
                    a.notifyManager.batch(() => {
                        this.getAll().forEach((e) => {
                            e.onOnline()
                        })
                    })
                }
            },
            p = class {
                #r
                #n
                #a
                #o
                #u
                #h
                #c
                #l
                constructor(e = {}) {
                    ;((this.#r = e.queryCache || new y()),
                        (this.#n = e.mutationCache || new c()),
                        (this.#a = e.defaultOptions || {}),
                        (this.#o = new Map()),
                        (this.#u = new Map()),
                        (this.#h = 0))
                }
                mount() {
                    ;(this.#h++,
                        1 === this.#h &&
                            ((this.#c = n.focusManager.subscribe(async (e) => {
                                e && (await this.resumePausedMutations(), this.#r.onFocus())
                            })),
                            (this.#l = o.onlineManager.subscribe(async (e) => {
                                e && (await this.resumePausedMutations(), this.#r.onOnline())
                            }))))
                }
                unmount() {
                    ;(this.#h--, 0 === this.#h && (this.#c?.(), (this.#c = void 0), this.#l?.(), (this.#l = void 0)))
                }
                isFetching(e) {
                    return this.#r.findAll({ ...e, fetchStatus: 'fetching' }).length
                }
                isMutating(e) {
                    return this.#n.findAll({ ...e, status: 'pending' }).length
                }
                getQueryData(e) {
                    let t = this.defaultQueryOptions({ queryKey: e })
                    return this.#r.get(t.queryHash)?.state.data
                }
                ensureQueryData(e) {
                    let t = this.defaultQueryOptions(e),
                        i = this.#r.build(this, t),
                        s = i.state.data
                    return void 0 === s
                        ? this.fetchQuery(e)
                        : (e.revalidateIfStale && i.isStaleByTime((0, r.resolveStaleTime)(t.staleTime, i)) && this.prefetchQuery(t),
                          Promise.resolve(s))
                }
                getQueriesData(e) {
                    return this.#r.findAll(e).map(({ queryKey: e, state: t }) => [e, t.data])
                }
                setQueryData(e, t, i) {
                    let s = this.defaultQueryOptions({ queryKey: e }),
                        n = this.#r.get(s.queryHash)?.state.data,
                        a = (0, r.functionalUpdate)(t, n)
                    if (void 0 !== a) return this.#r.build(this, s).setData(a, { ...i, manual: !0 })
                }
                setQueriesData(e, t, i) {
                    return a.notifyManager.batch(() => this.#r.findAll(e).map(({ queryKey: e }) => [e, this.setQueryData(e, t, i)]))
                }
                getQueryState(e) {
                    let t = this.defaultQueryOptions({ queryKey: e })
                    return this.#r.get(t.queryHash)?.state
                }
                removeQueries(e) {
                    let t = this.#r
                    a.notifyManager.batch(() => {
                        t.findAll(e).forEach((e) => {
                            t.remove(e)
                        })
                    })
                }
                resetQueries(e, t) {
                    let i = this.#r
                    return a.notifyManager.batch(() => {
                        let s = i.findAll(e),
                            r = new Set(s)
                        return (
                            s.forEach((e) => {
                                e.reset()
                            }),
                            this.refetchQueries({ type: 'active', predicate: (e) => r.has(e) }, t)
                        )
                    })
                }
                cancelQueries(e, t = {}) {
                    let i = { revert: !0, ...t }
                    return Promise.all(a.notifyManager.batch(() => this.#r.findAll(e).map((e) => e.cancel(i))))
                        .then(r.noop)
                        .catch(r.noop)
                }
                invalidateQueries(e, t = {}) {
                    return a.notifyManager.batch(() =>
                        (this.#r.findAll(e).forEach((e) => {
                            e.invalidate()
                        }),
                        e?.refetchType === 'none')
                            ? Promise.resolve()
                            : this.refetchQueries({ ...e, type: e?.refetchType ?? e?.type ?? 'active' }, t),
                    )
                }
                refetchQueries(e, t = {}) {
                    let i = { ...t, cancelRefetch: t.cancelRefetch ?? !0 }
                    return Promise.all(
                        a.notifyManager.batch(() =>
                            this.#r
                                .findAll(e)
                                .filter((e) => !e.isDisabled() && !e.isStatic())
                                .map((e) => {
                                    let t = e.fetch(void 0, i)
                                    return (i.throwOnError || (t = t.catch(r.noop)), 'paused' === e.state.fetchStatus ? Promise.resolve() : t)
                                }),
                        ),
                    ).then(r.noop)
                }
                async query(e) {
                    let t = this.defaultQueryOptions(e)
                    void 0 === t.retry && (t.retry = !1)
                    let i = this.#r.build(this, t),
                        s = i.isStaleByTime((0, r.resolveStaleTime)(t.staleTime, i)) ? await i.fetch(t) : i.state.data,
                        n = t.select
                    return n ? n(s) : s
                }
                fetchQuery(e) {
                    let t = this.defaultQueryOptions(e)
                    void 0 === t.retry && (t.retry = !1)
                    let i = this.#r.build(this, t)
                    return i.isStaleByTime((0, r.resolveStaleTime)(t.staleTime, i)) ? i.fetch(t) : Promise.resolve(i.state.data)
                }
                prefetchQuery(e) {
                    return this.fetchQuery(e).then(r.noop).catch(r.noop)
                }
                infiniteQuery(e) {
                    return ((e._type = 'infinite'), this.query(e))
                }
                fetchInfiniteQuery(e) {
                    return ((e._type = 'infinite'), this.fetchQuery(e))
                }
                prefetchInfiniteQuery(e) {
                    return this.fetchInfiniteQuery(e).then(r.noop).catch(r.noop)
                }
                ensureInfiniteQueryData(e) {
                    return ((e._type = 'infinite'), this.ensureQueryData(e))
                }
                resumePausedMutations() {
                    return o.onlineManager.isOnline() ? this.#n.resumePausedMutations() : Promise.resolve()
                }
                getQueryCache() {
                    return this.#r
                }
                getMutationCache() {
                    return this.#n
                }
                getDefaultOptions() {
                    return this.#a
                }
                setDefaultOptions(e) {
                    this.#a = e
                }
                setQueryDefaults(e, t) {
                    this.#o.set((0, r.hashKey)(e), { queryKey: e, defaultOptions: t })
                }
                getQueryDefaults(e) {
                    let t = [...this.#o.values()],
                        i = {}
                    return (
                        t.forEach((t) => {
                            ;(0, r.partialMatchKey)(e, t.queryKey) && Object.assign(i, t.defaultOptions)
                        }),
                        i
                    )
                }
                setMutationDefaults(e, t) {
                    this.#u.set((0, r.hashKey)(e), { mutationKey: e, defaultOptions: t })
                }
                getMutationDefaults(e) {
                    let t = [...this.#u.values()],
                        i = {}
                    return (
                        t.forEach((t) => {
                            ;(0, r.partialMatchKey)(e, t.mutationKey) && Object.assign(i, t.defaultOptions)
                        }),
                        i
                    )
                }
                defaultQueryOptions(e) {
                    if (e._defaulted) return e
                    let t = { ...this.#a.queries, ...this.getQueryDefaults(e.queryKey), ...e, _defaulted: !0 }
                    return (
                        t.queryHash || (t.queryHash = (0, r.hashQueryKeyByOptions)(t.queryKey, t)),
                        void 0 === t.refetchOnReconnect && (t.refetchOnReconnect = 'always' !== t.networkMode),
                        void 0 === t.throwOnError && (t.throwOnError = !!t.suspense),
                        !t.networkMode && t.persister && (t.networkMode = 'offlineFirst'),
                        t.queryFn === r.skipToken && (t.enabled = !1),
                        t
                    )
                }
                defaultMutationOptions(e) {
                    return e?._defaulted
                        ? e
                        : { ...this.#a.mutations, ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)), ...e, _defaulted: !0 }
                }
                clear() {
                    ;(this.#r.clear(), this.#n.clear())
                }
            },
            m = e.i(60687),
            v = e.i(76229)
        e.s(
            [
                'AppProviders',
                0,
                (e) => {
                    let r,
                        n,
                        a = (0, s.c)(3),
                        { children: o } = e
                    a[0] === Symbol.for('react.memo_cache_sentinel')
                        ? ((r = t ??= new p({ defaultOptions: { queries: { staleTime: 6e4 } } })), (a[0] = r))
                        : (r = a[0])
                    let u = r
                    return (
                        a[1] !== o
                            ? ((n = (0, i.jsx)(v.ThemeProvider, {
                                  attribute: 'class',
                                  defaultTheme: 'light',
                                  enableSystem: !1,
                                  disableTransitionOnChange: !0,
                                  children: (0, i.jsx)(m.QueryClientProvider, { client: u, children: o }),
                              })),
                              (a[1] = o),
                              (a[2] = n))
                            : (n = a[2]),
                        n
                    )
                },
            ],
            45744,
        )
    },
    28875,
    (e) => {
        'use strict'
        let t
        var i = e.i(36021)
        let s =
            ((t = () => i.isServer),
            {
                isServer: () => t(),
                setIsServer(e) {
                    t = e
                },
            })
        e.s(['environmentManager', 0, s])
    },
    82870,
    (e) => {
        'use strict'
        var t = e.i(66519)
        let i = new (class extends t.Subscribable {
            #d
            #f
            #y
            constructor() {
                ;(super(),
                    (this.#y = (e) => {
                        if ('u' > typeof window && window.addEventListener) {
                            let t = () => e()
                            return (
                                window.addEventListener('visibilitychange', t, !1),
                                () => {
                                    window.removeEventListener('visibilitychange', t)
                                }
                            )
                        }
                    }))
            }
            onSubscribe() {
                this.#f || this.setEventListener(this.#y)
            }
            onUnsubscribe() {
                this.hasListeners() || (this.#f?.(), (this.#f = void 0))
            }
            setEventListener(e) {
                ;((this.#y = e),
                    this.#f?.(),
                    (this.#f = e((e) => {
                        'boolean' == typeof e ? this.setFocused(e) : this.onFocus()
                    })))
            }
            setFocused(e) {
                this.#d !== e && ((this.#d = e), this.onFocus())
            }
            onFocus() {
                let e = this.isFocused()
                this.listeners.forEach((t) => {
                    t(e)
                })
            }
            isFocused() {
                return 'boolean' == typeof this.#d ? this.#d : globalThis.document?.visibilityState !== 'hidden'
            }
        })()
        e.s(['focusManager', 0, i])
    },
    57783,
    (e) => {
        'use strict'
        var t = e.i(14437),
            i = e.i(21964),
            s = e.i(14780),
            r = class extends s.Removable {
                #p
                #m
                #n
                #v
                constructor(e) {
                    ;(super(),
                        (this.#p = e.client),
                        (this.mutationId = e.mutationId),
                        (this.#n = e.mutationCache),
                        (this.#m = []),
                        (this.state = e.state || n()),
                        this.setOptions(e.options),
                        this.scheduleGc())
                }
                setOptions(e) {
                    ;((this.options = e), this.updateGcTime(this.options.gcTime))
                }
                get meta() {
                    return this.options.meta
                }
                addObserver(e) {
                    this.#m.includes(e) ||
                        (this.#m.push(e), this.clearGcTimeout(), this.#n.notify({ type: 'observerAdded', mutation: this, observer: e }))
                }
                removeObserver(e) {
                    ;((this.#m = this.#m.filter((t) => t !== e)),
                        this.scheduleGc(),
                        this.#n.notify({ type: 'observerRemoved', mutation: this, observer: e }))
                }
                optionalRemove() {
                    this.#m.length || ('pending' === this.state.status ? this.scheduleGc() : this.#n.remove(this))
                }
                continue() {
                    return this.#v?.continue() ?? ('pending' === this.state.status ? this.execute(this.state.variables) : Promise.resolve())
                }
                async execute(e) {
                    let t = () => {
                            this.#g({ type: 'continue' })
                        },
                        s = { client: this.#p, meta: this.options.meta, mutationKey: this.options.mutationKey },
                        r = (this.#v = (0, i.createRetryer)({
                            fn: () => (this.options.mutationFn ? this.options.mutationFn(e, s) : Promise.reject(Error('No mutationFn found'))),
                            onFail: (e, t) => {
                                this.#g({ type: 'failed', failureCount: e, error: t })
                            },
                            onPause: () => {
                                this.#g({ type: 'pause' })
                            },
                            onContinue: t,
                            retry: this.options.retry ?? 0,
                            retryDelay: this.options.retryDelay,
                            networkMode: this.options.networkMode,
                            canRun: () => this.#n.canRun(this),
                        })),
                        n = 'pending' === this.state.status,
                        a = !r.canStart()
                    try {
                        if (n) t()
                        else {
                            ;(this.#g({ type: 'pending', variables: e, isPaused: a }),
                                this.#n.config.onMutate && (await this.#n.config.onMutate(e, this, s)))
                            let t = await this.options.onMutate?.(e, s)
                            t !== this.state.context && this.#g({ type: 'pending', context: t, variables: e, isPaused: a })
                        }
                        let i = await r.start()
                        return (
                            await this.#n.config.onSuccess?.(i, e, this.state.context, this, s),
                            await this.options.onSuccess?.(i, e, this.state.context, s),
                            await this.#n.config.onSettled?.(i, null, this.state.variables, this.state.context, this, s),
                            await this.options.onSettled?.(i, null, e, this.state.context, s),
                            this.#g({ type: 'success', data: i }),
                            i
                        )
                    } catch (t) {
                        try {
                            await this.#n.config.onError?.(t, e, this.state.context, this, s)
                        } catch (e) {
                            Promise.reject(e)
                        }
                        try {
                            await this.options.onError?.(t, e, this.state.context, s)
                        } catch (e) {
                            Promise.reject(e)
                        }
                        try {
                            await this.#n.config.onSettled?.(void 0, t, this.state.variables, this.state.context, this, s)
                        } catch (e) {
                            Promise.reject(e)
                        }
                        try {
                            await this.options.onSettled?.(void 0, t, e, this.state.context, s)
                        } catch (e) {
                            Promise.reject(e)
                        }
                        throw (this.#g({ type: 'error', error: t }), t)
                    } finally {
                        ;(this.#v === r && (this.#v = void 0), this.#n.runNext(this))
                    }
                }
                #g(e) {
                    ;((this.state = ((t) => {
                        switch (e.type) {
                            case 'failed':
                                return { ...t, failureCount: e.failureCount, failureReason: e.error }
                            case 'pause':
                                return { ...t, isPaused: !0 }
                            case 'continue':
                                return { ...t, isPaused: !1 }
                            case 'pending':
                                return {
                                    ...t,
                                    context: e.context,
                                    data: void 0,
                                    failureCount: 0,
                                    failureReason: null,
                                    error: null,
                                    isPaused: e.isPaused,
                                    status: 'pending',
                                    variables: e.variables,
                                    submittedAt: Date.now(),
                                }
                            case 'success':
                                return { ...t, data: e.data, failureCount: 0, failureReason: null, error: null, status: 'success', isPaused: !1 }
                            case 'error':
                                return {
                                    ...t,
                                    data: void 0,
                                    error: e.error,
                                    failureCount: t.failureCount + 1,
                                    failureReason: e.error,
                                    isPaused: !1,
                                    status: 'error',
                                }
                        }
                    })(this.state)),
                        t.notifyManager.batch(() => {
                            ;(this.#m.forEach((t) => {
                                t.onMutationUpdate(e)
                            }),
                                this.#n.notify({ mutation: this, type: 'updated', action: e }))
                        }))
                }
            }
        function n() {
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
        e.s(['Mutation', 0, r, 'getDefaultState', 0, n])
    },
    14437,
    (e) => {
        'use strict'
        let t,
            i,
            s,
            r,
            n,
            a,
            o = e.i(78774).systemSetTimeoutZero,
            u =
                ((t = []),
                (i = 0),
                (s = (e) => {
                    e()
                }),
                (r = (e) => {
                    e()
                }),
                (n = o),
                {
                    batch: (e) => {
                        let a
                        i++
                        try {
                            a = e()
                        } finally {
                            let e
                            --i ||
                                ((e = t),
                                (t = []),
                                e.length &&
                                    n(() => {
                                        r(() => {
                                            e.forEach((e) => {
                                                s(e)
                                            })
                                        })
                                    }))
                        }
                        return a
                    },
                    batchCalls:
                        (e) =>
                        (...t) => {
                            a(() => {
                                e(...t)
                            })
                        },
                    schedule: (a = (e) => {
                        i
                            ? t.push(e)
                            : n(() => {
                                  s(e)
                              })
                    }),
                    setNotifyFunction: (e) => {
                        s = e
                    },
                    setBatchNotifyFunction: (e) => {
                        r = e
                    },
                    setScheduler: (e) => {
                        n = e
                    },
                })
        e.s(['notifyManager', 0, u])
    },
    31932,
    (e) => {
        'use strict'
        var t = e.i(66519)
        let i = new (class extends t.Subscribable {
            #b = !0
            #f
            #y
            constructor() {
                ;(super(),
                    (this.#y = (e) => {
                        if ('u' > typeof window && window.addEventListener) {
                            let t = () => e(!0),
                                i = () => e(!1)
                            return (
                                window.addEventListener('online', t, !1),
                                window.addEventListener('offline', i, !1),
                                () => {
                                    ;(window.removeEventListener('online', t), window.removeEventListener('offline', i))
                                }
                            )
                        }
                    }))
            }
            onSubscribe() {
                this.#f || this.setEventListener(this.#y)
            }
            onUnsubscribe() {
                this.hasListeners() || (this.#f?.(), (this.#f = void 0))
            }
            setEventListener(e) {
                ;((this.#y = e), this.#f?.(), (this.#f = e(this.setOnline.bind(this))))
            }
            setOnline(e) {
                this.#b !== e &&
                    ((this.#b = e),
                    this.listeners.forEach((t) => {
                        t(e)
                    }))
            }
            isOnline() {
                return this.#b
            }
        })()
        e.s(['onlineManager', 0, i])
    },
    73045,
    (e) => {
        'use strict'
        var t = e.i(36021),
            i = e.i(14437),
            s = e.i(21964),
            r = e.i(14780)
        function n(e, { pages: t, pageParams: i }) {
            let s = t.length - 1
            return t.length > 0 ? e.getNextPageParam(t[s], t, i[s], i) : void 0
        }
        function a(e, { pages: t, pageParams: i }) {
            return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, i[0], i) : void 0
        }
        var o = class extends r.Removable {
            #C
            #S
            #w
            #O
            #p
            #v
            #a
            #T
            constructor(e) {
                ;(super(),
                    (this.#T = !1),
                    (this.#a = e.defaultOptions),
                    this.setOptions(e.options),
                    (this.observers = []),
                    (this.#p = e.client),
                    (this.#O = this.#p.getQueryCache()),
                    (this.queryKey = e.queryKey),
                    (this.queryHash = e.queryHash),
                    (this.#S = c(this.options)),
                    (this.state = e.state ?? this.#S),
                    this.scheduleGc())
            }
            get meta() {
                return this.options.meta
            }
            get queryType() {
                return this.#C
            }
            get promise() {
                return this.#v?.promise
            }
            setOptions(e) {
                if (
                    ((this.options = { ...this.#a, ...e }),
                    e?._type && (this.#C = e._type),
                    this.updateGcTime(this.options.gcTime),
                    this.state && void 0 === this.state.data)
                ) {
                    let e = c(this.options)
                    void 0 !== e.data && (this.setState(h(e.data, e.dataUpdatedAt)), (this.#S = e))
                }
            }
            optionalRemove() {
                this.observers.length || 'idle' !== this.state.fetchStatus || this.#O.remove(this)
            }
            setData(e, i) {
                let s = (0, t.replaceData)(this.state.data, e, this.options)
                return (this.#g({ data: s, type: 'success', dataUpdatedAt: i?.updatedAt, manual: i?.manual }), s)
            }
            setState(e) {
                this.#g({ type: 'setState', state: e })
            }
            cancel(e) {
                let i = this.#v?.promise
                return (this.#v?.cancel(e), i ? i.then(t.noop).catch(t.noop) : Promise.resolve())
            }
            destroy() {
                ;(super.destroy(), this.cancel({ silent: !0 }))
            }
            get resetState() {
                return this.#S
            }
            reset() {
                ;(this.destroy(), this.setState(this.resetState))
            }
            isActive() {
                return this.observers.some((e) => !1 !== (0, t.resolveQueryBoolean)(e.options.enabled, this))
            }
            isDisabled() {
                return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === t.skipToken || !this.isFetched()
            }
            isFetched() {
                return this.state.dataUpdateCount + this.state.errorUpdateCount > 0
            }
            isStatic() {
                return this.getObserversCount() > 0 && this.observers.some((e) => 'static' === (0, t.resolveStaleTime)(e.options.staleTime, this))
            }
            isStale() {
                return this.getObserversCount() > 0
                    ? this.observers.some((e) => e.getCurrentResult().isStale)
                    : void 0 === this.state.data || this.state.isInvalidated
            }
            isStaleByTime(e = 0) {
                return (
                    void 0 === this.state.data ||
                    ('static' !== e && (!!this.state.isInvalidated || !(0, t.timeUntilStale)(this.state.dataUpdatedAt, e)))
                )
            }
            onFocus() {
                ;(this.observers.find((e) => e.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#v?.continue())
            }
            onOnline() {
                ;(this.observers.find((e) => e.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#v?.continue())
            }
            addObserver(e) {
                this.observers.includes(e) ||
                    (this.observers.push(e), this.clearGcTimeout(), this.#O.notify({ type: 'observerAdded', query: this, observer: e }))
            }
            removeObserver(e) {
                let t = this.observers.indexOf(e)
                ;-1 !== t &&
                    (this.observers.splice(t, 1),
                    this.observers.length ||
                        (this.#v && (this.#T || this.#q() ? this.#v.cancel({ revert: !0 }) : this.#v.cancelRetry()), this.scheduleGc()),
                    this.#O.notify({ type: 'observerRemoved', query: this, observer: e }))
            }
            getObserversCount() {
                return this.observers.length
            }
            #q() {
                return 'paused' === this.state.fetchStatus && 'pending' === this.state.status
            }
            invalidate() {
                this.state.isInvalidated || this.#g({ type: 'invalidate' })
            }
            async fetch(e, i) {
                var r
                let o
                if ('idle' !== this.state.fetchStatus && this.#v?.status() !== 'rejected') {
                    if (void 0 !== this.state.data && i?.cancelRefetch) this.cancel({ silent: !0 })
                    else if (this.#v) return (this.#v.continueRetry(), this.#v.promise)
                }
                if ((e && this.setOptions(e), !this.options.queryFn)) {
                    let e = this.observers.find((e) => e.options.queryFn)
                    e && this.setOptions(e.options)
                }
                let u = new AbortController(),
                    h = (e) => {
                        Object.defineProperty(e, 'signal', { enumerable: !0, get: () => ((this.#T = !0), u.signal) })
                    },
                    c = () => {
                        let e,
                            s = (0, t.ensureQueryFn)(this.options, i),
                            r = (h((e = { client: this.#p, queryKey: this.queryKey, meta: this.meta })), e)
                        return ((this.#T = !1), this.options.persister) ? this.options.persister(s, r, this) : s(r)
                    },
                    l =
                        (h((o = { fetchOptions: i, options: this.options, queryKey: this.queryKey, client: this.#p, state: this.state, fetchFn: c })),
                        o)
                ;(('infinite' === this.#C
                    ? ((r = this.options.pages),
                      {
                          onFetch: (e, i) => {
                              let s = e.options,
                                  o = e.fetchOptions?.meta?.fetchMore?.direction,
                                  u = e.state.data?.pages || [],
                                  h = e.state.data?.pageParams || [],
                                  c = { pages: [], pageParams: [] },
                                  l = 0,
                                  d = async () => {
                                      let i = !1,
                                          d = (0, t.ensureQueryFn)(e.options, e.fetchOptions),
                                          f = async (s, r, n) => {
                                              let a
                                              if (i) return Promise.reject(e.signal.reason)
                                              if (null == r && s.pages.length) return Promise.resolve(s)
                                              let o =
                                                      ((a = {
                                                          client: e.client,
                                                          queryKey: e.queryKey,
                                                          pageParam: r,
                                                          direction: n ? 'backward' : 'forward',
                                                          meta: e.options.meta,
                                                      }),
                                                      (0, t.addConsumeAwareSignal)(
                                                          a,
                                                          () => e.signal,
                                                          () => (i = !0),
                                                      ),
                                                      a),
                                                  u = await d(o),
                                                  { maxPages: h } = e.options,
                                                  c = n ? t.addToStart : t.addToEnd
                                              return { pages: c(s.pages, u, h), pageParams: c(s.pageParams, r, h) }
                                          }
                                      if (o && u.length) {
                                          let e = 'backward' === o,
                                              t = e ? a : n,
                                              i = { pages: u, pageParams: h }
                                          c = await f(i, t(s, i), e)
                                      } else {
                                          let e = r ?? u.length
                                          do {
                                              let e = 0 === l ? (h[0] ?? s.initialPageParam) : n(s, c)
                                              if (l > 0 && null == e) break
                                              ;((c = await f(c, e)), l++)
                                          } while (l < e)
                                      }
                                      return c
                                  }
                              e.options.persister
                                  ? (e.fetchFn = () =>
                                        e.options.persister?.(
                                            d,
                                            { client: e.client, queryKey: e.queryKey, meta: e.options.meta, signal: e.signal },
                                            i,
                                        ))
                                  : (e.fetchFn = d)
                          },
                      })
                    : this.options.behavior
                )?.onFetch(l, this),
                    (this.#w = this.state),
                    ('idle' === this.state.fetchStatus || this.state.fetchMeta !== l.fetchOptions?.meta) &&
                        this.#g({ type: 'fetch', meta: l.fetchOptions?.meta }))
                let d = (this.#v = (0, s.createRetryer)({
                    initialPromise: i?.initialPromise,
                    fn: l.fetchFn,
                    onCancel: (e) => {
                        ;(e instanceof s.CancelledError && e.revert && this.setState({ ...this.#w, fetchStatus: 'idle' }), u.abort())
                    },
                    onFail: (e, t) => {
                        this.#g({ type: 'failed', failureCount: e, error: t })
                    },
                    onPause: () => {
                        this.#g({ type: 'pause' })
                    },
                    onContinue: () => {
                        this.#g({ type: 'continue' })
                    },
                    retry: l.options.retry,
                    retryDelay: l.options.retryDelay,
                    networkMode: l.options.networkMode,
                    canRun: () => !0,
                }))
                try {
                    let e = await d.start()
                    if (void 0 === e) throw Error(`${this.queryHash} data is undefined`)
                    return (this.setData(e), this.#O.config.onSuccess?.(e, this), this.#O.config.onSettled?.(e, this.state.error, this), e)
                } catch (e) {
                    if (e instanceof s.CancelledError) {
                        if (e.silent) return this.#v.promise
                        else if (e.revert) {
                            if (void 0 === this.state.data) throw e
                            return this.state.data
                        }
                    }
                    throw (
                        this.#g({ type: 'error', error: e }),
                        this.#O.config.onError?.(e, this),
                        this.#O.config.onSettled?.(this.state.data, e, this),
                        e
                    )
                } finally {
                    ;(this.#v === d && (this.#v = void 0), this.scheduleGc())
                }
            }
            #g(e) {
                let t = (t) => {
                    switch (e.type) {
                        case 'failed':
                            return { ...t, fetchFailureCount: e.failureCount, fetchFailureReason: e.error }
                        case 'pause':
                            return { ...t, fetchStatus: 'paused' }
                        case 'continue':
                            return { ...t, fetchStatus: 'fetching' }
                        case 'fetch':
                            return { ...t, ...u(t.data, this.options), fetchMeta: e.meta ?? null }
                        case 'success':
                            let i = {
                                ...t,
                                ...h(e.data, e.dataUpdatedAt),
                                dataUpdateCount: t.dataUpdateCount + 1,
                                ...(!e.manual && { fetchStatus: 'idle', fetchFailureCount: 0, fetchFailureReason: null }),
                            }
                            return ((this.#w = e.manual ? i : void 0), i)
                        case 'error':
                            let s = e.error
                            return {
                                ...t,
                                error: s,
                                errorUpdateCount: t.errorUpdateCount + 1,
                                errorUpdatedAt: Date.now(),
                                fetchFailureCount: t.fetchFailureCount + 1,
                                fetchFailureReason: s,
                                fetchStatus: 'idle',
                                status: 'error',
                                isInvalidated: !0,
                            }
                        case 'invalidate':
                            return { ...t, isInvalidated: !0 }
                        case 'setState':
                            return { ...t, ...e.state }
                    }
                }
                ;((this.state = t(this.state)),
                    i.notifyManager.batch(() => {
                        ;(this.observers.slice().forEach((e) => {
                            e.onQueryUpdate()
                        }),
                            this.#O.notify({ query: this, type: 'updated', action: e }))
                    }))
            }
        }
        function u(e, t) {
            return {
                fetchFailureCount: 0,
                fetchFailureReason: null,
                fetchStatus: (0, s.canFetch)(t.networkMode) ? 'fetching' : 'paused',
                ...(void 0 === e && { error: null, status: 'pending' }),
            }
        }
        function h(e, t) {
            return { data: e, dataUpdatedAt: t ?? Date.now(), error: null, isInvalidated: !1, status: 'success' }
        }
        function c(e) {
            let t = 'function' == typeof e.initialData ? e.initialData() : e.initialData,
                i = void 0 !== t,
                s = i ? ('function' == typeof e.initialDataUpdatedAt ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt) : 0
            return {
                data: t,
                dataUpdateCount: 0,
                dataUpdatedAt: i ? (s ?? Date.now()) : 0,
                error: null,
                errorUpdateCount: 0,
                errorUpdatedAt: 0,
                fetchFailureCount: 0,
                fetchFailureReason: null,
                fetchMeta: null,
                isInvalidated: !1,
                status: i ? 'success' : 'pending',
                fetchStatus: 'idle',
            }
        }
        e.s(['Query', 0, o, 'fetchState', 0, u], 73045)
    },
    21964,
    14780,
    (e) => {
        'use strict'
        var t = e.i(36021),
            i = e.i(28875),
            s = e.i(82870),
            r = e.i(31932)
        function n(e) {
            return Math.min(1e3 * 2 ** e, 3e4)
        }
        function a(e) {
            return (e ?? 'online') !== 'online' || r.onlineManager.isOnline()
        }
        var o = class extends Error {
            constructor(e) {
                ;(super('CancelledError'), (this.revert = e?.revert), (this.silent = e?.silent))
            }
        }
        e.s(
            [
                'CancelledError',
                0,
                o,
                'canFetch',
                0,
                a,
                'createRetryer',
                0,
                function (e) {
                    let u,
                        h,
                        c,
                        l = !1,
                        d = 0,
                        f = 'pending',
                        y = new Promise((e, t) => {
                            ;((h = e), (c = t))
                        })
                    y.catch(t.noop)
                    let p = () => s.focusManager.isFocused() && ('always' === e.networkMode || r.onlineManager.isOnline()) && e.canRun(),
                        m = () => a(e.networkMode) && e.canRun(),
                        v = (e) => {
                            'pending' === f && (u?.(), (f = 'resolved'), h(e))
                        },
                        g = (e) => {
                            'pending' === f && (u?.(), (f = 'rejected'), c(e))
                        },
                        b = () =>
                            new Promise((t) => {
                                ;((u = (e) => {
                                    ;('pending' !== f || p()) && t(e)
                                }),
                                    e.onPause?.())
                            }).then(() => {
                                ;((u = void 0), 'pending' === f && e.onContinue?.())
                            }),
                        C = () => {
                            let s
                            if ('pending' !== f) return
                            let r = 0 === d ? e.initialPromise : void 0
                            try {
                                s = r ?? e.fn()
                            } catch (e) {
                                s = Promise.reject(e)
                            }
                            Promise.resolve(s)
                                .then(v)
                                .catch((s) => {
                                    if ('pending' !== f) return
                                    let r = e.retry ?? 3 * !i.environmentManager.isServer(),
                                        a = e.retryDelay ?? n,
                                        o = 'function' == typeof a ? a(d, s) : a,
                                        u = !0 === r || ('number' == typeof r && d < r) || ('function' == typeof r && r(d, s))
                                    l || !u
                                        ? g(s)
                                        : (d++,
                                          e.onFail?.(d, s),
                                          (0, t.sleep)(o)
                                              .then(() => (p() ? void 0 : b()))
                                              .then(() => {
                                                  l ? g(s) : C()
                                              }))
                                })
                        }
                    return {
                        promise: y,
                        status: () => f,
                        cancel: (t) => {
                            if ('pending' === f) {
                                let i = new o(t)
                                ;(g(i), e.onCancel?.(i))
                            }
                        },
                        continue: () => (u?.(), y),
                        cancelRetry: () => {
                            l = !0
                        },
                        continueRetry: () => {
                            l = !1
                        },
                        canStart: m,
                        start: () => (m() ? C() : b().then(C), y),
                    }
                },
            ],
            21964,
        )
        var u = e.i(78774),
            h = class {
                #P
                destroy() {
                    this.clearGcTimeout()
                }
                scheduleGc() {
                    ;(this.clearGcTimeout(),
                        (0, t.isValidTimeout)(this.gcTime) &&
                            (this.#P = u.timeoutManager.setTimeout(() => {
                                this.optionalRemove()
                            }, this.gcTime)))
                }
                updateGcTime(e) {
                    this.gcTime = Math.max(this.gcTime || 0, e ?? (i.environmentManager.isServer() ? 1 / 0 : 3e5))
                }
                clearGcTimeout() {
                    void 0 !== this.#P && (u.timeoutManager.clearTimeout(this.#P), (this.#P = void 0))
                }
            }
        e.s(['Removable', 0, h], 14780)
    },
    66519,
    (e) => {
        'use strict'
        e.s([
            'Subscribable',
            0,
            class {
                constructor() {
                    ;((this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this)))
                }
                subscribe(e) {
                    return (
                        this.listeners.add(e),
                        this.onSubscribe(),
                        () => {
                            ;(this.listeners.delete(e), this.onUnsubscribe())
                        }
                    )
                }
                hasListeners() {
                    return this.listeners.size > 0
                }
                onSubscribe() {}
                onUnsubscribe() {}
            },
        ])
    },
    36021,
    78774,
    (e) => {
        'use strict'
        let t = {
                setTimeout: (e, t) => setTimeout(e, t),
                clearTimeout: (e) => clearTimeout(e),
                setInterval: (e, t) => setInterval(e, t),
                clearInterval: (e) => clearInterval(e),
            },
            i = new (class {
                #M = t
                #E = !1
                setTimeoutProvider(e) {
                    this.#M = e
                }
                setTimeout(e, t) {
                    return this.#M.setTimeout(e, t)
                }
                clearTimeout(e) {
                    this.#M.clearTimeout(e)
                }
                setInterval(e, t) {
                    return this.#M.setInterval(e, t)
                }
                clearInterval(e) {
                    this.#M.clearInterval(e)
                }
            })()
        e.s(
            [
                'systemSetTimeoutZero',
                0,
                function (e) {
                    setTimeout(e, 0)
                },
                'timeoutManager',
                0,
                i,
            ],
            78774,
        )
        let s = 'u' < typeof window || 'Deno' in globalThis
        function r(e, t) {
            return (t?.queryKeyHashFn || n)(e)
        }
        function n(e) {
            return JSON.stringify(e, (e, t) =>
                h(t)
                    ? Object.keys(t)
                          .sort()
                          .reduce((e, i) => ((e[i] = t[i]), e), {})
                    : t,
            )
        }
        function a(e, t) {
            if (e === t) return !0
            if (typeof e != typeof t) return !1
            if (e && t && 'object' == typeof e && 'object' == typeof t) {
                if (Array.isArray(e) && Array.isArray(t)) {
                    for (let i = 0; i < t.length; i++) if (!a(e[i], t[i])) return !1
                    return !0
                }
                for (let i of Object.keys(t)) if (!a(e[i], t[i])) return !1
                return !0
            }
            return !1
        }
        let o = Object.prototype.hasOwnProperty
        function u(e) {
            return Array.isArray(e) && e.length === Object.keys(e).length
        }
        function h(e) {
            if (!c(e)) return !1
            let t = e.constructor
            if (void 0 === t) return !0
            let i = t.prototype
            return !!c(i) && !!i.hasOwnProperty('isPrototypeOf') && Object.getPrototypeOf(e) === Object.prototype
        }
        function c(e) {
            return '[object Object]' === Object.prototype.toString.call(e)
        }
        let l = Symbol()
        e.s(
            [
                'addConsumeAwareSignal',
                0,
                function (e, t, i) {
                    let s,
                        r = !1
                    return (
                        Object.defineProperty(e, 'signal', {
                            enumerable: !0,
                            get: () => ((s ??= t()), r || ((r = !0), s.aborted ? i() : s.addEventListener('abort', i, { once: !0 })), s),
                        }),
                        e
                    )
                },
                'addToEnd',
                0,
                function (e, t, i = 0) {
                    let s = [...e, t]
                    return i && s.length > i ? s.slice(1) : s
                },
                'addToStart',
                0,
                function (e, t, i = 0) {
                    let s = [t, ...e]
                    return i && s.length > i ? s.slice(0, -1) : s
                },
                'ensureQueryFn',
                0,
                function (e, t) {
                    return !e.queryFn && t?.initialPromise
                        ? () => t.initialPromise
                        : e.queryFn && e.queryFn !== l
                          ? e.queryFn
                          : () => Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`))
                },
                'functionalUpdate',
                0,
                function (e, t) {
                    return 'function' == typeof e ? e(t) : e
                },
                'hashKey',
                0,
                n,
                'hashQueryKeyByOptions',
                0,
                r,
                'isServer',
                0,
                s,
                'isValidTimeout',
                0,
                function (e) {
                    return 'number' == typeof e && e >= 0 && e !== 1 / 0
                },
                'matchMutation',
                0,
                function (e, t) {
                    let { exact: i, status: s, predicate: r, mutationKey: o } = e
                    if (o) {
                        if (!t.options.mutationKey) return !1
                        if (i) {
                            if (n(t.options.mutationKey) !== n(o)) return !1
                        } else if (!a(t.options.mutationKey, o)) return !1
                    }
                    return (!s || t.state.status === s) && (!r || !!r(t))
                },
                'matchQuery',
                0,
                function (e, t) {
                    let { type: i = 'all', exact: s, fetchStatus: n, predicate: o, queryKey: u, stale: h } = e
                    if (u) {
                        if (s) {
                            if (t.queryHash !== r(u, t.options)) return !1
                        } else if (!a(t.queryKey, u)) return !1
                    }
                    if ('all' !== i) {
                        let e = t.isActive()
                        if (('active' === i && !e) || ('inactive' === i && e)) return !1
                    }
                    return ('boolean' != typeof h || t.isStale() === h) && (!n || n === t.state.fetchStatus) && (!o || !!o(t))
                },
                'noop',
                0,
                function () {},
                'partialMatchKey',
                0,
                a,
                'replaceData',
                0,
                function (e, t, i) {
                    return 'function' == typeof i.structuralSharing
                        ? i.structuralSharing(e, t)
                        : !1 !== i.structuralSharing
                          ? (function e(t, i, s = 0) {
                                if (t === i) return t
                                if (s > 500) return i
                                let r = u(t) && u(i)
                                if (!r && !(h(t) && h(i))) return i
                                let n = (r ? t : Object.keys(t)).length,
                                    a = r ? i : Object.keys(i),
                                    c = a.length,
                                    l = r ? Array(c) : {},
                                    d = 0
                                for (let u = 0; u < c; u++) {
                                    let h = r ? u : a[u],
                                        c = t[h],
                                        f = i[h]
                                    if (c === f) {
                                        ;((l[h] = c), (r ? u < n : o.call(t, h)) && d++)
                                        continue
                                    }
                                    if (null === c || null === f || 'object' != typeof c || 'object' != typeof f) {
                                        l[h] = f
                                        continue
                                    }
                                    let y = e(c, f, s + 1)
                                    ;((l[h] = y), y === c && d++)
                                }
                                return n === c && d === n ? t : l
                            })(e, t)
                          : t
                },
                'resolveQueryBoolean',
                0,
                function (e, t) {
                    return 'function' == typeof e ? e(t) : e
                },
                'resolveStaleTime',
                0,
                function (e, t) {
                    return 'function' == typeof e ? e(t) : e
                },
                'shallowEqualObjects',
                0,
                function (e, t) {
                    if (!t || Object.keys(e).length !== Object.keys(t).length) return !1
                    for (let i in e) if (e[i] !== t[i]) return !1
                    return !0
                },
                'shouldThrowError',
                0,
                function (e, t) {
                    return 'function' == typeof e ? e(...t) : !!e
                },
                'skipToken',
                0,
                l,
                'sleep',
                0,
                function (e) {
                    return new Promise((t) => {
                        i.setTimeout(t, e)
                    })
                },
                'timeUntilStale',
                0,
                function (e, t) {
                    return Math.max(e + (t || 0) - Date.now(), 0)
                },
            ],
            36021,
        )
    },
    60687,
    (e) => {
        'use strict'
        var t = e.i(30216),
            i = e.i(48607)
        let s = t.createContext(void 0)
        e.s([
            'QueryClientContext',
            0,
            s,
            'QueryClientProvider',
            0,
            ({ client: e, children: r }) => (
                t.useEffect(
                    () => (
                        e.mount(),
                        () => {
                            e.unmount()
                        }
                    ),
                    [e],
                ),
                (0, i.jsx)(s.Provider, { value: e, children: r })
            ),
            'useQueryClient',
            0,
            (e) => {
                let i = t.useContext(s)
                if (e) return e
                if (!i) throw Error('No QueryClient set, use QueryClientProvider to set one')
                return i
            },
        ])
    },
    76229,
    (e) => {
        'use strict'
        var t = e.i(30216),
            i = (e, t, i, s, r, n, a, o) => {
                let u = document.documentElement,
                    h = ['light', 'dark']
                function c(t) {
                    var i
                    ;((Array.isArray(e) ? e : [e]).forEach((e) => {
                        let i = 'class' === e,
                            s = i && n ? r.map((e) => n[e] || e) : r
                        i ? (u.classList.remove(...s), u.classList.add(n && n[t] ? n[t] : t)) : u.setAttribute(e, t)
                    }),
                        (i = t),
                        o && h.includes(i) && (u.style.colorScheme = i))
                }
                if (s) c(s)
                else
                    try {
                        let e = localStorage.getItem(t) || i,
                            s = a && 'system' === e ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : e
                        c(s)
                    } catch (e) {}
            },
            s = ['light', 'dark'],
            r = '(prefers-color-scheme: dark)',
            n = 'u' < typeof window,
            a = t.createContext(void 0),
            o = { setTheme: (e) => {}, themes: [] },
            u = ['light', 'dark'],
            h = ({
                forcedTheme: e,
                disableTransitionOnChange: i = !1,
                enableSystem: n = !0,
                enableColorScheme: o = !0,
                storageKey: h = 'theme',
                themes: y = u,
                defaultTheme: p = n ? 'system' : 'light',
                attribute: m = 'data-theme',
                value: v,
                children: g,
                nonce: b,
                scriptProps: C,
            }) => {
                let [S, w] = t.useState(() => l(h, p)),
                    [O, T] = t.useState(() => ('system' === S ? f() : S)),
                    q = v ? Object.values(v) : y,
                    P = t.useCallback(
                        (e) => {
                            let t = e
                            if (!t) return
                            'system' === e && n && (t = f())
                            let r = v ? v[t] : t,
                                a = i ? d(b) : null,
                                u = document.documentElement,
                                h = (e) => {
                                    'class' === e
                                        ? (u.classList.remove(...q), r && u.classList.add(r))
                                        : e.startsWith('data-') && (r ? u.setAttribute(e, r) : u.removeAttribute(e))
                                }
                            if ((Array.isArray(m) ? m.forEach(h) : h(m), o)) {
                                let e = s.includes(p) ? p : null,
                                    i = s.includes(t) ? t : e
                                u.style.colorScheme = i
                            }
                            null == a || a()
                        },
                        [b],
                    ),
                    M = t.useCallback(
                        (e) => {
                            let t = 'function' == typeof e ? e(S) : e
                            w(t)
                            try {
                                localStorage.setItem(h, t)
                            } catch (e) {}
                        },
                        [S],
                    ),
                    E = t.useCallback(
                        (t) => {
                            ;(T(f(t)), 'system' === S && n && !e && P('system'))
                        },
                        [S, e],
                    )
                ;(t.useEffect(() => {
                    let e = window.matchMedia(r)
                    return (e.addListener(E), E(e), () => e.removeListener(E))
                }, [E]),
                    t.useEffect(() => {
                        let e = (e) => {
                            e.key === h && (e.newValue ? w(e.newValue) : M(p))
                        }
                        return (window.addEventListener('storage', e), () => window.removeEventListener('storage', e))
                    }, [M]),
                    t.useEffect(() => {
                        P(null != e ? e : S)
                    }, [e, S]))
                let A = t.useMemo(
                    () => ({
                        theme: S,
                        setTheme: M,
                        forcedTheme: e,
                        resolvedTheme: 'system' === S ? O : S,
                        themes: n ? [...y, 'system'] : y,
                        systemTheme: n ? O : void 0,
                    }),
                    [S, M, e, O, n, y],
                )
                return t.createElement(
                    a.Provider,
                    { value: A },
                    t.createElement(c, {
                        forcedTheme: e,
                        storageKey: h,
                        attribute: m,
                        enableSystem: n,
                        enableColorScheme: o,
                        defaultTheme: p,
                        value: v,
                        themes: y,
                        nonce: b,
                        scriptProps: C,
                    }),
                    g,
                )
            },
            c = t.memo(
                ({
                    forcedTheme: e,
                    storageKey: s,
                    attribute: r,
                    enableSystem: n,
                    enableColorScheme: a,
                    defaultTheme: o,
                    value: u,
                    themes: h,
                    nonce: c,
                    scriptProps: l,
                }) => {
                    let d = JSON.stringify([r, s, o, e, h, u, n, a]).slice(1, -1)
                    return t.createElement('script', {
                        ...l,
                        suppressHydrationWarning: !0,
                        nonce: 'u' < typeof window ? c : '',
                        dangerouslySetInnerHTML: { __html: `(${i.toString()})(${d})` },
                    })
                },
            ),
            l = (e, t) => {
                let i
                if (!n) {
                    try {
                        i = localStorage.getItem(e) || void 0
                    } catch (e) {}
                    return i || t
                }
            },
            d = (e) => {
                let t = document.createElement('style')
                return (
                    e && t.setAttribute('nonce', e),
                    t.appendChild(
                        document.createTextNode(
                            '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}',
                        ),
                    ),
                    document.head.appendChild(t),
                    () => {
                        ;(window.getComputedStyle(document.body),
                            setTimeout(() => {
                                document.head.removeChild(t)
                            }, 1))
                    }
                )
            },
            f = (e) => (e || (e = window.matchMedia(r)), e.matches ? 'dark' : 'light')
        e.s([
            'ThemeProvider',
            0,
            (e) => (t.useContext(a) ? t.createElement(t.Fragment, null, e.children) : t.createElement(h, { ...e })),
            'useTheme',
            0,
            () => {
                var e
                return null != (e = t.useContext(a)) ? e : o
            },
        ])
    },
    95472,
    (e, t, i) => {
        'use strict'
        var s = e.r(30216).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
        i.c = function (e) {
            return s.H.useMemoCache(e)
        }
    },
    83782,
    (e, t, i) => {
        'use strict'
        ;(e.i(5058), (t.exports = e.r(95472)))
    },
])
