"use client";
import Button from "@/common/components/Button/Button";
import { TanStackTable } from "@/common/components/Table/TanStack";
import { deletePost, getPosts, type IPostType } from "@/lib/api/posts/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	ColumnDef,
	PaginationState,
	RowSelectionState,
} from "@tanstack/react-table";
import Link from "next/link";
import { memo, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import CreateNewPost from "./components/CreateNewPost";

const HomeModule = () => {
	const queryClient = useQueryClient();

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["POSTS", pagination.pageIndex],
		queryFn: async () => {
			return await getPosts(pagination.pageIndex + 1);
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (id: number) => {
			return await deletePost(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["POSTS"] });
		},
	});

	const [, setRowSelection] = useState<RowSelectionState>({});

	const columns = useMemo<ColumnDef<IPostType>[]>(
		() => [
			{
				id: "title",
				accessorFn: (row) => row.title,
				header: "Title",
				cell: ({ row }) => (
					<Link href={`posts/${row.original.id}`}>
						<span className="hover:text-primary text-ellipsis">
							{row.original.title}
						</span>
					</Link>
				),
				size: 300,
				maxSize: 400,
			},
			{
				id: "body",
				accessorFn: (row) => row.body,
				header: "Body",
				cell: ({ row }) => {
					return (
						<span className="hover:text-primary max-w-80 text-ellipsis">
							{row.original.body}
						</span>
					);
				},
				size: 300,
				maxSize: 400,
			},
			{
				id: "delete",
				accessorFn: (row) => row,
				header: "Delete",
				cell: ({ row }) => {
					return (
						<Button
							onClick={() => mutate(row.original.id)}
							variant="outline"
							color="red"
							endIcon={<MdDelete />}
							disabled={isPending}
						>
							Delete
						</Button>
					);
				},
				size: 300,
				maxSize: 400,
			},
			{
				id: "edit",
				accessorFn: (row) => row,
				header: "Edit",
				cell: ({ row }) => {
					// eslint-disable-next-line react-hooks/rules-of-hooks
					const Component = useMemo(() => {
						return <CreateNewPost post={row.original} />;
					}, [row.original]);
					return Component;
				},
				size: 300,
				maxSize: 400,
			},
		],
		[mutate, isPending],
	);

	const getRowId = (row: IPostType) => String(row.id);
	return (
		<section className="py-4 px-2 w-full h-full overflow-auto bg-zinc-400">
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
				<div className="h-full w-full ">
					<div className="flex items-center justify-between">
						<h4 className="font-bold">Posts Page</h4>
						<CreateNewPost />
					</div>
					<div
						className=" w-full"
						style={{
							height: "calc(100% - 38px)",
						}}
					>
						<TanStackTable
							data={data}
							columns={columns}
							pageCount={data?.length ?? 100}
							getRowId={getRowId}
							setSelectedRows={setRowSelection}
							pagination={pagination}
							setPagination={setPagination}
						/>
					</div>
				</div>
			) : null}
		</section>
	);
};

export default memo(HomeModule);
