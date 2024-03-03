'use client'

import { TransactionList } from '@/modules/transactions/components/list'
import { merge } from 'lodash-es'
import Link from 'next/link'
import { useContext } from 'react'
import { TransactionFilterContext } from '../../context/TransactionFilterProvider'

export function RecentTransactionsSection({ }) {
    const { filters } = useContext(TransactionFilterContext)

    return (
        <section className="py-16 px-4">
            <div className="mb-6 flex justify-between">
                <h4 className="text-xs dark:text-gray-300">RECENT TRANSACTIONS</h4>
                <Link href={`/transactions`} className="text-xs text-sky-300">
                    More &#8594;
                </Link>
            </div>
            {/* list */}
            <div className="flex flex-col gap-y-4 divide-y divide-gray-500 ">
                <TransactionList filters={merge({}, filters, {
                    whereNotNull: [
                        'deleted_at'
                    ]
                })} />
            </div>
        </section>
    )
}
