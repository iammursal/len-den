import type { FC } from 'react'
import { DatePicker } from './DatePicker.comp'
import { Input } from './Input.comp'
import { SearchSelect } from './SearchSelect.comp'
import { Select } from './Select.comp'
import { FieldProps } from './types.model'

export const FieldType: FC<FieldProps> = (props) => {
	const { type } = props

	switch (type) {
		case 'select':
			return props.isSearchable === true ? (
				<SearchSelect {...props} />
			) : (
				<Select {...props} />
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
		case 'date-range':
			return <DatePicker {...props} />
			break

		default:
			return <Input {...props} />
			break
	}
}
