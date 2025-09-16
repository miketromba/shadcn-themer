export * from 'drizzle-orm'

import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
	throw new Error('DATABASE_URL is not set')
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, {
	prepare: false,
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
