import { Transaction } from '@/modules/transactions/types'
import { db } from '@/stores/db'
import { TableWithTimestampsModel } from '@/types'
import { useState } from 'react'

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
	const mutate = async (transaction: Omit<Transaction, keyof TableWithTimestampsModel>) => {
        setIsLoading(true)
        setError(undefined)
		try {
			const id = await db.transactions.add({
                ...transaction,
                user_id: parseInt(transaction.user_id as string)
            })
            let newTransaction = await db.transactions.get(id)
            if(!newTransaction || typeof newTransaction === 'undefined') {
                throw new Error('Transaction not found')
            }
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
