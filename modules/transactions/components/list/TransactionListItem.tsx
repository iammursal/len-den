import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Transaction } from '@/modules/transactions/types'
import { User } from '@/modules/users/types'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'sonner'
import { useTransactionUpdate } from '../../hooks'

type TransactionListItemProps = {
    transaction: Transaction & {
        user: User
    }
}

export const TransactionListItem: FC<TransactionListItemProps> = ({
    transaction: t,
}) => {
    const router = useRouter()
    const { mutate, isLoading, error } = useTransactionUpdate({
        onSuccess: () => {
            toast.success('Transaction Settled!')
        },
        onError: (error) => {
            toast.error('Error settling transaction')
        },
    })

    const handleTransactionSettled = () => {
        mutate(t?.id as number, { is_settled: true })
    }
    const handleTransactionDelete = () => {
        mutate(t?.id as number, { deleted_at: (new Date).toISOString() })
    }
    const handleTransactionEdit = () => {
        router.push(`/transactions/edit?id=${t?.id}`)
    }

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
                <div className="grid grid-cols-3 mt-4">
                    <Button size="sm" variant="outline" className='text-destructive rounded-e-none' onClick={handleTransactionDelete}>
                        <FaTrash />
                    </Button>
                    <Button size="sm" variant="outline" className='text-info rounded-none' onClick={handleTransactionEdit}>
                        <FaEdit />
                    </Button>
                    <Button size="sm" variant="outline" className='text-success rounded-s-none' onClick={handleTransactionSettled}>
                        <FaCheckCircle />
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
