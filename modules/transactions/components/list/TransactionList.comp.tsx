'use client'
import { Accordion } from '@/components/ui/accordion'
import { useUserListQuery } from '@/modules/users/hooks'
import { UserModel } from '@/modules/users/types'
import type { FC } from 'react'
import { useTransactionListQuery } from '../../hooks/useTransactionListQuery.hook'
import { TransactionListItem } from './TransactionListItem.comp'

type TransactionListProps = {
	user_id?: number
	is_settled?: boolean
	type?: 'credit' | 'debit'
	date_from?: string
	date_to?: string
}

export const TransactionList: FC<TransactionListProps> = ({
	user_id,
	is_settled,
	type,
	date_from,
	date_to,
}) => {
	const { data: transactions, ...transactionQuery } =
		useTransactionListQuery({
			user_id,
			type,
			is_settled,
			date_from,
			date_to,
		})
	const { data: users, ...userQuery } = useUserListQuery()
	if (userQuery?.isLoading || transactionQuery?.isLoading) {
		return <div>Loading...</div>
	}

	return (
		<Accordion type="single" collapsible>
			{transactions &&
				transactions?.map((t) => (
					<TransactionListItem
						key={`${t.id}`}
						transaction={{
							user: users?.find(
								(u) => u?.id === t.user_id
							) as UserModel,
							...t,
						}}
					/>
				))}
		</Accordion>
	)
}
