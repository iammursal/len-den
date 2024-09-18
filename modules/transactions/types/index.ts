import { TableWithTimestampsModel } from '@/types'
import { IndexableType } from 'dexie'

export type Transaction = {
	user_id: IndexableType
	type: 'credit' | 'debit'
	amount: number
	notes?: string
	settled_at?: string
	transacted_at?: string
} & Partial<TableWithTimestampsModel>

export type TransactionListQueryModel = Partial<
	Pick<
		Transaction,
		| 'id'
		| 'user_id'
		| 'type'
		| 'amount'
		| 'transacted_at'
		| 'settled_at'
	>
> & {
	date_from?: string
	date_to?: string
}
