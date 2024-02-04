'use client'
import { useTransactionStore } from '@/modules/transactions/stores'
import { useUserStore } from '@/modules/users/stores'
import { UserModel } from '@/modules/users/types'
import type { FC } from 'react'
import TransactionListItem from './TransactionListItem'

interface TransactionListProps {
	user_id?: string
}

const TransactionList: FC<TransactionListProps> = ({ user_id = null }) => {
	let transactions = useTransactionStore((s) =>
		user_id
			? s.transactions?.filter((t) => t.user_id === user_id)
			: s.transactions
	)
	const userIds = transactions.map((t) => t.user_id)
	const users = useUserStore((s) =>
		s.users?.filter((u) => userIds.includes(u.id))
	)
	return (
		<>
			{transactions.map((t) => (
				<TransactionListItem
					key={t.id}
					transaction={{
						user: users?.find(
							(u) => u?.id === t.user_id
						) as UserModel,
						...t,
					}}
				/>
			))}
		</>
	)
}
export default TransactionList
