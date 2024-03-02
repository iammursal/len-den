// db.ts
import { Transaction } from '@/modules/transactions/types'
import { User } from '@/modules/users/types'
import Dexie, { Table } from 'dexie'

export class MySubClassedDexie extends Dexie {
	// 'transactions' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	transactions!: Table<Transaction>
	users!: Table<User>

	constructor() {
		// Pass the name of the database
		super(`${process.env.NEXT_PUBLIC_APP_NAME}_DB` as string)

		//
		// Define tables and indexes
		// (Here's where the implicit table props are dynamically created)
		//
		this.version(1).stores({
			transactions:
				'++id, user_id, type, amount, notes, is_settled, transacted_at, created_at, updated_at, deleted_at', // Primary key and indexed props
			users:
				'++id, name, email, phone, created_at, updated_at, deleted_at',
		})
		// const tableNames = db.tables.map((table) => table.name)

		this.transactions.hook(
			'creating',
			function (primKey, obj, trans) {
				if (typeof obj.created_at === 'undefined')
					obj.created_at = new Date().toISOString()
				if (typeof obj.updated_at === 'undefined')
					obj.updated_at = new Date().toISOString()
				if (typeof obj.transacted_at === 'undefined')
					obj.transacted_at = new Date().toISOString()
				if (typeof obj.notes === 'undefined') obj.notes = ''
				if (typeof obj.is_settled === 'undefined')
					obj.is_settled = false
			}
		)

		this.transactions.hook(
			'updating',
			function (modifications, primKey, obj, trans) {
				if (typeof obj.updated_at === 'undefined')
					obj.updated_at = new Date().toISOString()
			}
		)

		this.users.hook('creating', function (primKey, obj, trans) {
			if (typeof obj.created_at === 'undefined')
				obj.created_at = new Date().toISOString()
			if (typeof obj.updated_at === 'undefined')
				obj.updated_at = new Date().toISOString()
		})

		this.users.hook(
			'updating',
			function (modifications, primKey, obj, trans) {
				if (typeof obj.updated_at === 'undefined')
					obj.updated_at = new Date().toISOString()
			}
		)
	}
}

export const db = new MySubClassedDexie()
