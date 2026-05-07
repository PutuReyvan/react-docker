import type { ReactNode } from 'react'

type InvoiceStatCardProps = {
    label: string
    value: string
    helper?: string
    icon?: ReactNode
}

function InvoiceStatCard({ label, value, helper, icon }: InvoiceStatCardProps) {
    return (
        <div
            data-testid="stat-card"
            className="relative border border-border bg-surface p-5 rounded-sm hover:border-primary transition-colors duration-200"
        >
            {icon && (
                <div className="absolute right-4 top-4 text-muted">
                    {icon}
                </div>
            )}
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                {label}
            </p>
            <p className="mt-3 font-heading text-3xl font-medium tracking-tight text-primary">
                {value}
            </p>
            {helper ? (
                <p className="mt-1 text-xs text-muted">{helper}</p>
            ) : null}
        </div>
    )
}

export default InvoiceStatCard

