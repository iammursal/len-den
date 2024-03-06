import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    FormControl
} from '@/components/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { FC } from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
import { LuChevronsUpDown } from 'react-icons/lu'
import { FieldProps } from './types'

export const SearchSelect: FC<FieldProps> = (props) => {
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
                        variant="outline"
                        role="combobox"
                        className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground'
                        )}
                    >
                        {typeof field.value === 'string' ? (
                            <div className="flex justify-between w-full items-center">
                                <span>
                                    {
                                        options?.find(
                                            (option) => {
                                                console.log(option.value, field.value)
                                                return option.value == field.value
                                            }
                                        )?.label
                                    }
                                </span>
                                {isClearable && field.value !== 'undefined' && (
                                    <Button
                                        type='button'
                                        variant={'ghost'}
                                        size={'sm'}
                                        onClick={() => form.setValue(name, null)}
                                    >
                                        <IoCloseOutline className="h-4 w-4  text-destructive" />
                                    </Button>
                                )}
                            </div>
                        ) : (
                            'Select option'
                        )}
                        <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
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
    )
}
