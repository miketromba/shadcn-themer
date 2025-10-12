/**
 * Default values for VSCode theme properties (Dark theme)
 * Only includes properties used in our shadcn mapping
 */
export const vscodeDarkDefaults: Record<string, string> = {
	// Editor
	'editor.background': '#222222',
	'editor.foreground': '#abb2bf',

	// Error
	'editorError.foreground': '#B73A34',

	// Focus
	focusBorder: '#616161',

	// Hover Widget
	'editorHoverWidget.background': '#191919',
	'editorHoverWidget.foreground': '#ABABAB',

	// Suggest Widget
	'editorSuggestWidget.background': '#191919',
	'editorSuggestWidget.foreground': '#7D7D7D',

	// Buttons
	'button.background': '#0087ff',
	'button.foreground': '#ffffff',
	'button.secondaryBackground': '#696969',
	'button.secondaryForeground': '#ffffff',

	// Inputs
	'input.background': '#151515',

	// Editor Groups
	'editorGroupHeader.tabsBackground': '#222222',

	// Indent guides (for borders)
	'editorIndentGuide.background': '#ffffff0f',

	// Lists
	'list.activeSelectionBackground': '#184971',
	'list.activeSelectionForeground': '#ffffff',
	'list.hoverBackground': '#ffffff10',
	'list.hoverForeground': '#ffffff',
	'list.focusBackground': '#184971',

	// Sidebar
	'sideBar.background': '#171717',
	'sideBar.foreground': '#cccccc',
	'sideBar.border': 'default',

	// Activity Bar
	'activityBarBadge.background': '#0087ff',
	'activityBarBadge.foreground': '#ffffff',

	// Terminal ANSI colors
	'terminal.ansiBlue': '#469DF1',
	'terminal.ansiGreen': '#33D057',
	'terminal.ansiYellow': '#E1C542',
	'terminal.ansiMagenta': '#E557F9',
	'terminal.ansiRed': '#FF5470'
}

/**
 * Default values for VSCode theme properties (Light theme)
 * Only includes properties used in our shadcn mapping
 */
export const vscodeLightDefaults: Record<string, string> = {
	// Editor
	'editor.background': '#ffffff',
	'editor.foreground': '#000000',

	// Error
	'editorError.foreground': '#e51400',

	// Focus
	focusBorder: '#0090f1',

	// Hover Widget
	'editorHoverWidget.background': '#f3f3f3',
	'editorHoverWidget.foreground': '#616161',

	// Suggest Widget
	'editorSuggestWidget.background': '#f3f3f3',
	'editorSuggestWidget.foreground': '#000000',

	// Buttons
	'button.background': '#007acc',
	'button.foreground': '#ffffff',
	'button.secondaryBackground': '#5f6a79',
	'button.secondaryForeground': '#ffffff',

	// Inputs
	'input.background': '#ffffff',

	// Editor Groups
	'editorGroupHeader.tabsBackground': '#f3f3f3',

	// Indent guides (for borders)
	'editorIndentGuide.background': '#d3d3d3',

	// Lists
	'list.activeSelectionBackground': '#0060c0',
	'list.activeSelectionForeground': '#ffffff',
	'list.hoverBackground': '#e8e8e8',
	'list.hoverForeground': '#616161',
	'list.focusBackground': '#d6ebff',

	// Sidebar
	'sideBar.background': '#f3f3f3',
	'sideBar.foreground': '#616161',
	'sideBar.border': 'default',

	// Activity Bar
	'activityBarBadge.background': '#007acc',
	'activityBarBadge.foreground': '#ffffff',

	// Terminal ANSI colors
	'terminal.ansiBlue': '#0451a5',
	'terminal.ansiGreen': '#00bc00',
	'terminal.ansiYellow': '#949800',
	'terminal.ansiMagenta': '#bc05bc',
	'terminal.ansiRed': '#cd3131'
}
