import { Container } from '@/components/container'
import { UserMutateForm } from '@/modules/users/components/form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Add User | Len Den',
	//   description: '...',
}

export default function UserCreate() {
	return (
		<Container>
			<>
				{/* <Title.h1>Add User</Title.h1> */}
				<UserMutateForm />
			</>
		</Container>
	)
}
