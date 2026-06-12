import type { Invoice } from '../types/invoice.js'

export const seedInvoices: Invoice[] = [
  {
    id: 1,
    client: 'Acme Manufacturing',
    amount: 5400,
    status: 'paid',
    dueDate: '2026-04-18',
  },
  {
    id: 2,
    client: 'Northwind Logistics',
    amount: 12750,
    status: 'pending',
    dueDate: '2026-05-06',
  },
  {
    id: 3,
    client: 'Summit Retail Group',
    amount: 3200,
    status: 'overdue',
    dueDate: '2026-04-05',
  },
  {
    id: 4,
    client: 'BlueRiver Energy',
    amount: 8900,
    status: 'paid',
    dueDate: '2026-03-28',
  },
  {
    id: 5,
    client: 'Atlas Construction',
    amount: 22100,
    status: 'pending',
    dueDate: '2026-05-20',
  },
  {
    id: 6,
    client: 'Crescent Health',
    amount: 6100,
    status: 'paid',
    dueDate: '2026-04-11',
  },
]
