import { TransactionFilterContext } from '@/app/(common)/context/TransactionFilterProvider'
import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { User } from '@/modules/users/types'
import { QueryFilter } from '@/types/queryFilter'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { merge } from 'lodash-es'
import { useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormSchema } from './schema'

export const useFilterForm = () => {
    const { filters, setFilters } = useContext(TransactionFilterContext)
    console.log("🚀 ~ useFilterForm ~ filters:", filters)

    const defaultValues = {
        date_range:
            filters?.whereBetween?.transacted_at?.length === 2
                ? {
                    from: new Date(filters?.whereBetween?.transacted_at[0]),
                    to: new Date(filters?.whereBetween?.transacted_at[1]),
                }
                : undefined,
        user_id:
            typeof filters?.where?.user_id === 'number'
                ? `${filters?.where?.user_id}`
                : undefined,
        is_settled:
            typeof filters?.where?.is_settled === 'boolean'
                ? filters?.where?.is_settled
                    ? '1'
                    : '0'
                : 'undefined',

        amount_range: {
            from: filters?.whereBetween?.amount?.[0] || '',
            to: filters?.whereBetween?.amount?.[1] || '',
        },
    } as z.infer<typeof FormSchema>

    console.log({ defaultValues });


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    })

    const onReset = () => {
        form.reset()
        setFilters({})
    }

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (data && Object.keys(data).length === 0) return

        console.log('onSubmit', data)

        let filters = {
            whereNull: ['deleted_at'],
        } as QueryFilter
        Object.keys(data)?.forEach((key: string) => {
            let value = data[key as keyof typeof data]

            if (typeof value === 'undefined') return

            if (key === 'is_settled') {
                filters = merge({
                    where: {
                        ...filters.where,
                        is_settled: Boolean(Number(value)),
                    },
                }, filters)
            } else if (key === 'user_id') {
                filters = merge({
                    where: {
                        ...filters.where,
                        user_id: value,
                    },
                }, filters)
            } else if (
                key === 'amount_range' &&
                typeof value === 'object' &&
                typeof value?.from === 'number' &&
                typeof value?.to === 'number'
            ) {
                filters = merge({
                    whereBetween: {
                        amount: [value.from, value.to],
                    }
                }, filters)
            } else if (
                key === 'date_range' &&
                typeof value === 'object' &&
                typeof value?.from === 'object' &&
                typeof value?.to === 'object'
            ) {
                filters = merge({
                    whereBetween: {
                        transacted_at: [
                            `${format(value.from, `yyyy-MM-dd'T'`)}00:00`,
                            `${format(value.to, `yyyy-MM-dd'T'`)}23:59`,
                        ] as [string, string],
                    },
                }, filters)
            }
        })
        setFilters(filters)
    }

    return { form, onReset, onSubmit }
}

export const useFilterFormState = () => {
    const userQuery = useQueryFilter('users', {})
    const users = userQuery.data
    let usersOptions = useMemo(
        () =>
            users?.map((user: User) => {
                return { label: user.name, value: `${user.id}` }
            }),
        [users]
    )

    return { users: userQuery.data, usersOptions }
}
