import { Link } from "@/i18n/routing";
import { useSelectedLayoutSegment } from "next/navigation";
import type { ComponentProps } from "react";

export default function NavigationLink({
	href,
	...rest
}: ComponentProps<typeof Link>) {
	const selectedLayoutSegment = useSelectedLayoutSegment();
	const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
	const isActive = pathname === href;

	return (
		<Link
			aria-current={isActive ? "page" : undefined}
			className={`py-1 px-2 rounded-md ${
				isActive ? "bg-slate-400 text-gray-50" : "bg-slate-300 text-gray-800"
			}`}
			href={href}
			{...rest}
		/>
	);
}
