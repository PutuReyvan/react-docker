import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { mockInvoices } from './data/invoices'

vi.mock('./services/invoices', () => ({
    fetchInvoices: vi.fn(() => Promise.resolve(mockInvoices)),
    fetchInvoiceById: vi.fn((id: number) =>
        Promise.resolve(mockInvoices.find((invoice) => invoice.id === id) ?? mockInvoices[0]),
    ),
}))

describe('App', () => {
    it('renders the dashboard route', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        )

        expect(screen.getByRole('heading', { name: /invoice management/i })).toBeInTheDocument()
        expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
        expect(await screen.findByText('Acme Manufacturing')).toBeInTheDocument()
    })
})
