import { useDeepCompareEffect } from '@/hooks/useDeepCompareEffect'
import { db } from '@/stores/db'
import { QueryFilter } from '@/types/queryFilter'
import { queryProcessor } from '@/utils/queryProcessor'
import { useState } from 'react'

const useQueryFilter = (
    tableName: keyof typeof db,
    queryObject: QueryFilter | undefined
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null | undefined>(null)
    const [data, setData] = useState<any>(null)

    let fetchData: (tableName: string, queryObject: QueryFilter | undefined) => Promise<void> = async () => {
        try {
            setIsLoading(true)
            const filteredData = await queryProcessor(
                tableName,
                queryObject
            )
            setData(filteredData)
        } catch (error: any) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useDeepCompareEffect(() => {
        fetchData(tableName, queryObject)
    }, [tableName, queryObject])

    const refetch = () => {
        fetchData(tableName, queryObject)
    }

    return { isLoading, error, data, refetch }
}

export  {useQueryFilter}
