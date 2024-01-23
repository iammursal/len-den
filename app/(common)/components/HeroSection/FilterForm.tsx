'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'
import { useUserStore } from '@/modules/users/stores'
import { toast } from 'sonner'

// const users = [
// 	{ label: 'English', value: 'en' },
// 	{ label: 'French', value: 'fr' },
// 	{ label: 'German', value: 'de' },
// 	{ label: 'Spanish', value: 'es' },
// 	{ label: 'Portuguese', value: 'pt' },
// 	{ label: 'Russian', value: 'ru' },
// 	{ label: 'Japanese', value: 'ja' },
// 	{ label: 'Korean', value: 'ko' },
// 	{ label: 'Chinese', value: 'zh' },
// ] as any

const FormSchema = z.object({
	user: z.string({
		required_error: 'Please select a user.',
	}),
})

export function FilterForm() {
	const { users } = useUserStore()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	let usersOptions = users?.map((user) => {
		return { label: user.name, value: user.id }
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
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
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<Field
					control={form?.control}
					form={form}
					label="User"
					type="select"
					name="user"
					placeholder="Select a user"
					options={usersOptions}
					isSearchable={true}
				/>
				<Button type="submit" variant={'success'}>
					Submit
				</Button>
			</form>
		</Form>
	)
}
