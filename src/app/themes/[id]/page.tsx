import type { Metadata } from 'next'
import { ThemePage } from '@/components/theme-page'
import {
	CreativeWorkSchema,
	BreadcrumbListSchema
} from '@/components/structured-data'
import { db, schema } from '@/db'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

const SITE_URL = 'https://shadcnthemer.com'

interface PageProps {
	params: Promise<{ id: string }>
}

export async function generateMetadata({
	params
}: PageProps): Promise<Metadata> {
	const { id } = await params

	// Fetch theme data for metadata
	const rows = await db
		.select({
			name: schema.themes.name,
			created_at: schema.themes.created_at,
			star_count: schema.themes.star_count,
			username: schema.profiles.username
		})
		.from(schema.themes)
		.innerJoin(
			schema.profiles,
			eq(schema.profiles.id, schema.themes.user_id)
		)
		.where(eq(schema.themes.id, id))
		.limit(1)

	if (!rows.length) {
		return {
			title: 'Theme Not Found',
			description: 'This theme could not be found.'
		}
	}

	const theme = rows[0]
	const themeUrl = `${SITE_URL}/themes/${id}`
	const title = `${theme.name} - ShadCN Theme by @${theme.username}`
	const description = `Explore and customize "${theme.name}", a beautiful shadcn/ui theme created by @${theme.username}. ${theme.star_count} stars. Fork it, customize colors, fonts, and export for your Next.js project.`

	return {
		title,
		description,
		keywords: [
			'shadcn theme',
			theme.name,
			`@${theme.username}`,
			'ui theme',
			'react theme',
			'tailwind theme',
			'design system',
			'color scheme'
		],
		authors: [{ name: theme.username || 'Anonymous' }],
		alternates: {
			canonical: themeUrl
		},
		openGraph: {
			title,
			description,
			url: themeUrl,
			type: 'website',
			images: [
				{
					url: `${SITE_URL}/api/screenshots/${id}/light`,
					width: 1200,
					height: 630,
					alt: `${theme.name} - Light Mode Preview`
				},
				{
					url: `${SITE_URL}/api/screenshots/${id}/dark`,
					width: 1200,
					height: 630,
					alt: `${theme.name} - Dark Mode Preview`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description: `Check out "${theme.name}" by @${theme.username} on ShadCN Themer`,
			images: [`${SITE_URL}/api/screenshots/${id}/light`]
		}
	}
}

export default async function ThemePublicViewPage({ params }: PageProps) {
	const { id } = await params

	// Fetch theme data for structured data
	const themeRows = await db
		.select({
			name: schema.themes.name,
			created_at: schema.themes.created_at,
			updated_at: schema.themes.updated_at,
			star_count: schema.themes.star_count,
			username: schema.profiles.username
		})
		.from(schema.themes)
		.innerJoin(
			schema.profiles,
			eq(schema.profiles.id, schema.themes.user_id)
		)
		.where(eq(schema.themes.id, id))
		.limit(1)

	if (!themeRows.length) {
		notFound()
	}

	const theme = themeRows[0]
	const themeUrl = `${SITE_URL}/themes/${id}`

	return (
		<>
			<CreativeWorkSchema
				name={theme.name}
				description={`A shadcn/ui theme by @${theme.username}`}
				author={theme.username || 'Anonymous'}
				dateCreated={theme.created_at.toISOString()}
				dateModified={theme.updated_at.toISOString()}
				url={themeUrl}
				image={`${SITE_URL}/api/screenshots/${id}/light`}
				interactionStatistic={{
					interactionType: 'https://schema.org/LikeAction',
					userInteractionCount: Number(theme.star_count)
				}}
			/>
			<BreadcrumbListSchema
				items={[
					{ name: 'Home', url: SITE_URL },
					{ name: 'Themes', url: SITE_URL },
					{ name: theme.name, url: themeUrl }
				]}
			/>
			<ThemePage id={id} />
		</>
	)
}
