import Image from 'next/image';
import {
  Globe,
  UserCog,
  Bell,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

const settingGroups = [
  {
    group: 'Tài khoản',
    items: [
      {
        icon: UserCog,
        label: 'Cập nhật thông tin người dùng',
        desc: 'Chỉnh sửa tên, email, chức vụ của tài khoản quản trị.',
        color: 'text-blue-600 bg-blue-50',
      },
      {
        icon: ShieldCheck,
        label: 'Đổi mật khẩu',
        desc: 'Cập nhật mật khẩu đăng nhập của bạn.',
        color: 'text-violet-600 bg-violet-50',
      },
    ],
  },
  {
    group: 'Hệ thống',
    items: [
      {
        icon: Globe,
        label: 'Thay đổi ngôn ngữ',
        desc: 'Chọn ngôn ngữ hiển thị cho toàn hệ thống.',
        color: 'text-emerald-600 bg-emerald-50',
      },
      {
        icon: Bell,
        label: 'Tuỳ chọn thông báo',
        desc: 'Quản lý các loại thông báo bạn muốn nhận.',
        color: 'text-amber-600 bg-amber-50',
      },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Cài đặt hệ thống</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Quản lý tài khoản và tuỳ chỉnh hệ thống theo nhu cầu.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-200 shadow-sm flex-shrink-0">
          <Image
            src="/admin_avatar.jpg"
            alt="Admin Avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-slate-800">Admin</p>
          <p className="text-sm text-slate-500">Quản trị viên hệ thống</p>
          <p className="text-xs text-slate-400 mt-0.5">admin@hcmut.edu.vn</p>
        </div>
        <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-slate-200 bg-white flex-shrink-0">
          <Image
            src="/bklogo_transparent.png"
            alt="HCMUT Logo"
            fill
            className="object-contain p-1"
          />
        </div>
      </div>

      {/* Setting groups */}
      {settingGroups.map(({ group, items }) => (
        <div key={group} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {group}
            </p>
          </div>

          <ul className="divide-y divide-slate-100">
            {items.map(({ icon: Icon, label, desc, color }) => (
              <li key={label}>
                <button
                  type="button"
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors duration-150 group"
                >
                  <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={17} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-150">
                      {label}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5 truncate">
                      {desc}
                    </span>
                  </span>
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-150"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
