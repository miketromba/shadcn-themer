import { Hono } from 'hono'
import { db, schema } from '@/db'
import { getAuthUser } from '@/api/auth'
import { and, desc, eq, lt, sql } from 'drizzle-orm'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import {
	DEFAULT_PAGE_SIZE,
	clampPageSize,
	decodePaginationToken,
	encodePaginationToken,
	type PaginatedResponse
} from '@/lib/pagination'
import { parseShadcnThemeFromJson } from '@/lib/shadcnTheme'

const listQuerySchema = z.object({
	pageSize: z.string().optional(),
	nextToken: z.string().optional()
})

const createSchema = z.object({
	name: z.string().min(2).max(100).nullish(),
	json: z.string().min(10).max(5000).nullish()
})

export const themesRouter = new Hono()
	// GET /themes?pageSize&nextToken
	.get('/', zValidator('query', listQuerySchema), async c => {
		const user = await getAuthUser(c)
		const { pageSize: pageSizeParam, nextToken } = c.req.valid('query')
		const limit = clampPageSize(
			pageSizeParam ? parseInt(pageSizeParam, 10) : DEFAULT_PAGE_SIZE
		)
		const cursor = decodePaginationToken(nextToken)

		const baseWhere = and(eq(schema.themes.user_id, user.id))
		const whereClause = cursor
			? and(
					baseWhere,
					lt(schema.themes.created_at, new Date(cursor.lastCreatedAt))
			  )
			: baseWhere

		const rows = await db
			.select({
				id: schema.themes.id,
				name: schema.themes.name,
				json: schema.themes.json,
				created_at: schema.themes.created_at,
				star_count: sql<number>`COALESCE(COUNT(${schema.stars.theme_id}), 0)`
			})
			.from(schema.themes)
			.leftJoin(schema.stars, eq(schema.stars.theme_id, schema.themes.id))
			.where(whereClause)
			.groupBy(
				schema.themes.id,
				schema.themes.name,
				schema.themes.json,
				schema.themes.created_at
			)
			.orderBy(desc(schema.themes.created_at), desc(schema.themes.id))
			.limit(limit + 1)

		const hasMore = rows.length > limit
		const sliced = rows.slice(0, limit)

		const items = sliced.map(r => ({
			id: r.id,
			name: r.name,
			json: r.json,
			created_at: r.created_at ? r.created_at.toISOString() : null,
			star_count: Number(r.star_count) || 0
		}))

		const nextPageToken =
			hasMore && items.length
				? encodePaginationToken({
						lastId: items[items.length - 1].id,
						lastCreatedAt:
							items[items.length - 1].created_at ??
							new Date(0).toISOString()
				  })
				: null

		return c.json<PaginatedResponse<(typeof items)[number]>>({
			items,
			nextToken: nextPageToken,
			hasMore
		})
	})

	// GET /themes/:id - fetch single theme details
	.get(
		'/:id',
		zValidator('param', z.object({ id: z.string().uuid() })),
		async c => {
			const user = await getAuthUser(c)
			const { id } = c.req.valid('param')

			const rows = await db
				.select({
					id: schema.themes.id,
					user_id: schema.themes.user_id,
					name: schema.themes.name,
					json: schema.themes.json,
					created_at: schema.themes.created_at,
					updated_at: schema.themes.updated_at,
					star_count: sql<number>`COALESCE(COUNT(${schema.stars.theme_id}), 0)`
				})
				.from(schema.themes)
				.leftJoin(
					schema.stars,
					eq(schema.stars.theme_id, schema.themes.id)
				)
				.where(
					and(
						eq(schema.themes.id, id),
						eq(schema.themes.user_id, user.id)
					)
				)
				.groupBy(
					schema.themes.id,
					schema.themes.user_id,
					schema.themes.name,
					schema.themes.json,
					schema.themes.created_at,
					schema.themes.updated_at
				)
				.limit(1)

			if (!rows.length) {
				return c.json({ ok: false, error: 'Not found' }, 404)
			}
			const r = rows[0]

			return c.json({ ...r, star_count: Number(r.star_count) })
		}
	)

	// POST /themes - create theme
	.post('/', zValidator('json', createSchema), async c => {
		const user = await getAuthUser(c)
		if (!process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET) {
			return c.json(
				{ ok: false, error: 'Storage bucket not configured' },
				500
			)
		}
		const { name, json } = c.req.valid('json')
		const [theme] = await db
			.insert(schema.themes)
			.values({
				user_id: user.id,
				name: name || 'Untitled theme',
				json: parseShadcnThemeFromJson(json || '{}')
			})
			.returning()

		return c.json<{ ok: true; id: string }>({ ok: true, id: theme.id }, 201)
	})

	// POST /themes/:id/star - star a theme for current user
	.post(
		'/:id/star',
		zValidator('param', z.object({ id: z.string().uuid() })),
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

			// Insert star, ignore if already starred
			await db
				.insert(schema.stars)
				.values({ user_id: user.id, theme_id: id })
				.onConflictDoNothing({
					target: [schema.stars.user_id, schema.stars.theme_id]
				})

			// Return updated star count
			const starCountRows = await db
				.select({ count: sql<number>`count(*)` })
				.from(schema.stars)
				.where(eq(schema.stars.theme_id, id))
				.limit(1)
			const star_count = Number(starCountRows[0]?.count ?? 0)

			return c.json<{ ok: true; star_count: number }>({
				ok: true,
				star_count
			})
		}
	)
