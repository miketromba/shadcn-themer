import { MetadataRoute } from 'next'
import { db, schema } from '@/db'
import { desc } from 'drizzle-orm'

const SITE_URL = 'https://shadcnthemer.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1
		},
		{
			url: `${SITE_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5
		},
		{
			url: `${SITE_URL}/privacy`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.3
		},
		{
			url: `${SITE_URL}/terms`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.3
		}
	]

	// Fetch all themes
	const themes = await db
		.select({
			id: schema.themes.id,
			updated_at: schema.themes.updated_at
		})
		.from(schema.themes)
		.orderBy(desc(schema.themes.updated_at))
		.limit(5000) // Sitemap limit

	const themePages: MetadataRoute.Sitemap = themes.map(theme => ({
		url: `${SITE_URL}/themes/${theme.id}`,
		lastModified: theme.updated_at,
		changeFrequency: 'weekly' as const,
		priority: 0.8
	}))

	return [...staticPages, ...themePages]
}
