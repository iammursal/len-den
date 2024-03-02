'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell } from '@/components/ui/table'
import { IndexableType } from 'dexie'
import { useRouter } from 'next/navigation'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineMenuOpen } from 'react-icons/md'
import { toast } from 'sonner'
import { useUserRemove } from '../../hooks'

type ActionColumnProps = {
	userId: IndexableType
}

export function ActionColumn({ userId }: ActionColumnProps) {
	const router = useRouter()
	const userRemove = useUserRemove({
		onSuccess: () => {
			toast('User Deleted', {
				description: 'User has been deleted successfully.',
			})
		},
		onError: (error) => {
			toast('Error', {
				description: error?.message,
			})
		},
	})
	const handleUserDelete = () => {
		userRemove.mutate(userId)
		toast('User Deleted', {
			description: 'User has been deleted successfully.',
		})
		router.push('/users')
	}

	const handleUserEdit = () => {
		router.push(`/users/edit?id=${userId}&mode=edit`)
	}

	return (
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<MdOutlineMenuOpen className="h-5 w-5" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={handleUserEdit}>
						<AiOutlineEdit />
						&nbsp;Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleUserDelete}>
						<AiOutlineDelete />
						&nbsp;Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	)
}
