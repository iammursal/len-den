"use client"

import { UserList } from '@/modules/users/components/list/UserList'
import { useUserStore } from '@/modules/users/stores'

export const UserListAll = () => {
	const  users  = useUserStore(s => s.users)
	return <UserList users={users} />
}
