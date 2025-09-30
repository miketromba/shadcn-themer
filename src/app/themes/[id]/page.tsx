import ExamplesSwitcher from '@/components/examples'
import { DeleteThemeDialog } from '@/components/theme-editor/delete-theme-dialog'
import { StarToggle } from '@/components/theme-editor/star-toggle'

export default async function ThemePage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div className="px-6 py-3 h-screen overflow-auto">
			<ExamplesSwitcher
				rightChildren={
					<div className="flex items-center gap-1.5">
						<StarToggle id={id} />
						<DeleteThemeDialog id={id} />
					</div>
				}
			/>
		</div>
	)
}
