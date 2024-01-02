'use client'

import Field from '@/components/form/Field'
import { useTransactionStore } from '@/modules/transactions/stores'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
	amount: z.coerce.number().positive(),
	name: z.string().min(1),
	borrowed_at: z.string(),
	notes: z.string().optional(),
})

export function TransactionMutateForm({
	type,
}: {
	type: 'credit' | 'debit'
}) {
	const [fieldErrors, setFieldErrors] = useState({}) as any
	const router = useRouter()
	const { addTransaction, clearAllTransaction } = useTransactionStore()
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event?.currentTarget)
		// clearAllTransaction()
		let validation = schema.safeParse(
			Object.fromEntries(formData.entries())
		) as any

		if (!validation.success) {
            setFieldErrors(validation?.error?.formErrors?.fieldErrors)
			return
		}
		let values = validation.success ? validation.data : {}
		addTransaction({
			id: crypto.randomUUID(),
            type,
			...values,
		})
		router.push('/')
	}

	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="amount"
				type="number"
				label="Amount"
				placeholder="Enter the amount you borrowed"
				min={1}
				error={fieldErrors?.amount}
				required
			/>
			<Field
				name="name"
				type="text"
				label="Name"
				placeholder="Enter the lender name"
				error={fieldErrors?.name}
				required
			/>
			<Field
				name="borrowed_at"
				type="datetime-local"
				label="Borrowed At"
				placeholder="Enter person lender borrowed_at"
				defaultValue={new Date().toISOString().substr(0, 16)}
				error={fieldErrors?.borrowed_at}
				required
			/>

			<Field
				name="notes"
				type="textarea"
				label="Notes"
				placeholder="Enter the notes"
				error={fieldErrors?.notes}
			/>

			<button
				type="submit"
				className={clsx({
					' py-4 mt-4  rounded-lg   w-full': true,
					'bg-danger hover:bg-danger/95': type === 'debit',
					'bg-success hover:bg-success/95': type === 'credit',
				})}
			>
				<span className=" ">
					{type === 'credit' ? 'Lend' : 'Borrow'} Money
				</span>
			</button>
		</form>
	)
}
