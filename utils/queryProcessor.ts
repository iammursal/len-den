import { db } from '@/stores/db'
import { QueryFilter } from '@/types/queryFilter'

export async function queryProcessor(
    tableName: keyof typeof db,
    query: QueryFilter | undefined
): Promise<any[] | number> {
    return new Promise(async (resolve, reject) => {
        try {
            let t = db.table(tableName)
            // Apply where filters
            let result = t.reverse()
            if (typeof query === 'undefined') {
                return resolve(await result.toArray())
            }
            if (query?.where) {
                Object.entries(query.where).forEach(([key, value]) => {
                    result = result.filter((i) => i[key] === value)
                })
            }

            // Apply whereIn filters
            if (query?.whereIn) {
                Object.entries(query.whereIn).forEach(([key, values]) => {
                    result = result.filter((i) => values.includes(i[key]))
                })
            }

            // Apply whereNotIn filters
            if (query?.whereNotIn) {
                Object.entries(query.whereNotIn).forEach(([key, values]) => {
                    result = result.filter((i) => !values.includes(i[key]))
                })
            }

            // Apply whereBetween filters
            if (query?.whereBetween) {
                Object.entries(query.whereBetween).forEach(
                    ([key, [start, end]]) => {
                        result = result.filter(
                            (i) => i[key] >= start && i[key] <= end
                        )
                    }
                )
            }

            // Apply whereNotBetween filters
            if (query?.whereNotBetween) {
                Object.entries(query.whereNotBetween).forEach(
                    ([key, [start, end]]) => {
                        result = result.filter(
                            (i) => i[key] < start || i[key] > end
                        )
                    }
                )
            }

            // Apply whereNull filters
            if (query?.whereNull) {
                query.whereNull.forEach((key) => {
                    result = result.filter((i) =>  i[key] === null || i[key] === '' || i[key] === undefined )
                })
            }

            // Apply whereNotNull filters
            if (query?.whereNotNull) {
                query.whereNotNull.forEach((key) => {
                    result = result.filter((i) => !(i[key] !== '' && i[key] !== null && i[key] !== undefined))
                })
            }

            // Apply limit and offset
            // if (query?.limit) {
            // 	result = result.limit(query.limit)
            // }
            // if (query?.offset) {
            // 	result = result.offset(query.offset)
            // }

            // Apply order
            // if (query?.sort) {
            // 	result = result.sortBy(query.sort)
            // } else
            if (query?.count) {
                // Apply count
                const count = await result.count()
                resolve(count)
            } else {
                const data = await result.toArray()
                if (query?.sumsOf) {
                    let sums = {} as any
                    query.sumsOf.forEach((key) => {
                        sums[key] = data.reduce(
                            (acc, current) => acc + current[key],
                            0
                        )
                    })
                    resolve(sums)
                }
                resolve(data)
            }
        } catch (error) {
            reject(error)
        }
    })
}
