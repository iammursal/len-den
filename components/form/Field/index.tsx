import clsx from 'clsx'
import type { FC } from 'react'

interface FieldProps {
	label: string
	name: string
	placeholder: string
	type: string
	[key: string]: any
}

const Field: FC<FieldProps> = ({
	label,
	name,
	placeholder,
	type,
	required,
	error,
	...props
}) => {
	return (
		<div className="relative mb-4">
			<label
				htmlFor={name}
				className="leading-7 text-sm text-slate-400"
			>
				{label}&nbsp;
				{required ? <span className="text-red-500">*</span> : null}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				className={clsx({
					'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out':
						true,
					'outline-danger outline-x-2': !!error,
				})}
				required={required}
				{...props}
			/>
			{error ? (
				<b className="text-red-500 text-xs mt-2">{error}</b>
			) : null}
		</div>
	)
}
export default Field
