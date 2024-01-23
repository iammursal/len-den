import { Button } from '@/components/ui/button'
import { Layer } from '@/components/ui/layer'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FaUserPlus } from 'react-icons/fa'
import {
    UserListAll,
} from './(common)/components/UserList/UserList'

export const metadata: Metadata = {
	title: 'Users | Len Den',
	//   description: '...',
}

export default function UsersPage() {
	// return <></>
	return (
		<section className="p-4">
			<UserListAll />
			{/* hover action button */}
			<Layer index={5}>
				<span className="w-1/5 mb-4 float-right  mt-[calc(100vh_-_7rem)]">
					<Link href="/users/create">
						<Button
							variant="outline"
							className="rounded-full w-16 h-16"
						>
							<FaUserPlus size={24} />
						</Button>
					</Link>
				</span>
			</Layer>
		</section>
	)
}
