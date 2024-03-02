import { IndexableType } from "dexie"

export type TimestampsModel = {
	created_at: string
	updated_at: string
	deleted_at: string
}
export type TableModel = {
	id: IndexableType
}

export type TableWithTimestampsModel = TimestampsModel & TableModel
