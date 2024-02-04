import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import MainLayout from '@/components/layouts/MainLayout'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import './globals.css'
import Head from 'next/head'

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME,
	description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    openGraph:{
        title: process.env.NEXT_PUBLIC_APP_NAME,
        description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
        url: process.env.NEXT_PUBLIC_APP_URL,
        siteName: process.env.NEXT_PUBLIC_APP_NAME,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/icons/192x192.png`,
                width: 192,
                height: 192,
            },
        ],
    }
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<Head>
				application-name:  process.env.NEXT_PUBLIC_APP_NAME,
 apple-mobile-web-app-capable:  "yes",
 apple-mobile-web-app-status-bar-style:  "default",
 apple-mobile-web-app-title:  process.env.NEXT_PUBLIC_APP_NAME,
 description:  process.env.NEXT_PUBLIC_APP_DESCRIPTION,
 format-detection:  "telephone=no",
 mobile-web-app-capable:  "yes",
 msapplication-config:  "/icons/browserconfig.xml",
 msapplication-TileColor:  "#2B5797",
 msapplication-tap-highlight:  "no",
 theme-color:  "#000000",
 twitter:url:  process.env.NEXT_PUBLIC_APP_URL,
 twitter:title:  {process.env.NEXT_PUBLIC_APP_NAME},
 twitter:description:  process.env.NEXT_PUBLIC_APP_DESCRIPTION,
 twitter:image:  `${process.env.NEXT_PUBLIC_APP_URL}/icons/192x192.png`,
 twitter:creator:  {process.env.NEXT_PUBLIC_APP_AUTHOR},
 apple-touch-icon:  href="/icons/touch-icon-iphone.png" /> <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" /> <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" /> <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" /> <link rel="icon" type="image/png" sizes="32x32" href="/icons/32x32.png" /> <link rel="icon" type="image/png" sizes="16x16" href="/icons/16x16.png" /> <link rel="manifest" href="/manifest.json" /> <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" /> <link rel="shortcut icon" href="/favicon.ico" /> <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" /> twitter:card : {process.env.NEXT_PUBLIC_APP_NAME},
 <meta property="og:type" content="website" /> <meta property="og:title" content={process.env.NEXT_PUBLIC_APP_NAME} /> <meta property="og:description" content={process.env.NEXT_PUBLIC_APP_DESCRIPTION} /> <meta property="og:site_name" content={process.env.NEXT_PUBLIC_APP_NAME} /> <meta property="og:url" content="https://yourdomain.com" /> <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />

				{/* apple splash screen images > */}
				{/*
                <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
                <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
                <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
                <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
                <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
                <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
                <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
                */}
			</Head>
			<body
				className={cn(
					'min-h-screen font-sans antialiased dark',
					fontSans.variable
				)}
			>
				<MainLayout>{children}</MainLayout>
				<Toaster />
			</body>
		</html>
	)
}
