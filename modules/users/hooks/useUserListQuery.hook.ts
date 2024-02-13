import { UserModel } from '@/modules/users/types'
import { db } from '@/stores/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

type Props = Partial<
	Pick<UserModel, 'id' | 'name' | 'email' | 'phone'>
>
const DefaultPrams: Props = {
	id: undefined,
	name: '',
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
	data?: UserModel[]
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
				// let t = await db.users.reverse()

				// if (typeof id !== 'undefined') {
				// 	t = t.and(({ id: i }) => i === id)
				// }
				// if (typeof name !== 'undefined') {
				// 	t = t.and(({ name: i }) => i === name)
				// }
				// if (typeof email !== 'undefined') {
				// 	t = t.and(({ email: i }) => i === email)
				// }
				// if (typeof phone !== 'undefined') {
				// 	t = t.and(({ phone: i }) => i === phone)
				// }

				let users = await db.users.toArray()
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
