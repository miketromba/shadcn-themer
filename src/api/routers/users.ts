import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { db, schema } from '@/db'
import { getAuthUser } from '@/api/auth'
import { eq } from 'drizzle-orm'
import generateUniqueUsername from '@/lib/generateUniqueUsername'

export const usersRouter = new Hono()
	// GET /user/me - current authenticated user's profile
	.get('/me', async c => {
		const user = await getAuthUser(c)

		const rows = await db
			.select({
				id: schema.profiles.id,
				email: schema.profiles.email,
				username: schema.profiles.username,
				created_at: schema.profiles.created_at,
				updated_at: schema.profiles.updated_at
			})
			.from(schema.profiles)
			.where(eq(schema.profiles.id, user.id))
			.limit(1)

		if (!rows.length) {
			return c.json({ error: 'Profile not found' }, 404)
		}

		const profile = rows[0]

		// If username is missing, attempt to generate and persist one before returning
		if (!profile.username || profile.username.trim() === '') {
			const username = await generateUniqueUsername()
			await db
				.update(schema.profiles)
				.set({ username, updated_at: new Date() })
				.where(eq(schema.profiles.id, user.id))
			profile.username = username
		}

		return c.json({ profile })
	})

	// PATCH /user/username - update current user's username
	.patch(
		'/username',
		zValidator(
			'json',
			z.object({
				username: z
					.string()
					.min(4, 'Username must be at least 4 characters')
					.regex(
						/^[a-z0-9_-]+$/,
						'Use lowercase letters, numbers, underscores, or hyphens only'
					)
			})
		),
		async c => {
			const user = await getAuthUser(c)
			const { username } = c.req.valid('json')
			const candidate = username.toLowerCase().trim()

			if (candidate.length < 4) {
				return c.json(
					{ error: 'Username must be at least 4 characters' },
					400
				)
			}

			try {
				const updated = await db
					.update(schema.profiles)
					.set({ username: candidate, updated_at: new Date() })
					.where(eq(schema.profiles.id, user.id))
					.returning({
						id: schema.profiles.id,
						email: schema.profiles.email,
						username: schema.profiles.username,
						created_at: schema.profiles.created_at,
						updated_at: schema.profiles.updated_at
					})

				if (!updated.length) {
					return c.json({ error: 'Profile not found' }, 404)
				}

				return c.json({ profile: updated[0] })
			} catch (error: unknown) {
				// Unique violation due to existing username (case-insensitive)
				if (
					typeof error === 'object' &&
					error !== null &&
					'code' in error &&
					(error as { code?: string }).code === '23505'
				) {
					return c.json(
						{ error: 'That username is already taken' },
						409
					)
				}
				throw error
			}
		}
	)

	// GET /user/:id - profile by id
	.get(
		'/:id',
		zValidator('param', z.object({ id: z.string().uuid() })),
		async c => {
			const { id } = c.req.valid('param')

			const rows = await db
				.select({
					id: schema.profiles.id,
					username: schema.profiles.username,
					created_at: schema.profiles.created_at,
					updated_at: schema.profiles.updated_at
				})
				.from(schema.profiles)
				.where(eq(schema.profiles.id, id))
				.limit(1)

			if (!rows.length) {
				return c.json({ error: 'Profile not found' }, 404)
			}

			const profile = rows[0]
			return c.json({ profile })
		}
	)
