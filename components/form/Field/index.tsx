import {
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { ErrorMessage } from '@hookform/error-message'
import type { FC } from 'react'
import { FieldType } from './FieldType'
import { FieldProps } from './types'

const Field: FC<Omit<FieldProps, 'renderProps'>> = (props) => {
	const {
		label,
		name,
		type,
		required,
		options,
		form,
		isClearable = true,
		placeholder = '',
		...otherProps
	} = props
	const {
		formState: { errors },
	} = form

	return (
		<FormField
			control={form?.control}
			render={(renderProps) => (
				<FormItem>
					<FormLabel className='d-block'>{label}</FormLabel>

					<FieldType renderProps={renderProps} {...props} />

					<FormDescription className="text-destructive">
						<ErrorMessage errors={errors} name={name} />
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
			{...props}
		/>
	)
}

export default Field
