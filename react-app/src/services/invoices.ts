import apiClient from './http'
import type { Invoice } from '../types/invoice'

export const fetchInvoices = async (): Promise<Invoice[]> => {
    const response = await apiClient.get<Invoice[]>('/invoices')
    return response.data
}

export const fetchInvoiceById = async (id: number): Promise<Invoice> => {
    const response = await apiClient.get<Invoice>(`/invoices/${id}`)
    return response.data
}
