'use client';

import { useState } from 'react';
import {
  FileText, Download, BarChart2, AlertCircle, CheckCircle2, Info,
  BarChart3, TrendingUp, PieChart, ChevronDown, Loader2,
  Users, GraduationCap, BookOpenCheck, MessageSquareWarning,
} from 'lucide-react';

type MessageType = 'error' | 'success' | 'info' | 'loading';
type Stats = { totalStudents: number; totalTutors: number; sessionsCompleted: number; newFeedback: number };

const chartTypes = [
  { value: 'bar',  label: 'Biểu đồ Cột',    icon: BarChart3 },
  { value: 'line', label: 'Biểu đồ Đường',  icon: TrendingUp },
  { value: 'pie',  label: 'Biểu đồ Tròn',   icon: PieChart },
];

const programs = ['Tutor Support System'];

function FeedbackBanner({ type, text }: Readonly<{ type: MessageType; text: string }>) {
  const styles: Record<MessageType, { wrapper: string; icon: React.ElementType }> = {
    error:   { wrapper: 'bg-red-50 border-red-200 text-red-700',       icon: AlertCircle },
    success: { wrapper: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: CheckCircle2 },
    info:    { wrapper: 'bg-blue-50 border-blue-200 text-blue-700',    icon: Info },
    loading: { wrapper: 'bg-slate-50 border-slate-200 text-slate-600', icon: Loader2 },
  };
  const { wrapper, icon: Icon } = styles[type];
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${wrapper}`}>
      <Icon size={16} className={type === 'loading' ? 'animate-spin flex-shrink-0' : 'flex-shrink-0'} />
      {text}
    </div>
  );
}

function BarChartViz({ stats }: Readonly<{ stats: Stats }>) {
  const bars = [
    { label: 'Sinh viên', value: stats.totalStudents,     color: 'bg-blue-500' },
    { label: 'Tutor',     value: stats.totalTutors,       color: 'bg-violet-500' },
    { label: 'Buổi học',  value: stats.sessionsCompleted, color: 'bg-emerald-500' },
    { label: 'Phản hồi',  value: stats.newFeedback,       color: 'bg-amber-500' },
  ];
  const maxVal = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div className="flex items-end justify-around gap-4 px-4" style={{ height: '152px', paddingBottom: '28px' }}>
      {bars.map(({ label, value, color }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 flex-1">
          <span className="text-xs font-bold text-slate-700">{value}</span>
          <div
            className={`w-full rounded-t-lg ${color} transition-all duration-700`}
            style={{ height: `${Math.max(6, Math.round((value / maxVal) * 96))}px` }}
          />
          <span className="text-xs text-slate-500 text-center leading-tight">{label}</span>
        </div>
      ))}
    </div>
  );
}

function LineChartViz({ stats }: Readonly<{ stats: Stats }>) {
  const W = 340, H = 120, PX = 28, PY = 14;
  const months = ['T8', 'T9', 'T10', 'T11', 'T12'];
  const n = stats.totalStudents;
  const t = stats.totalTutors;
  const sData = [Math.max(1, n - 4), Math.max(1, n - 3), Math.max(1, n - 2), Math.max(1, n - 1), n];
  const tData = [Math.max(1, t - 2), Math.max(1, t - 1), t, t, t];
  const maxV  = Math.max(...sData, ...tData, 1);
  const gx    = (i: number) => PX + (i / (months.length - 1)) * (W - PX * 2);
  const gy    = (v: number) => PY + ((maxV - v) / maxV) * (H - PY * 2);
  const pts   = (arr: number[]) => arr.map((v, i) => `${gx(i).toFixed(1)},${gy(v).toFixed(1)}`).join(' ');

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={PX} y1={gy(maxV * f)} x2={W - PX} y2={gy(maxV * f)}
            stroke="#f1f5f9" strokeWidth="1.5" />
        ))}
        <polyline fill="none" stroke="#3b82f6" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" points={pts(sData)} />
        <polyline fill="none" stroke="#8b5cf6" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" points={pts(tData)} />
        {sData.map((v, i) => (
          <circle key={i} cx={gx(i)} cy={gy(v)} r="3.5" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
        ))}
        {tData.map((v, i) => (
          <circle key={i} cx={gx(i)} cy={gy(v)} r="3.5" fill="#8b5cf6" stroke="white" strokeWidth="1.5" />
        ))}
        {months.map((m, i) => (
          <text key={m} x={gx(i)} y={H + 16} textAnchor="middle" fontSize="10" fill="#94a3b8">{m}</text>
        ))}
      </svg>
      <div className="flex gap-5 justify-center mt-2">
        {[{ label: 'Sinh viên', color: 'bg-blue-500' }, { label: 'Tutor', color: 'bg-violet-500' }].map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className={`w-4 h-1.5 ${color} rounded-full`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function PieChartViz({ stats }: Readonly<{ stats: Stats }>) {
  const CX = 90, CY = 90, R = 72, IR = 38;
  const sliceData = [
    { label: 'Sinh viên', value: stats.totalStudents, color: '#3b82f6' },
    { label: 'Tutor',     value: stats.totalTutors,   color: '#8b5cf6' },
    { label: 'Phản hồi',  value: stats.newFeedback,   color: '#f59e0b' },
  ];
  const total = sliceData.reduce((s, d) => s + d.value, 0) || 1;

  function polar(deg: number, r: number): [number, number] {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
  }

  let cum = 0;
  const paths = sliceData.map(({ value, color, label }) => {
    const deg   = (value / total) * 360;
    const start = cum;
    const end   = cum + deg;
    cum = end;
    const [sx, sy]   = polar(start, R);
    const [ex, ey]   = polar(end,   R);
    const [isx, isy] = polar(start, IR);
    const [iex, iey] = polar(end,   IR);
    const large = deg > 180 ? 1 : 0;
    const d = `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} L ${iex.toFixed(2)} ${iey.toFixed(2)} A ${IR} ${IR} 0 ${large} 0 ${isx.toFixed(2)} ${isy.toFixed(2)} Z`;
    return { d, color, label, value };
  });

  return (
    <div className="flex items-center gap-8 flex-wrap px-2">
      <svg viewBox="0 0 180 180" className="w-36 h-36 flex-shrink-0">
        {paths.map(({ d, color }) => (
          <path key={color} d={d} fill={color} stroke="white" strokeWidth="2" />
        ))}
      </svg>
      <ul className="space-y-2.5">
        {paths.map(({ color, label, value }) => (
          <li key={label} className="flex items-center gap-2.5 text-sm text-slate-700">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="font-medium">{label}</span>
            <span className="text-slate-400 text-xs">({value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport]         = useState('');
  const [showChartOptions, setShowChartOptions]     = useState(false);
  const [chartType, setChartType]                   = useState('bar');
  const [feedback, setFeedback]                     = useState<{ type: MessageType; text: string } | null>(null);
  const [awaitingDownloadConfirm, setAwaitingDownloadConfirm] = useState(false);
  const [stats, setStats]                           = useState<Stats | null>(null);
  const [showReport, setShowReport]                 = useState(false);

  const setMsg = (type: MessageType, text: string) => setFeedback({ type, text });

  const fetchStats = async (): Promise<Stats> => {
    const res  = await fetch('/api/stats');
    const data = (await res.json()) as Stats;
    setStats(data);
    return data;
  };

  const handleViewReport = async () => {
    if (!selectedReport) { setMsg('error', 'Vui lòng chọn chương trình để xem báo cáo.'); return; }
    setMsg('loading', 'Đang tải dữ liệu báo cáo...');
    await fetchStats();
    setShowReport(true);
    setMsg('success', `Đã tải báo cáo chương trình ${selectedReport}.`);
  };

  const handleDownload = () => {
    if (!selectedReport) { setMsg('error', 'Vui lòng chọn chương trình trước khi tải.'); return; }
    setFeedback(null);
    setAwaitingDownloadConfirm(true);
  };

  const handleConfirmDownload = async () => {
    setAwaitingDownloadConfirm(false);
    setMsg('loading', 'Đang tạo file CSV...');
    const s = stats ?? await fetchStats();
    const date = new Date().toLocaleDateString('vi-VN');
    const csv = [
      `Báo cáo chương trình: ${selectedReport}`,
      `Ngày xuất: ${date}`,
      '',
      'Chỉ số,Giá trị',
      `Tổng sinh viên,${s.totalStudents}`,
      `Tổng tutor,${s.totalTutors}`,
      `Buổi học hoàn thành,${s.sessionsCompleted}`,
      `Phản hồi mới,${s.newFeedback}`,
    ].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `baocao-${selectedReport.replace(/\s+/g, '_')}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg('success', 'Đã tải xuống file báo cáo CSV thành công.');
  };

  const handleAnalyze = async () => {
    if (!selectedReport) { setMsg('error', 'Vui lòng chọn chương trình để phân tích.'); return; }
    setMsg('loading', 'Đang phân tích dữ liệu...');
    if (!stats) await fetchStats();
    setTimeout(() => {
      setShowChartOptions(true);
      setMsg('success', 'Phân tích hoàn tất. Chọn dạng biểu đồ bên dưới để hiển thị.');
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Xem và Tải Báo Cáo</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Chọn chương trình, xem báo cáo hoặc phân tích dữ liệu trực quan.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">Chọn chương trình</h2>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Program selector */}
          <div>
            <label htmlFor="program-select" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Chương trình
            </label>
            <div className="relative">
              <select
                id="program-select"
                value={selectedReport}
                onChange={(e) => { setSelectedReport(e.target.value); setFeedback(null); setShowReport(false); }}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="">— Chọn chương trình —</option>
                {programs.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Action buttons */}
          <div>
            <p className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Thao tác</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => { void handleViewReport(); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <FileText size={15} />
                Xem báo cáo
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <Download size={15} />
                Tải về (CSV)
              </button>
              <button
                type="button"
                onClick={() => { void handleAnalyze(); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <BarChart2 size={15} />
                Phân tích dữ liệu
              </button>
            </div>
          </div>

          {/* Inline download confirm */}
          {awaitingDownloadConfirm && (
            <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50 text-sm">
              <span className="text-amber-800 font-medium">
                Xác nhận tải về định dạng <strong>CSV</strong> cho <em>{selectedReport}</em>?
              </span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => { void handleConfirmDownload(); }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 active:scale-95 transition-all duration-150"
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  onClick={() => setAwaitingDownloadConfirm(false)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 active:scale-95 transition-all duration-150"
                >
                  Huỷ
                </button>
              </div>
            </div>
          )}

          {feedback && !awaitingDownloadConfirm && (
            <FeedbackBanner type={feedback.type} text={feedback.text} />
          )}
        </div>
      </div>

      {/* Report data panel */}
      {showReport && stats && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Báo cáo: {selectedReport}</h2>
            <span className="text-xs text-slate-400">{new Date().toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Tổng sinh viên',       value: stats.totalStudents,     icon: Users,                color: 'text-blue-600',    bg: 'bg-blue-50',    ring: 'ring-blue-100' },
              { label: 'Tổng tutor',            value: stats.totalTutors,       icon: GraduationCap,        color: 'text-violet-600',  bg: 'bg-violet-50',  ring: 'ring-violet-100' },
              { label: 'Buổi học hoàn thành',   value: stats.sessionsCompleted, icon: BookOpenCheck,        color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
              { label: 'Phản hồi mới',          value: stats.newFeedback,       icon: MessageSquareWarning, color: 'text-amber-600',   bg: 'bg-amber-50',   ring: 'ring-amber-100' },
            ].map(({ label, value, icon: Icon, color, bg, ring }) => (
              <div key={label} className="flex flex-col gap-2.5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center ring-2 ${bg} ${ring}`}>
                  <Icon size={15} className={color} />
                </span>
                <span className="text-2xl font-bold text-slate-800">{value}</span>
                <span className="text-xs text-slate-500 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart options panel */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showChartOptions ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Phân tích dữ liệu</h2>
          </div>
          <div className="px-6 py-5 space-y-5">
            {/* Chart type selector */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Dạng biểu đồ</p>
              <div className="grid grid-cols-3 gap-3">
                {chartTypes.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setChartType(value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                      chartType === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <Icon size={22} className={chartType === value ? 'text-blue-600' : 'text-slate-400'} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart render area */}
            {stats && (
              <div className="border border-slate-100 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500 mb-4 text-center uppercase tracking-wide">
                  {chartTypes.find((c) => c.value === chartType)?.label} — {selectedReport}
                </p>
                {chartType === 'bar'  && <BarChartViz stats={stats} />}
                {chartType === 'line' && <LineChartViz stats={stats} />}
                {chartType === 'pie'  && <PieChartViz stats={stats} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
