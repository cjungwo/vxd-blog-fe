import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header, SubNav } from "@/shared/ui";
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
      <body className="antialiased min-h-screen mx-4">
        <Header className="py-4" />
        <SubNav />
        {children}
        <Footer className="py-4" />
        <DevNav />
      </body>
    </html>
  );
}
