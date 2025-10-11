import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { WebsiteSchema } from '@/components/structured-data'

const SITE_URL = 'https://shadcnthemer.com'

export const metadata: Metadata = {
	title: 'ShadCN Themes - Create Beautiful Themes for shadcn/ui | ShadCN Themer',
	description:
		'Discover and create beautiful themes for shadcn/ui. Browse thousands of community-made themes, customize colors with OKLCH picker, select Google Fonts, adjust border radius, and export themes instantly for your Next.js projects.',
	keywords: [
		'shadcn themes',
		'shadcn/ui',
		'react themes',
		'tailwind themes',
		'ui components',
		'theme gallery',
		'theme marketplace',
		'OKLCH color picker',
		'design tokens',
		'css variables'
	],
	alternates: {
		canonical: SITE_URL
	},
	openGraph: {
		title: 'ShadCN Themer - Create Beautiful Themes for shadcn/ui',
		description:
			'Browse and create stunning themes for shadcn/ui. Customize colors, fonts, and export with one click.',
		url: SITE_URL,
		type: 'website',
		images: [
			{
				url: `${SITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'ShadCN Themer - Theme Gallery'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'ShadCN Themer - Create Beautiful Themes for shadcn/ui',
		description:
			'Browse and create stunning themes for shadcn/ui. Customize colors, fonts, and export with one click.',
		images: [`${SITE_URL}/og-image.png`]
	}
}

export default function Home() {
	return (
		<>
			<WebsiteSchema
				url={SITE_URL}
				name="ShadCN Themer"
				description="Create, customize, and share beautiful themes for shadcn/ui"
			/>
			<HomePage />
		</>
	)
}
