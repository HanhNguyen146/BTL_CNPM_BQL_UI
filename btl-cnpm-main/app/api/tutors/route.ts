import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

type Tutor = { id: number; name: string; field: string; email: string };

export function GET() {
  const tutors = readDb<Tutor>('tutors');
  return NextResponse.json(tutors);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Omit<Tutor, 'id'>;
  const tutors = readDb<Tutor>('tutors');
  const newTutor: Tutor = { id: Date.now(), ...body };
  writeDb('tutors', [...tutors, newTutor]);
  return NextResponse.json(newTutor, { status: 201 });
}
