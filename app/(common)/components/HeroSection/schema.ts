import { z } from "zod";

export const FormSchema = z.object({
	is_settled: z.string().default('-1'),
	user_id: z.string().optional().default(''),
	data_from: z.string().optional().default(''),
	data_to: z.string().optional().default(''),
})
