import { MagnifyingGlass } from '@phosphor-icons/react'
import InvoiceTable from '../components/invoices/InvoiceTable'
import PageHeader from '../components/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useInvoices } from '../hooks/useInvoices'
import { useInvoiceFilters } from '../hooks/useInvoiceFilters'
import type { Invoice } from '../types/invoice'

type InvoicesContentProps = {
    error: string | null
    isLoading: boolean
    invoices: Invoice[]
    filteredInvoices: Invoice[]
}

function InvoicesContent({ error, isLoading, invoices, filteredInvoices }: InvoicesContentProps) {
    if (error && invoices.length === 0) {
        return <p className="text-sm text-danger-text">{error}</p>
    }
    if (isLoading && invoices.length === 0) {
        return <p className="text-sm text-muted">Loading invoices...</p>
    }
    if (filteredInvoices.length === 0) {
        return <p className="text-sm text-muted">No invoices match your filters.</p>
    }
    return <InvoiceTable invoices={filteredInvoices} />
}

function Invoices() {
    const { invoices, isLoading, error } = useInvoices()
    const { searchValue, setSearchValue, statusFilter, setStatusFilter, filteredInvoices } =
        useInvoiceFilters(invoices)

    const paidCount = invoices.filter((inv) => inv.status === 'paid').length
    const overdueCount = invoices.filter((inv) => inv.status === 'overdue').length

    return (
        <section className="space-y-10" data-testid="invoices-page">
            <PageHeader title="Invoices" subtitle="Invoice list and status tracking." />
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-2">
                            <CardTitle>All invoices</CardTitle>
                            <CardDescription>
                                Track due dates, payment status, and outstanding amounts.
                            </CardDescription>
                            <div className="flex flex-wrap gap-4 text-xs text-muted">
                                <span data-testid="invoice-total-count">{invoices.length} total</span>
                                <span data-testid="invoice-paid-count">{paidCount} paid</span>
                                <span data-testid="invoice-overdue-count">{overdueCount} overdue</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto">
                            <div className="w-full lg:w-52">
                                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted mb-1.5">
                                    Search
                                </label>
                                <div className="relative">
                                    <MagnifyingGlass
                                        size={14}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                                    />
                                    <input
                                        data-testid="invoice-search-input"
                                        className="w-full rounded-sm border border-border bg-surface pl-8 pr-3 py-2 text-sm text-primary placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        type="search"
                                        placeholder="Client or invoice ID"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-36">
                                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted mb-1.5">
                                    Status
                                </label>
                                <select
                                    data-testid="invoice-status-filter"
                                    className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="overdue">Overdue</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <InvoicesContent
                        error={error}
                        isLoading={isLoading}
                        invoices={invoices}
                        filteredInvoices={filteredInvoices}
                    />
                </CardContent>
            </Card>
        </section>
    )
}

export default Invoices
