import type { Metadata } from 'next'
import { TransactionEditForm } from './(common)/components'

export const metadata: Metadata = {
    title: 'Lending',
    //   description: '...',
}

export default function BorrowCreatePage() {
    return (
        <div className="container">
            <TransactionEditForm />
        </div>
    )
}
