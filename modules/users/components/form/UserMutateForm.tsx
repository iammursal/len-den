'use client'

import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ToastAction } from '@/components/ui/toast'
import { useUserStore } from '@/modules/users/stores'
import { UserModel } from '@/modules/users/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
	name: z.string(),
	phone: z.coerce.number().positive(),
})

type UserMutateFormProps = {
	id?: string
}
export function UserMutateForm({ id }: UserMutateFormProps) {
	const { users } = useUserStore()
	const router = useRouter()
	const { addUser, updateUser } = useUserStore()
	const user = users?.find((u) => u.id === id)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: user || {},
	})

	function handleCreateUser(user: Partial<UserModel>) {
		addUser({
			id: crypto.randomUUID(),
			...user,
		})
		return {
			success: 1,
			message: 'User has been created successfully.',
		}
	}

	function handleUpdateUser(user: Partial<UserModel>) {
		updateUser({
            id,
			...user,
		})

		return {
			success: 1,
			message: 'User has been updated successfully.',
		}
	}

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const result = id
			? handleUpdateUser(data)
			: handleCreateUser(data)
		if (result?.success) {
			toast('Success', {
				description: result.message,
                type: 'success',
				action: {
					label: 'Ok',
					onClick: () => console.log('Undo'),
				},
			})
			router.push('/users')
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-2/3 space-y-6"
			>
				<Field
					name="name"
					type="number"
					label="Name"
					placeholder="Enter the user's full name"
					min={1}
					control={form.control}
					required
				/>

				<Field
					name="phone"
					type="text"
					label="Phone"
					placeholder="Enter the phone"
					control={form.control}
				/>

				<Button variant="success" type="submit">
					{id ? 'Update' : 'Create'} new user
				</Button>
			</form>
		</Form>
	)
}
