import type { InvoiceStatus } from '../../types/invoice'

const statusStyles: Record<InvoiceStatus, string> = {
    paid: 'bg-success-bg text-success-text',
    pending: 'bg-warning-bg text-warning-text',
    overdue: 'bg-danger-bg text-danger-text',
}

const statusLabels: Record<InvoiceStatus, string> = {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
}

type InvoiceStatusBadgeProps = {
    status: InvoiceStatus
}

function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
    return (
        <span
            data-testid="invoice-status-badge"
            className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${statusStyles[status]}`}
        >
            {statusLabels[status]}
        </span>
    )
}

export default InvoiceStatusBadge

