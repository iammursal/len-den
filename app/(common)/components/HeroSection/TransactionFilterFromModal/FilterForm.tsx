'use client'
import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { isSettledOptions } from './constants'
import { useFilterForm, useFilterFormState } from './hooks'

export const FilterForm = () => {
	const { form, onReset, onSubmit } = useFilterForm()
	const { usersOptions } = useFilterFormState()

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 mt-6 text-start"
			>
				<Field
					form={form}
					label="Is Settled"
					type="select"
					name="is_settled"
					options={isSettledOptions}
					required
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
					type="date-range"
					name="date_range"
					mode="range"
				/>
				<DialogTrigger className="w-full flex gap-4 pt-6">
					<Button
						type="submit"
						variant="success"
						className="w-1/2 w-md-auto"
					>
						Submit
					</Button>
					<Button
						type="button"
						onClick={onReset}
						variant="destructive"
						className="w-1/2 w-md-auto"
					>
						Reset
					</Button>
				</DialogTrigger>
			</form>
		</Form>
	)
}
