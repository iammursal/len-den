import { TableWithTimestampsModel } from "@/types"

export type UserModel = {
    name: string
    email?: string
    phone?: string
    // password?: string
} & Partial<TableWithTimestampsModel>
