import { useCallback, useEffect, useState } from 'react'
import { mockInvoices } from '../data/invoices'
import {
    createInvoice,
    deleteInvoice,
    fetchInvoices,
    updateInvoice,
} from '../services/invoices'
import type { CreateInvoiceInput, Invoice, UpdateInvoiceInput } from '../types/invoice'

export function useInvoices() {
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [mutationError, setMutationError] = useState<string | null>(null)

    const loadInvoices = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await fetchInvoices()
            setInvoices(data)
            setError(null)
        } catch {
            setError('Unable to load invoice data.')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadInvoices()
    }, [loadInvoices])

    const addInvoice = async (invoice: CreateInvoiceInput) => {
        const optimisticInvoice = {
            ...invoice,
            id: Math.max(...invoices.map((current) => current.id), 0) + 1,
        }

        setInvoices((current) => [...current, optimisticInvoice])
        setMutationError(null)

        try {
            const savedInvoice = await createInvoice(invoice)
            setInvoices((current) =>
                current.map((existing) =>
                    existing.id === optimisticInvoice.id ? savedInvoice : existing,
                ),
            )
        } catch {
            setMutationError('API unavailable. Invoice was added locally for this session.')
        }
    }

    const editInvoice = async (id: number, invoice: UpdateInvoiceInput) => {
        setInvoices((current) =>
            current.map((existing) =>
                existing.id === id ? { ...existing, ...invoice } : existing,
            ),
        )
        setMutationError(null)

        try {
            const savedInvoice = await updateInvoice(id, invoice)
            setInvoices((current) =>
                current.map((existing) => (existing.id === id ? savedInvoice : existing)),
            )
        } catch {
            setMutationError('API unavailable. Invoice changes were kept locally for this session.')
        }
    }

    const removeInvoice = async (id: number) => {
        setInvoices((current) => current.filter((invoice) => invoice.id !== id))
        setMutationError(null)

        try {
            await deleteInvoice(id)
        } catch {
            setMutationError('API unavailable. Invoice was deleted locally for this session.')
        }
    }

    return {
        invoices,
        isLoading,
        error,
        mutationError,
        refreshInvoices: loadInvoices,
        addInvoice,
        editInvoice,
        removeInvoice,
    }
}
