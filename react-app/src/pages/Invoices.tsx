import { MagnifyingGlass } from '@phosphor-icons/react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import InvoiceTable from '../components/invoices/InvoiceTable'
import PageHeader from '../components/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useInvoices } from '../hooks/useInvoices'
import { useInvoiceFilters } from '../hooks/useInvoiceFilters'
import type { CreateInvoiceInput, Invoice, InvoiceStatus } from '../types/invoice'

type InvoiceFormState = {
    amount: string
    client: string
    dueDate: string
    status: InvoiceStatus
}

type InvoicesContentProps = {
    error: string | null
    isLoading: boolean
    invoices: Invoice[]
    filteredInvoices: Invoice[]
    onDeleteInvoice: (id: number) => void
    onEditInvoice: (invoice: Invoice) => void
}

const emptyForm: InvoiceFormState = {
    amount: '',
    client: '',
    dueDate: '',
    status: 'pending',
}

function toFormState(invoice: Invoice): InvoiceFormState {
    return {
        amount: String(invoice.amount),
        client: invoice.client,
        dueDate: invoice.dueDate,
        status: invoice.status,
    }
}

function toInvoiceInput(form: InvoiceFormState): CreateInvoiceInput {
    return {
        amount: Number(form.amount),
        client: form.client.trim(),
        dueDate: form.dueDate,
        status: form.status,
    }
}

function InvoicesContent({
    error,
    isLoading,
    invoices,
    filteredInvoices,
    onDeleteInvoice,
    onEditInvoice,
}: InvoicesContentProps) {
    if (error && invoices.length === 0) {
        return <p className="text-sm text-danger-text">{error}</p>
    }
    if (isLoading && invoices.length === 0) {
        return <p className="text-sm text-muted">Loading invoices...</p>
    }
    if (filteredInvoices.length === 0) {
        return <p className="text-sm text-muted">No invoices match your filters.</p>
    }
    return (
        <InvoiceTable
            invoices={filteredInvoices}
            onDeleteInvoice={onDeleteInvoice}
            onEditInvoice={onEditInvoice}
        />
    )
}

function Invoices() {
    const { invoices, isLoading, error, mutationError, addInvoice, editInvoice, removeInvoice } =
        useInvoices()
    const { searchValue, setSearchValue, statusFilter, setStatusFilter, filteredInvoices } =
        useInvoiceFilters(invoices)
    const [form, setForm] = useState<InvoiceFormState>(emptyForm)
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)

    const paidCount = invoices.filter((inv) => inv.status === 'paid').length
    const overdueCount = invoices.filter((inv) => inv.status === 'overdue').length

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const invoiceInput = toInvoiceInput(form)

        if (editingInvoice) {
            await editInvoice(editingInvoice.id, invoiceInput)
            setEditingInvoice(null)
        } else {
            await addInvoice(invoiceInput)
        }

        setForm(emptyForm)
    }

    const handleDelete = (id: number) => {
        if (editingInvoice?.id === id) {
            setEditingInvoice(null)
            setForm(emptyForm)
        }
        removeInvoice(id)
    }

    const handleEdit = (invoice: Invoice) => {
        setEditingInvoice(invoice)
        setForm(toFormState(invoice))
    }

    const handleCancelEdit = () => {
        setEditingInvoice(null)
        setForm(emptyForm)
    }

    return (
        <section className="space-y-10" data-testid="invoices-page">
            <PageHeader title="Invoices" subtitle="Invoice list and status tracking." />
            <Card>
                <CardHeader>
                    <CardTitle>{editingInvoice ? `Edit invoice #${editingInvoice.id}` : 'Add invoice'}</CardTitle>
                    <CardDescription>
                        Enter client, amount, status, and due date for invoice tracking.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5 xl:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                                Client
                            </label>
                            <input
                                required
                                className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                data-testid="invoice-client-input"
                                type="text"
                                value={form.client}
                                onChange={(event) =>
                                    setForm((current) => ({ ...current, client: event.target.value }))
                                }
                                placeholder="Client name"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                                Amount
                            </label>
                            <input
                                required
                                min="0.01"
                                step="0.01"
                                className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                data-testid="invoice-amount-input"
                                type="number"
                                value={form.amount}
                                onChange={(event) =>
                                    setForm((current) => ({ ...current, amount: event.target.value }))
                                }
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                                Due date
                            </label>
                            <input
                                required
                                className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                data-testid="invoice-due-date-input"
                                type="date"
                                value={form.dueDate}
                                onChange={(event) =>
                                    setForm((current) => ({ ...current, dueDate: event.target.value }))
                                }
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                                Status
                            </label>
                            <select
                                className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                data-testid="invoice-form-status"
                                value={form.status}
                                onChange={(event) =>
                                    setForm((current) => ({
                                        ...current,
                                        status: event.target.value as InvoiceStatus,
                                    }))
                                }
                            >
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="overdue">Overdue</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap items-end gap-2 md:col-span-2 xl:col-span-5">
                            <button
                                className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent"
                                type="submit"
                            >
                                {editingInvoice ? 'Save invoice' : 'Add invoice'}
                            </button>
                            {editingInvoice ? (
                                <button
                                    className="rounded-sm border border-border px-4 py-2 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
                                    type="button"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            ) : null}
                            {mutationError ? (
                                <p className="text-sm text-muted" role="status">
                                    {mutationError}
                                </p>
                            ) : null}
                        </div>
                    </form>
                </CardContent>
            </Card>
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
                        onDeleteInvoice={handleDelete}
                        onEditInvoice={handleEdit}
                    />
                </CardContent>
            </Card>
        </section>
    )
}

export default Invoices
