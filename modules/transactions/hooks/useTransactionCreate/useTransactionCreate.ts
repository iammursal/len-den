'use client'

import { useGoogleSpreadSheet } from '@/hooks'
import { db } from '@/stores/db'
import { TableWithTimestampsModel } from '@/types'
import { useEffect, useState } from 'react'
import { Transaction } from '../../types'
import { useTransactionSheet } from '../useTransactionSheet'

type Props = {
    onSuccess?: (transaction: Transaction) => void
    onError?: (error: Error) => void
}

export const useTransactionCreate = ({
    onSuccess,
    onError,
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | undefined>(undefined)
    const { doc, ...gss } = useGoogleSpreadSheet()
    const { transactionSheet, ...rest } = useTransactionSheet()

    useEffect(() => {
        console.log("🚀 ~ getSheet ~ getSheet:", transactionSheet)
    }, [transactionSheet])

    const mutate = async (transaction: Omit<Transaction, keyof TableWithTimestampsModel>) => {
        setIsLoading(true)
        setError(undefined)
        try {

            const id = await db.transactions.add({
                ...transaction,
                user_id: parseInt(transaction.user_id as string)
            })
            let newTransaction = await db.transactions.get(id)
            if (!newTransaction || typeof newTransaction === 'undefined') {
                throw new Error('Transaction not found')
            }
            transactionSheet?.addRow(newTransaction)
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
