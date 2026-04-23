import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

type Student = { id: number; name: string; mssv: string; program: string };
type Params = Promise<{ id: string }>;

export async function DELETE(_req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const students = readDb<Student>('students');
  const updated = students.filter((s) => s.id !== Number(id));
  if (updated.length === students.length) {
    return NextResponse.json({ error: 'Không tìm thấy sinh viên.' }, { status: 404 });
  }
  writeDb('students', updated);
  return NextResponse.json({ success: true });
}
