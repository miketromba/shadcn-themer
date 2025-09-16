import { getDefaultShadcnTheme } from '@/lib/shadcnTheme'

export const OWNER_ID = 'd5c7bb04-2547-4327-af7d-a94a03284219'

export const themeSeeds = [
	{
		name: 'Default',
		json: JSON.stringify(getDefaultShadcnTheme())
	}
]
