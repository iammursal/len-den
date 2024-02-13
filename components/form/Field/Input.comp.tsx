import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import type { FC } from 'react'
import { FieldProps } from './types.model'
import { Input as InputPrimitive } from '@/components/ui/input'

export const Input: FC<FieldProps> = (props) => {
	const {
		form,
		renderProps,
		label,
		error,
		isClearable = true,
        options,
		...otherProps
	} = props
	const { field, fieldState, formState } = renderProps

	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<InputPrimitive {...field}  {...otherProps} />
			</FormControl>
			<FormDescription className="text-destructive">
				{error}
			</FormDescription>
			<FormMessage />
		</FormItem>
	)
}
