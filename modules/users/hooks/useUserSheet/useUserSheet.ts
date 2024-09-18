'use client'

import { useState } from "react";
// import { JWT } from 'google-auth-library';
import { useGoogleSpreadSheet } from "@/hooks/useGoogleSpreadSheet/useGoogleSpreadSheet";
import { useEffect } from "react";
import { usersTableStructure } from "../../stores";

const SHEET_TITLE = 'Users'
export const useUserSheet = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [userSheet, setUserSheet] = useState<any>(null)
    const { doc, ...gss } = useGoogleSpreadSheet()

    const getSheet = async () => {
        console.log("🚀 ~ getSheet ~ getSheet:", getSheet)
        try {
            let ts = doc?.sheetsByTitle[SHEET_TITLE]
            if (!ts) {
                ts = await doc?.addSheet({
                    title: SHEET_TITLE
                });

                if (!ts)
                    throw new Error('Sheet not found')

                await ts.setHeaderRow(usersTableStructure)
            }
            setUserSheet(ts)
        } catch (e: unknown) {
            let errorMessage = 'Something went wrong. Please try again later.'
            if (typeof e === "string") {
                errorMessage = e
            } else if (e instanceof Error) {
                errorMessage = e.message
            }
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (doc) {
            getSheet()
        }
    }, [doc])

    return {
        userSheet,
        isLoading,
        error,
    }
}
