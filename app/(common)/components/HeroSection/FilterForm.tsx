'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useUserStore } from '@/modules/users/stores'
import { useSearchParams } from 'next/navigation'
import { useHandleFormReset, useHandleFormSubmit } from './hooks'
import { FormSchema } from './schema'

const isSettledOptions = [
	{ label: 'All', value: '-1' },
	{ label: 'Settled', value: '1' },
	{ label: 'Unsettled', value: '0' },
]

export function FilterForm() {
	const searchParams = useSearchParams()
	const users = useUserStore((s) => s.users)
	const handleSubmit = useHandleFormSubmit()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			is_settled: searchParams?.get('is_settled') || '-1',
			user_id: searchParams?.get('user_id') || '',
			data_from: searchParams?.get('data_from') || '',
			data_to: searchParams?.get('data_to') || '',
		},
	})
	const handleReset = useHandleFormReset(form)

	let usersOptions = users?.map((user) => {
		return { label: user.name, value: user.id }
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-6"
			>
				<Field
					form={form}
					label="Is Settled"
					type="select"
					name="is_settled"
					required
					options={isSettledOptions}
				/>
				<Field
					form={form}
					label="User"
					type="select"
					name="user_id"
					placeholder="Select a user"
					options={usersOptions}
					isSearchable={true}
				/>
				<Field
					form={form}
					label="Date from"
					type="date"
					name="data_from"
				/>
				<Field
					form={form}
					label="Date to"
					type="date"
					name="data_to"
				/>

				<DialogTrigger className="w-full flex gap-4">
					<Button type="submit" variant="success">
						Submit
					</Button>
					<Button
						type="button"
						onClick={handleReset}
						variant="destructive"
					>
						Reset
					</Button>
				</DialogTrigger>
			</form>
		</Form>
	)
}
