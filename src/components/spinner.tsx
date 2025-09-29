import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const colorClassMap = {
	primary: 'text-primary-foreground',
	secondary: 'text-secondary-foreground',
	accent: 'text-accent-foreground',
	muted: 'text-muted-foreground'
}

export function Spinner({
	variant = 'primary'
}: {
	variant?: 'primary' | 'secondary' | 'accent' | 'muted'
}) {
	return (
		<Loader2
			className={cn('mr-2 h-4 w-4 animate-spin', colorClassMap[variant])}
		/>
	)
}
