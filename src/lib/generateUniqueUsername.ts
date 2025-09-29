// https://www.npmjs.com/package/unique-username-generator
import { sql } from '@/db'
import { db, schema } from '@/db'
import { generateUsername } from 'unique-username-generator'

type Options = {
	maxAttempts?: number
}

/**
 * Generate a unique, lowercased username that does not exist in `profiles.username`.
 * Enforces case-insensitive uniqueness by querying using LOWER(username).
 */
export async function generateUniqueUsername(
	options: Options = {}
): Promise<string> {
	const { maxAttempts = 5 } = options

	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const raw = generateUsername('', 3)

		// Always lower-case for storage and uniqueness
		const candidate = raw.toLowerCase()

		// Check existence using LOWER(username) = candidate
		const exists = await usernameExistsCaseInsensitive(candidate)
		if (!exists) {
			return candidate
		}
	}

	throw new Error('Failed to generate a unique username after many attempts')
}

async function usernameExistsCaseInsensitive(
	candidateLower: string
): Promise<boolean> {
	const rows = await db
		.select({ exists: sql<boolean>`true` })
		.from(schema.profiles)
		.where(sql`lower(${schema.profiles.username}) = ${candidateLower}`)
		.limit(1)

	return rows.length > 0
}

export default generateUniqueUsername
