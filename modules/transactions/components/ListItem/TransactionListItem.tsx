import type { FC } from 'react'
import { TransactionModel } from '@/modules/transactions/types'
import clsx from 'clsx'

interface TransactionListItemProps {
	transaction: TransactionModel
}

const TransactionListItem: FC<TransactionListItemProps> = ({
	transaction: t,
}) => {
	return (
		<div className="grid grid-cols-12 gap-4 place-items-center w-full text-sm pt-2">
			<div className="col-span-7 w-full ">
				<p className="text-lg">{t.name}</p>
				<p>{t.notes}</p>
				<p className="text-xs text-gray-400">{t?.borrowed_at}</p>
			</div>
			<div className="col-span-5 w-full   flex justify-start h-full flex-col ">
				<p
					className={clsx({
						'text-lg text-end': true,
						'text-danger': t?.type === 'debit',
						'text-success': t?.type === 'credit',
					})}
				>
					{t?.type === 'credit' ? '+' : '-'}
					{t?.amount.toFixed(2)}
				</p>
			</div>
		</div>
	)
}
export default TransactionListItem
