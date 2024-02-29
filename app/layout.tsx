import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/navbar/navbar";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmlakGPT",
  description: "Emlak App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
            <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
