import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { merge } from 'lodash-es'
import { useContext } from 'react'
import { TransactionFilterContext } from '../../context/TransactionFilterProvider'

const basicQuery = {
    where: {
        // is_settled: false,
    },
    whereNull: ['deleted_at'],
    sumsOf: ['amount'],
}

export const useHeroSectionState = () => {
    const { filters } = useContext(TransactionFilterContext)
    console.log('filters', filters)
    let f = merge(basicQuery, filters)
    const creditFilters = merge({ where: { type: 'credit' } }, f)
    const debitFilters = merge({ where: { type: 'debit' } }, f)
    const debitQuery = useQueryFilter('transactions', debitFilters)
    const creditQuery = useQueryFilter('transactions', creditFilters)

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
