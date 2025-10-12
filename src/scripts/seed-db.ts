/*
	Seed the database with initial shadcn themes.
	- Reads seeds from src/data/theme-seeds.ts
	- Ensures idempotency by manually checking existence by (user_id, name)
*/

import throat from 'throat'
import { db, schema } from '@/db'
import { parseShadcnThemeFromJson } from '@/lib/shadcnTheme'
import { themeSeeds, OWNER_ID } from '@/data/theme-seeds'
import { vscodeThemesForSeeding } from '@/data/vscode-seeds'
import { eq, and } from 'drizzle-orm'

type Seed = {
	name: string
	json: unknown // string or object matching our theme json format
}

const CONCURRENCY = 10

async function upsertTheme(
	seed: Seed
): Promise<{ status: 'inserted' | 'skipped'; name: string }> {
	// Accept either a string JSON or an object; normalize via JSON.parse helper we already have
	const jsonString =
		typeof seed.json === 'string' ? seed.json : JSON.stringify(seed.json)
	const normalized = parseShadcnThemeFromJson(jsonString)

	const existing = await db
		.select({ id: schema.themes.id })
		.from(schema.themes)
		.where(
			and(
				eq(schema.themes.user_id, OWNER_ID),
				eq(schema.themes.name, seed.name)
			)
		)
		.limit(1)
	if (existing.length > 0) {
		return { status: 'skipped', name: seed.name }
	}

	await db.insert(schema.themes).values({
		user_id: OWNER_ID,
		name: seed.name,
		json: normalized
	})
	return { status: 'inserted', name: seed.name }
}

async function main(): Promise<void> {
	// Combine all seed sources
	const allSeeds = [...themeSeeds, ...vscodeThemesForSeeding]

	console.log(
		`Seeding ${allSeeds.length} theme(s) (${themeSeeds.length} manual + ${vscodeThemesForSeeding.length} VSCode) with concurrency=${CONCURRENCY}...`
	)
	const run = throat(CONCURRENCY)
	const results = await Promise.all(
		allSeeds.map(seed => run(() => upsertTheme(seed)))
	)
	const inserted = results.filter(r => r.status === 'inserted').length
	const skipped = results.filter(r => r.status === 'skipped').length
	console.log(
		`Done. Inserted: ${inserted}, Skipped (already exists): ${skipped}`
	)
}

main().catch(err => {
	console.error('Seed failed:', err)
	process.exitCode = 1
})
