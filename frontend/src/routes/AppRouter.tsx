import { Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Dashboard from '../pages/Dashboard'
import Invoices from '../pages/Invoices'
import NotFound from '../pages/NotFound'

function AppRouter() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
