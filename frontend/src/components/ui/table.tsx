import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type TableProps = HTMLAttributes<HTMLTableElement>
type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>
type TableRowProps = HTMLAttributes<HTMLTableRowElement>
type TableCellProps = HTMLAttributes<HTMLTableCellElement>
type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>

export function Table({ className, ...props }: TableProps) {
    return (
        <div className="w-full overflow-x-auto">
            <table className={cn('w-full text-sm', className)} {...props} />
        </div>
    )
}

export function TableHeader({ className, ...props }: TableSectionProps) {
    return <thead className={cn('border-b border-border bg-surface-alt', className)} {...props} />
}

export function TableBody({ className, ...props }: TableSectionProps) {
    return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

export function TableRow({ className, ...props }: TableRowProps) {
    return (
        <tr
            className={cn(
                'border-b border-border transition-colors hover:bg-surface-alt',
                className,
            )}
            {...props}
        />
    )
}

export function TableHead({ className, ...props }: TableCellProps) {
    return (
        <th
            className={cn(
                'h-10 px-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted',
                className,
            )}
            {...props}
        />
    )
}

export function TableCell({ className, ...props }: TableCellProps) {
    return (
        <td
            className={cn('px-4 py-4 align-middle text-primary', className)}
            {...props}
        />
    )
}

export function TableCaption({ className, ...props }: TableCaptionProps) {
    return (
        <caption className={cn('mt-4 text-sm text-muted', className)} {...props} />
    )
}
