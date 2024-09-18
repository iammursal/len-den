
import { AuthLayout } from '@/components/layouts'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthLayout>{children}</AuthLayout>
    )
}
