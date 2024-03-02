export type WhereFilter = {
	[key: string]: any
}

export type WhereInFilter = {
	[key: string]: any[]
}

export type WhereNotInFilter = {
	[key: string]: any[]
}

export type WhereBetweenFilter = {
	[key: string]: [any, any]
}

export type WhereNotBetweenFilter = {
	[key: string]: [any, any]
}

export type QueryFilter = {
	where?: WhereFilter
	whereIn?: WhereInFilter
	whereNotIn?: WhereNotInFilter
	whereBetween?: WhereBetweenFilter
	whereNotBetween?: WhereNotBetweenFilter
	whereNull?: string[]
	whereNotNull?: string[]
	sumsOf?: string[]
	count?: boolean
	limit?: number
	offset?: number
    sort?: string
	order?: 'asc' | 'desc'
}
