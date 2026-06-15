import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import PublicWebinar from '@/models/PublicWebinar';

const MEETING_URL_RE =
  /^https:\/\/(meet\.google\.com\/|([a-z0-9-]+\.)?zoom\.us\/(j|wc)\/|teams\.microsoft\.com\/l\/meetup-join\/|teams\.live\.com\/meet\/)/i;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  if (body.meetingUrl !== undefined && !MEETING_URL_RE.test(body.meetingUrl)) {
    return NextResponse.json(
      { success: false, error: 'Only Google Meet, Zoom, or Microsoft Teams links are allowed' },
      { status: 400 }
    );
  }

  await connectDB();
  const webinar = await PublicWebinar.findByIdAndUpdate(
    id,
    { ...body, ...(body.date ? { date: new Date(body.date) } : {}) },
    { returnDocument: 'after', runValidators: true }
  );

  if (!webinar) {
    return NextResponse.json({ success: false, error: 'Webinar not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: webinar });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  await connectDB();
  const webinar = await PublicWebinar.findByIdAndDelete(id);

  if (!webinar) {
    return NextResponse.json({ success: false, error: 'Webinar not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Webinar deleted' });
}
