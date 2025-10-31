'use client';

import { useState } from 'react';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('');
  const [showChartOptions, setShowChartOptions] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [message, setMessage] = useState('');

  // Luồng chính
  const handleViewReport = () => {
    if (!selectedReport) {
      setMessage('Vui lòng chọn chương trình để xem báo cáo.');
      return;
    }
    setMessage(`Hệ thống đã trả về file báo cáo cho ${selectedReport}.`);
  };

  const handleDownload = () => {
    if (!selectedReport) {
      setMessage('Vui lòng chọn chương trình trước khi tải.');
      return;
    }
    const confirm = window.confirm('Xác nhận định dạng tải về (PDF)?');
    if (confirm) {
      setMessage(`Hệ thống đang tải báo cáo ${selectedReport}...`);
      setTimeout(() => {
        setMessage(`Đã tải thành công file báo cáo ${selectedReport}.`);
      }, 1000);
    }
  };

  // Luồng thay thế: yêu cầu biểu đồ phân tích
  const handleAnalyze = () => {
    setShowChartOptions(true);
    setMessage('Đang phân tích và tạo biểu đồ...');
    setTimeout(() => {
      setMessage('Hệ thống trả kết quả biểu đồ phân tích thành công!');
    }, 1000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">Xem và Tải Báo Cáo</h1>

      {/* Chọn chương trình */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 font-medium">
          Chọn chương trình:
        </label>
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className="border p-2 rounded w-64 text-gray-900"
        >
          <option value="">-- Chọn chương trình --</option>
          <option value="Tutor Support System">Tutor Support System</option>
        </select>
      </div>

      {/* Nút hành động */}
      <div className="flex flex-wrap gap-3 mb-4 text-blue-700">
        <button
          onClick={handleViewReport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Xem báo cáo
        </button>

        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Tải về
        </button>

        <button
          onClick={handleAnalyze}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Phân tích dữ liệu
        </button>
      </div>

      {/* Tùy chọn biểu đồ (A1) */}
      {showChartOptions && (
        <div className="border rounded p-4 mb-4 text-gray-900">
          <h2 className="font-medium mb-2 text-gray-900">Chọn dạng biểu đồ:</h2>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="bar">Cột</option>
            <option value="line">Đường</option>
            <option value="pie">Tròn</option>
          </select>
          <p className="mt-2 text-gray-600 italic">
            Hệ thống sẽ hiển thị biểu đồ {chartType} sau khi xử lý.
          </p>
        </div>
      )}

      {/* Khu vực thông báo */}
      {message && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded">
          {message}
        </div>
      )}
    </div>
  );
}
