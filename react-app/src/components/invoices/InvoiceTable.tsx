import type { Invoice } from '../../types/invoice'
import { formatCurrency, formatDate } from '../../lib/formatters'
import InvoiceStatusBadge from './InvoiceStatusBadge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'

type InvoiceTableProps = {
    invoices: Invoice[]
    onDeleteInvoice?: (id: number) => void
    onEditInvoice?: (invoice: Invoice) => void
}

function InvoiceTable({ invoices, onDeleteInvoice, onEditInvoice }: InvoiceTableProps) {
    return (
        <Table data-testid="invoice-table">
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id} data-testid="invoice-table-row">
                        <TableCell className="font-mono text-xs text-muted">
                            #{invoice.id}
                        </TableCell>
                        <TableCell className="font-medium text-primary">
                            {invoice.client}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <InvoiceStatusBadge status={invoice.status} />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-secondary">
                            {formatDate(invoice.dueDate)}
                        </TableCell>
                        <TableCell className="text-right font-heading font-medium text-primary">
                            {formatCurrency(invoice.amount)}
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <button
                                    className="rounded-sm border border-border px-2.5 py-1 text-xs font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
                                    type="button"
                                    onClick={() => onEditInvoice?.(invoice)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="rounded-sm border border-danger-text/30 px-2.5 py-1 text-xs font-semibold text-danger-text transition-colors hover:bg-danger-text hover:text-white"
                                    type="button"
                                    onClick={() => onDeleteInvoice?.(invoice.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default InvoiceTable

