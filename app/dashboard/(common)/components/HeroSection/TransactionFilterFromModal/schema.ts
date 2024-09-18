import { z } from 'zod'



export const FormSchema = z.object({
    // enum of 0, 1, undefined
    is_settled: z.string()

        .transform((value) => (value === 'undefined' ? undefined : value))
        .refine((val) => ['0', '1', undefined].includes(val)),
    // is_settled: z
    //     .string()
    //     .refine((val) => ['0', '1', 'undefined'].includes(val)),
    user_id: z.string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .refine((value) => value === null || !isNaN(Number(value)), {
            message: 'Invalid number',
        })
        .transform((value) => (value === null ? undefined : Number(value))).optional(),
    date_range: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .optional(),
    settled_at: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .optional(),
    amount_range: z
        .object({
            from: z.number()
                .transform((value) => (!value ? null : value))
                .nullable()
                .refine((value) => value === null || !isNaN(Number(value)), {
                    message: 'Invalid number',
                })
                .transform((value) => (value === null ? undefined : Number(value))),
            to: z.number()
                .transform((value) => (!value ? null : value))
                .nullable()
                .refine((value) => value === null || !isNaN(Number(value)), {
                    message: 'Invalid number',
                })
                .transform((value) => (value === null ? undefined : Number(value))),
        })
        .optional(),
})
