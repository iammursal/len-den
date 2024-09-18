'use client'

import { FC, useEffect } from "react"
import Footer from "../Footer"
import Header from "../Header"
import { useAuth } from "@/modules/auth"
import { useRouter } from "next/navigation"

type AuthLayoutProps = {
    children: React.ReactNode
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    const { auth } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!auth?.access_token) {
            return router.push("/auth/login")
        }
    }, [auth?.access_token, router]);


    if (!auth?.access_token) {
        return null;
    }

    return <>
        <Header />
        <main className="flex min-h-[calc(100vh_-_100px)] h-44  flex-col justify-start">
            {children}
        </main>
        <Footer />
    </>
}
