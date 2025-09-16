import { hc } from 'hono/client'
import type { AppType } from '@/api/routers'

// Create the API client
export const apiClient = hc<AppType>('/')

// Export utility types for response/request types
export type { InferResponseType, InferRequestType } from 'hono/client'
