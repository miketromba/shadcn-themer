import { vscodeDarkDefaults, vscodeLightDefaults } from './vscodeDefaults'
import { vscodeThemeToShadcn } from './vscodeThemeToShadcn'
import { generateThemeCSS } from '@/lib/generateThemeCSS'

// Create VSCode theme objects from defaults
const vscodeDarkTheme = {
	name: 'VSCode Dark Defaults',
	colors: vscodeDarkDefaults
}

const vscodeLightTheme = {
	name: 'VSCode Light Defaults',
	colors: vscodeLightDefaults
}

// Convert to shadcn theme (dark)
console.log('=== DARK THEME ===')
const shadcnDarkTheme = vscodeThemeToShadcn(vscodeDarkTheme, 'dark')
const darkCss = generateThemeCSS(shadcnDarkTheme)
console.log('JSON:')
console.log(JSON.stringify(shadcnDarkTheme, null, 2))
console.log('\nCSS:')
console.log(darkCss)

console.log('\n\n=== LIGHT THEME ===')
// Convert to shadcn theme (light)
const shadcnLightTheme = vscodeThemeToShadcn(vscodeLightTheme, 'light')
const lightCss = generateThemeCSS(shadcnLightTheme)
console.log('JSON:')
console.log(JSON.stringify(shadcnLightTheme, null, 2))
console.log('\nCSS:')
console.log(lightCss)
