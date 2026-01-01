import { NextResponse } from 'next/server';
import { createAppRecord, listAppIds } from '@/lib/storage/appRecords';

export const runtime = "nodejs";

export async function GET() {
  const ids = await listAppIds();
  return NextResponse.json(ids);
}

export async function POST() {
  const record = await createAppRecord({
    prompt: "New App",
    config: {
      name: "New App",
      pages: [{ id: "dashboard", title: "Dashboard", type: "dashboard" }],
    },
    build: {
      mode: "build",
      confidence: 0,
      templateId: "genericApp",
      variables: { appName: "New App" },
    },
  });

  return NextResponse.json({ id: record.id }, { status: 201 });
}
