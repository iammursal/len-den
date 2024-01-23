"use client"

import type { FC } from 'react'

import { UserList } from '@/modules/users/components/list/UserList'
import { useUserStore } from '@/modules/users/stores'

interface UserListProps {}

export const UserListAll: FC<UserListProps> = ({}) => {
	const { users } = useUserStore()
	return <UserList users={users} />
}
