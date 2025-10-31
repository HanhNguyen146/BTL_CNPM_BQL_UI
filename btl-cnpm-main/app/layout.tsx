import type { Metadata } from "next";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "Ban Quản Lý - HCMUT Tutor Support",
  description: "Hệ thống quản lý chương trình Tutor Support - HCMUT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/anh_truongbk.jpg')" }}
      >
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
