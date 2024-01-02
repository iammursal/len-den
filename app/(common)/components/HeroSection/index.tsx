'use client'

import { useTransactionStore } from '@/modules/transactions/stores'
import clsx from 'clsx'
import Link from 'next/link'

export function HeroSection({}) {
	const { totalBalance, totalExpense, totalIncome } =
		useTransactionStore()

	return (
		<section className="py-16">
			<div className="relative w-full gap-y-4 flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
				<div className="grid grid-cols-12 mx-auto  gap-4 max-w-5xl place-items-center w-44  text-sm">
					<div className="col-span-6 w-full text-danger">
						<p>-{totalExpense.toFixed(2)}</p>
					</div>
					<div className="col-span-6 w-full text-end text-success">
						<p>+{totalIncome.toFixed(2)}</p>
					</div>
				</div>
				<div className="col-span-6 w-full text-center">
					<h2
						className={clsx({
							'text-4xl ': true,
							'text-danger': totalBalance < 0,
							'text-success': totalBalance > 0,
						})}
					>
						{totalBalance.toFixed(2)}
					</h2>
				</div>
			</div>
			<div className="grid grid-cols-2 font-bold gap-4 px-8 pt-10 text-center">
				<Link
					href="/borrow/create"
					className=" py-2 bg-danger rounded-lg hover:bg-danger/95"
				>
					<span className=" ">Borrow</span>
				</Link>
				<Link
					href="/lend/create"
					className=" py-2 bg-success rounded-lg hover:bg-success/95"
				>
					<span className="  ">Lend</span>
				</Link>
			</div>
		</section>
	)
}
