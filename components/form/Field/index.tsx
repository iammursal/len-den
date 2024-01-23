import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { FC } from 'react'
import { FaCheck } from 'react-icons/fa'
import { LuChevronsUpDown } from 'react-icons/lu'

interface FieldProps {
	label: string
	name: string
	placeholder: string
	type: string
	options?: {
		label: string
		value: string
	}[]
	[key: string]: any
}

const Field: FC<FieldProps> = ({
	label,
	name,
	placeholder,
	type,
	required,
	error,
	options,
	form,
	...props
}) => {
	switch (type) {
		case 'select':
			if (props?.isSearchable) {
				return (
					<FormField
						control={form?.control}
						name={name}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{label}</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-full justify-between',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value
													? options?.find(
															(option) => option.value === field.value
													  )?.label
													: 'Select option'}
												<LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Command>
											<CommandInput placeholder={placeholder} />
											<CommandEmpty>Not found.</CommandEmpty>
											<CommandGroup>
												{options?.map((option) => (
													<CommandItem
														value={option.label}
														key={option.value}
														onSelect={() => {
															form.setValue(name, option.value)
														}}
													>
														<FaCheck
															className={cn(
																'mr-2 h-4 w-4',
																option.value === field.value
																	? 'opacity-100'
																	: 'opacity-0'
															)}
														/>
														{option.label}
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormDescription className="text-destructive">
									{error}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
						{...props}
					/>
				)
			}
			return (
				<FormField
					control={form?.control}
					name={name}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{label}</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{options?.map((option) => (
										<SelectItem
											key={option.value}
											value={option.value}
										>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription className="text-destructive">
								{error}
							</FormDescription>
						</FormItem>
					)}
					{...props}
				/>
			)
			break
		// case 'textarea':
		//     return <Textarea {...props} />

		// case 'richeditor':
		//     return <RichEditor {...props} />

		// case 'file':
		//     return <FileUpload {...props} />

		// case 'audio':
		//     return <FileUpload {...props} />

		// case 'video':
		//     return <FileUpload {...props} />

		// case 'image':
		//     return <FileUpload {...props} />

		default:
			return (
				<FormField
					control={form?.control}
					name={name}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{label}</FormLabel>
							<FormControl>
								<Input placeholder={placeholder} {...field} />
							</FormControl>
							<FormDescription className="text-destructive">
								{error}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
					{...props}
				/>
			)
			break
	}
}
export default Field
