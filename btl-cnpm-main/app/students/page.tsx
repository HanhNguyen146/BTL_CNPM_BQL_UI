'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  RefreshCw,
  Trash2,
  DatabaseZap,
  Users,
  X,
} from 'lucide-react';

type Student = { id: number; name: string; mssv: string; program: string };
type ToastType = 'success' | 'info' | 'error';

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
];

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  return parts[parts.length - 1]?.charAt(0).toUpperCase() ?? '?';
}

function Toast({
  type, text, onClose,
}: Readonly<{ type: ToastType; text: string; onClose: () => void }>) {
  const styles: Record<ToastType, string> = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    info:    'bg-blue-50 border-blue-200 text-blue-700',
    error:   'bg-red-50 border-red-200 text-red-700',
  };
  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${styles[type]}`}>
      <span>{text}</span>
      <button type="button" onClick={onClose} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [toast, setToast]       = useState<{ type: ToastType; text: string } | null>(null);

  const showToast = (type: ToastType, text: string) => setToast({ type, text });

  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch('/api/students');
    const data = (await res.json()) as Student[];
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => { void fetchStudents(); }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.mssv.includes(search),
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filtered.length === 0) showToast('error', 'Không tìm thấy sinh viên phù hợp.');
    else showToast('info', `Tìm thấy ${filtered.length} sinh viên.`);
  };

  const handleDelete = async () => {
    if (!selected) { showToast('error', 'Vui lòng chọn sinh viên cần xóa.'); return; }
    await fetch(`/api/students/${selected}`, { method: 'DELETE' });
    setStudents((prev) => prev.filter((s) => s.id !== selected));
    setSelected(null);
    showToast('success', 'Đã xóa sinh viên thành công.');
  };


  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Quản lý Sinh viên</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Danh sách sinh viên tham gia chương trình Tutor Support.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
          <Users size={15} className="text-blue-500" />
          <span className="text-sm font-semibold text-blue-700">{students.length} sinh viên</span>
        </div>
      </div>

      {toast && <Toast type={toast.type} text={toast.text} onClose={() => setToast(null)} />}

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-48">
            <label htmlFor="student-search" className="sr-only">Tìm kiếm sinh viên</label>
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="student-search"
                type="text"
                placeholder="Tìm theo tên hoặc MSSV..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button type="submit" className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm">
              Tìm
            </button>
          </form>

          <div className="w-px h-6 bg-slate-200 hidden sm:block" />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { void fetchStudents(); showToast('info', 'Đã làm mới danh sách.'); }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm"
            >
              <RefreshCw size={14} />
              Cập nhật
            </button>
            <button
              type="button"
              onClick={() => { void handleDelete(); }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-sm"
            >
              <Trash2 size={14} />
              Xóa
            </button>
            <button
              type="button"
              onClick={() => { void fetchStudents(); showToast('success', 'Đồng bộ HCMUT_DATACORE thành công!'); }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-sm"
            >
              <DatabaseZap size={14} />
              Đồng bộ
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-12">#</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Họ và tên</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">MSSV</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Chương trình</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-5 py-4">
                      <div className="h-4 bg-slate-100 rounded-full animate-pulse w-full" />
                    </td>
                  </tr>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((s, idx) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelected(s.id === selected ? null : s.id)}
                    className={`cursor-pointer transition-colors duration-150 group ${
                      selected === s.id
                        ? 'bg-blue-50 ring-1 ring-inset ring-blue-200'
                        : 'hover:bg-blue-50/40'
                    }`}
                  >
                    <td className="px-5 py-3.5 text-slate-400 text-xs font-medium">{idx + 1}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarColors[idx % avatarColors.length]}`}>
                          {getInitials(s.name)}
                        </span>
                        <span className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors duration-150">
                          {s.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md text-xs">{s.mssv}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {s.program}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center">
                    <p className="text-slate-400 text-sm">Không tìm thấy sinh viên phù hợp.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Hiển thị <span className="font-semibold text-slate-600">{filtered.length}</span> /{' '}
              <span className="font-semibold text-slate-600">{students.length}</span> sinh viên
            </p>
            {selected && (
              <p className="text-xs text-blue-600 font-medium">
                Đang chọn: {students.find((s) => s.id === selected)?.name}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
