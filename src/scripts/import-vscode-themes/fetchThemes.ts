import { vscodeThemeSeeds } from './seeds'
import * as fs from 'fs'
import * as path from 'path'

const VSCODE_THEMES_DIR = path.join(__dirname, 'vscode-themes')

// Ensure directory exists
if (!fs.existsSync(VSCODE_THEMES_DIR)) {
	fs.mkdirSync(VSCODE_THEMES_DIR, { recursive: true })
}

async function fetchTheme(username: string, slug: string, name: string) {
	const url = `https://editor-api.vscode.one/theme/${username}/${slug}`
	console.log(`Fetching: ${name} (${slug})...`)

	try {
		const response = await fetch(url)
		if (!response.ok) {
			console.error(`  ✗ Failed to fetch ${name}: ${response.statusText}`)
			return
		}

		const data = await response.json()
		const uiColors = data.file?.ui || {}

		// Save to file using slug as filename
		const filename = path.join(VSCODE_THEMES_DIR, `${slug}.json`)
		fs.writeFileSync(filename, JSON.stringify(uiColors, null, 2))
		console.log(`  ✓ Saved: ${filename}`)
	} catch (error) {
		console.error(`  ✗ Error fetching ${name}:`, error)
	}
}

async function main() {
	console.log(`Fetching top ${vscodeThemeSeeds.length} VSCode themes...\n`)

	for (const theme of vscodeThemeSeeds) {
		await fetchTheme(theme.username, theme.slug, theme.name)
		// Add small delay to be nice to the API
		await new Promise(resolve => setTimeout(resolve, 500))
	}

	console.log(`\nDone! Fetched ${vscodeThemeSeeds.length} themes.`)
}

main()
