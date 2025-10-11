import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { QueryProvider } from '@/components/providers/query-provider'
import { ThemeDataProvider } from '@/components/providers/theme-data-provider'
import { AuthModalProvider } from '@/components/providers/auth-modal-provider'
import { AuthModal } from '@/components/auth-modal'
import { Toaster } from '@/components/ui/sonner'

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000'

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Shadcn Theme Maker',
	description: 'Create and share your own Shadcn themes'
}

const geistSans = Geist({
	variable: '--font-geist-sans',
	display: 'swap',
	subsets: ['latin']
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						<AuthModalProvider>
							<ThemeDataProvider>
								<main className="min-h-screen flex flex-col">
									<SiteHeader />
									<div className="flex-1">{children}</div>
									<SiteFooter />
								</main>
								<AuthModal />
								<Toaster />
							</ThemeDataProvider>
						</AuthModalProvider>
					</QueryProvider>
				</ThemeProvider>
				<GoogleAnalytics gaId="G-C680Z7LJTK" />
			</body>
		</html>
	)
}
