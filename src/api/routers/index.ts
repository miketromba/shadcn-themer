import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { pingRouter } from './ping'
import { themesRouter } from './themes'

// Create the main API router
const api = new Hono().basePath('/api')

// Add common middleware
// Only use logger middleware in development environment
if (process.env.NODE_ENV === 'development') {
	api.use('*', logger())
}

// Configure CORS to only allow requests from your domain and localhost
api.use(
	'*',
	cors({
		origin: [
			...(process.env.NODE_ENV === 'development'
				? ['http://localhost:3000']
				: []),
			'https://infloo.ai', // Replace with your actual production domain
			'https://www.infloo.ai' // Include www subdomain if you use it
		],
		credentials: true, // Allow credentials (cookies, auth headers)
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization']
	})
)

// Mount sub-routers - keep all routes in a variable
// Chain all routes together to properly infer types
// Ensure routes are properly chained for full type inference
export const routes = api
	.route('/ping', pingRouter)
	.route('/themes', themesRouter)
// .route('/other', otherRouter)

// Export the Hono app
export default api

// Export type for client usage - using the routes object as recommended
export type AppType = typeof routes
