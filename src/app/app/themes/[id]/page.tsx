import ExamplesSwitcher from '@/components/examples'

export default async function ThemePage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div className="px-6 py-3 bg-background">
			<ExamplesSwitcher />
		</div>
	)
}
