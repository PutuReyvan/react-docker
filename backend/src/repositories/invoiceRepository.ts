import type { CreateInvoiceInput, Invoice, UpdateInvoiceInput } from '../types/invoice.js'

export interface InvoiceRepository {
  list(): Promise<Invoice[]>
  findById(id: number): Promise<Invoice | null>
  create(input: CreateInvoiceInput): Promise<Invoice>
  update(id: number, input: UpdateInvoiceInput): Promise<Invoice | null>
  delete(id: number): Promise<boolean>
}
