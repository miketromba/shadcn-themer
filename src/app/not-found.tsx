import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Page Not Found',
	description: 'The page you are looking for could not be found.',
	robots: {
		index: false,
		follow: false
	}
}

export default function NotFound() {
	return (
		<div className="flex min-h-[70vh] items-center justify-center px-4">
			<div className="text-center">
				<h1 className="text-9xl font-bold text-muted-foreground/20">
					404
				</h1>
				<h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
				<p className="mt-2 text-muted-foreground max-w-md mx-auto">
					The page you&apos;re looking for doesn&apos;t exist or has
					been moved.
				</p>
				<div className="mt-8 flex items-center justify-center gap-4">
					<Button asChild>
						<Link href="/">
							<Home className="mr-2 size-4" />
							Go Home
						</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/">
							<Search className="mr-2 size-4" />
							Browse Themes
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
