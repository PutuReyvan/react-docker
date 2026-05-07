import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section className="space-y-3">
            <h2 className="font-heading text-2xl font-medium text-primary">Page not found</h2>
            <p className="text-sm text-secondary">
                The page you are looking for does not exist.
            </p>
            <Link
                className="inline-block text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                to="/"
            >
                Return to dashboard
            </Link>
        </section>
    )
}

export default NotFound

