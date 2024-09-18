'use client'

import { UserList } from '@/modules/users'
import { useSearchParams } from 'next/navigation'


export const UserListFilter = () => {
    let searchParams = useSearchParams()

    const params = new URLSearchParams(searchParams)
    const filters = Object.fromEntries(params.entries())

    return <UserList {...filters} />
}
