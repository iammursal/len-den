import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell } from '@/components/ui/table'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineMenuOpen } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/modules/users/stores'
import { toast } from 'sonner'

interface ActionColumnProps {
	userId: string
}

export function ActionColumn({ userId }: ActionColumnProps) {
	const router = useRouter()
	const { removeUser } = useUserStore()
	const handleUserDelete = () => {
		removeUser(userId)
		toast('User Deleted', {
			description: 'User has been deleted successfully.',
		})
		router.push('/users')
	}

	const handleUserEdit = () => {
		router.push(`/users/${userId}/edit`)
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
