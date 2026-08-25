'use client'

import { useEffect, useState } from 'react'

import { useCreateApiKey, useGetApiKeyList, useRevokeApiKey } from '@entities/api-key/api-key.query'
import { DataTable } from '@features/data-table/data-table'
import { PageRoot } from '@features/page-root/page-root'
import { PanelCard } from '@features/panel-card/panel-card'
import { formatDateTime } from '@shared/lib/format'
import { Badge } from '@shared/ui/badge'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'

import type { ApiKeyRecord, CreatedApiKey } from '@entities/api-key/api-key.type'
import type { DataTableColumn } from '@features/data-table/data-table'
import type { FC, FormEvent } from 'react'

type SettingsPanelProps = {
    backendReachable: boolean
}

const msToDateTime = (ms: number | null) => (ms === null ? '-' : formatDateTime(new Date(ms).toISOString()))

export const SettingsPanel: FC<SettingsPanelProps> = ({ backendReachable }) => {
    const [apiBase, setApiBase] = useState<string | null>(null)
    const [keyName, setKeyName] = useState('')
    const [issuedKey, setIssuedKey] = useState<CreatedApiKey | null>(null)

    const keys = useGetApiKeyList().data
    const createApiKey = useCreateApiKey()
    const revokeApiKey = useRevokeApiKey()

    const handleCreate = async (event: FormEvent) => {
        event.preventDefault()
        const name = keyName.trim()
        if (!name) return
        const created = await createApiKey.mutateAsync(name)
        setIssuedKey(created)
        setKeyName('')
    }

    const columns: DataTableColumn<ApiKeyRecord>[] = [
        { key: 'name', label: '이름', flexible: true, render: (key) => key.name },
        { key: 'start', label: '키', width: 112, mono: true, render: (key) => `${key.start}...` },
        {
            key: 'createdAt',
            label: '생성',
            width: 160,
            align: 'right',
            mono: true,
            render: (key) => <span suppressHydrationWarning>{msToDateTime(key.createdAtMs)}</span>,
        },
        {
            key: 'lastUsedAt',
            label: '마지막 사용',
            width: 160,
            align: 'right',
            mono: true,
            render: (key) => <span suppressHydrationWarning>{msToDateTime(key.lastUsedAtMs)}</span>,
        },
        {
            key: 'status',
            label: '상태',
            width: 80,
            render: (key) => (key.revokedAtMs === null ? <Badge variant='secondary'>활성</Badge> : <Badge variant='outline'>폐기됨</Badge>),
        },
        {
            key: 'actions',
            label: '',
            width: 80,
            align: 'right',
            render: (key) =>
                key.revokedAtMs === null ? (
                    <Button
                        variant='ghost'
                        size='sm'
                        className='text-destructive'
                        disabled={revokeApiKey.isPending}
                        onClick={() => revokeApiKey.mutate(key.id)}>
                        폐기
                    </Button>
                ) : null,
        },
    ]

    useEffect(() => {
        setApiBase(window.location.origin)
    }, [])

    return (
        <PageRoot>
            <PanelCard title='연결' contentClassName='flex flex-col gap-2 text-xs'>
                <div className='flex flex-wrap items-center gap-2'>
                    <span className='text-muted-foreground'>API·MCP origin (웹과 동일 — 백엔드는 비노출 프록시 경유)</span>
                    <span className='font-mono' suppressHydrationWarning>
                        {apiBase ?? '-'}
                    </span>
                    {backendReachable ? (
                        <span className='text-muted-foreground'>연결됨</span>
                    ) : (
                        <span className='text-destructive'>연결할 수 없음</span>
                    )}
                </div>
                <p className='text-muted-foreground'>세션 키는 httpOnly 쿠키로 보관되며 브라우저 스크립트에서 접근할 수 없습니다.</p>
            </PanelCard>
            <PanelCard title='API 키 관리' contentClassName='flex flex-col gap-3'>
                {issuedKey ? (
                    <div className='flex flex-col gap-1 bg-muted p-3 text-xs'>
                        <p>
                            새 키 <span className='font-medium'>{issuedKey.name}</span> 가 생성되었습니다. 지금 복사하세요 — 다시 표시되지 않습니다.
                        </p>
                        <code data-new-key className='font-mono break-all'>
                            {issuedKey.key}
                        </code>
                    </div>
                ) : null}
                <form onSubmit={handleCreate} className='flex flex-wrap items-end gap-2'>
                    <div className='flex min-w-0 flex-1 flex-col gap-1'>
                        <label htmlFor='key-name' className='text-xs text-muted-foreground'>
                            키 이름
                        </label>
                        <Input id='key-name' value={keyName} onChange={(event) => setKeyName(event.target.value)} placeholder='예: claude-mcp' />
                    </div>
                    <Button type='submit' size='sm' disabled={createApiKey.isPending || keyName.trim().length === 0}>
                        키 생성
                    </Button>
                </form>
                {createApiKey.isError ? <p className='text-xs text-destructive'>키 생성에 실패했습니다</p> : null}
                <DataTable columns={columns} rows={keys} rowKey={(key) => key.id} />
                <p className='text-xs text-muted-foreground'>현재 웹 세션이 사용 중인 키를 폐기하면 즉시 로그아웃됩니다.</p>
            </PanelCard>
            <PanelCard title='MCP' contentClassName='flex flex-col gap-2 text-xs'>
                <p className='text-muted-foreground'>
                    AI 클라이언트는 위에서 발급한 API 키로 MCP 엔드포인트에 접속합니다. 요청은 웹이 백엔드로 프록시합니다.
                </p>
                <code className='font-mono break-all' suppressHydrationWarning>
                    {apiBase ? `${apiBase}/mcp` : '-'}
                </code>
                <code className='bg-muted p-2 font-mono break-all' suppressHydrationWarning>
                    {apiBase ? `claude mcp add --transport http message-container ${apiBase}/mcp --header "Authorization: Bearer msg_..."` : '-'}
                </code>
            </PanelCard>
        </PageRoot>
    )
}
