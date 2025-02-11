import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { notFound } from "next/navigation";

import { Sidebar } from "@/common/components/Sidebar";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import LocalProvider from "@/providers/LocalProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Your Parts Task",
	description: "Generated by create next app",
};

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { locale: string };
}>) {
	const { locale } = await params;
	const messages = await getMessages();

	if (!routing.locales.includes(locale as "ar" | "en")) {
		notFound();
	}
	setRequestLocale(locale);

	return (
		<html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<LocalProvider locale={locale} messages={messages}>
					<ReactQueryProvider>
						<main className="relative grid gap-2 grid-cols-[280px,1fr] max-h-screen overflow-hidden">
							<Sidebar />
							{children}
						</main>
					</ReactQueryProvider>
				</LocalProvider>
			</body>
		</html>
	);
}
