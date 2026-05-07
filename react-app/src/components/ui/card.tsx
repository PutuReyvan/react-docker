import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type CardProps = HTMLAttributes<HTMLDivElement>

type CardTextProps = HTMLAttributes<HTMLParagraphElement>

type CardTitleProps = HTMLAttributes<HTMLHeadingElement>

export function Card({ className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl border border-slate-200 bg-white shadow-sm',
                className,
            )}
            {...props}
        />
    )
}

export function CardHeader({ className, ...props }: CardProps) {
    return <div className={cn('space-y-1.5 px-6 pt-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: CardTitleProps) {
    return (
        <h3
            className={cn('text-base font-semibold text-slate-900', className)}
            {...props}
        />
    )
}

export function CardDescription({ className, ...props }: CardTextProps) {
    return (
        <p className={cn('text-sm text-slate-500', className)} {...props} />
    )
}

export function CardContent({ className, ...props }: CardProps) {
    return <div className={cn('px-6 pb-6', className)} {...props} />
}
