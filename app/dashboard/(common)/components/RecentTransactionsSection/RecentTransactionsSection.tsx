'use client'

import { TransactionList } from '@/modules/transactions'
import { Transaction } from '@/modules/transactions/types'
import { merge } from 'lodash-es'
import Link from 'next/link'
import { useContext } from 'react'
import { TransactionFilterContext } from '../../context/TransactionFilterProvider'

export function RecentTransactionsSection({ }) {
    const { filters, setFilters } = useContext(TransactionFilterContext)
    const recentTransactionFilters = merge({
        where: {
            // is_settled: false,
        },
        whereNull: ['deleted_at'],
    }, filters)
    const handleTransactionChange = (transaction: Transaction) => {
        console.log('transaction', transaction)
        setFilters(merge({
            // @ts-ignore
            refetch: !Boolean(!filters?.refetch),
        }, filters))
    }

    return (
        <section className="py-16 px-4">
            <div className="mb-6 flex justify-between">
                <h4 className="text-xs dark:text-gray-300">RECENT TRANSACTIONS</h4>
                <Link href={`/dashboard/transactions`} className="text-xs text-sky-300">
                    More &#8594;
                </Link>
            </div>
            {/* list */}
            <div className="flex flex-col gap-y-4 divide-y divide-gray-500 ">
                <TransactionList filters={recentTransactionFilters} onChange={handleTransactionChange} />
            </div>
        </section>
    )
}
