/**
 * Pagination utility functions for encoding and decoding pagination cursors
 */

/**
 * Default page size for paginated API requests
 */
export const DEFAULT_PAGE_SIZE = 15

/**
 * Maximum page size for paginated API requests
 */
export const MAX_PAGE_SIZE = 100

/**
 * Clamp the page size between 1 and MAX_PAGE_SIZE
 */
export function clampPageSize(pageSize: number): number {
	return Math.max(1, Math.min(MAX_PAGE_SIZE, pageSize))
}

/**
 * Interface for pagination cursor data
 */
export interface PaginationCursor {
	lastId: string
	lastCreatedAt: string
	lastStarCount?: number
}

/**
 * Encodes pagination cursor data into a base64 token
 * @param cursor - The pagination cursor data to encode
 * @returns Base64 encoded token string
 */
export function encodePaginationToken(cursor: PaginationCursor): string {
	return Buffer.from(JSON.stringify(cursor)).toString('base64')
}

/**
 * Decodes a base64 pagination token into cursor data
 * @param token - The base64 encoded token to decode
 * @returns Decoded pagination cursor data or null if invalid
 */
export function decodePaginationToken(
	token: string | null | undefined
): PaginationCursor | null {
	if (!token) return null

	try {
		const decoded = Buffer.from(token, 'base64').toString('utf-8')
		const cursor = JSON.parse(decoded) as PaginationCursor

		// Validate the cursor structure
		if (!cursor.lastId || !cursor.lastCreatedAt) {
			return null
		}

		return cursor
	} catch (error) {
		console.error('Failed to decode pagination token:', error)
		return null
	}
}

/**
 * Interface for paginated response data
 */
export interface PaginatedResponse<T> {
	items: T[]
	nextToken: string | null
	hasMore: boolean
}
