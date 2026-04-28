import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poker Tracker",
  description: "Track your poker sessions and bankroll",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
