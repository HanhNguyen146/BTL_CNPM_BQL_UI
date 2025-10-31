'use client';

import { useState } from 'react';

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', mssv: '2310001', program: 'Tutor Support' },
    { id: 2, name: 'Trần Thị B', mssv: '2310002', program: 'Tutor Support' },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tìm kiếm: ${search}`);
  };

  const handleAdd = () => alert('Chức năng thêm sinh viên');
  const handleDelete = () => alert('Chức năng xóa sinh viên');
  const handleUpdate = () => alert('Cập nhật và đồng bộ HCMUT_DATACORE');
  const handleSync = () => alert('Đồng bộ dữ liệu về HCMUT_DATACORE thành công!');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">Quản lý sinh viên</h1>

      {/* Thanh chức năng */}
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
          placeholder="Tìm kiếm sinh viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Tìm kiếm
        </button>
      </form>

      {/* Danh sách sinh viên */}
      <table className="w-full border text-blue-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">MSSV</th>
            <th className="p-2 border">Họ và tên</th>
            <th className="p-2 border">Chương trình</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="p-2 border">{s.mssv}</td>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.program}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
