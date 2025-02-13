import {
	flexRender,
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { MdDensityLarge } from "react-icons/md";
import { MdDensityMedium } from "react-icons/md";
import { MdDensitySmall } from "react-icons/md";
import { CgArrowsExchangeAltV } from "react-icons/cg";

import type {
	ColumnDef,
	ColumnSort,
	ColumnFilter,
	PaginationState,
	RowSelectionState,
	ColumnPinningState,
} from "@tanstack/react-table";
import { type Dispatch, memo, type SetStateAction } from "react";
import { TablePaginationControls } from "./TablePaginationControls";

type TanStackTableProps<T> = {
	data: T[] | undefined;
	columns: ColumnDef<T>[];
	pagination: PaginationState;
	getRowId: (row: T) => string;
	setSelectedRows: Dispatch<SetStateAction<RowSelectionState>>;
	setPagination: Dispatch<SetStateAction<PaginationState>>;
	pageCount: number;
};

type DensityState = "sm" | "md" | "lg";

const TanStackTable = <T,>(props: TanStackTableProps<T>) => {
	const {
		data,
		columns,
		getRowId,
		setSelectedRows,
		pagination,
		setPagination,
		pageCount,
	} = props;

	const [density, setDensity] = useState<DensityState>("md");
	const [fullScreen, setFullScreen] = useState<boolean>(false);
	const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

	const [internalRowSelection, setInternalRowSelection] =
		useState<RowSelectionState>({});

	const [sorting, setSorting] = useState<ColumnSort[]>([
		{
			id: "name",
			desc: true,
		},
	]);

	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
		left: ["select"],
		right: [],
	});
	const [columnVisibility, setColumnVisibility] = useState({});

	const shouldUpdateLocal = useRef(false);

	useEffect(() => {
		if (!shouldUpdateLocal.current) {
			shouldUpdateLocal.current = true;
			return;
		}

		setSelectedRows(internalRowSelection);
		console.log("Selected Rows internal:", internalRowSelection);
	}, [internalRowSelection, setSelectedRows]);

	const defaultData = useMemo(() => [], []);
	const tableColumns = useMemo<ColumnDef<T>[]>(
		() => [
			{
				id: "select",
				maxSize: 6,
				header: ({ table }) => (
					<input
						type="checkbox"
						checked={table.getIsAllRowsSelected()}
						onChange={table.getToggleAllPageRowsSelectedHandler()}
					/>
				),
				cell: ({ row }) => (
					<input
						type="checkbox"
						checked={row.getIsSelected()}
						onChange={row.getToggleSelectedHandler()}
					/>
				),
			},
			...columns,
		],
		[columns],
	);

	const table = useReactTable({
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
		data: data ?? defaultData,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		getRowId,
		pageCount,
		defaultColumn: {
			size: 200,
			minSize: 250,
			maxSize: 400,
		},
		state: {
			columnVisibility,
			columnPinning,
			columnFilters,
			pagination,
			sorting,
			rowSelection: internalRowSelection,
		},
		manualPagination: true,
		enableRowSelection: true,
		onColumnPinningChange: setColumnPinning,
		onPaginationChange: setPagination,
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setInternalRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
	});

	const toggleDensity = () => {
		setDensity((prevDensity) => {
			switch (prevDensity) {
				case "sm":
					return "md";
				case "md":
					return "lg";
				case "lg":
					return "sm";
				default:
					return "md";
			}
		});
	};

	return (
		<div
			className="h-full w-full flex flex-col overflow-hidden"
			style={{
				...(fullScreen && {
					position: "fixed",
					left: 0,
					top: 0,
					zIndex: 99,
					width: "100vw",
					height: "100vh",
					background: "white",
				}),
			}}
		>
			<div className="flex items-center justify-end gap-2 p-2">
				<button
					onClick={toggleDensity}
					className="border rounded p-1 text-white mb-2 "
					type="button"
				>
					{density === "sm" ? (
						<MdDensityMedium color="gray" fontSize="20px" />
					) : density === "md" ? (
						<MdDensityLarge color="gray" fontSize="20px" />
					) : (
						<MdDensitySmall color="gray" fontSize="20px" />
					)}
				</button>
				<button
					onClick={() => setFullScreen((prev) => !prev)}
					className="border rounded p-1 text-white mb-2 "
					type="button"
				>
					{fullScreen ? (
						<MdFullscreenExit color="gray" fontSize="20px" />
					) : (
						<MdFullscreen color="gray" fontSize="20px" />
					)}
				</button>
			</div>
			<div className="overflow-auto rounded-lg border bg-white">
				<table className="min-w-full divide-y divide-gray-200 overflow-auto">
					<thead className="border-b">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header, index) => (
									<th
										key={header.id}
										className={`text-left text-xs font-medium text-gray-800 uppercase tracking-wider ${
											index + 1 !== headerGroup.headers.length ? "border-r" : ""
										}`}
										style={{
											width: `${header.id === "select" ? `${header.getSize()}px` : "auto"}`,
											padding:
												density === "sm"
													? "8px"
													: density === "md"
														? "16px"
														: "24px",
										}}
										data-pinned={header.column.getIsPinned()}
									>
										<div
											key={header.id}
											className={`flex items-center ${
												header.column.getCanSort()
													? "cursor-pointer flex gap-2"
													: ""
											}`}
											onClick={header.column.getToggleSortingHandler()}
											onKeyDown={header.column.getToggleSortingHandler()}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{header.column.getCanSort() ? (
												<CgArrowsExchangeAltV
													className={`text-lg ${header.column.getIsSorted() ? "text-primary" : "text-gray-600"}`}
												/>
											) : null}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-gray-200">
						{table?.getRowModel()?.rows?.length === 0 ? (
							<tr
								className="h-20"
								style={{
									padding:
										density === "sm"
											? "8px"
											: density === "md"
												? "16px"
												: "24px",
								}}
							>
								<td
									colSpan={table.getAllColumns().length}
									className="text-center text-sm text-gray-400"
								>
									No data found
								</td>
							</tr>
						) : (
							table?.getRowModel()?.rows?.map((row) => (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell, index) => (
										<td
											key={cell.id}
											className={`whitespace-nowrap  text-sm font-medium text-gray-900 max-w-xs ${
												index + 1 !== row.getVisibleCells().length
													? "border-r"
													: ""
											}`}
											style={{
												padding:
													density === "sm"
														? "8px"
														: density === "md"
															? "16px"
															: "24px",
											}}
											data-pinned={cell.column.getIsPinned()}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<div className="mt-2 flex justify-center py-4">
				<TablePaginationControls table={table} />
			</div>
		</div>
	);
};

const MemoizedTanStackTable = memo(TanStackTable) as typeof TanStackTable;
export default MemoizedTanStackTable;
export { MemoizedTanStackTable as TanStackTable };
