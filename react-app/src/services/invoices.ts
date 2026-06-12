import apiClient from './http'
import type { CreateInvoiceInput, Invoice, UpdateInvoiceInput } from '../types/invoice'

export const fetchInvoices = async (): Promise<Invoice[]> => {
    const response = await apiClient.get<Invoice[]>('/invoices')
    return response.data
}

export const fetchInvoiceById = async (id: number): Promise<Invoice> => {
    const response = await apiClient.get<Invoice>(`/invoices/${id}`)
    return response.data
}

export const createInvoice = async (invoice: CreateInvoiceInput): Promise<Invoice> => {
    const response = await apiClient.post<Invoice>('/invoices', invoice)
    return response.data
}

export const updateInvoice = async (
    id: number,
    invoice: UpdateInvoiceInput,
): Promise<Invoice> => {
    const response = await apiClient.put<Invoice>(`/invoices/${id}`, invoice)
    return response.data
}

export const deleteInvoice = async (id: number): Promise<void> => {
    await apiClient.delete(`/invoices/${id}`)
}
