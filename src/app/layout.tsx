import type { Metadata } from "next";
import "./globals.css";
import { DevNav } from "@/widgets";

export const metadata: Metadata = {
  title: "VXD Blog",
  description: "Vision Experience Developer's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <DevNav />
      </body>
    </html>
  );
}
