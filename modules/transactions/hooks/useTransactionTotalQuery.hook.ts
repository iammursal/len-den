import { db } from '@/stores/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

type Props = {
	user_id?: number
	type?: 'credit' | 'debit'
	is_settled?: boolean
	transacted_at: undefined
	date_from?: string
	date_to?: string
}

export const useTransactionTotalQuery = ({
	user_id,
	type,
	is_settled,
	transacted_at,
	date_from,
	date_to,
}: Props): {
	isLoading: boolean
	error: Error | undefined
	data?: number
} => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | undefined>(undefined)

	let total = useLiveQuery(
		async () => {
			try {
				//
				// Query Dexie's API
				//
				let t = await db.transactions.reverse()
				if (typeof user_id !== 'undefined') {
					t = t.and(({ user_id: i }) => i === user_id)
				}
				if (typeof is_settled !== 'undefined') {
					t = t.and(({ is_settled: i }) => i === is_settled)
				}
				if (typeof transacted_at !== 'undefined') {
					t = t.and(({ transacted_at: i }) => i === transacted_at)
				}
				if (typeof date_from !== 'undefined') {
					t = t.and(({ created_at: i }) =>
						i ? i >= date_from : true
					)
				}
				if (typeof date_to !== 'undefined') {
					t = t.and(({ created_at: i }) => (i ? i <= date_to : true))
				}
				if (type === 'credit') {
					t = t.and(({ type: i }) => i === 'credit')
				} else if (type === 'debit') {
					t = t.and(({ type: i }) => i === 'debit')
				}
				let transactions = await t.toArray()

				let total = transactions?.reduce((a, b) => a + b.amount, 0)

				return total
			} catch (err) {
				setError(err as Error)
				return 0
			} finally {
				setIsLoading(false)
			}
		},
		// specify vars that affect query:
		[user_id, type, is_settled, date_from, date_to]
	)

	return {
		isLoading,
		error,
		data: total,
	}
}
