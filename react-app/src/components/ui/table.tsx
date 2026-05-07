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
    return <thead className={cn('bg-slate-50', className)} {...props} />
}

export function TableBody({ className, ...props }: TableSectionProps) {
    return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

export function TableRow({ className, ...props }: TableRowProps) {
    return (
        <tr
            className={cn(
                'border-b border-slate-200 transition-colors hover:bg-slate-50',
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
                'h-11 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500',
                className,
            )}
            {...props}
        />
    )
}

export function TableCell({ className, ...props }: TableCellProps) {
    return (
        <td
            className={cn('px-4 py-3 align-middle text-slate-900', className)}
            {...props}
        />
    )
}

export function TableCaption({ className, ...props }: TableCaptionProps) {
    return (
        <caption className={cn('mt-4 text-sm text-slate-500', className)} {...props} />
    )
}
