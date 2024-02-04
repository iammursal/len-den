import { ActionColumn } from './ActionColumn'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { UserModel } from '@/modules/users/types'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import type { FC } from 'react'
interface UserListProps {
	users: UserModel[]
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: UserModel[]
}

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
			<a href="tel:{info.getValue()}" className='link'>{info.getValue()}</a>
		),
	},
	{
		accessorKey: 'action',
		header: 'Action',
	},
]

export const UserList: FC<UserListProps> = ({ users }) => {
	const table = useReactTable({
		data: users,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
								<ActionColumn userId={row.original.id} />
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
