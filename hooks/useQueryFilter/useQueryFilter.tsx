import { db } from '@/stores/db'
import { QueryFilter } from '@/types/queryFilter'
import { queryProcessor } from '@/utils/queryProcessor'
import { useDeepCompareEffect } from '@/hooks/useDeepCompareEffect'
import { useState } from 'react'

const useQueryFilter = (
	tableName: keyof typeof db,
	queryObject: QueryFilter | undefined
) => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null | undefined>(null)
	const [data, setData] = useState<any>(null)

	useDeepCompareEffect(() => {
		const fetchData = async () => {
			try {
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

		fetchData()
	}, [tableName, queryObject])

	return { isLoading, error, data }
}

export default useQueryFilter
