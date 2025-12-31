import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const APPS_DIR = path.join(process.cwd(), 'data/apps');

export async function GET() {
  await fs.mkdir(APPS_DIR, { recursive: true });
  const files = await fs.readdir(APPS_DIR);
  return NextResponse.json(files.map(f => f.replace('.json', '')));
}

export async function POST() {
  const id = randomUUID();
  const filePath = path.join(APPS_DIR, `${id}.json`);

  await fs.writeFile(
    filePath,
    JSON.stringify({ id, name: 'New App', createdAt: new Date() }, null, 2)
  );

  return NextResponse.json({ id }, { status: 201 });
}
