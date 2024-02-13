'use client'

import { UserMutateForm } from '@/modules/users/components'
import { useParams } from 'next/navigation'
import { FC } from 'react'

export const UserEditForm: FC<{}> = () => {
	const params = useParams()

	return <UserMutateForm id={params.id} />
}
