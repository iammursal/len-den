import {
    FormControl,
    FormItem,
    FormLabel
} from '@/components/ui/form'
import type { FC } from 'react'
import { FieldProps } from './types'

import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group'

export const Radio: FC<FieldProps> = (props) => {
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
			<RadioGroup
				onValueChange={field.onChange}
				defaultValue={field.value}
				className="flex flex-col space-y-1"
			>
				{options?.map(({ value, label }) => (
					<FormItem
						key={`${value}`}
						className="flex items-center space-x-3 space-y-0"
					>
						<FormControl>
							<RadioGroupItem value={value} />
						</FormControl>
						<FormLabel className="font-normal">{label}</FormLabel>
					</FormItem>
				))}
			</RadioGroup>
		</FormControl>
	)
}
