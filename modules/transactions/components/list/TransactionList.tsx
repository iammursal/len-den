'use client'
import { Accordion } from '@/components/ui/accordion'
import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { Transaction } from '@/modules/transactions/types'
import { User } from '@/modules/users/types'
import { QueryFilter } from '@/types/queryFilter'
import { type FC } from 'react'
import { TransactionListItem } from './TransactionListItem'

type TransactionListProps = {
    filters?: QueryFilter
}

export const TransactionList: FC<TransactionListProps> = ({
    filters,
}) => {
    const { data: transactions, ...transactionQuery } = useQueryFilter(
        'transactions',
        {
            ...filters,
        }
    )

    const { data: users, ...userQuery } = useQueryFilter('users', {
        ...(filters?.where?.user_id && {
            where: {
                id: filters?.where?.user_id,
            },
        }),
    })
    // ...

    if (userQuery?.isLoading || transactionQuery?.isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Accordion type="single" collapsible>
            {transactions &&
                transactions?.map((t: Transaction) => (
                    <TransactionListItem
                        key={`${t.id}`}
                        transaction={{
                            user: users?.find((u: User) => u?.id === t.user_id),
                            ...t,
                        }}
                    />
                ))}
        </Accordion>
    )
}
