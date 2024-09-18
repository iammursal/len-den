import { TableWithTimestampsModel } from "@/types"

export type User = {
    name: string
    email?: string
    phone?: string
    // password?: string
} & Partial<TableWithTimestampsModel>
