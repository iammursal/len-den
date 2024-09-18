
import { GuestLayout } from '@/components/layouts'

export default function AuthenticationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    let test = 22;

    console.log(test)
{{
    console.log(test)
}}
    return (
        <GuestLayout>{children}</GuestLayout>
    )
}
