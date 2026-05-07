import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type CardProps = HTMLAttributes<HTMLDivElement>
type CardTextProps = HTMLAttributes<HTMLParagraphElement>
type CardTitleProps = HTMLAttributes<HTMLHeadingElement>

export function Card({ className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-sm border border-border bg-surface',
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
            className={cn('font-heading text-base font-semibold text-primary', className)}
            {...props}
        />
    )
}

export function CardDescription({ className, ...props }: CardTextProps) {
    return (
        <p className={cn('text-sm text-secondary', className)} {...props} />
    )
}

export function CardContent({ className, ...props }: CardProps) {
    return <div className={cn('px-6 pb-6', className)} {...props} />
}
