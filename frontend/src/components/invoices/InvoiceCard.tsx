import type { Invoice } from '../../types/invoice'
import { formatCurrency, formatDate } from '../../lib/formatters'
import InvoiceStatusBadge from './InvoiceStatusBadge'

type InvoiceCardProps = {
    invoice: Invoice
}

function InvoiceCard({ invoice }: InvoiceCardProps) {
    return (
        <div
            data-testid="invoice-card"
            className="h-full border border-border bg-surface p-4 rounded-sm hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-primary">
                        {invoice.client}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">Invoice #{invoice.id}</p>
                </div>
                <InvoiceStatusBadge status={invoice.status} />
            </div>
            <div className="mt-4 flex items-end justify-between">
                <p className="font-heading text-lg font-medium tracking-tight text-primary">
                    {formatCurrency(invoice.amount)}
                </p>
                <p className="text-xs text-muted">
                    Due {formatDate(invoice.dueDate)}
                </p>
            </div>
        </div>
    )
}

export default InvoiceCard

