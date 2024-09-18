'use client'


import { Field } from '@/components/form/Field'
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
import { Form } from '@/components/ui/form'
import { useQueryFilter } from '@/hooks'
import { Transaction, useTransactionUpdate } from '@/modules/transactions'
import { User } from '@/modules/users'
import { QueryFilter } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useRef, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { TransactionListItem } from './TransactionListItem'
import { format } from 'date-fns'

type TransactionListProps = {
    filters?: QueryFilter
    onDelete?: (transaction: Transaction) => any
    onSettle?: (transaction: Transaction) => any
    onUnsettle?: (transaction: Transaction) => any
    onChange?: (t: Transaction) => any
}

const FormSchema = z.object({
    settled_at_date: z.string().optional(),
    settled_at_time: z.string().optional(),
})

export const TransactionList: FC<TransactionListProps> = ({
    filters,
    onDelete,
    onSettle,
    onUnsettle,
    onChange,
}) => {
    const [drawerContent, setDrawerContent] = useState(null) as any
    const [handleCancel, setHandleCancel] = useState(() => { }) as any
    const [handleConfirm, setHandleConfirm] = useState(() => { }) as any
    const drawerTrigger = useRef(null)
    const router = useRouter()

    const { mutate, isLoading, error } = useTransactionUpdate({})
    const { data: transactions, ...transactionQuery } = useQueryFilter(
        'transactions',
        filters,
    )

    const { data: users, ...userQuery } = useQueryFilter('users', {
        ...(filters?.where?.user_id && {
            where: {
                id: filters?.where?.user_id,
            },
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // @ts-ignore
        defaultValues: {
            settled_at_date: new Date().toISOString().substr(0, 10),
            settled_at_time: new Date().toISOString().substr(11, 5)
        }
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
        // @ts-ignore
        drawerTrigger?.current?.click()
        return
    }

    const actions = (t: Transaction) => ({
        handleToggleSettle: () => {
            if (!t?.id) return;

            confirm(
                `Are you sure you want to ${t?.settled_at ? 'unsettle' : 'settle'} this transaction?`,
                {
                    onConfirm: () => {
                        const formValues = form.getValues()
                        const { settled_at_date, settled_at_time } = formValues || {}
                        const settled_at = settled_at_date ? settled_at_date + 'T' + settled_at_time : ''
                        t?.id && mutate(t.id, {
                            settled_at: !t?.settled_at
                                ? settled_at
                                : undefined,
                        })
                        transactionQuery.refetch()
                        toast.success('Transaction Settled!')
                        if (t?.settled_at) {
                            onSettle && onSettle(t)
                        } else {
                            onUnsettle && onUnsettle(t)
                        }
                        onChange && onChange(t)
                    },
                })
        },

        handleDelete: () => {
            t?.id && confirm('Are you sure you want to delete this transaction?', {
                onConfirm: () => {
                    t?.id && mutate(t.id, { deleted_at: (new Date).toISOString() })
                    transactionQuery.refetch()
                    toast.success('Transaction Deleted!')
                    onDelete && onDelete(t)
                    onChange && onChange(t)
                },
            })
        },

        handleEdit: () => {
            t?.id && router.push(`/transactions/edit?id=${t?.id}`)
        }
    })



    return (
        <>
            <Accordion type="single" collapsible>
                {transactions && transactions?.map &&
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
            <Form {...form}>
                <form
                    className="w-full space-y-6"
                >
                    <Drawer>
                        <DrawerTrigger className="hidden" ref={drawerTrigger}>

                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Confirm</DrawerTitle>
                                <DrawerDescription className='text-start mt-4'>
                                    <p className='text-center'>{drawerContent}</p>
                                    <div className="grid grid-cols-3 w-full gap-4 mt-10">
                                        <div className="col-span-2">
                                            <Field
                                                label="Date"
                                                name="settled_at_date"
                                                type="date"
                                                form={form}
                                                required
                                            />
                                        </div>
                                        <Field
                                            label="Time"
                                            name="settled_at_time"
                                            type="time"
                                            form={form}
                                            required
                                        />
                                    </div>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter >
                                <DrawerClose className='flex gap-2'>
                                    <Button variant="destructive" className="w-full" onClick={handleCancel}>Cancel</Button>
                                    <Button variant="success" className="w-full" onClick={handleConfirm} >Confirm</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </form>
            </Form>
        </>

    )
}
