import { ChartAreaInteractive } from '@/components/examples/dashboard-1/components/chart-area-interactive'
import { DataTable } from '@/components/examples/dashboard-1/components/data-table'
import { SectionCards } from '@/components/examples/dashboard-1/components/section-cards'
// import { AppSidebar } from '@/components/examples/dashboard-1/components/app-sidebar'
// import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import data from './data.json'

export default function DashboardDemo() {
	return (
		<>
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-6">
						<SectionCards />
						<ChartAreaInteractive />
						<DataTable data={data} />
					</div>
				</div>
			</div>
		</>
	)
}
