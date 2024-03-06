import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Transaction } from '@/modules/transactions/types'
import { User } from '@/modules/users/types'
import clsx from 'clsx'
import { memo, type FC } from 'react'
import { FaCheckCircle, FaEdit, FaTimesCircle, FaTrash } from 'react-icons/fa'

type TransactionListItemProps = {
    transaction: Transaction & {
        user: User
    },
    actions: (t: Transaction) => {
        handleToggleSettle: () => void,
        handleDelete: () => void,
        handleEdit: () => void,
    }
}

const Item: FC<TransactionListItemProps> = ({
    transaction: t,
    actions
}) => {
    const { handleToggleSettle, handleDelete, handleEdit } = actions(t as Transaction)

    return (
        <AccordionItem value={`item-${t?.id}`}>
            <AccordionTrigger className='hover:no-underline'>
                <div className="grid grid-cols-12 gap-4 place-items-center w-full text-sm pt-2 me-4">
                    <div className="col-span-2 w-full items-center  flex justify-start h-full flex-col mt-2">
                        {/* if transaction is settled */}


                        {t?.is_settled === true
                            ? <div className="w-6 h-6 rounded-full border-success">
                                <FaCheckCircle size={'1.5rem'} />
                            </div>
                            : <div className="w-6 h-6 rounded-full bg-muted">
                                {/* <FaTimesCircle /> */}
                            </div>}&ensp;
                    </div>
                    <div className="col-span-10 w-full text-start">
                        <p
                            className={clsx({
                                'text-lg font-bold flex items-center mb-2': true,
                                'text-destructive': t?.type === 'debit',
                                'text-success': t?.type === 'credit',
                            })}
                        >

                            {t?.type === 'credit' ? '+' : '-'}
                            {t?.amount?.toFixed(2)}

                        </p>
                        <p className="text-lg">{t.user?.name}</p>
                        <p>{t.notes}</p>
                        <p className="text-xs text-gray-400">
                            {t?.transacted_at}
                        </p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-12 gap-4 place-items-center w-full text-sm pt-2 pe-8">
                    <div className="col-span-2"></div>
                    <div className="col-span-10 w-full text-start">
                        <p className="">{t?.notes}</p>

                        <div className="grid grid-cols-3 mt-4">
                            <Button size="sm" variant="outline" className='text-destructive rounded-e-none' onClick={handleDelete}>
                                <FaTrash />
                            </Button>
                            <Button size="sm" variant="outline" className='text-info rounded-none' onClick={handleEdit}>
                                <FaEdit />
                            </Button>
                            <Button size="sm" variant="outline" className={cn([
                                'rounded-s-none',
                                (t?.is_settled === true ? 'text-destructive' : 'text-success')
                            ])}
                                onClick={handleToggleSettle}
                            >
                                {t?.is_settled === false ? <FaCheckCircle /> : <FaTimesCircle />}
                            </Button>
                        </div>
                    </div>

                </div>

            </AccordionContent>
        </AccordionItem >
    )
}
export const TransactionListItem = memo(Item)
