type PageHeaderProps = {
    title: string
    subtitle?: string
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
            {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
        </div>
    )
}

export default PageHeader
