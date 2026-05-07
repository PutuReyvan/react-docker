import type { InvoiceStatus } from '../../types/invoice'
import { Badge } from '../ui/badge'

const statusStyles: Record<InvoiceStatus, string> = {
    paid: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    pending: 'border-amber-200 bg-amber-50 text-amber-700',
    overdue: 'border-rose-200 bg-rose-50 text-rose-700',
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
    return <Badge className={statusStyles[status]}>{statusLabels[status]}</Badge>
}

export default InvoiceStatusBadge
