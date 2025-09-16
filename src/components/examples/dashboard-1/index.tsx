import { ChartAreaInteractive } from '@/components/examples/dashboard-1/components/chart-area-interactive'
import { DataTable } from '@/components/examples/dashboard-1/components/data-table'
import { SectionCards } from '@/components/examples/dashboard-1/components/section-cards'
import { SiteHeader } from '@/components/site-header'
// import { AppSidebar } from '@/components/examples/dashboard-1/components/app-sidebar'
// import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import data from './data.json'

export default function DashboardDemo() {
	return (
		<>
			<SiteHeader />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<SectionCards />
						<div className="px-4 lg:px-6">
							<ChartAreaInteractive />
						</div>
						<DataTable data={data} />
					</div>
				</div>
			</div>
		</>
	)
}
