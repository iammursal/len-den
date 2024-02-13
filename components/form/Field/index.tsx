import { FormField } from '@/components/ui/form'
import type { FC } from 'react'
import { FieldType } from './FieldType.comp'
import { FieldProps } from './types.model'

const Field: FC<Omit<FieldProps, 'renderProps'>> = (props) => {
	const {
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

	return (
		<FormField
			control={form?.control}
			render={(renderProps) => (
				<FieldType renderProps={renderProps} {...props} />
			)}
			{...props}
		/>
	)
}

export default Field
