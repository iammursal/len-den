"use client"

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { FC } from 'react'

type BaseLayoutProps = {
    children: React.ReactNode
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
    return (

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster />
        </ThemeProvider>
    )
}
