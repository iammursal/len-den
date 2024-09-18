'use client'

import { useGoogleSpreadSheet, useQueryFilter } from '@/hooks'
import { Transaction } from '@/modules/transactions/types'
import { db } from '@/stores/db'
import { IndexableType } from 'dexie'
import { useState } from 'react'
import { useTransactionSheet } from '../useTransactionSheet'

type Props = {
    onSuccess?: (transaction: Transaction) => void
    onError?: (error: Error) => void
}

export const useTransactionUpdate = ({
    onSuccess,
    onError,
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | undefined>(undefined)

    const { doc, ...gss } = useGoogleSpreadSheet()
    const { transactionSheet, ...rest } = useTransactionSheet()
    const mutate = async (id: IndexableType, transaction: Partial<Transaction>) => {
        setIsLoading(true)
        setError(undefined)
        try {
            if (typeof transaction?.user_id !== 'undefined' && typeof transaction?.user_id === 'string') {
                transaction.user_id = parseInt(transaction.user_id as string)
            }
            const isUpdated = await db.transactions.update(id, {
                ...transaction,
            })
            let newTransaction = await db.transactions.get(id)
            if (isUpdated === 0 || !newTransaction || typeof newTransaction === 'undefined') {
                throw new Error('Transaction not found')
            }
                // get google sheet row
                transactionSheet.getRows({
                    limit: 1,
                    offset: 0,
                })
            return onSuccess?.(newTransaction)
        } catch (err) {
            console.log(err)
            setError(err as Error)
            onError?.(err as Error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        mutate,
    }
}
