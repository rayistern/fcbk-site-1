import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Friendship Circle Brooklyn",
  description:
    "Building a community where every child belongs. Programs, events, and volunteer opportunities for families with special needs children in Brooklyn.",
  openGraph: {
    title: "Friendship Circle Brooklyn",
    description:
      "Building a community where every child belongs.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://fcbrooklyn.org",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1B2845",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <main className="page-content">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
