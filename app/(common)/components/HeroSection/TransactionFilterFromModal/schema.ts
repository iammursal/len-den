import { z } from 'zod'

export const FormSchema = z.object({
	// enum of 0, 1, undefined
	is_settled: z
		.string()
		.refine((val) => ['0', '1', 'undefined'].includes(val)),
	user_id: z.coerce.number().optional(),
	date_range: z
		.object({
			from: z.date().optional(),
			to: z.date().optional(),
		})
		.optional(),
})
