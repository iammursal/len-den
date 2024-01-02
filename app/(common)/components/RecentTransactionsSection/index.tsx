'use client'

import { useTransactionStore } from '@/modules/transactions/stores'
import clsx from 'clsx'
import Link from 'next/link'

export function RecentTransactionsSection({}) {
	const { transactions } = useTransactionStore()
	console.log({ transactions })
	return (
		<section className="py-16 px-4">
			<div className="mb-6 flex justify-between">
				<h4 className="text-xs text-gray-300">RECENT TRANSACTIONS</h4>
				<Link href={`/history`} className="text-xs text-sky-300">
					More &#8594;
				</Link>
			</div>
			{/* list */}
			<div className="flex flex-col gap-y-4 divide-y divide-gray-500 ">
				{transactions.map((t, i) => (
					<div
						key={i}
						className="grid grid-cols-12 gap-4 place-items-center w-full text-sm pt-2"
					>
						<div className="col-span-7 w-full ">
							<p className="text-lg">{t.name}</p>
							<p>{t.notes}</p>
							<p className="text-xs text-gray-400">
								{t?.borrowed_at}
							</p>
						</div>
						<div className="col-span-5 w-full   flex justify-start h-full flex-col ">
							<p
								className={clsx({
									'text-lg text-end': true,
									'text-danger': t?.type === 'debit',
									'text-success': t?.type === 'credit',
								})}
							>
								{t?.type === 'credit' ? '+' : '-'}
								{t?.amount.toFixed(2)}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
