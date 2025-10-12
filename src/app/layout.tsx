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
import { AuthProvider } from '@/components/providers/auth-provider'
import { AuthModal } from '@/components/auth-modal'
import { Toaster } from '@/components/ui/sonner'
import { OrganizationSchema } from '@/components/structured-data'

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000'

const SITE_URL = 'https://shadcnthemer.com'
const SITE_NAME = 'ShadCN Themer'
const SITE_TITLE = 'ShadCN Themer - Create Beautiful Themes for shadcn/ui'
const SITE_DESCRIPTION =
	'Create, customize, and share beautiful themes for shadcn/ui. Browse thousands of community themes, customize colors with OKLCH picker, pick fonts, and export with one click.'
const SITE_KEYWORDS = [
	'shadcn',
	'shadcn/ui',
	'shadcn themes',
	'ui themes',
	'react themes',
	'tailwind themes',
	'color schemes',
	'theme generator',
	'ui customization',
	'design system',
	'component library',
	'OKLCH color picker',
	'theme maker',
	'css variables'
]

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: {
		default: SITE_TITLE,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	authors: [{ name: 'Mike Tromba', url: 'https://mike.gg' }],
	creator: 'Mike Tromba',
	publisher: 'ShadCN Themer',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	alternates: {
		canonical: SITE_URL
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: SITE_URL,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		siteName: SITE_NAME,
		images: [
			{
				url: `${SITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'ShadCN Themer - Create Beautiful Themes'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: [`${SITE_URL}/og-image.png`],
		creator: '@miketromba'
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png'
	},
	manifest: '/site.webmanifest'
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
				<OrganizationSchema
					name="ShadCN Themer"
					url="https://shadcnthemer.com"
					logo="https://shadcnthemer.com/favicon.ico"
					description="Create, customize, and share beautiful themes for shadcn/ui"
				/>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						<AuthProvider>
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
						</AuthProvider>
					</QueryProvider>
				</ThemeProvider>
				<GoogleAnalytics gaId="G-C680Z7LJTK" />
			</body>
		</html>
	)
}
