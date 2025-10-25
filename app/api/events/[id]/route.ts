import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { title, startTime, endTime } = await request.json();
  const { id } = await params; // Unwrap the Promise
  const db = await openDb();
  
  await db.run(
    'UPDATE events SET title = ?, startTime = ?, endTime = ? WHERE id = ?',
    title,
    startTime,
    endTime,
    id
  );
  
  return NextResponse.json({ id, title, startTime, endTime });
}

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Unwrap the Promise
  const db = await openDb();
  
  await db.run('DELETE FROM events WHERE id = ?', id);
  
  return NextResponse.json({ message: 'Event deleted' });
}
