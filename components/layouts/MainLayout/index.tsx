"use client"

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { FC } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'

type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Header />
            <main className="flex min-h-screen flex-col justify-start">
                {children}
            </main>
            <Footer />
            <Toaster />
        </ThemeProvider>
    )
}
export default MainLayout
