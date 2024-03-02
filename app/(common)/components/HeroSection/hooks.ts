import useQueryFilter from '@/hooks/useQueryFilter/useQueryFilter'
import { merge } from 'lodash-es'
import { useContext } from 'react'
import { TransactionFilterContext } from '../../context/TransactionFilterProvider'

export const useHeroSectionState = () => {

    const { filters } = useContext(TransactionFilterContext)
    const creditQuery = useQueryFilter('transactions', merge({}, filters, { where: { type: 'credit' }, sumsOf: ['amount'] }))
    const debitQuery = useQueryFilter('transactions', merge({}, filters, { where: { type: 'debit' }, sumsOf: ['amount'] }))

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
