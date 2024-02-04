export type TransactionModel = {
	id: string
    user_id: string
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
    getTransactions: (t: Partial<TransactionStore>) => TransactionModel[] | []
	addTransaction: (t: Omit<TransactionStore, 'id'>) => TransactionModel
    updateTransaction: (t: Partial<TransactionStore>) => TransactionModel
	removeTransaction: (id:string) => Boolean
	clearAllTransaction: () => Boolean
}
