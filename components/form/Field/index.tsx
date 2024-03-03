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
        name,
        type,
        required,
        options,
        form,
        label = '',
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
                    {label && <FormLabel className='d-block'>{label}</FormLabel>}

                    <FieldType renderProps={renderProps} {...props} />

                    <FormMessage />
                </FormItem>
            )}
            {...props}
        />
    )
}

export default Field
