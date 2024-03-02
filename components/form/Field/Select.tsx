import {
    FormControl
} from '@/components/ui/form'
import {
    SelectContent,
    SelectItem,
    Select as SelectPrimitive,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { FC } from 'react'
import { FieldProps } from './types'

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
					<SelectItem
						key={`${option.value}-${index}`}
						value={option.value}
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</SelectPrimitive>
	)
}
