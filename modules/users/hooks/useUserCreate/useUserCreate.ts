"use client"

import { User } from '@/modules/users/types'
import { db } from '@/stores/db'
import { TableWithTimestampsModel } from '@/types'
import { useState } from 'react'
import { useUserSheet } from '../useUserSheet'

type Props = {
    onSuccess?: (user: User) => void
    onError?: (error: Error) => void
}

export const useUserCreate = ({
    onSuccess,
    onError,
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | undefined>(undefined)
    const { userSheet, ...rest } = useUserSheet()

    const mutate = async (user: Omit<User, keyof TableWithTimestampsModel>) => {
        setIsLoading(true)
        setError(undefined)
        try {
            const id = await db.users.add(user)
            let newUser = await db.users.get(id)
            if (!newUser || typeof newUser === 'undefined') {
                throw new Error('User not found')
            }
            userSheet?.addRow(newUser)
            return onSuccess?.(newUser)
        } catch (err) {
            console.log(err)
            setError(err as Error)
            onError?.(err as Error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        mutate,
    }
}
