'use client';

import { useState } from 'react';

export default function TutorsPage() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [tutors, setTutors] = useState([
    { id: 1, name: 'Nguyễn Văn C', field: 'Toán', email: 'c@hcmut.edu.vn' },
    { id: 2, name: 'Trần Thị D', field: 'Anh văn', email: 'd@hcmut.edu.vn' },
  ]);

  // Luồng thay thế: tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = tutors.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
    if (result.length === 0) {
      // Ngoại lệ E1
      setError('Tài khoản không tồn tại.');
    } else {
      setError('');
      alert(`Tìm thấy ${result.length} kết quả.`);
    }
  };

  // Luồng chính
  const handleAdd = () => alert('Thêm Tutor (bước 3)');
  const handleDelete = () => alert('Xóa Tutor (bước 3)');
  const handleUpdate = () => alert('Cập nhật danh sách Tutor (bước 2)');
  const handleSync = () => alert('Đồng bộ dữ liệu về HCMUT_DATACORE thành công!');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">Quản lý Tutor</h1>

      {/* Nút chức năng */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Cập nhật
        </button>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Thêm
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Xóa
        </button>
        <button onClick={handleSync} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Đồng bộ HCMUT_DATACORE
        </button>
      </div>

      {/* Form tìm kiếm */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4 text-blue-700">
        <input
          type="text"
          placeholder="Tìm kiếm tutor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Tìm kiếm
        </button>
      </form>

      {/* Ngoại lệ hiển thị lỗi */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Danh sách tutor */}
      <table className="w-full border text-blue-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Tên Tutor</th>
            <th className="p-2 border">Môn dạy</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="p-2 border">{t.name}</td>
              <td className="p-2 border">{t.field}</td>
              <td className="p-2 border">{t.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
