'use client'

import { useRouter } from 'next/navigation'

import { useGetLogList } from '@entities/log/log.query'
import { DataTable } from '@features/data-table/data-table'
import { PageRoot } from '@features/page-root/page-root'
import { PanelCard } from '@features/panel-card/panel-card'
import { Pager } from '@features/pager/pager'
import { StateCard } from '@features/state-card/state-card'
import { formatCount, formatDateTime } from '@shared/lib/format'
import { cn } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'

import type { LogListParams } from '@entities/log/log.query'
import type { LogEntry, LogLevel } from '@entities/log/log.type'
import type { DataTableColumn } from '@features/data-table/data-table'
import type { FC } from 'react'

type LogsWidgetProps = {
    params: LogListParams
}

const LEVEL_FILTERS: { value: LogLevel | undefined; label: string }[] = [
    { value: undefined, label: '전체' },
    { value: 'info', label: 'info' },
    { value: 'warn', label: 'warn' },
    { value: 'error', label: 'error' },
]

const LEVEL_CLASS: Record<string, string> = {
    info: 'text-muted-foreground',
    warn: 'text-foreground',
    error: 'text-destructive',
}

const COLUMNS: DataTableColumn<LogEntry>[] = [
    {
        key: 'createdAt',
        label: '시각',
        width: 160,
        mono: true,
        render: (entry) => <span suppressHydrationWarning>{formatDateTime(entry.createdAt)}</span>,
    },
    {
        key: 'level',
        label: '레벨',
        width: 64,
        mono: true,
        render: (entry) => <span className={cn(LEVEL_CLASS[entry.level])}>{entry.level}</span>,
    },
    { key: 'event', label: '이벤트', width: 160, mono: true, render: (entry) => entry.event },
    {
        key: 'message',
        label: '메시지',
        flexible: true,
        render: (entry) => (
            <span>
                {entry.message}
                {entry.detailsJson ? <span className='ml-2 font-mono text-muted-foreground'>{entry.detailsJson}</span> : null}
            </span>
        ),
    },
]

export const LogsWidget: FC<LogsWidgetProps> = ({ params }) => {
    const router = useRouter()
    const { data } = useGetLogList(params)

    const pushList = (page: number, level: LogLevel | undefined) => {
        const query = new URLSearchParams({ page: String(page) })
        if (level) query.set('level', level)
        router.push(`/logs?${query.toString()}`)
    }

    return (
        <PageRoot>
            <PanelCard contentClassName='flex flex-wrap items-center gap-2'>
                {LEVEL_FILTERS.map((filter) => (
                    <Button
                        key={filter.label}
                        size='sm'
                        variant={params.level === filter.value ? 'default' : 'outline'}
                        onClick={() => pushList(1, filter.value)}>
                        {filter.label}
                    </Button>
                ))}
            </PanelCard>
            {data.data.length === 0 ? (
                <StateCard
                    variant='empty'
                    title={params.level ? `${params.level} 로그가 없습니다` : '기록된 로그가 없습니다'}
                    description='동기화·인증 이벤트가 발생하면 여기에 기록됩니다'
                />
            ) : (
                <PanelCard title={`로그 ${formatCount(data.pagination.total)}건`} contentClassName='flex flex-col gap-2'>
                    <DataTable columns={COLUMNS} rows={data.data} rowKey={(entry) => entry.id} />
                    <Pager
                        page={data.pagination.page}
                        totalPages={data.pagination.totalPages}
                        onPageChange={(page) => pushList(page, params.level)}
                    />
                </PanelCard>
            )}
        </PageRoot>
    )
}
