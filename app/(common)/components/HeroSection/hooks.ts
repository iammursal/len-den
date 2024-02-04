import { useRouter, useSearchParams } from 'next/navigation'
import { stringify } from 'qs'
import { z } from 'zod'
import { FormSchema } from './schema'
import { UseFormReturn } from 'react-hook-form'

export const useHandleFormSubmit = () => {
	const router = useRouter()

	return (data: z.infer<typeof FormSchema>) => {
		router.push('/?' + stringify(data))
	}
}

export const useHandleFormReset = (form: any) => {
	const searchParams = useSearchParams()
	const router = useRouter()

	return () => {
		form.reset()
		const params = new URLSearchParams(searchParams)
		params.set('is_settled', '')
		params.set('data_from', '')
		params.set('data_to', '')
		params.set('user_id', '')
		router.push('/?' + params.toString())
	}
}
