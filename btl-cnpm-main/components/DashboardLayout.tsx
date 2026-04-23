'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  GraduationCap,
  LogOut,
  Menu,
} from 'lucide-react';

type SubItem = { name: string; href: string };
type MenuItem = {
  name: string;
  icon: React.ElementType;
  href: string;
  subItems?: SubItem[];
};

const menuItems: MenuItem[] = [
  { name: 'Trang chủ', icon: Home, href: '/' },
  {
    name: 'Quản lý sinh viên',
    icon: Users,
    href: '/students',
    subItems: [
      { name: 'Danh sách', href: '/students' },
      { name: 'Thêm sinh viên', href: '/students/add' },
    ],
  },
  {
    name: 'Quản lý Tutor',
    icon: GraduationCap,
    href: '/tutors',
    subItems: [
      { name: 'Danh sách', href: '/tutors' },
      { name: 'Thêm Tutor', href: '/tutors/add' },
    ],
  },
  { name: 'Báo cáo', icon: BarChart3, href: '/reports' },
  { name: 'Cài đặt', icon: Settings, href: '/setting' },
];

const pageTitles: Record<string, string> = {
  '/': 'Tổng quan',
  '/students': 'Quản lý Sinh viên',
  '/tutors': 'Quản lý Tutor',
  '/reports': 'Báo cáo',
  '/setting': 'Cài đặt',
};

function NavItem({ item }: { readonly item: MenuItem }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== '/' && pathname.startsWith(item.href));
  const hasSubItems = !!item.subItems?.length;
  const [open, setOpen] = useState(isActive && hasSubItems);
  const Icon = item.icon;

  if (hasSubItems) {
    return (
      <li>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
            isActive
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <span className="flex items-center gap-3">
            <Icon
              size={18}
              className={`transition-colors duration-200 ${
                isActive
                  ? 'text-blue-600'
                  : 'text-slate-400 group-hover:text-slate-600'
              }`}
            />
            {item.name}
          </span>
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 flex-shrink-0 ${
              open ? 'rotate-180' : ''
            } ${isActive ? 'text-blue-500' : 'text-slate-400'}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="mt-1 ml-5 border-l-2 border-slate-100 pl-3 space-y-0.5 py-1">
            {item.subItems!.map((sub) => (
              <li key={sub.href}>
                <Link
                  href={sub.href}
                  className={`block py-2 px-3 rounded-lg text-sm transition-all duration-150 ${
                    pathname === sub.href
                      ? 'text-blue-700 font-semibold bg-blue-50'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Icon
          size={18}
          className={`transition-colors duration-200 ${
            isActive
              ? 'text-blue-600'
              : 'text-slate-400 group-hover:text-slate-600'
          }`}
        />
        {item.name}
        {isActive && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
        )}
      </Link>
    </li>
  );
}

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pageTitle = pageTitles[pathname] ?? 'Ban Quản Lý';

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Đóng menu"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-30 flex flex-col shadow-sm transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-100">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-white ring-1 ring-slate-200">
              <Image
                src="/bklogo_transparent.png"
                alt="HCMUT Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight tracking-wide">
                HCMUT
              </p>
              <p className="text-xs text-slate-500 leading-tight">
                Tutor Support
              </p>
            </div>
          </Link>
        </div>

        {/* Campus banner với overlay */}
        <div className="relative h-28 overflow-hidden flex-shrink-0">
          <Image
            src="/anh_truongbk.jpg"
            alt="HCMUT Campus"
            fill
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/70 to-slate-900/90 flex flex-col justify-end px-5 py-3">
            <p className="text-white text-xs font-semibold tracking-widest uppercase opacity-90">
              Ban Quản Lý
            </p>
            <p className="text-blue-200 text-[11px] opacity-75 mt-0.5">
              Chương trình Tutor Support
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-4 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            Điều hướng
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </ul>
        </nav>

        {/* User profile */}
        <div className="px-4 py-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-200 flex-shrink-0 shadow-sm">
              <Image
                src="/admin_avatar.jpg"
                alt="Admin Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
                Admin
              </p>
              <p className="text-xs text-slate-500 truncate leading-tight">
                Quản trị viên
              </p>
            </div>
            <button
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
              title="Đăng xuất"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 px-5 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3.5">
            {/* Mobile burger */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb / title */}
            <div>
              <h1 className="text-base font-semibold text-slate-800 leading-tight">
                {pageTitle}
              </h1>
              <p className="text-xs text-slate-400 leading-tight hidden sm:block">
                Hệ thống quản lý Tutor Support — HCMUT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Avatar + name */}
            <div className="flex items-center gap-2.5 pl-1 pr-2 py-1.5 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-200 shadow-sm flex-shrink-0">
                <Image
                  src="/admin_avatar.jpg"
                  alt="Admin"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">
                Admin
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
