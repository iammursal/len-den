'use client'

import { useState } from "react";
// import { JWT } from 'google-auth-library';
import { useGoogleSpreadSheet } from "@/hooks/useGoogleSpreadSheet/useGoogleSpreadSheet";
import { useEffect } from "react";
import { transactionsTableStructure } from "../../stores";

const SHEET_TITLE = 'Transactions'
export const useTransactionSheet = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [transactionSheet, setTransactionSheet] = useState<any>(null)
    const { doc, ...gss } = useGoogleSpreadSheet()
    console.log("🚀 ~ useTransactionSheet ~ gss:", gss)

    const getSheet = async (doc: any) => {
        try {
            let ts = doc?.sheetsByTitle[SHEET_TITLE]
            if (!ts) {
                ts = await doc?.addSheet({
                    title: SHEET_TITLE
                });

                if (!ts)
                    throw new Error('Sheet not found')

                await ts.setHeaderRow(transactionsTableStructure)
            }
            setTransactionSheet(ts)
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
        if (!gss.isLoading && !gss.error && doc)
            getSheet(doc)
    }, [])

    return {
        transactionSheet,
        isLoading,
        error,
    }
}
