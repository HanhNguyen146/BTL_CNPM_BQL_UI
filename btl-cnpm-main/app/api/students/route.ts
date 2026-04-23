import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

type Student = { id: number; name: string; mssv: string; program: string };

export function GET() {
  const students = readDb<Student>('students');
  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Omit<Student, 'id'>;
  const students = readDb<Student>('students');
  const newStudent: Student = { id: Date.now(), ...body };
  writeDb('students', [...students, newStudent]);
  return NextResponse.json(newStudent, { status: 201 });
}
