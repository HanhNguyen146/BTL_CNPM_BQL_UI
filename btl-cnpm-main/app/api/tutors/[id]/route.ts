import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

type Tutor = { id: number; name: string; field: string; email: string };
type Params = Promise<{ id: string }>;

export async function DELETE(_req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const tutors = readDb<Tutor>('tutors');
  const updated = tutors.filter((t) => t.id !== Number(id));
  if (updated.length === tutors.length) {
    return NextResponse.json({ error: 'Không tìm thấy tutor.' }, { status: 404 });
  }
  writeDb('tutors', updated);
  return NextResponse.json({ success: true });
}
