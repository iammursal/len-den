import { TransactionList } from '@/modules/transactions'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Transactions',
	//   description: '...',
}

export default function TransationsPage() {
	return (
		<div className="container">
			<TransactionList />
		</div>
	)
}
