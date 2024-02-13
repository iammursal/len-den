"use client"

import { UserModel } from '@/modules/users/types'
import { db } from '@/stores/db'
import { IndexableType } from 'dexie'
import { useState } from 'react'

type Props = {
	onSuccess?: (user: UserModel) => void
	onError?: (error: Error) => void
}

export const useUserUpdate = ({
	onSuccess,
	onError,
}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error | undefined>(undefined)
	const mutate = async (id: IndexableType, user: Partial<UserModel>) => {
        setIsLoading(true)
        setError(undefined)
		try {
			const isUpdated  = await db.users.update(id, user)
            let newUser = await db.users.get(id)
            if(isUpdated === 0 || !newUser || typeof newUser === 'undefined') {
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
