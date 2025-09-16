import ExamplesSwitcher from '@/components/examples'

export default async function ThemePage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="grid gap-6 lg:grid-cols-[1fr_320px]">
				{/* Left/main area */}
				<div className="min-h-[50vh]">
					<ExamplesSwitcher />
				</div>
				{/* Right sidebar (empty for now) */}
				<aside className="min-h-[50vh]" />
			</div>
		</div>
	)
}
