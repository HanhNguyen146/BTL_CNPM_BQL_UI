import type { Metadata } from "next";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "Ban Quản Lý - HCMUT Tutor Support",
  description: "Hệ thống quản lý chương trình Tutor Support - HCMUT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}