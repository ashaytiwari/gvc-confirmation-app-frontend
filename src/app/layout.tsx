import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";

import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";

import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GVC RSVP",
  description: "Official GVC confirmation app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const bodyAttributes = {
    className: inter.className,
    suppressHydrationWarning: true
  };

  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body {...bodyAttributes}>
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
