import { cn } from '@/lib/utils'

export const Layer = ({
    children,
    index = 0,
    className = '',
    ...props
}: {
    children: React.ReactNode
    index?: number
    [key: string]: any
}) => {
    return (
        <div
            className={cn(
                'absolute inset-0 w-screen h-screen pointer-events-none',
                `z-[${index * 10}]`,
                className
            )}
            {...props}
        >
            <div className="pointer-events-auto">{children}</div>
        </div>
    )
}
