import { TransactionModel } from '@/modules/transactions/types'
import { applyMiddlewares, persist } from '@/stores'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type MoneyStore = {
	transactions: TransactionModel[]
	totalExpense: number
	totalIncome: number
	totalBalance: number
	addTransaction: (money: {}) => {}
	removeTransaction: (money: {}) => {}
	clearAllTransaction: () => {}
}

const defaultStoreData = {
	transactions: [],
	totalExpense: 0,
	totalIncome: 0,
	totalBalance: 0,
}

const useTransactionStore = create<MoneyStore>(
	applyMiddlewares(
		(set: any) => ({
			...defaultStoreData,
			addTransaction: (transaction: TransactionModel) => {
				set((state: MoneyStore) => {
					state.transactions.push(transaction)
					if (transaction.type === 'debit') {
						state.totalExpense += transaction.amount
					} else {
						state.totalIncome += transaction.amount
					}
					state.totalBalance = state.totalIncome - state.totalExpense
				})
			},
			removeTransaction: (id: string) => {
				set((state: MoneyStore) => {
					state.transactions.filter((t) => {
						if (t.id === id) {
							if (t.type === 'debit') {
								state.totalExpense -= t.amount
							} else {
								state.totalIncome -= t.amount
							}
							state.totalBalance =
								state.totalIncome - state.totalExpense
							return false
						}
						return true
					})
				})
			},
			clearAllTransaction: () => {
				set((state: MoneyStore) => {
					state.transactions = []
					state.totalExpense = 0
					state.totalIncome = 0
					state.totalBalance = 0
				})
			},
		}),
		[persist, immer, devtools]
	)
)

export { useTransactionStore }
