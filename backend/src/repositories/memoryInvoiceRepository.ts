import { seedInvoices } from '../data/invoices.js'
import type { CreateInvoiceInput, Invoice, UpdateInvoiceInput } from '../types/invoice.js'
import type { InvoiceRepository } from './invoiceRepository.js'

export class MemoryInvoiceRepository implements InvoiceRepository {
  private invoices: Invoice[]

  constructor(initialInvoices: Invoice[] = seedInvoices) {
    this.invoices = cloneInvoices(initialInvoices)
  }

  async list(): Promise<Invoice[]> {
    return cloneInvoices(this.invoices)
  }

  async findById(id: number): Promise<Invoice | null> {
    const invoice = this.invoices.find((current) => current.id === id)
    return invoice ? { ...invoice } : null
  }

  async create(input: CreateInvoiceInput): Promise<Invoice> {
    const nextId = Math.max(...this.invoices.map((invoice) => invoice.id), 0) + 1
    const invoice = { id: nextId, ...input }
    this.invoices = [...this.invoices, invoice]
    return { ...invoice }
  }

  async update(id: number, input: UpdateInvoiceInput): Promise<Invoice | null> {
    const invoice = await this.findById(id)
    if (!invoice) return null

    const updated = { ...invoice, ...input }
    this.invoices = this.invoices.map((current) => (current.id === id ? updated : current))
    return { ...updated }
  }

  async delete(id: number): Promise<boolean> {
    const beforeCount = this.invoices.length
    this.invoices = this.invoices.filter((invoice) => invoice.id !== id)
    return this.invoices.length !== beforeCount
  }

  reset(initialInvoices: Invoice[] = seedInvoices): void {
    this.invoices = cloneInvoices(initialInvoices)
  }
}

function cloneInvoices(invoices: Invoice[]): Invoice[] {
  return invoices.map((invoice) => ({ ...invoice }))
}
