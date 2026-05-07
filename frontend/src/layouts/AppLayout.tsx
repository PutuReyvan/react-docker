import { NavLink, Outlet } from 'react-router-dom'

type NavLinkState = { isActive: boolean }

const navLinkClass = ({ isActive }: NavLinkState) =>
    [
        'text-sm font-medium transition-colors',
        isActive ? 'text-blue-600' : 'text-slate-500 hover:text-blue-700',
    ].join(' ')

function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                            Invoice Management
                        </p>
                        <h1 className="text-lg font-semibold text-slate-900">Finance Operations</h1>
                    </div>
                    <nav className="flex items-center gap-6">
                        <NavLink to="/" end className={navLinkClass}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/invoices" className={navLinkClass}>
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
