"use client";
import { GrApps } from "react-icons/gr";
import Button from "./Button/Button";
import Image from "next/image";
import Logo from "../../../public/logo.jpeg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetCurrentQueryParams } from "../hooks/useGetCurrentQueryParams";

const pages = [
	{ pageName: "Home", pageLinks: ["/"] },
	{ pageName: "Comments", pageLinks: ["/comments"] },
	{
		pageName: "Social",
		pageLinks: ["https://www.linkedin.com/company/your-parts/"],
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const currentQueryParams = useGetCurrentQueryParams();

	return (
		<div className="sticky h-[100vh] flex flex-col gap-4 justify-between py-2 px-4 shadow">
			<div className="flex justify-between items-center py-2 border-b">
				<div className="flex gap-2 items-center justify-start max-h-14">
					<Image
						src={Logo}
						alt="app logo"
						width={120}
						height={30}
						style={{ maxHeight: "50px" }}
					/>
				</div>
				<div className="flex items-center cursor-pointer hover:text-primary duration-300">
					<GrApps size={"1.3rem"} />
				</div>
			</div>
			<div className="flex-1 ">
				<ul className=" flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  gap-2">
					{pages.map((page) => (
						<li
							key={page.pageName}
							className={`py-1 px-2 rounded-md ${
								page.pageLinks.some((link) => pathname === link)
									? "bg-slate-400 text-gray-50"
									: "bg-slate-300 text-gray-800"
							}`}
						>
							<Link
								href={{
									pathname: page.pageLinks[0],
									search: currentQueryParams,
								}}
								className="block py-2 px-3  bg-blue-700 rounded-sm md:bg-transparent"
							>
								{page.pageName}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-col top-[calc(100vh-48px-70px)] border-stone-300">
				<Button>Setting</Button>
			</div>
		</div>
	);
}
