import { UserModel } from '@/modules/users/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<UserModel>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	// {
	//   accessorKey: "phone",
	//   header: "Phone",
	// },
	{
		accessorKey: 'phone',
		header: 'Phone',
		cell: (info: any) => (
			<a href="tel:{info.getValue()}" className="link">
				{info.getValue()}
			</a>
		),
	},
	{
		accessorKey: 'action',
		header: 'Action',
	},
]
