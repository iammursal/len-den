import {
    FormControl
} from '@/components/ui/form'
import { Input as InputPrimitive } from '@/components/ui/input'
import type { FC } from 'react'
import { FieldProps } from './types'

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
		<FormControl>
			<InputPrimitive {...field} {...otherProps} />
		</FormControl>
	)
}
