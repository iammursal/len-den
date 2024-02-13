import { TableWithTimestampsModel } from "@/types"
import { IndexableType } from "dexie"

export type TransactionModel = {
	user_id: IndexableType
	type: 'credit' | 'debit'
	amount: number
	notes?: string
    is_settled?: boolean
	transacted_at?: string
} & Partial<TableWithTimestampsModel>
