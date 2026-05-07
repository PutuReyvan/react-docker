import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
                if (isMounted) {
                    setInvoices(data)
                }
            } catch {
                if (isMounted) {
                    setError('Unable to load invoice data right now.')
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadInvoices()

        return () => {
            isMounted = false
        }
    }, [])

    const totalInvoices = invoices.length
    const totalRevenue = invoices.reduce(
        (total, invoice) => total + invoice.amount,
        0,
    )
    const paidCount = invoices.filter((invoice) => invoice.status === 'paid').length
    const overdueCount = invoices.filter((invoice) => invoice.status === 'overdue').length
    const outstanding = invoices
        .filter((invoice) => invoice.status !== 'paid')
        .reduce((total, invoice) => total + invoice.amount, 0)
    const pendingCount = invoices.filter((invoice) => invoice.status === 'pending').length
    const recentInvoices = [...invoices]
        .sort(
            (a, b) =>
                new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
        )
        .slice(0, 10)
    const hasInvoices = invoices.length > 0

    return (
        <section className="space-y-8">
            <PageHeader
                title="Dashboard"
                subtitle="High-level invoice status overview."
            />

            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Overview
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <InvoiceStatCard label="Total invoices" value={`${totalInvoices}`} />
                    <InvoiceStatCard
                        label="Total revenue"
                        value={formatCurrency(totalRevenue)}
                    />
                    <InvoiceStatCard label="Paid invoices" value={`${paidCount}`} />
                    <InvoiceStatCard label="Overdue invoices" value={`${overdueCount}`} />
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
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
                                <p className="text-sm text-blue-600">{error}</p>
                            ) : !hasInvoices && isLoading ? (
                                <p className="text-sm text-slate-500">Loading invoices...</p>
                            ) : recentInvoices.length === 0 ? (
                                <p className="text-sm text-slate-500">No invoices available.</p>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2">
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Outstanding balance</CardTitle>
                            <CardDescription>Unpaid invoices across the portfolio.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-3xl font-semibold text-slate-900">
                                    {formatCurrency(outstanding)}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {pendingCount + overdueCount} invoices pending collection
                                </p>
                            </div>
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Collection focus
                                </p>
                                <p className="mt-2 text-sm text-slate-500">
                                    Prioritize overdue accounts and confirm payment plans for
                                    the upcoming week.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
