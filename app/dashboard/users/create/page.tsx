import { UserMutateForm } from '@/modules/users'
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
