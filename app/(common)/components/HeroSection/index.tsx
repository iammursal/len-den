'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useTransactionStore } from '@/modules/transactions/stores'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { FilterForm } from './FilterForm'

export function HeroSection() {
	const [filterModalShow, setFilterModalShow] = useState(false)
	const {
		totalBalance,
		totalExpense,
		totalIncome,
		clearAllTransaction,
	} = useTransactionStore()

	return (
		<section className="p-8 ">
			{/* start:: Filters */}
			<Dialog>
				<DialogTrigger className="fixed top-20 right-6 rounded-md bg-white/20 w-8 h-8 grid place-content-center">
					<FaFilter />
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>FILTER</DialogTitle>
						<DialogDescription >
						</DialogDescription>
					</DialogHeader>
                    <FilterForm />
				</DialogContent>
			</Dialog>
			{/* end:: Filters */}

			{/* end:: Filters */}
			<div className="relative p-8 w-full gap-y-4 flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
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
							'text-4xl font-bold': true,
							'text-danger': totalBalance < 0,
							'text-success': totalBalance > 0,
						})}
					>
						{totalBalance.toFixed(2)}
					</h2>
				</div>
			</div>
			<div className="grid grid-cols-2 font-bold gap-4 px-8 pt-16 text-center">
				<Link
					href="/borrow/create"
					className=" py-2 bg-destructive rounded-lg hover:bg-danger/95"
				>
					<span className="flex flex-col items-center justify-center">
						<GiReceiveMoney className="w-6 h-6" />
						<span>Borrow</span>
					</span>
				</Link>
				<Link
					href="/lend/create"
					className=" py-2 bg-success rounded-lg hover:bg-success/95"
				>
					<span className="flex flex-col items-center justify-center">
						<GiPayMoney className="w-6 h-6" />
						<span>Lend</span>
					</span>
				</Link>
			</div>
			<button
				className="m-4 text-center px-4 py-2 border-2 border-white"
				onClick={() => clearAllTransaction()}
			>
				Clear Transactions
			</button>
		</section>
	)
}
