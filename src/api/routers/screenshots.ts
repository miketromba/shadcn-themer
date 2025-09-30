import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { db, schema, eq } from '@/db'
import { createServiceClient } from '@/lib/supabase/admin'
import {
	generateScreenshot,
	SCREENSHOT_ASPECT_RATIO
} from '@/lib/generateScreenshot'

const MAX_AGE = 31536000 // 1 year

export const screenshotsRouter = new Hono().get(
	'/:themeId',
	zValidator(
		'param',
		z.object({
			themeId: z.uuid()
		})
	),
	zValidator(
		'query',
		z.object({
			demo: z.string().optional().default('cards'),
			mode: z.enum(['light', 'dark']).optional().default('light'),
			width: z.coerce.number().int().min(1).max(2500).optional()
		})
	),
	async c => {
		const { themeId } = c.req.valid('param')
		const { demo, mode, width } = c.req.valid('query')

		console.log('themeId', themeId)

		try {
			// 1) Load theme with version info
			const [theme] = await db
				.select({
					id: schema.themes.id,
					version: schema.themes.version,
					screenshotVersion: schema.themes.screenshot_version
				})
				.from(schema.themes)
				.where(eq(schema.themes.id, themeId))
				.limit(1)

			if (!theme) {
				return c.json({ error: 'Theme not found' }, 404)
			}

			// 2) Stable storage path per theme id, demo, and mode (overwrite on update)
			const storagePath = `screenshots/themes/${theme.id}/${demo}-${mode}.webp`

			const supabase = createServiceClient()

			// 3) Check if screenshot needs regeneration
			const needsRegeneration = theme.screenshotVersion < theme.version

			// 4) Try to return existing if up-to-date
			if (!needsRegeneration) {
				const transformOptions = width
					? {
							transform: {
								width,
								height: Math.round(
									width / SCREENSHOT_ASPECT_RATIO
								)
							}
					  }
					: {}

				const { data: existing } = await supabase.storage
					.from('public-files')
					.download(storagePath, transformOptions)

				if (existing) {
					return new Response(existing, {
						headers: {
							'Content-Type': 'image/webp',
							'Cache-Control': `public, max-age=${MAX_AGE}`
						}
					})
				}
			}

			// 5) Generate and upload (overwrite)
			const imageBuffer = await generateScreenshot(theme.id, demo, mode)

			const { error: uploadError } = await supabase.storage
				.from('public-files')
				.upload(storagePath, imageBuffer, {
					contentType: 'image/webp',
					cacheControl: `${MAX_AGE}`,
					upsert: true
				})
			if (uploadError) {
				throw new Error(`Upload failed: ${uploadError.message}`)
			}

			// 6) Update screenshot_version to match current version
			await db
				.update(schema.themes)
				.set({ screenshot_version: theme.version })
				.where(eq(schema.themes.id, theme.id))

			return new Response(new Uint8Array(imageBuffer), {
				headers: {
					'Content-Type': 'image/webp',
					'Cache-Control': `public, max-age=${MAX_AGE}`
				}
			})
		} catch (err) {
			const error = err as Error
			console.error('Theme screenshot error:', error)
			return c.json({ error: error.message || 'Unknown error' }, 500)
		}
	}
)
