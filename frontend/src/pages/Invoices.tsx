import { useEffect, useMemo, useState } from 'react'
import InvoiceTable from '../components/invoices/InvoiceTable'
import PageHeader from '../components/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { mockInvoices } from '../data/invoices'
import { fetchInvoices } from '../services/invoices'
import type { Invoice } from '../types/invoice'

function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        let isMounted = true

        const loadInvoices = async () => {
            try {
                const data = await fetchInvoices()
                if (isMounted) {
                    setInvoices(data)
                }
            } catch {
                if (isMounted) {
                    setError('Unable to load invoices right now.')
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadInvoices()

        return () => {
            isMounted = false
        }
    }, [])

    const filteredInvoices = useMemo(() => {
        const normalizedQuery = searchValue.trim().toLowerCase()
        return invoices.filter((invoice) => {
            const matchesQuery =
                normalizedQuery.length === 0 ||
                invoice.client.toLowerCase().includes(normalizedQuery) ||
                `${invoice.id}`.includes(normalizedQuery)
            const matchesStatus =
                statusFilter === 'all' || invoice.status === statusFilter
            return matchesQuery && matchesStatus
        })
    }, [invoices, searchValue, statusFilter])

    const totalInvoices = invoices.length
    const paidCount = invoices.filter((invoice) => invoice.status === 'paid').length
    const overdueCount = invoices.filter((invoice) => invoice.status === 'overdue').length

    return (
        <section className="space-y-8">
            <PageHeader
                title="Invoices"
                subtitle="Invoice list and status tracking."
            />
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-2">
                            <CardTitle>All invoices</CardTitle>
                            <CardDescription>
                                Track due dates, payment status, and outstanding amounts.
                            </CardDescription>
                            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                                <span>{totalInvoices} total</span>
                                <span>{paidCount} paid</span>
                                <span>{overdueCount} overdue</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
                            <label className="w-full text-sm text-slate-500">
                                Search
                                <input
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    type="search"
                                    placeholder="Client or invoice id"
                                    value={searchValue}
                                    onChange={(event) => setSearchValue(event.target.value)}
                                />
                            </label>
                            <label className="w-full text-sm text-slate-500">
                                Status
                                <select
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="overdue">Overdue</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {error && invoices.length === 0 ? (
                        <p className="text-sm text-blue-600">{error}</p>
                    ) : isLoading && invoices.length === 0 ? (
                        <p className="text-sm text-slate-500">Loading invoices...</p>
                    ) : filteredInvoices.length === 0 ? (
                        <p className="text-sm text-slate-500">No invoices available.</p>
                    ) : (
                        <InvoiceTable invoices={filteredInvoices} />
                    )}
                </CardContent>
            </Card>
        </section>
    )
}

export default Invoices
