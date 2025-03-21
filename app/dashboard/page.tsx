import useDashboard from "./useDashboard";
import TableGlobal from "@/components/shared/TableData/TableGlobal";

const PageDashboard = () => {
	const {
		columns,
		data
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
				data={data}
				itemsPerPage={6}
				filters={{
					all: true,
				}}
			/>
		</div>
	);
}

export default PageDashboard;
