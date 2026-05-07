import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">Page not found</h2>
            <p className="text-sm text-slate-600">
                The page you are looking for does not exist.
            </p>
            <Link className="text-sm font-medium text-slate-900" to="/">
                Return to dashboard
            </Link>
        </section>
    )
}

export default NotFound
