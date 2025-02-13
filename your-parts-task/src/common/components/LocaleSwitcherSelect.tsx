import type { Locale } from "@/i18n/config";
import { useRouter, usePathname } from "next/navigation";
import React, { type ChangeEvent, type ReactNode, useTransition } from "react";

type Props = {
	children: ReactNode;
	defaultValue: string;
	label: string;
};

const LocaleSwitcherSelect = ({ defaultValue, children, label }: Props) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const pathname = usePathname();

	function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value as Locale;

		startTransition(() => {
			const pathWithoutLocale = pathname.split("/").slice(2).join("/");
			const newPathname = `/${nextLocale}/${pathWithoutLocale}`;
			router.replace(newPathname);
		});
	}

	return (
		<label
			className={`relative text-gray-400" ${isPending ? "transition-opacity [&:disabled]:opacity-30" : ""}`}
		>
			<p className="sr-only">{label}</p>
			<select
				className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
				defaultValue={defaultValue}
				disabled={isPending}
				onChange={onSelectChange}
			>
				{children}
			</select>
			<span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
		</label>
	);
};

export default LocaleSwitcherSelect;
