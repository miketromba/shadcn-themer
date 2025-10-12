export * from 'drizzle-orm'

import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
	throw new Error('DATABASE_URL is not set')
}

// Serverless-optimized configuration for postgres-js
export const client = postgres(connectionString, {
	prepare: false, // Required for pgBouncer/transaction pooler
	max: 1, // Serverless: Use only 1 connection per instance
	idle_timeout: 20, // Close idle connections after 20 seconds
	connect_timeout: 10, // Timeout connection attempts after 10 seconds
	ssl: {
		rejectUnauthorized: false
	}
})
export const db = drizzle(client, { schema })

// Export the schema for use in other parts of the application
export { schema }

export type TxOrDbObject =
	| typeof db
	| Parameters<Parameters<typeof db.transaction>[0]>[0]
