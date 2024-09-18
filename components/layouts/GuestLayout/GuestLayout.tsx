"use client"

import { useAuth } from "@/modules/auth";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

type GuestLayoutProps = {
    children: React.ReactNode
}

export const GuestLayout: FC<GuestLayoutProps> = ({ children }) => {
    const { auth } = useAuth()
    const router = useRouter()

    // @ts-ignore
    useEffect(() => {
        if (auth?.access_token) {
            return router.push("/dashboard")
        }
    }, [auth?.access_token, router]);


    if (auth?.access_token) {
        return <></>
    }

    return <>
        <main className="flex min-h-[calc(100vh_-_100px)] h-44  flex-col justify-start">
            {children}
        </main>
    </>
}
