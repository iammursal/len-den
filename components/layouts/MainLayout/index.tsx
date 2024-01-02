import type { FC } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<main className="flex min-h-screen flex-col justify-start">
				{children}
			</main>
			<Footer />
		</>
	)
}
export default MainLayout
