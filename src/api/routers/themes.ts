import { Hono } from 'hono'
import { db, schema } from '@/db'
import { getAuthUser } from '@/api/auth'
import { and, desc, eq, lt, sql, SQL } from 'drizzle-orm'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import {
	DEFAULT_PAGE_SIZE,
	clampPageSize,
	decodePaginationToken,
	encodePaginationToken,
	type PaginatedResponse
} from '@/lib/pagination'
import { parseShadcnThemeFromJson, zShadcnTheme } from '@/lib/shadcnTheme'
import { themeToBucket } from '@/lib/shadcnThemeToColorBucket'

export const themesRouter = new Hono()
	// GET /themes?pageSize&nextToken&sortBy&username&colorBuckets
	.get(
		'/',
		zValidator(
			'query',
			z.object({
				pageSize: z.string().optional(),
				nextToken: z.string().optional(),
				sortBy: z.enum(['new', 'popular']).optional().default('new'),
				username: z.string().optional(),
				colorBuckets: z.string().optional() // comma-separated bucket values
			})
		),
		async c => {
			const {
				pageSize: pageSizeParam,
				nextToken,
				sortBy,
				username,
				colorBuckets
			} = c.req.valid('query')
			const limit = clampPageSize(
				pageSizeParam ? parseInt(pageSizeParam, 10) : DEFAULT_PAGE_SIZE
			)
			const cursor = decodePaginationToken(nextToken)

			// Build where clause based on cursor, sortBy, username, and color buckets
			let whereClause: SQL | undefined
			const whereClauses: SQL[] = []

			// Add username filter if provided
			if (username) {
				whereClauses.push(eq(schema.profiles.username, username))
			}

			// Add color bucket filter if provided
			if (colorBuckets) {
				const buckets = colorBuckets.split(',').filter(Boolean)
				if (buckets.length > 0) {
					whereClauses.push(
						sql`${schema.themes.color_bucket} IN (${sql.join(
							buckets.map(b => sql`${b}`),
							sql`, `
						)})`
					)
				}
			}

			// Add cursor condition
			if (cursor) {
				const cursorDate = new Date(cursor.lastCreatedAt)
				if (sortBy === 'popular') {
					// For popular sort: star_count DESC, created_at DESC
					// Cursor pagination: (star_count < cursor.lastStarCount) OR (star_count = cursor.lastStarCount AND created_at < cursor.lastCreatedAt)
					whereClauses.push(
						sql`(${schema.themes.star_count} < ${
							cursor.lastStarCount
						}) OR (${schema.themes.star_count} = ${
							cursor.lastStarCount
						} AND ${
							schema.themes.created_at
						} < ${cursorDate.toISOString()})`
					)
				} else {
					// For new sort: created_at DESC
					whereClauses.push(lt(schema.themes.created_at, cursorDate))
				}
			}

			// Combine all where clauses
			if (whereClauses.length > 0) {
				whereClause =
					whereClauses.length === 1
						? whereClauses[0]
						: and(...whereClauses)
			}

			const rows = await db
				.select({
					id: schema.themes.id,
					name: schema.themes.name,
					json: schema.themes.json,
					created_at: schema.themes.created_at,
					star_count: schema.themes.star_count,
					version: schema.themes.version,
					username: schema.profiles.username
				})
				.from(schema.themes)
				.innerJoin(
					schema.profiles,
					eq(schema.profiles.id, schema.themes.user_id)
				)
				.where(whereClause)
				.orderBy(
					...(sortBy === 'popular'
						? [
								desc(schema.themes.star_count),
								desc(schema.themes.created_at),
								desc(schema.themes.id)
						  ]
						: [
								desc(schema.themes.created_at),
								desc(schema.themes.id)
						  ])
				)
				.limit(limit + 1)

			const hasMore = rows.length > limit
			const sliced = rows.slice(0, limit)

			const items = sliced.map(r => ({
				id: r.id,
				name: r.name,
				json: r.json,
				created_at: r.created_at ? r.created_at.toISOString() : null,
				star_count: Number(r.star_count) || 0,
				version: Number(r.version) || 1,
				username: r.username ?? null
			}))

			const nextPageToken =
				hasMore && items.length
					? encodePaginationToken({
							lastId: items[items.length - 1].id,
							lastCreatedAt:
								items[items.length - 1].created_at ??
								new Date(0).toISOString(),
							lastStarCount: items[items.length - 1].star_count
					  })
					: null

			return c.json<PaginatedResponse<(typeof items)[number]>>({
				items,
				nextToken: nextPageToken,
				hasMore
			})
		}
	)

	// DELETE /themes/:id - delete a theme owned by the current user
	.delete(
		'/:id',
		zValidator('param', z.object({ id: z.uuid() })),
		async c => {
			const user = await getAuthUser(c)
			const { id } = c.req.valid('param')

			// Ensure the theme exists and belongs to the user
			const theme = await db
				.select({ id: schema.themes.id })
				.from(schema.themes)
				.where(
					and(
						eq(schema.themes.id, id),
						eq(schema.themes.user_id, user.id)
					)
				)
				.limit(1)
			if (!theme.length) {
				return c.json({ ok: false, error: 'Not found' }, 404)
			}

			// Open a transaction
			return await db.transaction(async tx => {
				// First delete related stars for this theme (no cascade in schema)
				await tx
					.delete(schema.stars)
					.where(eq(schema.stars.theme_id, id))

				// Unset any forked_from themes
				await tx
					.update(schema.themes)
					.set({ forked_from: null })
					.where(eq(schema.themes.forked_from, id))

				// Then delete the theme if owned by user
				const deleted = await tx
					.delete(schema.themes)
					.where(
						and(
							eq(schema.themes.id, id),
							eq(schema.themes.user_id, user.id)
						)
					)
					.returning({ id: schema.themes.id })

				if (!deleted.length) {
					return c.json({ ok: false, error: 'Not found' }, 404)
				}
				return c.json({ ok: true })
			})
		}
	)

	// GET /themes/:id - fetch single theme details
	.get(
		'/:id',
		zValidator('param', z.object({ id: z.string().uuid() })),
		async c => {
			const { id } = c.req.valid('param')

			// Get user if authenticated (optional)
			let userId: string | null = null
			try {
				const user = await getAuthUser(c)
				userId = user.id
			} catch {
				// Not authenticated, continue without user
			}

			const rows = await db
				.select({
					id: schema.themes.id,
					user_id: schema.themes.user_id,
					name: schema.themes.name,
					json: schema.themes.json,
					created_at: schema.themes.created_at,
					updated_at: schema.themes.updated_at,
					star_count: schema.themes.star_count,
					version: schema.themes.version,
					username: schema.profiles.username,
					is_starred: userId
						? sql<boolean>`EXISTS (SELECT 1 FROM ${schema.stars} AS s WHERE s.theme_id = ${schema.themes.id} AND s.user_id = ${userId})`
						: sql<boolean>`false`
				})
				.from(schema.themes)
				.innerJoin(
					schema.profiles,
					eq(schema.profiles.id, schema.themes.user_id)
				)
				.where(eq(schema.themes.id, id))
				.limit(1)

			if (!rows.length) {
				return c.json({ ok: false, error: 'Not found' }, 404)
			}
			const row = rows[0]
			const parsedTheme = parseShadcnThemeFromJson(row.json)
			const rowClean = {
				...row,
				star_count: Number(row.star_count),
				json: parsedTheme,
				is_starred: Boolean(row.is_starred),
				username: row.username ?? null
			}
			return c.json({ theme: rowClean })
		}
	)

	// PUT /themes/:id - update theme json
	.put(
		'/:id',
		zValidator('param', z.object({ id: z.uuid() })),
		zValidator(
			'json',
			z.object({
				json: zShadcnTheme
			})
		),
		async c => {
			const user = await getAuthUser(c)
			const { id } = c.req.valid('param')
			const { json } = c.req.valid('json')

			// Calculate the color bucket from the theme
			const { bucket } = themeToBucket(json)

			const res = await db
				.update(schema.themes)
				.set({
					json,
					color_bucket: bucket,
					version: sql`${schema.themes.version} + 1`
				})
				.where(
					and(
						eq(schema.themes.id, id),
						eq(schema.themes.user_id, user.id)
					)
				)
				.returning({ id: schema.themes.id })

			if (!res.length) {
				return c.json({ ok: false, error: 'Not found' }, 404)
			}

			return c.json({ ok: true })
		}
	)

	// PATCH /themes/:id/meta - update theme metadata (e.g., name)
	.patch(
		'/:id/meta',
		zValidator('param', z.object({ id: z.uuid() })),
		zValidator(
			'json',
			z.object({
				name: z.string().min(2).max(100)
			})
		),
		async c => {
			const user = await getAuthUser(c)
			const { id } = c.req.valid('param')
			const { name } = c.req.valid('json')

			const res = await db
				.update(schema.themes)
				.set({ name })
				.where(
					and(
						eq(schema.themes.id, id),
						eq(schema.themes.user_id, user.id)
					)
				)
				.returning({ id: schema.themes.id })

			if (!res.length) {
				return c.json({ ok: false, error: 'Not found' }, 404)
			}

			return c.json({ ok: true })
		}
	)

	// POST /themes - create theme
	.post(
		'/',
		zValidator(
			'json',
			z.object({
				name: z.string().min(2).max(100).nullish(),
				json: z.string().min(10).max(5000).nullish(),
				forkId: z.uuid().nullish()
			})
		),
		async c => {
			const user = await getAuthUser(c)
			const { name, json, forkId } = c.req.valid('json')

			let parsedTheme = parseShadcnThemeFromJson(json || '{}')
			let forkedFrom: string | null = null
			let themeName = name || 'Untitled theme'

			// If forking, fetch the source theme
			if (forkId) {
				const sourceTheme = await db
					.select({
						json: schema.themes.json,
						name: schema.themes.name
					})
					.from(schema.themes)
					.where(eq(schema.themes.id, forkId))
					.limit(1)

				if (!sourceTheme.length) {
					return c.json(
						{ ok: false, error: 'Source theme not found' },
						404
					)
				}

				// Use the source theme's JSON
				parsedTheme = parseShadcnThemeFromJson(sourceTheme[0].json)
				forkedFrom = forkId

				// If no custom name provided, use "Fork of [original name]"
				if (!name) {
					themeName = `Fork of ${sourceTheme[0].name}`
				}
			}

			// Calculate the color bucket from the theme
			const { bucket } = themeToBucket(parsedTheme)

			const [theme] = await db
				.insert(schema.themes)
				.values({
					user_id: user.id,
					name: themeName,
					json: parsedTheme,
					color_bucket: bucket,
					forked_from: forkedFrom
				})
				.returning()

			return c.json({ ok: true, id: theme.id }, 201)
		}
	)

	// POST /themes/:id/star - star a theme for current user
	.post(
		'/:id/star',
		zValidator('param', z.object({ id: z.uuid() })),
		async c => {
			const user = await getAuthUser(c)
			const { id } = c.req.valid('param')

			// Ensure the theme exists and belongs to the user or is accessible; here we only check existence
			const exists = await db
				.select({ id: schema.themes.id })
				.from(schema.themes)
				.where(eq(schema.themes.id, id))
				.limit(1)
			if (!exists.length) {
				return c.json({ ok: false, error: 'Not found' }, 404)
			}

			// Insert star and atomically increment cached star_count if a row was inserted
			const result = await db.transaction(async tx => {
				const inserted = await tx
					.insert(schema.stars)
					.values({ user_id: user.id, theme_id: id })
					.onConflictDoNothing({
						target: [schema.stars.user_id, schema.stars.theme_id]
					})
					.returning({ theme_id: schema.stars.theme_id })
				if (inserted.length) {
					await tx
						.update(schema.themes)
						.set({
							star_count: sql`"star_count" + 1`
						})
						.where(eq(schema.themes.id, id))
				}
				const [row] = await tx
					.select({ star_count: schema.themes.star_count })
					.from(schema.themes)
					.where(eq(schema.themes.id, id))
					.limit(1)
				return Number(row.star_count)
			})

			return c.json<{ ok: true; star_count: number }>({
				ok: true,
				star_count: result
			})
		}
	)

	// DELETE /themes/:id/star - unstar a theme for current user
	.delete(
		'/:id/star',
		zValidator('param', z.object({ id: z.uuid() })),
		async c => {
			const user = await getAuthUser(c)
			const { id } = c.req.valid('param')

			const result = await db.transaction(async tx => {
				const deleted = await tx
					.delete(schema.stars)
					.where(
						and(
							eq(schema.stars.theme_id, id),
							eq(schema.stars.user_id, user.id)
						)
					)
					.returning({ theme_id: schema.stars.theme_id })

				if (deleted.length) {
					await tx
						.update(schema.themes)
						.set({
							star_count: sql`GREATEST("star_count" - 1, 0)`
						})
						.where(eq(schema.themes.id, id))
				}

				const [row] = await tx
					.select({ star_count: schema.themes.star_count })
					.from(schema.themes)
					.where(eq(schema.themes.id, id))
					.limit(1)
				return Number(row.star_count)
			})

			return c.json<{ ok: true; star_count: number }>({
				ok: true,
				star_count: result
			})
		}
	)
