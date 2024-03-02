import { z } from 'zod'

export const FormSchema = z.object({
	is_settled: z.string(),
	user_id: z.coerce.number().optional(),
	date_range: z.object({
		from: z.date(),
		to: z.date(),
	}),
})
