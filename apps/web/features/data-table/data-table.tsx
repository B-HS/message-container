import { cn } from '@shared/lib/utils'

import type { ReactNode } from 'react'

export type DataTableColumn<T> = {
    key: string
    label: string
    width?: number
    align?: 'left' | 'right'
    mono?: boolean
    flexible?: boolean
    truncate?: boolean
    render: (row: T) => ReactNode
}

type DataTableProps<T> = {
    columns: DataTableColumn<T>[]
    rows: T[]
    rowKey: (row: T) => string | number
    onRowClick?: (row: T) => void
}

export const DataTable = <T,>({ columns, rows, rowKey, onRowClick }: DataTableProps<T>) => (
    <div className='overflow-x-auto'>
        <table className='w-full text-xs'>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.key}
                            scope='col'
                            style={column.width ? { width: column.width } : undefined}
                            className={cn('p-2 text-left font-medium text-muted-foreground', column.align === 'right' && 'text-right')}>
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr
                        key={rowKey(row)}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                        className={cn('border-b', onRowClick && 'cursor-pointer hover:bg-accent')}>
                        {columns.map((column) => (
                            <td
                                key={column.key}
                                style={column.truncate && column.width ? { maxWidth: column.width } : undefined}
                                className={cn(
                                    'p-2 align-middle',
                                    column.align === 'right' && 'text-right tabular-nums',
                                    column.mono && 'font-mono',
                                    column.flexible && 'max-w-0 truncate',
                                    column.truncate && 'truncate',
                                )}>
                                {column.render(row)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
