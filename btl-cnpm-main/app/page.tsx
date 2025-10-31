'use client';

export default function HomePage() {
  const summary = [
    { title: "Tổng sinh viên", value: 120, color: "bg-blue-100 text-blue-700" },
    { title: "Tổng tutor", value: 35, color: "bg-green-100 text-green-700" },
    { title: "Buổi học đã hoàn thành", value: 260, color: "bg-yellow-100 text-yellow-700" },
    { title: "Phản hồi mới", value: 18, color: "bg-red-100 text-red-700" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-blue-700">Tổng quan chương trình Tutor Support</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item) => (
          <div
            key={item.title}
            className={`p-4 rounded-lg shadow-sm border ${item.color}`}
          >
            <h2 className="text-lg font-medium">{item.title}</h2>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Sinh viên Nguyễn Văn A vừa đăng ký tham gia chương trình.</li>
          <li>Tutor Trần Thị B mở buổi tư vấn mới vào 15:00 ngày 31/10.</li>
          <li>Báo cáo tháng 10 đã được cập nhật thành công.</li>
          <li>Ban quản lý duyệt 3 đề xuất điểm thưởng mới.</li>
        </ul>
      </div>
    </div>
  );
}
