'use client'

import { useGetSyncStatus, useRunSync } from '@entities/sync/sync.query'
import { PageRoot } from '@features/page-root/page-root'
import { PanelCard } from '@features/panel-card/panel-card'
import { StatTile } from '@features/stat-tile/stat-tile'
import { formatCount, formatDateTime } from '@shared/lib/format'
import { Button } from '@shared/ui/button'

import type { FC } from 'react'

export const SyncStatusWidget: FC = () => {
    const { data } = useGetSyncStatus()
    const runSync = useRunSync()

    return (
        <PageRoot>
            <div className='grid grid-cols-2 gap-px md:grid-cols-4'>
                <StatTile label='대화' value={formatCount(data.counts.chats)} />
                <StatTile label='메시지' value={formatCount(data.counts.messages)} />
                <StatTile label='첨부파일' value={formatCount(data.counts.attachments)} />
                <StatTile label='커서 (message ROWID)' value={formatCount(data.cursor)} />
            </div>
            <PanelCard title='동기화 상태' contentClassName='flex flex-col gap-2'>
                <div className='flex flex-wrap items-center gap-2 text-xs'>
                    <span className='text-muted-foreground'>마지막 동기화</span>
                    <span className='font-mono tabular-nums' suppressHydrationWarning>
                        {formatDateTime(data.lastSyncAt)}
                    </span>
                </div>
                <div className='flex flex-wrap items-center gap-2 text-xs'>
                    <span className='text-muted-foreground'>마지막 에러</span>
                    {data.lastError ? (
                        <span className='font-mono text-destructive'>{data.lastError}</span>
                    ) : (
                        <span className='text-muted-foreground'>없음</span>
                    )}
                </div>
                <div className='flex items-center gap-2'>
                    <Button size='sm' disabled={runSync.isPending} onClick={() => runSync.mutate()}>
                        지금 동기화
                    </Button>
                    {runSync.isSuccess ? (
                        <span className='text-xs text-muted-foreground tabular-nums'>{formatCount(runSync.data.synced)}건 동기화됨</span>
                    ) : null}
                    {runSync.isError ? <span className='text-xs text-destructive'>동기화 실행에 실패했습니다</span> : null}
                </div>
                <p className='text-xs text-muted-foreground'>동기화는 서버에서 주기적으로 자동 실행되며, 이 화면은 5초마다 상태를 갱신합니다.</p>
            </PanelCard>
        </PageRoot>
    )
}
