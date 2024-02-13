import { TransactionModel } from '@/modules/transactions/types'
import { db } from '@/stores/db'
import { IndexableType } from 'dexie'
import { useState } from 'react'

type Props = {
	onSuccess?: (transaction: TransactionModel) => void
	onError?: (error: Error) => void
}

export const useTransactionUpdate = ({
	onSuccess,
	onError,
}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error | undefined>(undefined)
	const mutate = async (id: IndexableType, transaction: Partial<TransactionModel>) => {
        setIsLoading(true)
        setError(undefined)
		try {
			const isUpdated  = await db.transactions.update(id, transaction)
            let newTransaction = await db.transactions.get(id)
            if(isUpdated === 0 || !newTransaction || typeof newTransaction === 'undefined') {
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
