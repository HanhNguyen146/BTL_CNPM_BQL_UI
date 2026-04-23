import Link from 'next/link';
import { readDb } from '@/lib/db';
import {
  Users,
  GraduationCap,
  BookOpenCheck,
  MessageSquareWarning,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  UserPlus,
  FileBarChart2,
} from 'lucide-react';

type Student = { id: number };
type Tutor   = { id: number };

const activities = [
  { icon: UserPlus,      color: 'text-blue-600 bg-blue-50',   text: 'Sinh viên Nguyễn Văn A vừa đăng ký tham gia chương trình.', time: '5 phút trước' },
  { icon: CheckCircle2,  color: 'text-emerald-600 bg-emerald-50', text: 'Tutor Trần Thị B mở buổi tư vấn mới vào 15:00 ngày 31/10.', time: '1 giờ trước' },
  { icon: FileBarChart2, color: 'text-violet-600 bg-violet-50', text: 'Báo cáo tháng 10 đã được cập nhật thành công.', time: '3 giờ trước' },
  { icon: TrendingUp,    color: 'text-amber-600 bg-amber-50',  text: 'Ban quản lý duyệt 3 đề xuất điểm thưởng mới.', time: 'Hôm qua' },
];

const quickLinks = [
  { label: 'Danh sách sinh viên', href: '/students', color: 'hover:border-blue-300 hover:bg-blue-50 group-hover:text-blue-600' },
  { label: 'Danh sách tutor',     href: '/tutors',   color: 'hover:border-violet-300 hover:bg-violet-50 group-hover:text-violet-600' },
  { label: 'Xem báo cáo',         href: '/reports',  color: 'hover:border-emerald-300 hover:bg-emerald-50 group-hover:text-emerald-600' },
  { label: 'Cài đặt hệ thống',    href: '/setting',  color: 'hover:border-slate-300 hover:bg-slate-50 group-hover:text-slate-700' },
];

export default function HomePage() {
  const students = readDb<Student>('students');
  const tutors   = readDb<Tutor>('tutors');

  const stats = [
    { title: 'Tổng sinh viên',        value: students.length, icon: Users,                 color: 'text-blue-600',    bg: 'bg-blue-50',    ring: 'ring-blue-100',    trend: '+8 tháng này',  href: '/students' },
    { title: 'Tổng tutor',            value: tutors.length,   icon: GraduationCap,         color: 'text-violet-600',  bg: 'bg-violet-50',  ring: 'ring-violet-100',  trend: '+2 tháng này',  href: '/tutors'   },
    { title: 'Buổi học hoàn thành',   value: 260,             icon: BookOpenCheck,         color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100', trend: '+24 tuần này',  href: '/reports'  },
    { title: 'Phản hồi mới',          value: 18,              icon: MessageSquareWarning,  color: 'text-amber-600',   bg: 'bg-amber-50',   ring: 'ring-amber-100',   trend: 'Cần xem xét',   href: '/reports'  },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl px-7 py-6 flex items-center justify-between gap-4 shadow-md overflow-hidden relative">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -right-2 bottom-0 w-24 h-24 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-blue-100 text-sm font-medium mb-1">Chào mừng trở lại, Admin</p>
          <h1 className="text-white text-xl font-bold">Tổng quan Tutor Support</h1>
          <p className="text-blue-200 text-xs mt-1">Trường Đại học Bách Khoa TP.HCM — HCMUT</p>
        </div>
        <div className="relative flex-shrink-0 hidden sm:flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2.5">
          <Clock size={15} className="text-blue-100" />
          <span className="text-white text-sm font-semibold">
            {new Date().toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats grid — số liệu thật từ JSON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ title, value, icon: Icon, color, bg, ring, trend, href }) => (
          <Link key={title} href={href}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start justify-between">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ring-4 ${bg} ${ring}`}>
                <Icon size={18} className={color} />
              </span>
              <ArrowRight size={15} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-200 mt-1" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{title}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={12} className="text-emerald-500 flex-shrink-0" />
              <span className="text-xs text-slate-400">{trend}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700">Hoạt động gần đây</h2>
            <span className="text-xs text-slate-400">{activities.length} sự kiện</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {activities.map(({ icon: Icon, color, text, time }) => (
              <li key={text} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors duration-150">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${color}`}>
                  <Icon size={14} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
                  <p className="text-xs text-slate-400 mt-1">{time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-700">Truy cập nhanh</h2>
          </div>
          <ul className="p-4 space-y-2">
            {quickLinks.map(({ label, href, color }) => (
              <li key={href}>
                <Link href={href}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 transition-all duration-200 ${color}`}>
                  <span className="font-medium">{label}</span>
                  <ArrowRight size={14} className="text-slate-300 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
