import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const filePath = path.join(process.cwd(), 'data/apps', `${id}.json`);

  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(raw));
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    throw err;
  }
}
