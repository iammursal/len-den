import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl } from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { FC } from 'react'
import { FieldProps } from './types'

export const DatePicker: FC<FieldProps> = (props) => {
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
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant={'outline'}
						className={cn(
							' pl-3 text-left font-normal block w-full',
							!field.value && 'text-muted-foreground'
						)}
					>
						<p className="flex justify-between">
							{props?.mode === 'range' ? (
								field.value?.from ? (
									field.value?.to ? (
										<>
											{format(field.value.from, 'LLL dd, y')} -{' '}
											{format(field.value.to, 'LLL dd, y')}
										</>
									) : (
										format(field.value.from, 'LLL dd, y')
									)
								) : (
									<span>Pick a date</span>
								)
							) : field.value ? (
								format(field.value, 'PPP')
							) : (
								<span>Pick a date</span>
							)}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</p>
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode={props?.mode || 'single'}
					selected={field.value}
					onSelect={field.onChange}
					disabled={(date: Date) =>
						date > new Date() || date < new Date('1900-01-01')
					}
					// numberOfMonths={1}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
