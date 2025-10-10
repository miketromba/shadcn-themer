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
	DASH_2: 'dash-2'
} as const

export type ExampleId = (typeof EXAMPLE_IDS)[keyof typeof EXAMPLE_IDS]

/**
 * Maps color keys to their best showcase example
 * This helps users visualize changes in context as they edit colors
 */
export const COLOR_EXAMPLE_MAP: Record<ColorKey, ExampleId> = {
	// Base colors - Cards show good variety
	background: EXAMPLE_IDS.CARDS,
	foreground: EXAMPLE_IDS.CARDS,

	// Surfaces - Cards showcase these well
	card: EXAMPLE_IDS.CARDS,
	'card-foreground': EXAMPLE_IDS.CARDS,

	// Popover colors - Components showcase has hover cards and popovers
	popover: EXAMPLE_IDS.COMPONENTS_SHOWCASE,
	'popover-foreground': EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Primary colors - Dashboard has prominent primary buttons
	primary: EXAMPLE_IDS.DASHBOARD,
	'primary-foreground': EXAMPLE_IDS.DASHBOARD,

	// Secondary colors - Components showcase has secondary buttons
	secondary: EXAMPLE_IDS.COMPONENTS_SHOWCASE,
	'secondary-foreground': EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Accent colors - Components showcase has good accent usage
	accent: EXAMPLE_IDS.COMPONENTS_SHOWCASE,
	'accent-foreground': EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Muted colors - Components showcase displays muted well
	muted: EXAMPLE_IDS.COMPONENTS_SHOWCASE,
	'muted-foreground': EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Destructive - Components showcase has destructive buttons
	destructive: EXAMPLE_IDS.COMPONENTS_SHOWCASE,

	// Borders and inputs - Authentication has many inputs
	border: EXAMPLE_IDS.AUTHENTICATION,
	input: EXAMPLE_IDS.AUTHENTICATION,
	ring: EXAMPLE_IDS.AUTHENTICATION,

	// Charts - Dashboard has charts
	'chart-1': EXAMPLE_IDS.DASHBOARD,
	'chart-2': EXAMPLE_IDS.DASHBOARD,
	'chart-3': EXAMPLE_IDS.DASHBOARD,
	'chart-4': EXAMPLE_IDS.DASHBOARD,
	'chart-5': EXAMPLE_IDS.DASHBOARD,

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
