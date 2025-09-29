import ExamplesSwitcher from '@/components/examples'
import { DeleteThemeDialog } from '@/components/theme-editor/delete-theme-dialog'

export default async function ThemePage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div className="px-6 py-3 bg-background">
			<ExamplesSwitcher rightChildren={<DeleteThemeDialog id={id} />} />
		</div>
	)
}
