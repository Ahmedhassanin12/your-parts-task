"use client";
import Button from "@/common/components/Button/Button";
import { TanStackTable } from "@/common/components/Table/TanStack";
import { getPosts, type IPostType } from "@/lib/api/posts/posts";
import { useQuery } from "@tanstack/react-query";
import type {
	ColumnDef,
	PaginationState,
	RowSelectionState,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

const HomeModule = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 1,
		pageSize: 10,
	});
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["POSTS", pagination.pageIndex],
		queryFn: async () => {
			return await getPosts(pagination.pageIndex + 1);
		},
	});

	const [, setRowSelection] = useState<RowSelectionState>({});

	const columns = useMemo<ColumnDef<IPostType>[]>(
		() => [
			{
				accessorKey: "name",
				header: () => <span>Name</span>,
				cell: ({ row }) => (
					<Link href={`posts/${row.original.id}`}>
						<span className="hover:text-primary">{row.original.title}</span>
					</Link>
				),
				size: 300,
				maxSize: 400,
			},
			{
				accessorKey: "body",
				header: () => <span>Body</span>,
				cell: ({ row }) => {
					return (
						<span className="hover:text-primary">{row.original.body}</span>
					);
				},
				size: 300,
				maxSize: 400,
			},
		],
		[],
	);

	const getRowId = (row: IPostType) => String(row.id);
	return (
		<section className="py-4 px-1 h-full overflow-auto bg-zinc-400">
			{isLoading ? (
				<div className="w-full min-h-[500px] h-full flex items-center justify-center">
					Loading...
				</div>
			) : null}

			{error ? (
				<div className="w-full min-h-[500px] h-full flex flex-col items-center justify-center">
					<p className="text-red-600">Some thing went wrong</p>
					<Button onClick={() => refetch()}>Try Again</Button>
				</div>
			) : null}

			{!isLoading && !error ? (
				<TanStackTable
					data={data}
					columns={columns}
					pageCount={data?.length ?? 100}
					getRowId={getRowId}
					setSelectedRows={setRowSelection}
					pagination={pagination}
					setPagination={setPagination}
				/>
			) : null}
		</section>
	);
};

export default HomeModule;
