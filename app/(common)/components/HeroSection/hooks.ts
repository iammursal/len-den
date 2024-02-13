import { useRouter, useSearchParams } from 'next/navigation'
import { stringify } from 'qs'
import { z } from 'zod'
import { FormSchema } from './schema'

export const useHandleFormSubmit = () => {
	const router = useRouter()

	return (data: z.infer<typeof FormSchema>) => {
        const keys =Object.keys(data) as (keyof z.infer<typeof FormSchema>)[]
        keys?.forEach((x) => data[x] === 'null' && delete data[x]);
		router.push('/?' + stringify(data))
	}
}

export const useHandleFormReset = (form: any) => {
	const searchParams = useSearchParams()
	const router = useRouter()

	return () => {
		form.reset()
		const params = new URLSearchParams(searchParams)
		params.delete('is_settled')
		params.delete('data_from')
		params.delete('data_to')
		params.delete('user_id')
		router.push('/?' + params.toString())
	}
}
