export type TransactionModel = {
	id: string
	name: string
	amount: number
	borrowed_at: string
	// category: string
	type: 'credit' | 'debit'
	notes?: string
}

export type TransactionStore = {
	transactions: TransactionModel[]
	totalExpense: number
	totalIncome: number
	totalBalance: number
	addTransaction: (money: {}) => {}
	removeTransaction: (money: {}) => {}
	clearAllTransaction: () => {}
}
