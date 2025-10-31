'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Settings, BarChart3, User } from 'lucide-react';

const menuItems = [
  { name: 'Trang chủ', icon: Home, href: '/' },
  {
    name: 'Quản lý sinh viên',
    icon: Users,
    href: '/students',
    subItems: [
      { name: 'Danh sách', href: '/students/list' },
      { name: 'Thêm sinh viên', href: '/students/add' },
    ],
  },
  {
    name: 'Quản lý Tutor',
    icon: User,
    href: '/tutors',
    subItems: [
      { name: 'Danh sách', href: '/tutors/list' },
      { name: 'Thêm Tutor', href: '/tutors/add' },
    ],
  },
  { name: 'Báo cáo', icon: BarChart3, href: '/reports' },
  
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Thanh menu ngang */}
      <header className="flex items-center justify-between bg-white shadow px-6 py-3">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image src="/bklogo_transparent.png" alt="Logo" width={36} height={36} />
            <span className="text-lg font-semibold text-gray-800">Ban Quản Lý</span>
          </div>

          {/* Menu chính */}
          <nav className="flex space-x-6 ml-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-2 py-1 rounded-md transition-colors ${
                    isActive
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Khu vực user/avatar */}
        <div className="flex items-center space-x-3">
        <img
        src="/admin_avatar.jpg"
        alt="Admin Avatar"
        className="w-8 h-8 rounded-full object-cover border border-gray-300"
        />
        <span className="text-gray-700 text-sm font-medium">Admin</span>
        </div>

      </header>

      {/* Nội dung chính */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
