import {
	TransactionModel,
	TransactionStore,
} from '@/modules/transactions/types'
import { applyMiddlewares, persist } from '@/stores'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useTransactionStore = create<TransactionStore>(
	applyMiddlewares(
		(set: any, get: any) => ({
			transactions: [],
			totalExpense: 0,
			totalIncome: 0,
			totalBalance: 0,
			getTransactions: ({ id }: Partial<TransactionModel>) => {
				return get((state: TransactionStore) => {
					let transactions = state.transactions
					if (id)
						transactions = transactions.filter((t) => t.id === id)
					return transactions
				})

			},
			addTransaction: (transaction: Omit<TransactionModel, 'id'>) => {
				set((state: TransactionStore) => {
					let newTransaction = {
                        ...transaction,
						id: crypto.randomUUID(),
					}
					state.transactions.unshift(newTransaction)
					if (transaction.type === 'debit') {
						state.totalExpense += transaction.amount
					} else {
						state.totalIncome += transaction.amount
					}
					state.totalBalance = state.totalIncome - state.totalExpense
				})
			},
			updateTransaction: (transaction: Partial<TransactionModel>) => {
				set((state: TransactionStore) => {
					state.transactions = state.transactions.map((t) => {
						if (t.id === transaction?.id) {
                            let updatedTransaction = {
                                ...t,
                                ...transaction,
                            }
							if (
								t.amount !== updatedTransaction?.amount ||
								t.type !== updatedTransaction?.type
							) {
								if (t.type === 'debit') {
									state.totalExpense -= t.amount
								} else {
									state.totalIncome -= t.amount
								}

                                if(updatedTransaction.type === 'debit') {
                                    state.totalExpense += updatedTransaction.amount
                                } else {
                                    state.totalIncome += updatedTransaction.amount
                                }

								state.totalBalance =
									state.totalIncome - state.totalExpense
							}

							return updatedTransaction
						}
						return t
					})
				})
                return
			},
			removeTransaction: (id: string) => {
				set((state: TransactionStore) => {
					state.transactions.filter((t) => {
						if (t.id === id) {
							if (t.type === 'debit') {
								state.totalExpense -= t.amount
							} else {
								state.totalIncome -= t.amount
							}
							state.totalBalance =
								state.totalIncome - state.totalExpense
						}
					})
				})
                return true
			},
			clearAllTransaction: () => {
				set((state: TransactionStore) => {
					state.transactions = []
					state.totalExpense = 0
					state.totalIncome = 0
					state.totalBalance = 0
				})
                return true
			},
		}),
		[persist, immer, devtools]
	)
)

export { useTransactionStore }
