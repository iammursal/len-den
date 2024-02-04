import { TransactionMutateForm } from '@/modules/transactions/components/form/MutateForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'New Lend | Len Den',
	//   description: '...',
}

export default function BorrowCreatePage() {
	return (
		<div className="container" >
			{/* start:Create Form */}
				<TransactionMutateForm type='credit'/>
			{/* start:Create Form */}
		</div>
	)
}
