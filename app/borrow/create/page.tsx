import { TransactionMutateForm } from '@/modules/transactions/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'New Borrow | Len Den',
	//   description: '...',
}

export default function BorrowCreatePage() {
	return (
		<>
			{/* start:Create Form */}
			<section className="py-8 px-4">
				<TransactionMutateForm type='debit'/>
			</section>
			{/* start:Create Form */}
		</>
	)
}
