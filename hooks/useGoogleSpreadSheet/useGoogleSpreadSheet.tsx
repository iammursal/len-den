'use client'

import { getAllSpreadSheets } from "@/services/api/google/sheet";
import useGeneralStore, { type GeneralStore } from '@/stores/general';
import { useState } from "react";
// import { JWT } from 'google-auth-library';
import { type AuthStore, useAuthStore } from "@/stores/auth";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { useEffect } from "react";


type GoogleSpreadSheetProps = {
}

export const useGoogleSpreadSheet = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [doc, setDoc] = useState<GoogleSpreadsheet | null>(null)

    const [auth, setAuth] = useAuthStore((state: AuthStore) => [state.auth, state.setAuth])
    const [GoogleSpreadsheetId, setGoogleSpreadsheetId] = useGeneralStore((state: GeneralStore) => [state.GoogleSpreadsheetId, state.setGoogleSpreadsheetId])
    const token = auth?.access_token


    const getDoc = async () => {
        try {
            let doc;
            const serviceAccountAuth = {
                // apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
                token
            }

            if (GoogleSpreadsheetId === '') {
                const spreadsheets = await getAllSpreadSheets(auth?.access_token)
                const spreadsheet = spreadsheets?.find((spreadsheet: any) => spreadsheet.name === 'MintPulse')
                if (spreadsheet) {
                    setGoogleSpreadsheetId(spreadsheet.id)
                }
            }

            if (GoogleSpreadsheetId === '') {
                // see Authentication for more info on auth and how to create jwt
                // @ts-ignore
                doc = await GoogleSpreadsheet.createNewSpreadsheetDocument(serviceAccountAuth, {
                    title: 'MintPulse'
                });
                console.log(doc.spreadsheetId);
                setGoogleSpreadsheetId(doc.spreadsheetId)
            } else {
                // @ts-ignore
                doc = new GoogleSpreadsheet(GoogleSpreadsheetId, serviceAccountAuth);
                await doc.loadInfo(); // loads document properties and worksheets
                console.log(doc.title);
            }
            setDoc(doc)
            if (error) setError(null)
        } catch (e: unknown) {
            let errorMessage = 'Something went wrong. Please try again later.'
            if (typeof e === "string") {
                errorMessage = e.toUpperCase() // works, `e` narrowed to string
            } else if (e instanceof Error) {
                errorMessage = e.message // works, `e` narrowed to Error
            }
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            getDoc()
        }
    }, [token])

    return {
        doc,
        isLoading,
        error,
    }
}
