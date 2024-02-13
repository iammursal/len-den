import { TransactionMutateForm } from '@/modules/transactions/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Borrowing',
	//   description: '...',
}

export default function BorrowCreatePage() {
	return (
		<div className="container">
			{/* start:Create Form */}
			<TransactionMutateForm type="credit" />
			{/* start:Create Form */}
		</div>
	)
}
