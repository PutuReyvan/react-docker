import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type InvoiceStatCardProps = {
    label: string
    value: string
    helper?: string
}

function InvoiceStatCard({ label, value, helper }: InvoiceStatCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-500">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                <p className="text-2xl font-semibold text-slate-900">{value}</p>
                {helper ? <p className="text-xs text-slate-500">{helper}</p> : null}
            </CardContent>
        </Card>
    )
}

export default InvoiceStatCard
