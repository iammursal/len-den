'use client'

import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useTransactionCreate } from '@/modules/transactions/hooks'
import { useUserListQuery } from '@/modules/users/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
	amount: z.coerce.number().min(0),
	user_id: z.string(),
	transacted_at: z.string().optional(),
	notes: z.string().optional(),
	type: z.enum(['credit', 'debit']),
})

export function TransactionMutateForm({
	type,
}: {
	type: 'credit' | 'debit'
}) {
	const router = useRouter()
	const { data: users } = useUserListQuery()
	const createTransaction = useTransactionCreate({
		onSuccess: () => {
			toast('Success', {
				description: 'Transaction added successfully',
			})
			router.push('/')
		},
		onError: () => {
			toast('Error', {
				description: 'Something went wrong',
			})
		},
	})

	let usersOptions = users?.map((user) => {
		return { label: user.name, value: `${user.id}` }
	})

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: undefined,
			user_id: undefined,
			transacted_at: new Date().toISOString().substr(0, 16),
			notes: undefined,
			type,
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("🚀 ~ onSubmit ~ data:", data)
		createTransaction.mutate({
			...data,
			transacted_at: data?.transacted_at
				? new Date(data.transacted_at).toISOString().substr(0, 16)
				: undefined,
			user_id: `${data.user_id}`,
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<Field
					form={form}
					name="amount"
					type="number"
					label="Amount"
					placeholder="Enter the amount you borrowed"
					min={1}
					required
				/>
				<Field
					name="user_id"
					type="select"
					label="User"
					placeholder="Select the lender"
					options={usersOptions}
					isSearchable={true}
					form={form}
					required
				/>
				<Field
					name="transacted_at"
					type="datetime-local"
					label="Transacted At"
					defaultValue={new Date().toISOString().substr(0, 16)}
					form={form}
					required
				/>

				<Field
					name="notes"
					type="textarea"
					label="Notes"
					placeholder="Enter the notes"
					form={form}
				/>

				<Button
					isLoading={createTransaction.isLoading}
					variant={type === 'debit' ? 'destructive' : 'success'}
					type="submit"
				>
					{type === 'credit' ? 'Lend' : 'Borrow'} Money
				</Button>
			</form>
		</Form>
	)
}
