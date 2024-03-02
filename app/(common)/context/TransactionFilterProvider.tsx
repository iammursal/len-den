'use client'

import { QueryFilter } from '@/types/queryFilter'
import { FC, createContext, useMemo, useState } from 'react'

interface TransactionFilterContextProps {
    filters?: QueryFilter
    setFilters: (filter: QueryFilter) => void
}

export const TransactionFilterContext =
    createContext<TransactionFilterContextProps>({
        filters: undefined,
        setFilters: () => { },
    })

export const TransactionFilterProvider: FC<any> = ({ children }) => {
    const [filters, setFilters] = useState({} as QueryFilter)
    console.log("🚀 ~ filters:", filters)

    const value = useMemo(() => {
        return { filters, setFilters }
    }, [filters, setFilters])

    return (
        <TransactionFilterContext.Provider value={value}>
            {children}
        </TransactionFilterContext.Provider>
    )
}
