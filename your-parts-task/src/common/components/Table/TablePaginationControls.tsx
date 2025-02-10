import type { Table } from "@tanstack/react-table";
import {
	FiChevronLeft,
	FiChevronRight,
	FiChevronsLeft,
	FiChevronsRight,
} from "react-icons/fi";

type TablePaginationControlsProps<T> = {
	table: Table<T>;
};

export function TablePaginationControls<T>(
	props: TablePaginationControlsProps<T>,
) {
	const { table } = props;

	return (
		<div className="flex gap-6">
			<div className="flex gap-2">
				<button type="button" onClick={() => table.firstPage()}>
					<FiChevronsLeft size={20} />
				</button>
				<button
					type="button"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<FiChevronLeft size={20} />
				</button>
			</div>
			<div className="flex gap-4 items-center">
				{Array.from(Array(table.getPageCount()).keys()).map((page) => (
					<button
						key={page}
						type="button"
						onClick={() => table.setPageIndex(page)}
						className={`rounded-full px-3 py-1 ${
							page === table.getState().pagination.pageIndex
								? "text-gray-900 font-bold "
								: "bg-primary text-gray-500"
						}`}
					>
						{page + 1}
					</button>
				))}
			</div>
			<div className="flex gap-2">
				<button
					type="button"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<FiChevronRight size={20} />
				</button>
				<button
					type="button"
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					<FiChevronsRight size={20} />
				</button>
			</div>
		</div>
	);
}
