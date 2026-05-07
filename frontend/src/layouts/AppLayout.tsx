import { NavLink, Outlet } from 'react-router-dom'
import { SquaresFour, Receipt } from '@phosphor-icons/react'

type NavLinkState = { isActive: boolean }

const navLinkClass = ({ isActive }: NavLinkState) =>
    [
        'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all duration-150',
        isActive
            ? 'bg-surface-alt text-accent'
            : 'text-secondary hover:text-primary hover:bg-surface-alt',
    ].join(' ')

function AppLayout() {
    return (
        <div className="min-h-screen bg-page font-body text-primary">
            <header className="border-b border-border bg-surface">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                            Finance Ops
                        </p>
                        <h1 className="font-heading text-lg font-semibold text-primary">
                            Invoice Management
                        </h1>
                    </div>
                    <nav className="flex items-center gap-1" data-testid="main-nav">
                        <NavLink to="/" end className={navLinkClass} data-testid="nav-dashboard">
                            <SquaresFour size={16} weight="bold" />
                            Dashboard
                        </NavLink>
                        <NavLink to="/invoices" className={navLinkClass} data-testid="nav-invoices">
                            <Receipt size={16} weight="bold" />
                            Invoices
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout

