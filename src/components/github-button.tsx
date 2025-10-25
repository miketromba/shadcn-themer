'use client'

import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'

interface GitHubButtonProps {
	owner: string
	repo: string
	variant?: 'default' | 'ghost' | 'outline' | 'secondary'
	size?: 'sm' | 'default' | 'lg'
	showStars?: boolean
	className?: string
	compact?: boolean
}

interface GitHubRepoData {
	stargazers_count: number
}

export function GitHubButton({
	owner,
	repo,
	variant = 'outline',
	size = 'default',
	showStars = true,
	className,
	compact = false
}: GitHubButtonProps) {
	const { data: repoData } = useQuery<GitHubRepoData>({
		queryKey: ['github-stars', owner, repo],
		queryFn: async () => {
			const response = await fetch(
				`https://api.github.com/repos/${owner}/${repo}`,
				{ next: { revalidate: 3600 } } as RequestInit
			)
			if (!response.ok) {
				throw new Error('Failed to fetch GitHub data')
			}
			return response.json()
		},
		staleTime: 1000 * 60 * 60, // 1 hour
		retry: 1,
		enabled: showStars
	})

	const starCount = repoData?.stargazers_count
	const formattedStars =
		starCount !== undefined
			? starCount >= 1000
				? `${(starCount / 1000).toFixed(1)}k`
				: starCount.toLocaleString()
			: undefined

	return (
		<Button
			variant={variant}
			size={size}
			asChild
			className={cn('gap-1.5 transition-all hover:scale-105', className)}
		>
			<a
				href={`https://github.com/${owner}/${repo}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<GitHubIcon />
				{!compact && <span className="hidden sm:inline">GitHub</span>}
				{showStars && formattedStars !== undefined && (
					<span
						className={cn(
							'flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground',
							size === 'sm' && 'text-xs'
						)}
					>
						<Star
							className={cn(
								'fill-current',
								size === 'sm' ? 'size-3' : 'size-3.5'
							)}
						/>
						{formattedStars}
					</span>
				)}
			</a>
		</Button>
	)
}

function GitHubIcon() {
	return (
		<svg
			className="size-4.5 opacity-90 fill-current dark:fill-white"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			viewBox="0 0 24 24"
		>
			<title>GitHub</title>
			<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
		</svg>
	)
}
