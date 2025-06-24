import type { Metadata } from "next";
import "@shared/styles";
import { Footer, Header, DevNav } from "@/widgets";
import { AuthProvider, ThemeProvider } from "@/shared";

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
      <body suppressHydrationWarning className="antialiased min-h-screen mx-4">
      <ThemeProvider>
        <AuthProvider>  
          <Header className="pt-4" />
          {children}
          <Footer className="py-4" />
          <DevNav />
        </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
