import { TransactionFilterContext } from '@/app/(common)/context/TransactionFilterProvider'
import { useContext } from 'react'
import { z } from 'zod'
import { FormSchema } from './schema'

export const useHandleFormSubmit = () => {
	const { filters, setFilters } = useContext(TransactionFilterContext)

	return (data: z.infer<typeof FormSchema>) => {
		if (data && Object.keys(data).length === 0) return
		const keys = Object.keys(data) as Array<
			keyof z.infer<typeof FormSchema>
		>

		let modData = keys?.reduce((acc, key) => {
			if (data[key] === 'undefined') {
				acc[key] = undefined
			} else if (key === 'is_settled') {
				acc[key] = !!parseInt(data[key])
			} else if (key === 'date_range') {
				acc['date_from'] = data[key]?.from?.toISOString().slice(0, 16)
				acc['date_to'] = data[key]?.to?.toISOString().slice(0, 16)
				delete acc[key]
			} else {
				acc[key] = data[key]
			}
			return acc
		}, {} as any)

		setFilters(modData)
	}
}

export const useHandleFormReset = (form: any) => {
	const { filters, setFilters } = useContext(TransactionFilterContext)

	return () => {
		form.reset()
		setFilters({})
	}
}
