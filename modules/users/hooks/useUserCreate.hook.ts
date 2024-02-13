"use client"

import { db } from '@/stores/db'
import { TableWithTimestampsModel } from '@/types'
import { useState } from 'react'
import { UserModel } from '@/modules/users/types'

type Props = {
	onSuccess?: (user: UserModel) => void
	onError?: (error: Error) => void
}

export const useUserCreate = ({
	onSuccess,
	onError,
}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error | undefined>(undefined)
	const mutate = async (user: Omit<UserModel, keyof TableWithTimestampsModel>) => {
        setIsLoading(true)
        setError(undefined)
		try {
			const id = await db.users.add(user)
            let newUser = await db.users.get(id)
            if(!newUser || typeof newUser === 'undefined') {
                throw new Error('User not found')
            }
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
