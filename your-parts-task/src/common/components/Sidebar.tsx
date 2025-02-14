"use client";
import { GrApps } from "react-icons/gr";
import Button from "./Button/Button";
import Image from "next/image";
import Logo from "../../../public/logo.jpeg";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import NavigationLink from "./NavigationLink";
import { MdPerson, MdPostAdd } from "react-icons/md";

export function Sidebar() {
	const t = useTranslations("Navigation");
	const tSetting = useTranslations("Settings");

	return (
		<div className="sticky h-[100dvh] flex flex-col gap-4 justify-between py-2 px-4 shadow">
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
				<div className="hidden sm:flex items-center cursor-pointer hover:text-primary duration-300">
					<GrApps size={"1.3rem"} />
				</div>
			</div>
			<div className="flex-1 ">
				<ul className=" flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  gap-2">
					<NavigationLink href="/">
						<MdPostAdd className="flex sm:hidden" />
						<p className="hidden sm:flex">{t("posts")}</p>
					</NavigationLink>
					<NavigationLink href="/users">
						<MdPerson className="flex sm:hidden" />
						<p className="hidden sm:flex">{t("users")}</p>
					</NavigationLink>
				</ul>
			</div>
			<div className="flex flex-col top-[calc(100vh-48px-70px)] border-stone-300">
				<LocaleSwitcher />
				<Button className="hidden sm:blocks">{tSetting("Settings")}</Button>
			</div>
		</div>
	);
}
