'use client'

import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { TransactionMutateForm } from '@/modules/transactions/components'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

export const TransactionEditForm: FC<{}> = () => {
    const searchParams = useSearchParams()
    let id = searchParams.get('id') as any
    id = typeof id === 'string' ? parseInt(id) : null
    const { isLoading, data: transactions } = useQueryFilter(
        'transactions',
        {
            where: { id },
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    }
    const transaction = transactions ? transactions?.[0] : undefined

    return <TransactionMutateForm transaction={transaction} />
}
