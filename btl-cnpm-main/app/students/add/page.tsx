'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type ToastType = 'success' | 'error';

const emptyForm = { name: '', mssv: '', program: 'Tutor Support' };

export default function AddStudentPage() {
  const router = useRouter();
  const [form, setForm]             = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]           = useState<{ type: ToastType; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mssv.trim()) {
      setToast({ type: 'error', text: 'Vui lòng điền đầy đủ Họ tên và MSSV.' });
      return;
    }
    setSubmitting(true);
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/students');
  };

  return (
    <div className="space-y-5 max-w-lg">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/students"
          className="flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-150">
          <ArrowLeft size={15} className="text-slate-500" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Thêm sinh viên</h1>
          <p className="text-sm text-slate-500 mt-0.5">Điền thông tin sinh viên mới vào chương trình.</p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`px-4 py-3 rounded-xl border text-sm font-medium ${
          toast.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-emerald-50 border-emerald-200 text-emerald-700'
        }`}>
          {toast.text}
        </div>
      )}

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-blue-50 ring-4 ring-blue-100 flex items-center justify-center">
            <UserPlus size={15} className="text-blue-600" />
          </span>
          <h2 className="text-sm font-bold text-slate-700">Thông tin sinh viên</h2>
        </div>

        <form onSubmit={(e) => { void handleSubmit(e); }} className="px-6 py-5 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Họ và tên <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nguyễn Văn A"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="px-3.5 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="mssv" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              MSSV <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <input
              id="mssv"
              type="text"
              placeholder="2310XXX"
              value={form.mssv}
              onChange={(e) => setForm((f) => ({ ...f, mssv: e.target.value }))}
              className="px-3.5 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="program" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Chương trình
            </label>
            <input
              id="program"
              type="text"
              value={form.program}
              onChange={(e) => setForm((f) => ({ ...f, program: e.target.value }))}
              className="px-3.5 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 active:scale-95 transition-all duration-200 shadow-sm"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
              {submitting ? 'Đang lưu...' : 'Thêm sinh viên'}
            </button>
            <Link href="/students"
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 active:scale-95 transition-all duration-200">
              Huỷ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
