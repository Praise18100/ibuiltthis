import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iBuiltThis - Share Your Creactions, Discover New Launches",
  description:
    "A community platform for creators to showcase their apps, AI tools, SaaS products, and creative projects. Authentic launches, real builders, genuine feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Header />
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
