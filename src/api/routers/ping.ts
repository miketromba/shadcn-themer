import { Hono } from 'hono'

/**
 * Example router with simple ping endpoints
 */
export const pingRouter = new Hono()
	// GET /ping - Returns a pong message
	.get('/', async c => {
		return c.json({ message: 'pong', timestamp: Date.now() }, 200)
	})

	// POST /ping - Also returns a pong message
	.post('/', async c => {
		return c.json({ message: 'pong', timestamp: Date.now() }, 200)
	})
