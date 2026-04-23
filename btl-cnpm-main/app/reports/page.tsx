'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  BarChart2,
  AlertCircle,
  CheckCircle2,
  Info,
  BarChart3,
  TrendingUp,
  PieChart,
  ChevronDown,
  Loader2,
} from 'lucide-react';

type MessageType = 'error' | 'success' | 'info' | 'loading';

const chartTypes = [
  { value: 'bar', label: 'Biểu đồ Cột', icon: BarChart3 },
  { value: 'line', label: 'Biểu đồ Đường', icon: TrendingUp },
  { value: 'pie', label: 'Biểu đồ Tròn', icon: PieChart },
];

const programs = ['Tutor Support System'];

function FeedbackBanner({
  type,
  text,
}: Readonly<{
  type: MessageType;
  text: string;
}>) {
  const styles: Record<MessageType, { wrapper: string; icon: React.ElementType }> = {
    error: {
      wrapper: 'bg-red-50 border-red-200 text-red-700',
      icon: AlertCircle,
    },
    success: {
      wrapper: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      icon: CheckCircle2,
    },
    info: {
      wrapper: 'bg-blue-50 border-blue-200 text-blue-700',
      icon: Info,
    },
    loading: {
      wrapper: 'bg-slate-50 border-slate-200 text-slate-600',
      icon: Loader2,
    },
  };

  const { wrapper, icon: Icon } = styles[type];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${wrapper} animate-in fade-in slide-in-from-top-1 duration-200`}
    >
      <Icon size={16} className={type === 'loading' ? 'animate-spin flex-shrink-0' : 'flex-shrink-0'} />
      {text}
    </div>
  );
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('');
  const [showChartOptions, setShowChartOptions] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [feedback, setFeedback] = useState<{ type: MessageType; text: string } | null>(null);
  const [awaitingDownloadConfirm, setAwaitingDownloadConfirm] = useState(false);

  const setMsg = (type: MessageType, text: string) => setFeedback({ type, text });

  const handleViewReport = () => {
    if (!selectedReport) {
      setMsg('error', 'Vui lòng chọn chương trình để xem báo cáo.');
      return;
    }
    setMsg('success', `Hệ thống đã trả về file báo cáo cho ${selectedReport}.`);
  };

  const handleDownload = () => {
    if (!selectedReport) {
      setMsg('error', 'Vui lòng chọn chương trình trước khi tải.');
      return;
    }
    setFeedback(null);
    setAwaitingDownloadConfirm(true);
  };

  const handleConfirmDownload = () => {
    setAwaitingDownloadConfirm(false);
    setMsg('loading', `Đang tải báo cáo ${selectedReport}...`);
    setTimeout(() => {
      setMsg('success', `Đã tải thành công file báo cáo ${selectedReport}.`);
    }, 1200);
  };

  const handleAnalyze = () => {
    setShowChartOptions(true);
    setMsg('loading', 'Đang phân tích và tạo biểu đồ...');
    setTimeout(() => {
      setMsg('success', 'Hệ thống trả kết quả biểu đồ phân tích thành công!');
    }, 1200);
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
        {/* Card header */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">Chọn chương trình</h2>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Program selector */}
          <div className="relative">
            <label htmlFor="program-select" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Chương trình
            </label>
            <div className="relative">
              <select
                id="program-select"
                value={selectedReport}
                onChange={(e) => {
                  setSelectedReport(e.target.value);
                  setFeedback(null);
                }}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 cursor-pointer"
              >
                <option value="">— Chọn chương trình —</option>
                {programs.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div>
            <p className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Thao tác
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleViewReport}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FileText size={15} />
                Xem báo cáo
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Download size={15} />
                Tải về (PDF)
              </button>

              <button
                onClick={handleAnalyze}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <BarChart2 size={15} />
                Phân tích dữ liệu
              </button>
            </div>
          </div>

          {/* Inline download confirm */}
          {awaitingDownloadConfirm && (
            <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="text-amber-800 font-medium">
                Xác nhận tải về định dạng <strong>PDF</strong> cho <em>{selectedReport}</em>?
              </span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={handleConfirmDownload}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 active:scale-95 transition-all duration-150"
                >
                  Xác nhận
                </button>
                <button
                  onClick={() => setAwaitingDownloadConfirm(false)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 active:scale-95 transition-all duration-150"
                >
                  Huỷ
                </button>
              </div>
            </div>
          )}

          {/* Feedback banner */}
          {feedback && !awaitingDownloadConfirm && (
            <FeedbackBanner type={feedback.type} text={feedback.text} />
          )}
        </div>
      </div>

      {/* Chart options panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showChartOptions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">
              Tùy chọn biểu đồ phân tích
            </h2>
          </div>

          <div className="px-6 py-5">
            <p className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Dạng biểu đồ
            </p>
            <div className="grid grid-cols-3 gap-3">
              {chartTypes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setChartType(value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                    chartType === value
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <Icon
                    size={22}
                    className={chartType === value ? 'text-blue-600' : 'text-slate-400'}
                  />
                  {label}
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
              Hệ thống sẽ hiển thị{' '}
              <span className="font-semibold text-slate-700">
                {chartTypes.find((c) => c.value === chartType)?.label}
              </span>{' '}
              sau khi xử lý xong dữ liệu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
