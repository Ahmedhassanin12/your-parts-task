import type { IUserType } from "@/lib/api/users/users";
import Image from "next/image";
import React from "react";
import { MdEmail, MdVerifiedUser } from "react-icons/md";

type IUserProps = {
	user: IUserType;
};

const UserCard = ({ user }: IUserProps) => {
	return (
		<div className="min-w-[400px] max-w-[400px] flex items-center justify-center flex-wrap gap-3 p-2  bg-white shadow-lg rounded-lg border ">
			<Image
				className="object-cover object-center rounded-full"
				width={110}
				height={110}
				src={user.avatar ?? ""}
				alt="avatar"
			/>
			<div>
				<div className="px-6">
					<h1 className="mx-3 flex items-center font-semibold text-lg">
						<MdVerifiedUser />
						{user?.first_name}
					</h1>
					<h1 className="text-2xl font-semibold text-gray-800">
						{user?.last_name}
					</h1>
					<p className="text-lg text-gray-700">Full Stack Building UI.</p>
					<div className="flex items-center mt-4 text-gray-700">
						<MdEmail />
						<h1 className="px-2 text-sm">{user.email}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
