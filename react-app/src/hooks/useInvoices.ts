import { useEffect, useState } from 'react'
import { mockInvoices } from '../data/invoices'
import { fetchInvoices } from '../services/invoices'
import type { Invoice } from '../types/invoice'

export function useInvoices() {
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const load = async () => {
            try {
                const data = await fetchInvoices()
                if (isMounted) setInvoices(data)
            } catch {
                if (isMounted) setError('Unable to load invoice data.')
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        load()

        return () => {
            isMounted = false
        }
    }, []) // fetchInvoices is a stable module-level import; effect runs once on mount

    return { invoices, isLoading, error }
}
