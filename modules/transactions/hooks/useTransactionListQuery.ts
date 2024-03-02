import {
    Transaction
} from '@/modules/transactions/types'
import { db } from '@/stores/db'
import { QueryFilterModel } from '@/types/queryFilter'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

export const useTransactionListQuery = (
	queryFilter: QueryFilterModel
): {
	isLoading: boolean
	error: Error | undefined
	data?: Transaction[]
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

				if (queryFilter) {
					const {
						where,
						whereIn,
						whereNotIn,
						whereBetween,
						whereNotBetween,
						whereNull,
						whereNotNull,
						count,
						limit,
						offset,
						order,
					} = queryFilter || {}

					if (
						where &&
						Object.keys(where).length > 0 &&
						Object.keys(where).every(
							(key) => key in db.transactions.schema
						)
					) {
						Object.keys(where).forEach((key) => {
							t = t.and(({ [key]: i }) => i === where[key])
						})
					}
				}

				// if (typeof id !== 'undefined') {
				// 	t = t.and(({ id: i }) => i === id)
				// }

				// if (typeof type !== 'undefined') {
				// 	t = t.and(({ type: i }) => i === type)
				// }

				// if (typeof user_id !== 'undefined') {
				// 	t = t.and(({ user_id: i }) => i === user_id)
				// }
				// if (typeof amount !== 'undefined') {
				// 	t = t.and(({ amount: i }) => i === amount)
				// }
				// if (typeof transacted_at !== 'undefined') {
				// 	t = t.and(({ transacted_at: i }) => i === transacted_at)
				// }
				// if (typeof is_settled !== 'undefined') {
				// 	t = t.and(({ is_settled: i }) => i === is_settled)
				// }
				// if (typeof date_from !== 'undefined') {
				// 	t = t.and(({ transacted_at: i }) =>
				// 		i ? i >= date_from : false
				// 	)
				// }
				// if (typeof date_to !== 'undefined') {
				// 	t = t.and(({ transacted_at: i }) =>
				// 		i ? i <= date_to : false
				// 	)
				// }
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
