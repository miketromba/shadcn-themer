/*
	VSCode themes converted to shadcn format.
	- Reads from src/scripts/import-vscode-themes/vscode-themes/
	- Converts using vscodeThemeToShadcn
	- Exports as seed format for seed-db.ts
*/

import * as fs from 'fs'
import * as path from 'path'
import { vscodeThemeToShadcn } from '@/scripts/import-vscode-themes/vscodeThemeToShadcn'
import { vscodeThemeSeeds } from '@/scripts/import-vscode-themes/seeds'
import {
	vscodeDarkDefaults,
	vscodeLightDefaults
} from '@/scripts/import-vscode-themes/vscodeDefaults'

const VSCODE_THEMES_DIR = path.join(
	process.cwd(),
	'src/scripts/import-vscode-themes/vscode-themes'
)

export const OWNER_ID = 'd5c7bb04-2547-4327-af7d-a94a03284219'

type VscodeSeed = {
	name: string
	json: string
}

function convertVscodeTheme(themeFile: string): VscodeSeed | null {
	try {
		// Get slug from filename (without .json)
		const slug = path.basename(themeFile, '.json')

		// Find metadata from seeds
		const metadata = vscodeThemeSeeds.find(t => t.slug === slug)
		if (!metadata) {
			console.warn(`Warning: No metadata found for ${slug}, skipping`)
			return null
		}

		// Read the VSCode theme JSON
		const filePath = path.join(VSCODE_THEMES_DIR, themeFile)
		const vscodeThemeColors = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

		// Merge with defaults based on theme type
		const defaults =
			metadata.type === 'light' ? vscodeLightDefaults : vscodeDarkDefaults
		const mergedColors = { ...defaults, ...vscodeThemeColors }

		// Convert to shadcn theme
		const vscodeTheme = {
			colors: mergedColors,
			name: metadata.name
		}

		const shadcnTheme = vscodeThemeToShadcn(vscodeTheme, metadata.type)

		return {
			name: metadata.name,
			json: JSON.stringify(shadcnTheme)
		}
	} catch (error) {
		console.error(`Error converting ${themeFile}:`, error)
		return null
	}
}

// Read and convert all VSCode themes at module load time
function loadVscodeThemes(): VscodeSeed[] {
	// Check if directory exists
	if (!fs.existsSync(VSCODE_THEMES_DIR)) {
		console.warn(
			`VSCode themes directory not found: ${VSCODE_THEMES_DIR}. Run fetch script first.`
		)
		return []
	}

	const files = fs
		.readdirSync(VSCODE_THEMES_DIR)
		.filter(f => f.endsWith('.json'))

	const themes = files
		.map(file => convertVscodeTheme(file))
		.filter((t): t is VscodeSeed => t !== null)

	console.log(`Loaded ${themes.length} VSCode themes for seeding`)
	return themes
}

export const vscodeThemesForSeeding = loadVscodeThemes()
