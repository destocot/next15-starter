import type { Metadata } from "next";
import { Inter_Tight as Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { ReadonlyChildren } from "@/types";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | NextStarter",
    default: "NextStarter",
  },
  description: "Created with Next.js 15, Tailwind CSS, and shadcn/ui",
};

export default function RootLayout({ children }: ReadonlyChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-4rem-3rem)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
