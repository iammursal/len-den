'use client'

import { UserMutateForm } from '@/modules/users/components'
import { useUserListQuery } from '@/modules/users/hooks'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

export const UserEditForm: FC<{}> = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const { isLoading, data: users } = useUserListQuery(
        id ? { id } : {}
    )
    if (isLoading || !users?.[0]) {
        return <div>Loading...</div>
    }

    const user = users ? users?.[0] : undefined

    return <UserMutateForm user={user} />
}
