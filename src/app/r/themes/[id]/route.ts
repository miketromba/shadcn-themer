import { NextRequest, NextResponse } from 'next/server'
import { db, schema } from '@/db'
import { eq } from 'drizzle-orm'
import { parseShadcnThemeFromJson } from '@/lib/shadcnTheme'
import { shadcnThemeToRegistryFormat } from '@/lib/shadcnThemeToRegistryFormat'

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params

		// Remove .json extension if present
		const themeId = id.replace(/\.json$/, '')

		const rows = await db
			.select({
				json: schema.themes.json,
				name: schema.themes.name
			})
			.from(schema.themes)
			.where(eq(schema.themes.id, themeId))
			.limit(1)

		if (!rows.length) {
			const errorJson = JSON.stringify(
				{ error: 'Theme not found' },
				null,
				2
			)
			return new NextResponse(errorJson, {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		const themeRow = rows[0]
		const parsedTheme = parseShadcnThemeFromJson(themeRow.json)

		// Convert to shadcn registry format
		const registryItem = shadcnThemeToRegistryFormat(
			parsedTheme,
			themeRow.name
		)

		// Return pretty-formatted JSON
		const prettyJson = JSON.stringify(registryItem, null, 2)

		return new NextResponse(prettyJson, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type'
			}
		})
	} catch (error) {
		console.error('Error fetching theme:', error)
		const errorJson = JSON.stringify(
			{ error: 'Internal server error' },
			null,
			2
		)
		return new NextResponse(errorJson, {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}

// Handle CORS preflight
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	})
}
