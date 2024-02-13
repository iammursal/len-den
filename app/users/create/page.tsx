import { UserMutateForm } from '@/modules/users/components/form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Add User',
	//   description: '...',
}

export default function UserCreatePage() {
	return (
		<div className="container">
			<UserMutateForm />
		</div>
	)
}
