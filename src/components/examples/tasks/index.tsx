import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { UserNav } from './components/user-nav'
import tasks from './data/tasks.json'

export default function TaskDemo() {
	return (
		<>
			<div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
				<div className="flex items-center justify-between gap-2">
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl font-semibold tracking-tight">
							Welcome back!
						</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your tasks for this month.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<UserNav />
					</div>
				</div>
				<DataTable data={tasks} columns={columns} />
			</div>
		</>
	)
}
