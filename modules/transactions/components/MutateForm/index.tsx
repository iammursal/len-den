'use client'

import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useTransactionStore } from '@/modules/transactions/stores'
import { useUserStore } from '@/modules/users/stores'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
	amount: z.coerce.number().positive(),
	user_id: z.string().min(1),
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
	const { addTransaction, clearAllTransaction } =
		useTransactionStore()
	const { users } = useUserStore()

	let usersOptions = users?.map((user) => {
		return { label: user.name, value: user.id }
	})

	// usersOptions.unshift({
	// 	label: '+ Add new user',
	// 	value: 'new',
	// })

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			user_id: '',
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		addTransaction({
			id: crypto.randomUUID(),
			type,
			...data,
		})
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		})
		router.push('/')
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-2/3 space-y-6"
			>
				<Field
					name="amount"
					type="number"
					label="Amount"
					placeholder="Enter the amount you borrowed"
					min={1}
					error={fieldErrors?.amount}
					control={form.control}
					required
				/>
				<Field
					name="user_id"
					type="select"
					label="User"
					placeholder="Select the lender"
					options={usersOptions}
					isSearchable={true}
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

				<Button
					variant={type === 'debit' ? 'destructive' : 'success'}
					type="submit"
				>
					<span className=" ">
						{type === 'credit' ? 'Lend' : 'Borrow'} Money
					</span>
				</Button>
			</form>
		</Form>
	)
}
