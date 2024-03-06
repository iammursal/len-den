import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { merge } from 'lodash-es'
import { useContext } from 'react'
import { TransactionFilterContext } from '../../context/TransactionFilterProvider'

const basicQuery = {
    where: {
        is_settled: true,
        deleted_at: undefined
    },
    sumsOf: ['amount'],
}

export const useHeroSectionState = () => {

    const { filters } = useContext(TransactionFilterContext)
    const creditQuery = useQueryFilter('transactions', merge(basicQuery, filters, { where: { type: 'credit' }, }))
    const debitQuery = useQueryFilter('transactions', merge(basicQuery, filters, { where: { type: 'debit' }, }))

    const totalCredit = creditQuery.data?.amount
    const totalDebit = debitQuery.data?.amount

    const isLoading = creditQuery.isLoading || debitQuery.isLoading
    const error = creditQuery.error || debitQuery.error

    const totalBalance =
        typeof totalCredit === 'number' && typeof totalDebit === 'number'
            ? totalCredit - totalDebit
            : 0

    return { totalCredit, totalDebit, totalBalance, isLoading, error }
}
