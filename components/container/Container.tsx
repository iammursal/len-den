import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import type { FC } from 'react'

interface ContainerProps {
	children: React.ReactNode
	variant?: 'default' | 'full'
	className?: string
	[key: string]: any
}

const containerVariants = cva('px-4 mx-auto w-full', {
	variants: {
		variant: {
			default: 'max-w-7xl',
			full: 'min-w-full',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export const Container: FC<ContainerProps> = ({
	children,
	variant = 'default',
	className,
	...props
}) => {
	return (
		<div
			className={cn(containerVariants({ variant, className }))}
			{...props}
		>
			{children}
		</div>
	)
}

