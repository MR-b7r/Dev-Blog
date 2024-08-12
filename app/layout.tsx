import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "DEV Blog",
  description:
    "A Blog Website to discuss everything new in the Developers community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={(cn("bg-primary-50 dark:bg-gray-900"), poppins.variable)}
      >
        <ThemeProvider attribute="class" storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
