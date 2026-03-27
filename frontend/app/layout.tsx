import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Report System",
  description: "Sistem input laporan properti",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="topnav">
          <div className="topnav-inner">
            <strong>Property Report System</strong>

            <div className="topnav-links">
              <Link href="/reports">Data Laporan</Link>
              <Link href="/reports/upload">Upload Laporan</Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}