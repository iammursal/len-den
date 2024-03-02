'use client'

import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useUserCreate, useUserUpdate } from '@/modules/users/hooks'
import { User } from '@/modules/users/types'
import { TableWithTimestampsModel } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
	name: z.string(),
	phone: z.string().optional(),
	email: z.coerce.string().optional(),
})

type UserMutateFormProps = { user?: Partial<User> }

export function UserMutateForm({ user }: UserMutateFormProps) {
	const router = useRouter()
	const toastConfig = {
		action: {
			label: 'Ok',
			onClick: () => {},
		},
	}
	const userCreate = useUserCreate({
		onSuccess: () => {
			toast('User Created', {
				description: 'User has been created successfully.',
				...toastConfig,
			})

			router.push('/users')
		},
		onError: (error) => {
			toast('Error', {
				description: error?.message,
				...toastConfig,
			})
		},
	})
	const userUpdate = useUserUpdate({
		onSuccess: () => {
			toast('User Updated', {
				description: 'User has been updated successfully.',
				...toastConfig,
			})

			router.push('/users')
		},
		onError: (error) => {
			toast('Error', {
				description: error?.message,
				...toastConfig,
			})
		},
	})
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: user?.name || '',
			phone: user?.phone || '',
			email: user?.email || '',
		},
	})

	const id = user?.id

	function handleCreateUser(
		user: Omit<User, keyof TableWithTimestampsModel>
	) {
		userCreate.mutate({
			...user,
		})
	}
	function handleUpdateUser(
		user: Partial<Omit<User, keyof TableWithTimestampsModel>>
	) {
		if (!id) {
			return
		}
		userUpdate.mutate(id, {
			...user,
		})
	}
	function onSubmit(data: z.infer<typeof FormSchema>) {
		id ? handleUpdateUser(data) : handleCreateUser(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-2/3 space-y-6"
			>
				<Field
					name="name"
					type="text"
					label="Name"
					placeholder="Enter the user's full name"
					min={1}
					form={form}
					required
				/>

				<Field
					name="phone"
					type="text"
					label="Phone"
					placeholder="Enter the phone"
					form={form}
				/>

				<Field
					name="email"
					type="text"
					label="Email"
					placeholder="Enter the email"
					form={form}
				/>

				<Button variant="success" type="submit">
					{id ? 'Update' : 'Create'} new user
				</Button>
			</form>
		</Form>
	)
}
