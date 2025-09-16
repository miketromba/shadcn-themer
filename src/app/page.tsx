import { ThemesFeed } from '@/components/themes-feed'

export default async function Home() {
	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-semibold mb-4">Discover Themes</h1>
			<ThemesFeed />
		</div>
	)
}
