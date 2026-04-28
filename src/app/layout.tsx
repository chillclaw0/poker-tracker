import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poker Tracker",
  description: "Track your poker sessions and bankroll",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
