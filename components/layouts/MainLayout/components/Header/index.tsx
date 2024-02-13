'use client'

import { app } from '@/config/app'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import {
    GiPayMoney,
    GiReceiveMoney,
    GiTakeMyMoney,
} from 'react-icons/gi'
import { IoIosSettings } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'

type HeaderProps = {}

const Header: FC<HeaderProps> = ({}) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const pathname = usePathname()
	const [pageTitle, setPageTitle] = useState('Len Den')
	const links = [
		{
			href: '/',
			icon: <AiFillHome className="w-5 h-5" />,
			title: 'Home',
		},
		{
			href: '/borrow/create',
			icon: <GiReceiveMoney className="w-6 h-6" />,
			title: 'Borrow',
		},
		{
			href: '/lend/create',
			icon: <GiPayMoney className="w-6 h-6" />,
			title: 'Lend',
		},
		{
			href: '/transactions',
			icon: <GiTakeMyMoney className="w-6 h-6" />,
			title: 'Transactions',
		},
		{
			href: '/users',
			icon: <FaUser className="w-5 h-5" />,
			title: 'User',
		},
		{
			href: '/settings',
			icon: <IoIosSettings className="w-6 h-6" />,
			title: 'Settings',
		},
	]

	useEffect(() => {
		if (window) {
			let title = document.title.replace(
				` | ${app.name}`,
				''
			)
			setPageTitle(title)
		}
	}, [pathname])

	return (
		<>
			<div className="z-30 relative max-w-5xl w-full  font-mono text-md lg:flex h-20 ">
				<div className="fixed left-0 top-0 h-16 flex align-middle w-full justify-start border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					{/* sidbar menu button */}
					<button
						onClick={() => setSidebarOpen((s) => !s)}
						className="lg:hidden h-full w-14 flex ps-4 items-center"
					>
						<RxHamburgerMenu size="20px" />
					</button>
					<div className="flex flex-col justify-center align-middle">
						<Link href="/">{pageTitle}</Link>
					</div>
				</div>
			</div>

			{/* sidebar */}
			<div
				onClick={() => setSidebarOpen(false)}
				className={clsx({
					'fixed bottom-0 h-screen transition-all lg:static z-40 w-full':
						true,
					'bg-slate-900/80': sidebarOpen,
					'pointer-events-none ': !sidebarOpen,
				})}
			>
				<div
					className={clsx({
						'bg-zinc-200 fixed border-r-2 border-r-slate-800/5 bottom-0 h-screen transition-all lg:static dark:bg-zinc-800/30 backdrop-blur-2xl w-3/5  lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30':
							true,
						'left-0': sidebarOpen,
						'-left-full pointer-events-none ': !sidebarOpen,
					})}
				>
					<ul className="flex flex-col   p-4 align-middle w-full h-full pt-8 divide-y divide-slate-700">
						{links.map((link) => (
							<li key={link.href}>
								<Link href={link.href}>
									<div
										className="flex items-center gap-2 py-4 text-sm text-gray-600 hover:text-gray-900
                                                dark:text-gray-400 dark:hover:text-gray-200"
									>
										<span>{link.icon}</span>
										<span>{link.title}</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}
export default Header
