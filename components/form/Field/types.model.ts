import { InputHTMLAttributes } from 'react'
import {
	ControllerFieldState,
	ControllerRenderProps,
	UseFormReturn,
	UseFormStateReturn,
} from 'react-hook-form'

export type FieldProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'form'
> & {
	form: UseFormReturn<any, any, any>
	renderProps: {
		field: ControllerRenderProps<any, string>
		fieldState: ControllerFieldState
		formState: UseFormStateReturn<any>
	}
	label: string
	name: string
	type:
		| 'text'
		| 'select'
		| 'search-select'
		| 'date'
		| 'date-range'
		| 'number'
		| 'checkbox'
		| 'radio'
		| 'textarea'
        | 'datetime-local'
        | 'time'
	isClearable?: boolean
	options?: {
		label: string
		value: string
	}[]
	error?: string
	isSearchable?: boolean
}
