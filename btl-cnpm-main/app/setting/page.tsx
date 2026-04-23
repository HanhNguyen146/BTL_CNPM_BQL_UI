'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  UserCog, ShieldCheck, ChevronRight,
  X, CheckCircle2, Loader2, Eye, EyeOff,
} from 'lucide-react';

type Panel = 'profile' | 'password' | null;

function Toast({ text, onClose }: Readonly<{ text: string; onClose: () => void }>) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium bg-emerald-50 border-emerald-200 text-emerald-700">
      <CheckCircle2 size={16} className="flex-shrink-0" />
      <span className="flex-1">{text}</span>
      <button type="button" onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
}


export default function SettingsPage() {
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [toast, setToast]             = useState<string | null>(null);
  const [saving, setSaving]           = useState(false);

  // Profile state
  const [profile, setProfile] = useState({ name: 'Admin', email: 'admin@hcmut.edu.vn', role: 'Quản trị viên hệ thống' });
  const [profileForm, setProfileForm] = useState(profile);

  // Password state
  const [pwForm, setPwForm]   = useState({ current: '', new_: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [showPw, setShowPw]   = useState({ current: false, new_: false, confirm: false });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const togglePanel = (panel: Panel) => setActivePanel((prev) => (prev === panel ? null : panel));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setProfile(profileForm);
    setSaving(false);
    setActivePanel(null);
    showToast('Đã cập nhật thông tin tài khoản thành công.');
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    if (!pwForm.current) { setPwError('Vui lòng nhập mật khẩu hiện tại.'); return; }
    if (pwForm.new_.length < 6) { setPwError('Mật khẩu mới phải có ít nhất 6 ký tự.'); return; }
    if (pwForm.new_ === pwForm.current) { setPwError('Mật khẩu mới phải khác mật khẩu hiện tại.'); return; }
    if (pwForm.new_ !== pwForm.confirm) { setPwError('Xác nhận mật khẩu không khớp.'); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setPwForm({ current: '', new_: '', confirm: '' });
    setSaving(false);
    setActivePanel(null);
    showToast('Đã đổi mật khẩu thành công.');
  };

  const settingGroups = [
    {
      group: 'Tài khoản',
      items: [
        {
          id: 'profile' as Panel,
          icon: UserCog,
          label: 'Cập nhật thông tin người dùng',
          desc: 'Chỉnh sửa tên, email, chức vụ của tài khoản quản trị.',
          color: 'text-blue-600 bg-blue-50',
          panel: (
            <form onSubmit={(e) => { void handleSaveProfile(e); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="s-name" className="text-xs font-semibold text-slate-500">Họ và tên</label>
                  <input id="s-name" type="text" value={profileForm.name}
                    onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                    className="px-3 py-2 text-sm text-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="s-email" className="text-xs font-semibold text-slate-500">Email</label>
                  <input id="s-email" type="email" value={profileForm.email}
                    onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
                    className="px-3 py-2 text-sm text-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="s-role" className="text-xs font-semibold text-slate-500">Chức vụ</label>
                  <input id="s-role" type="text" value={profileForm.role}
                    onChange={(e) => setProfileForm((f) => ({ ...f, role: e.target.value }))}
                    className="px-3 py-2 text-sm text-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 active:scale-95 transition-all">
                  {saving ? <Loader2 size={13} className="animate-spin" /> : null}
                  Lưu thay đổi
                </button>
                <button type="button" onClick={() => { setActivePanel(null); setProfileForm(profile); }}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 active:scale-95 transition-all">
                  Huỷ
                </button>
              </div>
            </form>
          ),
        },
        {
          id: 'password' as Panel,
          icon: ShieldCheck,
          label: 'Đổi mật khẩu',
          desc: 'Cập nhật mật khẩu đăng nhập của bạn.',
          color: 'text-violet-600 bg-violet-50',
          panel: (
            <form onSubmit={(e) => { void handleSavePassword(e); }} className="space-y-4">
              {(['current', 'new_', 'confirm'] as const).map((key) => {
                const labels: Record<typeof key, string> = {
                  current: 'Mật khẩu hiện tại',
                  new_:    'Mật khẩu mới',
                  confirm: 'Xác nhận mật khẩu mới',
                };
                return (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label htmlFor={`pw-${key}`} className="text-xs font-semibold text-slate-500">{labels[key]}</label>
                    <div className="relative">
                      <input
                        id={`pw-${key}`}
                        type={showPw[key] ? 'text' : 'password'}
                        value={pwForm[key]}
                        onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full px-3 py-2 pr-10 text-sm text-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                      />
                      <button type="button"
                        onClick={() => setShowPw((p) => ({ ...p, [key]: !p[key] }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {showPw[key] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                );
              })}
              {pwError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{pwError}</p>
              )}
              <div className="flex gap-2">
                <button type="submit" disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-60 active:scale-95 transition-all">
                  {saving ? <Loader2 size={13} className="animate-spin" /> : null}
                  Đổi mật khẩu
                </button>
                <button type="button" onClick={() => { setActivePanel(null); setPwForm({ current: '', new_: '', confirm: '' }); setPwError(''); }}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 active:scale-95 transition-all">
                  Huỷ
                </button>
              </div>
            </form>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Cài đặt hệ thống</h1>
        <p className="text-sm text-slate-500 mt-0.5">Quản lý tài khoản và tuỳ chỉnh hệ thống theo nhu cầu.</p>
      </div>

      {toast && <Toast text={toast} onClose={() => setToast(null)} />}

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-200 shadow-sm flex-shrink-0">
          <Image src="/admin_avatar.jpg" alt="Admin Avatar" fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-slate-800">{profile.name}</p>
          <p className="text-sm text-slate-500">{profile.role}</p>
          <p className="text-xs text-slate-400 mt-0.5">{profile.email}</p>
        </div>
        <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-slate-200 bg-white flex-shrink-0">
          <Image src="/bklogo_transparent.png" alt="HCMUT Logo" fill className="object-contain p-1" />
        </div>
      </div>

      {/* Setting groups */}
      {settingGroups.map(({ group, items }) => (
        <div key={group} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{group}</p>
          </div>
          <ul className="divide-y divide-slate-100">
            {items.map(({ id, icon: Icon, label, desc, color, panel }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => togglePanel(id)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors duration-150 group"
                >
                  <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={17} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-150">
                      {label}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5">{desc}</span>
                  </span>
                  <ChevronRight
                    size={16}
                    className={`flex-shrink-0 text-slate-300 transition-all duration-200 ${
                      activePanel === id ? 'rotate-90 text-blue-400' : 'group-hover:text-blue-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>

                {/* Expandable panel */}
                <div className={`overflow-hidden transition-all duration-300 ${activePanel === id ? 'max-h-[500px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-5 pt-1 bg-slate-50/60 border-t border-slate-100">
                    {panel}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
