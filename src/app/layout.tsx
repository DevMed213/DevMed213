import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { Suspense } from "react";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "DevMed213 — Sites web, applications et logiciels",
    template: "%s · DevMed213",
  },
  description: site.description,
  icons: { icon: "/brand/mark-cropped.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <FirebaseAnalytics />
        <Suspense fallback={<div className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/10 bg-black md:h-[4.5rem]" />}>
          <Header />
        </Suspense>
        <main className="flex-1 pt-16 md:pt-[4.5rem]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
