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
}

function InvoiceTable({ invoices }: InvoiceTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="text-slate-500">#{invoice.id}</TableCell>
                        <TableCell className="font-medium text-slate-900">
                            {invoice.client}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <InvoiceStatusBadge status={invoice.status} />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-slate-500">
                            {formatDate(invoice.dueDate)}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-slate-900">
                            {formatCurrency(invoice.amount)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default InvoiceTable
