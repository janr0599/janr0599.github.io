import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { markSrc } from "@/lib/brand";
import "./globals.css";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist",
	display: "swap",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Javier Noguera - Automation Engineer",
	description:
		"Enterprise-grade automation and AI systems that take over repetitive work and keep running in production.",
	metadataBase: new URL("https://javiernoguera.com"),
	icons: {
		icon: [{ url: markSrc, type: "image/svg+xml" }],
		apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
	},
	openGraph: {
		title: "Javier Noguera - Automation Engineer",
		description:
			"Enterprise-grade automation and AI systems that take over repetitive work and keep running in production.",
		type: "website",
		url: "https://javiernoguera.com",
		siteName: "Javier Noguera",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Javier Noguera, automation and AI systems that keep running in production",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Javier Noguera - Automation Engineer",
		description:
			"Enterprise-grade automation and AI systems that take over repetitive work and keep running in production.",
		images: ["/og.png"],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: "document.documentElement.classList.add('js')",
					}}
				/>
			</head>
			<body>
				<SmoothScroll>{children}</SmoothScroll>
			</body>
		</html>
	);
}
