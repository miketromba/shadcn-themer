import { handle } from 'hono/vercel'
import api from '@/api/routers'

// Export handlers for all HTTP methods
export const GET = handle(api)
export const POST = handle(api)
export const PUT = handle(api)
export const DELETE = handle(api)
export const PATCH = handle(api)

// Optionally set to edge runtime
export const runtime = 'nodejs'

// Configure longer timeout for AI responses
// export const maxDuration = 800 // 13.33 minutes in seconds (max allowed by Vercel for fluid compute on PRO plan)
