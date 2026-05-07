import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    Files,
    CurrencyDollar,
    CheckCircle,
    WarningCircle,
} from '@phosphor-icons/react'
import InvoiceCard from '../components/invoices/InvoiceCard'
import InvoiceStatCard from '../components/invoices/InvoiceStatCard'
import PageHeader from '../components/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { formatCurrency } from '../lib/formatters'
import { mockInvoices } from '../data/invoices'
import { fetchInvoices } from '../services/invoices'
import type { Invoice } from '../types/invoice'

const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, delay: index * 0.05 },
    }),
}

function Dashboard() {
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        const loadInvoices = async () => {
            try {
                const data = await fetchInvoices()
                if (isMounted) setInvoices(data)
            } catch {
                if (isMounted) setError('Unable to load invoice data right now.')
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }
        loadInvoices()
        return () => { isMounted = false }
    }, [])

    const totalInvoices = invoices.length
    const totalRevenue = invoices.reduce((t, inv) => t + inv.amount, 0)
    const paidCount = invoices.filter((inv) => inv.status === 'paid').length
    const overdueCount = invoices.filter((inv) => inv.status === 'overdue').length
    const outstanding = invoices
        .filter((inv) => inv.status !== 'paid')
        .reduce((t, inv) => t + inv.amount, 0)
    const pendingCount = invoices.filter((inv) => inv.status === 'pending').length
    const recentInvoices = [...invoices]
        .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
        .slice(0, 10)
    const hasInvoices = invoices.length > 0

    return (
        <section className="space-y-10" data-testid="dashboard-page">
            <PageHeader
                title="Dashboard"
                subtitle="High-level invoice status overview."
            />

            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Overview
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <InvoiceStatCard
                        label="Total invoices"
                        value={`${totalInvoices}`}
                        icon={<Files size={20} />}
                    />
                    <InvoiceStatCard
                        label="Total revenue"
                        value={formatCurrency(totalRevenue)}
                        icon={<CurrencyDollar size={20} />}
                    />
                    <InvoiceStatCard
                        label="Paid invoices"
                        value={`${paidCount}`}
                        icon={<CheckCircle size={20} />}
                    />
                    <InvoiceStatCard
                        label="Overdue invoices"
                        value={`${overdueCount}`}
                        icon={<WarningCircle size={20} />}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Activity
                </p>
                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent invoices</CardTitle>
                            <CardDescription>Latest activity across clients.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {error && !hasInvoices ? (
                                <p className="text-sm text-danger-text">{error}</p>
                            ) : !hasInvoices && isLoading ? (
                                <p className="text-sm text-muted">Loading invoices...</p>
                            ) : recentInvoices.length === 0 ? (
                                <p className="text-sm text-muted">No invoices available.</p>
                            ) : (
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {recentInvoices.map((invoice, index) => (
                                        <motion.div
                                            key={invoice.id}
                                            custom={index}
                                            initial="hidden"
                                            animate="visible"
                                            variants={cardVariants}
                                        >
                                            <InvoiceCard invoice={invoice} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div
                        data-testid="outstanding-balance-card"
                        className="rounded-sm bg-accent p-6 text-white"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                            Outstanding Balance
                        </p>
                        <p className="mt-0.5 text-xs text-white/50">
                            Unpaid invoices across the portfolio
                        </p>
                        <p className="mt-5 font-heading text-4xl font-medium tracking-tight text-white">
                            {formatCurrency(outstanding)}
                        </p>
                        <p className="mt-1 text-sm text-white/60">
                            {pendingCount + overdueCount} invoices pending collection
                        </p>
                        <div className="mt-6 border-t border-white/20 pt-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                                Collection Focus
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-white/75">
                                Prioritize overdue accounts and confirm payment plans for
                                the upcoming week.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard

