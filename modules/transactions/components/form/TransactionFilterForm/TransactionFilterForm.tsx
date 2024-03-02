'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { TransactionFilterContext } from '@/app/(common)/context/TransactionFilterProvider'
import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useUserListQuery } from '@/modules/users/hooks'
import { useContext, useEffect, useMemo } from 'react'
import { useHandleFormReset, useHandleFormSubmit } from './hooks'
import { FormSchema } from './schema'

const isSettledOptions = [
    { label: 'All', value: 'undefined' },
    { label: 'Settled', value: '1' },
    { label: 'Unsettled', value: '0' },
]

export function FilterForm() {
    const { filters } = useContext(TransactionFilterContext)
    const defaultValues = {
        date_range: {
            // one month ago
            from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            // today
            to: new Date(Date.now()),
        },
        ...filters,
        user_id:
            typeof filters.user_id !== 'undefined'
                ? `${filters.user_id}`
                : undefined,
        is_settled:
            typeof filters.is_settled !== 'undefined'
                ? `${filters.is_settled ? 1 : 0}`
                : 'undefined',
    }

    const { data: users } = useUserListQuery()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    })
    const handleReset = useHandleFormReset(form)
    const handleSubmit = useHandleFormSubmit()


    let usersOptions = useMemo(
        () =>
            users?.map((user) => {
                return { label: user.name, value: `${user.id}` }
            }),
        [users]
    )

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 mt-6 text-start"
            >
                <Field
                    form={form}
                    label="Is Settled"
                    type="select"
                    name="is_settled"
                    options={isSettledOptions}
                    required
                />
                <Field
                    form={form}
                    label="User"
                    type="select"
                    name="user_id"
                    placeholder="Select a user"
                    options={usersOptions}
                    isSearchable={true}
                />
                <Field
                    form={form}
                    label="Date from"
                    type="date-range"
                    name="date_range"
                    mode="range"
                />
                <DialogTrigger className="w-full flex gap-4 pt-6">
                    <Button
                        type="submit"
                        variant="success"
                        className="w-1/2 w-md-auto"
                    >
                        Submit
                    </Button>
                    <Button
                        type="button"
                        onClick={handleReset}
                        variant="destructive"
                        className="w-1/2 w-md-auto"
                    >
                        Reset
                    </Button>
                </DialogTrigger>
            </form>
        </Form>
    )
}
