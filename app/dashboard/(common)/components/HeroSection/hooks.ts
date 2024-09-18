'use client'

import { Transaction, useTransactionSheet } from '@/modules/transactions'
import { useEffect, useState } from 'react'


export const useHeroSectionState = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [totalCredit, setTotalCredit] = useState(0)
    const [totalDebit, setTotalDebit] = useState(0)
    const [totalBalance, setTotalBalance] = useState(0)
    const { transactionSheet, ...ts } = useTransactionSheet()
    // console.log("🚀 ~ useHeroSectionState ~ ts:", ts)

    // google sheet implementation
    const getData = async (transactionSheet: any) => {
        console.log('🚀 ~ file: hooks.ts ~ line 20 ~ getData ~ transactionSheet', transactionSheet)
        const totalCredit = await transactionSheet.getRows()?.reduce((tc: number, txn: Transaction) => {
            if (txn.type === 'credit') return tc + txn.amount
            return tc
        }, 0)

        const totalDebit = await transactionSheet.getRows()?.reduce((tc: number, txn: Transaction) => {
            if (txn.type === 'debit') return tc + txn.amount
            return tc
        }, 0)

        if (!(typeof totalCredit === 'number' && typeof totalDebit === 'number')) {
            setError('Something went wrong. Please try again later.')
            return
        }
        const totalBalance = totalCredit - totalDebit
        setTotalCredit(totalCredit)
        setTotalDebit(totalDebit)
        setTotalBalance(totalBalance)
        setIsLoading(false)
    }

    useEffect(() => {
        if (!ts.isLoading && !ts.error && transactionSheet)
            getData(transactionSheet)
    }, [ts])

    return { totalCredit, totalDebit, totalBalance, isLoading, error }
}
