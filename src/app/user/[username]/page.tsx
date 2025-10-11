import type { Metadata } from 'next'
import { UserThemesPage } from '@/components/user-themes-page'
import { db, schema } from '@/db'
import { eq, count, desc } from 'drizzle-orm'
import { notFound } from 'next/navigation'

const SITE_URL = 'https://shadcnthemer.com'

interface PageProps {
	params: Promise<{
		username: string
	}>
}

export async function generateMetadata({
	params
}: PageProps): Promise<Metadata> {
	const { username } = await params

	// Fetch user and theme count
	const userRows = await db
		.select({ id: schema.profiles.id })
		.from(schema.profiles)
		.where(eq(schema.profiles.username, username))
		.limit(1)

	if (!userRows.length) {
		return {
			title: 'User Not Found',
			description: 'This user could not be found.'
		}
	}

	const userId = userRows[0].id

	// Get theme count for this user
	const themeCountRows = await db
		.select({ count: count() })
		.from(schema.themes)
		.where(eq(schema.themes.user_id, userId))

	const themeCount = themeCountRows[0]?.count || 0

	// Get latest theme
	const latestTheme = await db
		.select({
			name: schema.themes.name,
			updated_at: schema.themes.updated_at
		})
		.from(schema.themes)
		.where(eq(schema.themes.user_id, userId))
		.orderBy(desc(schema.themes.updated_at))
		.limit(1)

	const userUrl = `${SITE_URL}/user/${username}`
	const title = `@${username}'s Themes - ShadCN Themer`
	const description = `Explore ${themeCount} beautiful shadcn/ui theme${
		themeCount !== 1 ? 's' : ''
	} created by @${username}. ${
		latestTheme.length ? `Latest: "${latestTheme[0].name}". ` : ''
	}Fork, customize, and use in your Next.js projects.`

	return {
		title,
		description,
		keywords: [
			`@${username}`,
			'shadcn themes',
			'user themes',
			'theme collection',
			'ui themes',
			'react themes'
		],
		alternates: {
			canonical: userUrl
		},
		openGraph: {
			title,
			description,
			url: userUrl,
			type: 'profile',
			images: [
				{
					url: `${SITE_URL}/og-image.png`,
					width: 1200,
					height: 630,
					alt: `@${username}'s Themes on ShadCN Themer`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [`${SITE_URL}/og-image.png`]
		}
	}
}

export default async function UserPage({ params }: PageProps) {
	const { username } = await params

	// Verify user exists
	const exists = await db
		.select({ id: schema.profiles.id })
		.from(schema.profiles)
		.where(eq(schema.profiles.username, username))
		.limit(1)

	if (!exists.length) {
		notFound()
	}

	return <UserThemesPage username={username} />
}
