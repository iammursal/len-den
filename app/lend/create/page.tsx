import { TransactionMutateForm } from '@/modules/transactions/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Lending',
	//   description: '...',
}

export default function BorrowCreatePage() {
	return (
		<div className="container">
			<TransactionMutateForm type="debit" />
		</div>
	)
}
