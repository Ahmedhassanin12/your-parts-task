"use client";
import Button from "@/common/components/Button/Button";
import { deletePost } from "@/lib/api/posts/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { memo, useState } from "react";
import { getUsers } from "@/lib/api/users/users";
import UserCard from "./components/UserCard";

const UsersModule = () => {
	const queryClient = useQueryClient();

	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["Users", pagination.pageIndex],
		queryFn: async () => {
			return await getUsers(pagination.pageIndex + 1);
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (id: number) => {
			return await deletePost(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Users"] });
		},
	});

	return (
		<section
			className="py-4 px-2 h-full overflow-y-auto bg-zinc-400"
			style={{ width: "calc(100% - 80px)" }}
		>
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
				<div className="h-full w-full flex flex-col">
					<div className="flex items-center justify-between">
						<h4 className="font-bold">Users Page</h4>
					</div>

					<div
						className="w-full flex items-center justify-start  gap-2 p-2"
						style={{ flexWrap: "wrap" }}
					>
						{data?.map((user) => (
							<UserCard key={user.id} user={user} />
						))}
					</div>
				</div>
			) : null}
		</section>
	);
};

export default memo(UsersModule);
