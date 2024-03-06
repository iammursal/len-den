import { TransactionFilterContext } from '@/app/(common)/context/TransactionFilterProvider'
import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { User } from '@/modules/users/types'
import { QueryFilter } from '@/types/queryFilter'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormSchema } from './schema'
import { merge } from 'lodash-es'

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

        let filters = {
            where: {
                deleted_at: undefined
            }
        } as QueryFilter
        Object.keys(data)?.forEach((key: string) => {
            let value = data[key as keyof typeof data]
            if (
                value === 'undefined' ||
                value === '' ||
                typeof value === 'undefined'
            ) {
                return
            }
            if (
                key === 'is_settled' &&
                ['1', '0'].includes(value as string)
            ) {
                filters = {
                    ...filters,
                    where: {
                        ...filters.where,
                        is_settled: Boolean(Number(value)),
                    },
                }
            } else if (key === 'user_id') {
                filters = {
                    ...filters,
                    where: {
                        ...filters.where,
                        user_id: value,
                    },
                }
            } else if (
                key === 'amount_range' &&
                typeof value === 'object' &&
                typeof value?.from === 'number' &&
                typeof value?.to === 'number'
            ) {
                filters = merge({}, filters, {
                    whereBetween: {
                        amount: [value.from, value.to],
                    }
                })
            } else if (
                key === 'date_range' &&
                typeof value === 'object' &&
                typeof value?.from === 'object' &&
                typeof value?.to === 'object'
            ) {
                filters = {
                    ...filters,
                    whereBetween: {
                        ...filters.whereBetween,
                        transacted_at: [
                            `${format(value.from, `yyyy-MM-dd'T'`)}00:00`,
                            `${format(value.to, `yyyy-MM-dd'T'`)}23:59`,
                        ] as [string, string],
                    },
                }
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
                return { label: user.name, value: `${user.id} ` }
            }),
        [users]
    )

    return { users: userQuery.data, usersOptions }
}
