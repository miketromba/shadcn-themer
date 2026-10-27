import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import sharp from 'sharp'
import { db, schema, eq } from '@/db'
import { getFile, putFile } from '@/lib/storage'
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

			// 3) Check if screenshot needs regeneration
			const needsRegeneration = theme.screenshotVersion < theme.version

			// 4) Try to return existing if up-to-date
			if (!needsRegeneration) {
				const existing = await getFile(storagePath)

				if (existing) {
					const body = width
						? await sharp(existing)
								.resize(
									width,
									Math.round(width / SCREENSHOT_ASPECT_RATIO)
								)
								.webp({ quality: 80 })
								.toBuffer()
						: existing
					return new Response(new Uint8Array(body), {
						headers: {
							'Content-Type': 'image/webp',
							'Cache-Control': `public, max-age=${MAX_AGE}`
						}
					})
				}
			}

			// 5) Generate and upload (overwrite)
			const imageBuffer = await generateScreenshot(theme.id, demo, mode)

			await putFile(storagePath, imageBuffer, {
				contentType: 'image/webp',
				cacheControl: `max-age=${MAX_AGE}`
			})

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
