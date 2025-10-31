export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Cài đặt hệ thống</h1>
      <p className="mt-2 text-gray-700">
        Chọn mục cần điều chỉnh:
      </p>

      <ul className="list-disc list-inside mt-4 space-y-2">
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Thay đổi ngôn ngữ
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Cập nhật thông tin người dùng
          </a>
        </li>
      </ul>
    </div>
  );
}
