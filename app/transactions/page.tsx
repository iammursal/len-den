"use client";

import TransactionListItem from '@/modules/transactions/components/ListItem/TransactionListItem'
import { useTransactionStore } from '@/modules/transactions/stores'
// import type { Metadata } from 'next'

// export const metadata: Metadata = {
// 	title: 'Transactions | Len Den',
// 	//   description: '...',
// }

export default function TransationsPage() {
	const { transactions } = useTransactionStore()
    console.log(transactions)
    // return <></>
	return (
		<section className="p-4">
			{transactions.map((t) => (
				<TransactionListItem key={t.id} transaction={t} />
			))}
		</section>
	)
}
