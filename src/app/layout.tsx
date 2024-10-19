import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Supabase Auth",
  description: "Supabase Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 container max-w-screen-sm mx-auto px-1 py-5">
            {children}
          </main>

          <footer className="py-5">
            <div className="text-center text-sm">
              Copyright © All rights reserved | FullStackChannel
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
