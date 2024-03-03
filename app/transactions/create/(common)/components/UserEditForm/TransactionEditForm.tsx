'use client'

import { TransactionMutateForm } from '@/modules/transactions/components'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

export const TransactionEditForm: FC<{}> = () => {
    const searchParams = useSearchParams()
    let type = searchParams.get('type')
    const transaction = {
        type
    } as {
        type: 'credit' | 'debit'
    }
    return <TransactionMutateForm transaction={transaction} />
}
