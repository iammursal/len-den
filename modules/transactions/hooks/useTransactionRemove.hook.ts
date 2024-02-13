import { db } from '@/stores/db'
import { IndexableType } from 'dexie'
import { useState } from 'react'

type Props = {
	onSuccess?: () => void
	onError?: (error: Error) => void
}

export const useTransactionRemove = ({ onSuccess, onError }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error | undefined>(undefined)
	const mutate = async (id: IndexableType) => {
		setIsLoading(true)
		setError(undefined)
		try {
			await db.transactions.where('id').equals(id).delete()
			return onSuccess?.()
		} catch (err) {
			console.log(err)
			onError?.(err as Error)
			setError(err as Error)
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
