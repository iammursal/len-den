import { UserModel } from '@/modules/users/types'
import { applyMiddlewares, persist } from '@/stores'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type UserStore = {
	users: UserModel[]
	addUser: (user: {}) => {}
	updateUser: (user: {}) => {}
	removeUser: (id: string) => {}
}

const defaultStoreData = {
	users: [],
}
const useUserStore = create<UserStore>(
	applyMiddlewares(
		(set: any) => ({
			...defaultStoreData,
			addUser: (user: Omit<UserModel, 'id'>) => {
				set((state: UserStore) => {
					state.users.unshift({
						id: crypto.randomUUID(),
						...user,
					})
				})
			},
			updateUser: (user: UserModel) => {
				set((state: UserStore) => {
					state.users = state.users.map((u) =>
						u.id === user.id
							? {
									...u,
									...user,
									id: u.id,
							  }
							: u
					)
				})
			},
			removeUser: (id: string) => {
				set((state: UserStore) => {
					state.users = state.users.filter((u) => u.id !== id)
				})
			},
		}),
		[persist, immer, devtools]
	)
)

export { useUserStore }
