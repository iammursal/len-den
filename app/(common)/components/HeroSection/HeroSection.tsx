'use client'

import { Skeleton } from '@/components/ui/skeleton'
import clsx from 'clsx'
import Link from 'next/link'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { TransactionFilterFromModal } from './TransactionFilterFromModal'
import { useHeroSectionState } from './hooks'
export function HeroSection() {
    const { totalCredit, totalDebit, totalBalance, isLoading } =
        useHeroSectionState()


    return (
        <section className="py-8">
            {/* start:: Filters */}
            <TransactionFilterFromModal />
            {/* end:: Filters */}

            {/* end:: Filters */}
            <div className="relative p-8 w-full gap-y-4 flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <div className="grid grid-cols-12 mx-auto  gap-4 max-w-5xl place-items-center w-44  text-sm">
                    <div className="col-span-6 w-full text-destructive">
                        {isLoading ? (
                            <Skeleton className="h-4 w-20" />
                        ) : (
                            <p>-{totalDebit?.toFixed(2)}</p>
                        )}
                    </div>
                    <div className="col-span-6 w-full text-end text-success">
                        {isLoading ? (
                            <Skeleton className="h-4 w-20" />
                        ) : (
                            <p>+{totalCredit?.toFixed(2)}</p>
                        )}
                    </div>
                </div>
                <div className="col-span-6 w-full text-center">
                    {isLoading ? (
                        <Skeleton className="h-10 w-32 mt-2 mx-auto" />
                    ) : (
                        <h2
                            className={clsx({
                                'text-4xl font-bold': true,
                                'text-destructive': totalBalance < 0,
                                'text-success': totalBalance > 0,
                            })}
                        >
                            {totalBalance?.toFixed(2)}
                        </h2>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 font-bold gap-4 px-4 pt-16 text-center text-white">
                <Link
                    href="/transactions/create?type=credit"
                    className="py-2 bg-destructive rounded-lg hover:bg-danger/95"
                >
                    <span className="flex mx-auto gap-2 items-center justify-center">
                        <GiReceiveMoney className="w-6 h-6" />
                        <small>Borrow</small>
                    </span>
                </Link>
                <Link
                    href="/transactions/create?type=debit"
                    className="py-2 bg-success rounded-lg hover:bg-success/95"
                >
                    <span className="flex gap-2  items-center justify-center">
                        <GiPayMoney className="w-6 h-6" />
                        <small>Lend</small>
                    </span>
                </Link>
            </div>
        </section>
    )
}
