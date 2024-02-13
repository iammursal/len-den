'use client'

import { TransactionList } from '@/modules/transactions/components/list'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function RecentTransactionsSection({}) {
	let searchParams = useSearchParams()

    const params = new URLSearchParams(searchParams)
    const filters = Object.fromEntries(params.entries())

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
				<TransactionList {...filters} />
			</div>
		</section>
	)
}
