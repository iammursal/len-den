import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

type TitleProps = {
	children: React.ReactNode
	className?: string
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const containerVariants = cva('mx-auto block', {
	variants: {
		variant: {
			h1: 'text-4xl font-bold tracking-tight mb-4',
			h2: 'text-3xl font-bold tracking-tight mb-3.5',
			h3: 'text-2xl font-bold tracking-tight mb-3',
			h4: 'text-xl font-bold tracking-tight mb-2',
			h5: 'text-lg font-bold tracking-tight mb-1',
			h6: 'text-base font-bold tracking-tight mb-1',
		},
	},
	defaultVariants: {
		variant: 'h6',
	},
})

const Title = ({
	children,
	className,
	variant,
	...props
}: TitleProps) => {
	return (
		<span
			className={cn(containerVariants({ variant, className }))}
			{...props}
		>
			{children}
		</span>
	)
}
Title.h1 = ({ children, ...props }: TitleProps) => (
	<h1>
		<Title variant="h1" {...props}>
			{children}
		</Title>
	</h1>
)

Title.h2 = ({ children, ...props }: TitleProps) => (
    <h2>
        <Title variant="h2" {...props}>
            {children}
        </Title>
    </h2>
)

Title.h3 = ({ children, ...props }: TitleProps) => (
    <h3>
        <Title variant="h3" {...props}>
            {children}
        </Title>
    </h3>
)

Title.h4 = ({ children, ...props }: TitleProps) => (
    <h4>
        <Title variant="h4" {...props}>
            {children}
        </Title>
    </h4>
)

Title.h5 = ({ children, ...props }: TitleProps) => (
    <h5>
        <Title variant="h5" {...props}>
            {children}
        </Title>
    </h5>
)

Title.h6 = ({ children, ...props }: TitleProps) => (
    <h6>
        <Title variant="h6" {...props}>
            {children}
        </Title>
    </h6>
)

export { Title }
