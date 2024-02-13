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

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
	return [{
        id: '1'
    }]
}
