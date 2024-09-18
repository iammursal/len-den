'use client'

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { FaFilter } from 'react-icons/fa'
import { FilterForm } from './FilterForm'

export const TransactionFilterFromModal = () => {
	return (
		<Drawer>
			<DrawerTrigger className="fixed top-20 right-6 rounded-md bg-black/10 dark:bg-white/10 w-8 h-8 grid place-content-center">
				<FaFilter />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Filters</DrawerTitle>
					{/* <DrawerDescription className='text-start'> */}
					<FilterForm />
					{/* </DrawerDescription> */}
				</DrawerHeader>
				{/* <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter> */}
			</DrawerContent>
		</Drawer>
	)
}
