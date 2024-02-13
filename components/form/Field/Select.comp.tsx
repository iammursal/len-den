import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import {
	SelectContent,
	SelectItem,
	Select as SelectPrimitive,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import type { FC } from 'react'
import { FieldProps } from './types.model'

export const Select: FC<FieldProps> = (props) => {
	const {
		renderProps,
		label,
		name,
		type,
		required,
		error,
		options,
		form,
		isClearable = true,
		placeholder = '',
		...otherProps
	} = props
	const { field, fieldState, formState } = renderProps

	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<SelectPrimitive
				onValueChange={field.onChange}
				defaultValue={field.value}
			>
				<FormControl>
					<SelectTrigger>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
				</FormControl>
				<SelectContent>
					{options?.map((option, index) => (
						<SelectItem key={`${option.value}-${index}`} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</SelectPrimitive>
			<FormDescription className="text-destructive">
				{error}
			</FormDescription>
		</FormItem>
	)
}
