import { cn } from '@/lib/utils'

export const Layer = ({
	children,
	index = 0,
}: {
	children: React.ReactNode
	index?: number
}) => {
	return (
		<div
			className={cn(
				'absolute inset-0 w-full h-full pointer-events-none',
				`z-[${index * 10}]`
			)}
		>
			<div className="pointer-events-auto">{children}</div>
		</div>
	)
}
