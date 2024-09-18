"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { User } from '@/modules/users/types'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import type { FC } from 'react'
import { useUserListQuery } from '../../hooks'
import { ActionColumn } from './ActionColumn'
import { columns } from './_column'

type UserListProps = { query?: Partial<User> }

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: User[]
}

export const UserList: FC<UserListProps> = ({ query }) => {
	const { isLoading, data, error } = useUserListQuery(query)
	const table = useReactTable({
        data: data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

    if (error) return <div>Error</div>

    if (isLoading) return <div>Loading...</div>

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
								{row.original.id && (
									<ActionColumn userId={row.original.id} />
								)}
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
