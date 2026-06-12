export type InvoiceStatus = 'paid' | 'pending' | 'overdue'

export type Invoice = {
    id: number
    client: string
    amount: number
    status: InvoiceStatus
    dueDate: string
}

export type CreateInvoiceInput = Omit<Invoice, 'id'>

export type UpdateInvoiceInput = Partial<CreateInvoiceInput>
