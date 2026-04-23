import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

type Student = { id: number };
type Tutor   = { id: number };

export function GET() {
  const students = readDb<Student>('students');
  const tutors   = readDb<Tutor>('tutors');

  return NextResponse.json({
    totalStudents:    students.length,
    totalTutors:      tutors.length,
    sessionsCompleted: 260,
    newFeedback:       18,
  });
}
