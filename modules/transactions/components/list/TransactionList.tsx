'use client'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { useTransactionUpdate } from '@/modules/transactions/hooks'
import { Transaction } from '@/modules/transactions/types'
import { User } from '@/modules/users/types'
import { QueryFilter } from '@/types/queryFilter'
import { useRouter } from 'next/navigation'
import { useRef, useState, type FC } from 'react'
import { toast } from 'sonner'
import { TransactionListItem } from './TransactionListItem'

type TransactionListProps = {
    filters?: QueryFilter
}

export const TransactionList: FC<TransactionListProps> = ({
    filters,
}) => {
    const [drawerContent, setDrawerContent] = useState('') as any
    const [handleCancel, setHandleCancel] = useState(() => { }) as any
    const [handleConfirm, setHandleConfirm] = useState(() => { })
    const drawerTrigger = useRef(null)
    const router = useRouter()

    const { mutate, isLoading, error } = useTransactionUpdate({})
    const { data: transactions, ...transactionQuery } = useQueryFilter(
        'transactions',
        {
            ...filters,
        }
    )

    const { data: users, ...userQuery } = useQueryFilter('users', {
        ...(filters?.where?.user_id && {
            where: {
                id: filters?.where?.user_id,
            },
        }),
    })

    if (userQuery?.isLoading || transactionQuery?.isLoading) {
        return <div>Loading...</div>
    }

    const confirm = (description: string, config: {
        onConfirm: () => any
        onCancel?: () => any
    }) => {
        const {
            onConfirm,
            onCancel = () => { },
        } = config
        setDrawerContent(description)
        setHandleCancel(() => onCancel)
        setHandleConfirm(() => onConfirm)
        drawerTrigger?.current?.click()
        return
    }

    const actions = ({ id, is_settled }: Transaction) => ({
        handleToggleSettle: () => {
            console.log({ id, is_settled });

            id && confirm(`Are you sure you want to ${is_settled ? 'unsettle' : 'settle'} this transaction?`, {
                onConfirm: () => {
                    mutate(id, { is_settled: !is_settled })
                    transactionQuery.refetch()
                    toast.success('Transaction Settled!')
                },
            })
        },

        handleDelete: () => {
            id && confirm('Are you sure you want to delete this transaction?', {
                onConfirm: () => {
                    mutate(id, { deleted_at: (new Date).toISOString() })
                    transactionQuery.refetch()
                    toast.success('Transaction Deleted!')
                },
            })
        },
        handleEdit: () => {
            id && router.push(`/transactions/edit?id=${id}`)
        }
    })



    return (
        <>
            <Accordion type="single" collapsible>
                {transactions &&
                    transactions?.map((t: Transaction) => (
                        <TransactionListItem
                            key={`${t.id}`}
                            transaction={{
                                user: users?.find((u: User) => u?.id === t.user_id),
                                ...t,
                            }}
                            actions={actions}
                        />
                    ))}
            </Accordion>
            <Drawer>
                <DrawerTrigger className="hidden" ref={drawerTrigger}>

                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Confirm</DrawerTitle>
                        <DrawerDescription className='text-start mt-4'>
                            {drawerContent}
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter >
                        <DrawerClose className='flex gap-2'>
                            <Button variant="destructive" className="w-full" onClick={handleCancel}>No</Button>
                            <Button variant="success" className="w-full" onClick={handleConfirm} >Yes</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    )
}
