import { TransactionMutateForm } from '@/modules/transactions/components/form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'New Borrow | Len Den',
	//   description: '...',
}

export default function BorrowCreatePage() {
	return (
		<div className="container" >
			{/* start:Create Form */}
				<TransactionMutateForm type='debit'/>
			{/* start:Create Form */}
		</div>
	)
}
