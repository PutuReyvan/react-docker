type PageHeaderProps = {
    title: string
    subtitle?: string
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="space-y-2 border-b border-border pb-5">
            <h2 className="font-heading text-3xl font-medium tracking-tight text-primary">
                {title}
            </h2>
            {subtitle ? (
                <p className="text-sm text-secondary">{subtitle}</p>
            ) : null}
        </div>
    )
}

export default PageHeader

