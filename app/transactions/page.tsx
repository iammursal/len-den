import TransactionList from '@/modules/transactions/components/list/TransactionList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Transactions | Len Den',
	//   description: '...',
}

export default function TransationsPage() {
	return (
		<div className="container" >
			<TransactionList />
		</div>
	)
}
