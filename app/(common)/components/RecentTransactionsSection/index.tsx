'use client'

import TransactionListItem from '@/modules/transactions/components/ListItem/TransactionListItem'
import { useTransactionStore } from '@/modules/transactions/stores'
import clsx from 'clsx'
import Link from 'next/link'

export function RecentTransactionsSection({}) {
	const { transactions } = useTransactionStore()

	return (
		<section className="py-16 px-4">
			<div className="mb-6 flex justify-between">
				<h4 className="text-xs text-gray-300">RECENT TRANSACTIONS</h4>
				<Link href={`/transactions`} className="text-xs text-sky-300">
					More &#8594;
				</Link>
			</div>
			{/* list */}
			<div className="flex flex-col gap-y-4 divide-y divide-gray-500 ">
				{transactions.map((t) => (
					<TransactionListItem key={t.id} transaction={t} />
				))}
			</div>
		</section>
	)
}
