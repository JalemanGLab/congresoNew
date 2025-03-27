'use client'

import useDashboard from "./useAssistants";
import TableGlobal from "@/components/shared/TableData/TableGlobal";


const PageAssistants = () => {
	const {
		columns,
		assistants
	} = useDashboard();


	return (
		<div className="w-full flex flex-col gap-8 overflow-hidden">
			{/* <div className="flex flex-col   sm:flex-row gap-3">
				<div className="w-full h-40 rounded-lg bg-neutral-700 "></div>
				<div className="w-full h-40 rounded-lg bg-neutral-700 "></div>
				<div className="w-full h-40 rounded-lg bg-neutral-700 "></div>
			</div> */}
			<TableGlobal
				columns={columns}
				data={assistants}
				itemsPerPage={6}
				filters={{
					all: true,
				}}
			/>
		</div>
	);
}

export default PageAssistants;
