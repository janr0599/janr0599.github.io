import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
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
  title: "Javier Noguera, Automation Engineer",
  description:
    "Automation and AI systems that run in production. 25 workflows, 300 to 400 runs a day, 0% failures.",
  metadataBase: new URL("https://janr0599.github.io"),
  openGraph: {
    title: "Javier Noguera, Automation Engineer",
    description:
      "Automation and AI systems that run in production. 25 workflows, 300 to 400 runs a day, 0% failures.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
