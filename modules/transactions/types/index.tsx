export type TransactionModel = {
	id: string
	name: string
	amount: number
	borrowed_at: string
	// category: string
	type: 'credit' | 'debit'
	notes?: string
}
