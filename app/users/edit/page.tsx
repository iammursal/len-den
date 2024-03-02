import type { Metadata } from 'next'
import { UserEditForm } from './(common)/components/UserEditForm'

export const metadata: Metadata = {
	title: 'Edit User',
	//   description: '...',
}

export default function UserEditPage() {
	return (
		<div className="container">
			<div>
				{/* <Title.h1>Add User</Title.h1> */}
				<UserEditForm />
			</div>
		</div>
	)
}
