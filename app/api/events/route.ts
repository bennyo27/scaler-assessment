import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  const db = await openDb();
  const events = await db.all('SELECT * FROM events');
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const { title, startTime, endTime } = await request.json();
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO events (title, startTime, endTime) VALUES (?, ?, ?)',
    title,
    startTime,
    endTime
  );

  return NextResponse.json({ id: result.lastID, title, startTime, endTime });
}
