import type { Invoice } from '../../types/invoice'
import { formatCurrency, formatDate } from '../../lib/formatters'
import { Card, CardContent } from '../ui/card'
import InvoiceStatusBadge from './InvoiceStatusBadge'

type InvoiceCardProps = {
    invoice: Invoice
}

function InvoiceCard({ invoice }: InvoiceCardProps) {
    return (
        <Card className="h-full">
            <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            {invoice.client}
                        </p>
                        <p className="text-xs text-slate-500">Invoice #{invoice.id}</p>
                    </div>
                    <div className="pt-1">
                        <InvoiceStatusBadge status={invoice.status} />
                    </div>
                </div>
                <div className="flex items-end justify-between">
                    <p className="text-lg font-semibold text-slate-900">
                        {formatCurrency(invoice.amount)}
                    </p>
                    <p className="text-xs text-slate-500">
                        Due {formatDate(invoice.dueDate)}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default InvoiceCard
