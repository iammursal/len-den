import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { TransactionModel } from '@/modules/transactions/types'
import { UserModel } from '@/modules/users/types'
import clsx from 'clsx'
import type { FC } from 'react'

type TransactionListItemProps = {
	transaction: TransactionModel & {
		user: UserModel
	}
}

export const TransactionListItem: FC<TransactionListItemProps> = ({
	transaction: t,
}) => {
	return (
			<AccordionItem value={`item-${t?.id}`}>
				<AccordionTrigger>
					<div className="grid grid-cols-12 gap-4 place-items-center w-full text-sm pt-2 me-4">
						<div className="col-span-7 w-full text-start">
							<p className="text-lg">{t.user?.name}</p>
							<p>{t.notes}</p>
							<p className="text-xs text-gray-400">
								{t?.transacted_at}
							</p>
						</div>
						<div className="col-span-5 w-full   flex justify-start h-full flex-col ">
							<p
								className={clsx({
									'text-lg text-end font-bold': true,
									'text-danger': t?.type === 'debit',
									'text-success': t?.type === 'credit',
								})}
							>
								{t?.type === 'credit' ? '+' : '-'}
								{t?.amount?.toFixed(2)}
							</p>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					{t?.notes}
				</AccordionContent>
			</AccordionItem>
	)
}
