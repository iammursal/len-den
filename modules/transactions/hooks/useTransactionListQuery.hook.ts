import { TransactionModel } from '@/modules/transactions/types'
import { db } from '@/stores/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

type Props = Partial<
	Pick<
		TransactionModel,
		| 'id'
		| 'user_id'
		| 'type'
		| 'amount'
		| 'transacted_at'
		| 'is_settled'
	>
> & {
	date_from?: string
	date_to?: string
}
const DefaultPrams: Props = {
	id: undefined,
	user_id: undefined,
	type: undefined,
	amount: undefined,
	transacted_at: undefined,
	is_settled: undefined,
	date_from: undefined,
	date_to: undefined,
}
export const useTransactionListQuery = ({
	id,
	user_id,
	type,
	amount,
	transacted_at,
	is_settled,
	date_from,
	date_to,
}: Props = DefaultPrams): {
	isLoading: boolean
	error: Error | undefined
	data?: TransactionModel[]
} => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | undefined>(undefined)

	let data = useLiveQuery(
		async () => {
			setIsLoading(true)
			setError(undefined)
			try {
				//
				// Query Dexie's API
				//
				let t = await db.transactions.reverse()

				if (typeof id !== 'undefined') {
					t = t.and(({ id: i }) => i === id)
				}

				if (typeof type !== 'undefined') {
					t = t.and(({ type: i }) => i === type)
				}

				if (typeof user_id !== 'undefined') {
					t = t.and(({ user_id: i }) => i === user_id)
				}
				if (typeof amount !== 'undefined') {
					t = t.and(({ amount: i }) => i === amount)
				}
				if (typeof transacted_at !== 'undefined') {
					t = t.and(({ transacted_at: i }) => i === transacted_at)
				}
				if (typeof is_settled !== 'undefined') {
					t = t.and(({ is_settled: i }) => i === is_settled)
				}
				if (typeof date_from !== 'undefined') {
					t = t.and(({ transacted_at: i }) =>
						i ? i >= date_from : false
					)
				}
				if (typeof date_to !== 'undefined') {
					t = t.and(({ transacted_at: i }) =>
						i ? i <= date_to : false
					)
				}
				let transactions = await t.toArray()

				return transactions
			} catch (err) {
				setError(err as Error)
				return undefined
			} finally {
				setIsLoading(false)
			}
		},
		// specify vars that affect query:
		[id, amount, transacted_at, is_settled, date_from, date_to]
	)

	return {
		isLoading,
		error,
		data,
	}
}
