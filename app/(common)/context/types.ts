import { IndexableType } from "dexie"

export type TransactionQuery =  {
    where?:{
        user_id?: IndexableType[]
        is_settled?: boolean
        date_range?: {
            from: Date
            to: Date
        }
    }
}
