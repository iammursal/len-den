"use client"

import { Button, Layer } from '@/components/ui'
import Link from 'next/link'
import { FaUserPlus } from 'react-icons/fa'
import { UserListFilter } from './(common)'

// export const metadata: Metadata = {
//     title: 'Users',
//     //   description: '...',
// }

export default function UserListPage() {
    // return <></>
    return (
        <section className="p-4">
            <UserListFilter />
            {/* hover action button */}
            <Layer index={5}>
                <span className="w-1/5 mb-4 float-right  mt-[calc(100vh_-_7rem)]">
                    <Link href="/dashboard/users/create">
                        <Button
                            variant="outline"
                            className="rounded-full w-16 h-16"
                        >
                            <FaUserPlus size={24} />
                        </Button>
                    </Link>
                </span>
            </Layer>
        </section>
    )
}
