import type { FC } from 'react'
import { DatePicker } from './DatePicker'
import { Input } from './Input'
import { SearchSelect } from './SearchSelect'
import { Select } from './Select'
import { FieldProps } from './types'

export const FieldType: FC<FieldProps> = (props) => {
	const { type } = props

	switch (type) {
		case 'search-select':
			return <SearchSelect {...props} />
			break

		case 'select':
			return <Select {...props} />

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
