import { User } from '@/modules/users/types'
import { db } from '@/stores/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

type Props = Partial<
	Pick<User, 'id' | 'name' | 'email' | 'phone'>
>
const DefaultPrams: Props = {
	id: undefined,
	name: undefined,
	email: undefined,
	phone: undefined,
}
export const useUserListQuery = ({
	id,
	name,
	email,
	phone,
}: Props = DefaultPrams): {
	isLoading: boolean
	error: Error | undefined
	data?: User[]
} => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | undefined>(undefined)

	let data = useLiveQuery(
		async () => {
			setIsLoading(true)
			setError(undefined)
			try {
				//
				// Query Dexie's API
				//
				let u = await db.users.reverse()
				if (typeof id !== 'undefined') {
					u = u.and(({ id: i }) => i === +id)
				}
				if (typeof name !== 'undefined') {
					u = u.and(({ name: i }) => i === name)
				}
				if (typeof email !== 'undefined') {
					u = u.and(({ email: i }) => i === email)
				}
				if (typeof phone !== 'undefined') {
					u = u.and(({ phone: i }) => i === phone)
				}

				let users = await u.toArray()

				return users
			} catch (err) {
				setError(err as Error)
				return undefined
			} finally {
				setIsLoading(false)
			}
		},
		// specify vars that affect query:
		[id, name, email, phone]
	)

	return {
		isLoading,
		error,
		data,
	}
}
