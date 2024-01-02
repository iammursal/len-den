'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
	const pathname = usePathname()
	const [pageTitle, setPageTitle] = useState('Len Den')

	useEffect(() => {
		if (window) {
			let title = document.title.replace(' | Len Den', '')
			setPageTitle(title)
		}
	}, [pathname])

	return (
		<div className="z-10 max-w-5xl w-full justify-between font-mono text-md lg:flex h-20 ">
			<Link
				href="/"
				className="fixed left-0 top-0 p-4 flex w-full justify-start border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
			>
				{pageTitle}
			</Link>
		</div>
	)
}
export default Header
