'use client'

import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { useTransactionCreate } from '@/modules/transactions/hooks'
import { Transaction } from '@/modules/transactions/types'
import { User } from '@/modules/users/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
    amount: z.coerce.number().min(0),
    user_id: z.coerce.number().nonnegative(),
    transacted_at: z.string().optional(),
    notes: z.string().optional(),
    type: z.enum(['credit', 'debit']),
})

const typeOptions = [
    { label: 'Credit', value: 'credit' },
    { label: 'Debit', value: 'debit' },
]

export function TransactionMutateForm({
    transaction,
}: {
    transaction?: Partial<Transaction>
}) {
    const { type } = transaction || { type: 'credit' }
    const router = useRouter()
    const userQuery = useQueryFilter('users', {})
    const createTransaction = useTransactionCreate({
        onSuccess: () => {
            toast('Success', {
                description: 'Transaction added successfully',
            })
            router.push('/')
        },
        onError: () => {
            toast('Error', {
                description: 'Something went wrong',
            })
        },
    })
    let defaultValues = {
        amount: undefined,
        user_id: undefined,
        transacted_at: new Date().toISOString().substr(0, 16),
        notes: undefined,
        type: 'credit',
        ...transaction
    }
    let usersOptions = useMemo(() => userQuery?.data?.map((user: User) => {
        return { label: user.name, value: `${user.id}` }
    }), [userQuery.isLoading])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // @ts-ignore
        defaultValues,
    })


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        createTransaction.mutate({
            ...data,
            transacted_at: data?.transacted_at
                ? new Date(data.transacted_at).toISOString().substr(0, 16)
                : undefined,
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <Field
                    form={form}
                    name="amount"
                    type="text"
                    inputMode='numeric'
                    label="Amount"
                    placeholder="Enter the amount you borrowed"
                    min={1}
                    required
                />
                <Field
                    name="type"
                    type="select"
                    label="Type"
                    placeholder="Select the transaction type"
                    options={typeOptions}
                    form={form}
                    required
                />
                <Field
                    name="user_id"
                    type="select"
                    label="User"
                    placeholder="Select the lender"
                    options={usersOptions}
                    isSearchable={true}
                    form={form}
                    required
                />
                <Field
                    name="transacted_at"
                    type="datetime-local"
                    label="Transacted At"
                    defaultValue={new Date().toISOString().substr(0, 16)}
                    form={form}
                    required
                />

                <Field
                    name="notes"
                    type="textarea"
                    label="Notes"
                    placeholder="Enter the notes"
                    form={form}
                />

                <Button
                    isLoading={createTransaction.isLoading}
                    variant={type === 'debit' ? 'destructive' : 'success'}
                    type="submit"
                >
                    {type === 'credit' ? 'Lend' : 'Borrow'} Money
                </Button>
            </form>
        </Form>
    )
}
