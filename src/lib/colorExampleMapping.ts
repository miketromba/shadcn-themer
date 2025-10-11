import { ColorKey } from './shadcnTheme'

/**
 * Valid example IDs - single source of truth
 */
export const EXAMPLE_IDS = {
	CARDS: 'cards',
	DASHBOARD: 'dashboard',
	TASKS: 'tasks',
	AUTHENTICATION: 'authentication',
	COMPONENTS_SHOWCASE: 'components-showcase',
	POPOVER_SHOWCASE: 'popover-showcase',
	CHARTS: 'charts',
	DASH_2: 'dash-2',
	TYPOGRAPHY: 'typography'
} as const

export type ExampleId = (typeof EXAMPLE_IDS)[keyof typeof EXAMPLE_IDS]
export type FontType = 'font-sans' | 'font-serif' | 'font-mono'

/**
 * Maps color keys to their best showcase example
 * This helps users visualize changes in context as they edit colors
 */
export const COLOR_EXAMPLE_MAP: Record<ColorKey, ExampleId> = {
	// Base colors - Cards show good variety
	background: EXAMPLE_IDS.CARDS,
	foreground: EXAMPLE_IDS.TASKS,

	// Surfaces - Cards showcase these well
	card: EXAMPLE_IDS.CARDS,
	'card-foreground': EXAMPLE_IDS.CARDS,

	// Popover colors - Dedicated popover showcase with always-visible popovers
	popover: EXAMPLE_IDS.POPOVER_SHOWCASE,
	'popover-foreground': EXAMPLE_IDS.POPOVER_SHOWCASE,

	// Primary colors - Dashboard has prominent primary buttons
	primary: EXAMPLE_IDS.COMPONENTS_SHOWCASE,
	'primary-foreground': EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Secondary colors - Components showcase has secondary buttons
	secondary: EXAMPLE_IDS.COMPONENTS_SHOWCASE,
	'secondary-foreground': EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Accent colors - Components showcase has good accent usage
	accent: EXAMPLE_IDS.COMPONENTS_SHOWCASE,
	'accent-foreground': EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Muted colors - Tasks example shows muted in table header and row
	muted: EXAMPLE_IDS.TASKS,
	'muted-foreground': EXAMPLE_IDS.CARDS,

	// Destructive - Components showcase has destructive buttons
	destructive: EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Borders and inputs - Authentication has many inputs
	border: EXAMPLE_IDS.CARDS,
	input: EXAMPLE_IDS.CARDS,
	ring: EXAMPLE_IDS.CARDS,

	// Charts - Dedicated charts showcase
	'chart-1': EXAMPLE_IDS.CHARTS,
	'chart-2': EXAMPLE_IDS.CHARTS,
	'chart-3': EXAMPLE_IDS.CHARTS,
	'chart-4': EXAMPLE_IDS.CHARTS,
	'chart-5': EXAMPLE_IDS.CHARTS,

	// Sidebar colors - Dashboard shows sidebar
	sidebar: EXAMPLE_IDS.DASHBOARD,
	'sidebar-foreground': EXAMPLE_IDS.DASHBOARD,
	'sidebar-primary': EXAMPLE_IDS.DASHBOARD,
	'sidebar-primary-foreground': EXAMPLE_IDS.DASHBOARD,
	'sidebar-accent': EXAMPLE_IDS.DASHBOARD,
	'sidebar-accent-foreground': EXAMPLE_IDS.DASHBOARD,
	'sidebar-border': EXAMPLE_IDS.DASHBOARD,
	'sidebar-ring': EXAMPLE_IDS.DASHBOARD
}

/**
 * Maps font types to their best showcase example
 * This helps users visualize font changes in context
 */
export const FONT_EXAMPLE_MAP: Record<FontType, ExampleId> = {
	'font-sans': EXAMPLE_IDS.TYPOGRAPHY,
	'font-serif': EXAMPLE_IDS.TYPOGRAPHY,
	'font-mono': EXAMPLE_IDS.TYPOGRAPHY
}
