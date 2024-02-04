import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar, CalendarIcon } from 'lucide-react'
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
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={'outline'}
									className={cn(
										'w-[240px] pl-3 text-left font-normal',
										!field.value && 'text-muted-foreground'
									)}
								>
									{field.value ? (
										format(field.value, 'PPP')
									) : (
										<span>Pick a date</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={field.onChange}
								disabled={(date: Date) =>
									date > new Date() || date < new Date('1900-01-01')
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<FormDescription>
						Your date of birth is used to calculate your age.
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
