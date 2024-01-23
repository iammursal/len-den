import { Container } from '@/components/container'
import { UserMutateForm } from '@/modules/users/components/form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Edit User | Len Den',
	//   description: '...',
}

export default function UserEdit({ params }: { params: { id: string } }) {
    const { id } = params
	return (
		<Container>
			<>
				{/* <Title.h1>Add User</Title.h1> */}
				<UserMutateForm id={id}/>
			</>
		</Container>
	)
}
