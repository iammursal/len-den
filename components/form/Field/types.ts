import { InputHTMLAttributes } from 'react';
import { ControllerFieldState, ControllerRenderProps, UseFormReturn, UseFormStateReturn } from 'react-hook-form';

export type FieldProps = {
	form: UseFormReturn<any, any, undefined>
    renderProps:   {
        field: ControllerRenderProps<any, string>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<any>;
    }
	label: string
    name:string
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
	isClearable?: boolean
	options?: {
		label: string
		value: string
	}[]
	error?: string
} & InputHTMLAttributes<HTMLInputElement>
