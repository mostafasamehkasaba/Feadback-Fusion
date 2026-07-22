import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import {  syncUser } from "@/lib/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback Fusion - Public Roadmap",
  description: "A platform for users to suggest and vote on features",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser();
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/* Navbar */}
            <Navbar />
            {/* Main section */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            {/* Footer */}
            <Footer />
            {/* <Toaster richColors /> */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}