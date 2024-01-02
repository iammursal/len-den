import { TransactionMutateForm } from '@/modules/transactions/components/MutateForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'New Lend | Len Den',
	//   description: '...',
}

export default function BorrowCreatePage() {
	return (
		<>
			{/* start:Create Form */}
			<section className="py-8 px-4">
				<TransactionMutateForm type='credit'/>
			</section>
			{/* start:Create Form */}
		</>
	)
}
