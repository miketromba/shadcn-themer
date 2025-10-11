import type { Metadata } from 'next'
import ExamplesSwitcher from '@/components/examples'
import { DeleteThemeDialog } from '@/components/theme-editor/delete-theme-dialog'
import { StarToggle } from '@/components/theme-editor/star-toggle'
import { CodeExportButton } from '@/components/theme-editor/code-export-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Save } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Edit Theme',
	description: 'Edit your shadcn/ui theme',
	robots: {
		index: false,
		follow: false
	}
}

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
						<StarToggle id={id} variant="outline" />
						<DeleteThemeDialog id={id} />
						<CodeExportButton />
						<Button asChild variant="outline" size="sm">
							<Link href={`/themes/${id}`}>
								<Save className="size-4 mr-1" />
								Save
							</Link>
						</Button>
					</div>
				}
			/>
		</div>
	)
}
