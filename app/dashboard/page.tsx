
import type { Metadata } from 'next';
import { HeroSection, RecentTransactionsSection } from './(common)/components';
import { TransactionFilterProvider } from './(common)/context/TransactionFilterProvider';

export const metadata: Metadata = {
    title: 'Mint Pulse',
    description:
        'Mint Pulse is the ultimate tool for tracking your personal finances related to your lending and borrowing activities. You can create records of your transactions, set reminders, view reports, and more. You can also sync your data across multiple devices and access it anytime, anywhere. Whether you lend money to your friends, borrow money from your family, or use any other form of credit, our finance app will help you stay on top of your finances and avoid unnecessary fees or interest. Download our finance app today and see how it can make your life easier and happier!',
}

export default function Home() {
    return (
        <TransactionFilterProvider>
            <>
                {/* start:Hero Section */}
                <HeroSection />
                {/* end:Hero Section */}
                {/* start:Recent Transactions Section */}
                {/* <RecentTransactionsSection /> */}
                {/* end:Recent Transactions Section */}
                <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
            </>
        </TransactionFilterProvider>
    )
}
