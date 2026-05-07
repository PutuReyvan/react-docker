import { useMemo, useState } from 'react'
import type { Invoice } from '../types/invoice'

function filterInvoices(invoices: Invoice[], query: string, status: string): Invoice[] {
    const normalizedQuery = query.trim().toLowerCase()
    return invoices.filter((invoice) => {
        const matchesQuery =
            normalizedQuery.length === 0 ||
            invoice.client.toLowerCase().includes(normalizedQuery) ||
            `${invoice.id}`.includes(normalizedQuery)
        const matchesStatus = status === 'all' || invoice.status === status
        return matchesQuery && matchesStatus
    })
}

export function useInvoiceFilters(invoices: Invoice[]) {
    const [searchValue, setSearchValue] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const filteredInvoices = useMemo(
        () => filterInvoices(invoices, searchValue, statusFilter),
        [invoices, searchValue, statusFilter],
    )

    return { searchValue, setSearchValue, statusFilter, setStatusFilter, filteredInvoices }
}
