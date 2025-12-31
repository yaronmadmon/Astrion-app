import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data", "apps");

export async function listApps() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const files = await fs.readdir(DATA_DIR);
  return files.map((f) => ({ id: f.replace(".json", "") }));
}

export async function getApp(id: string) {
  try {
    const file = path.join(DATA_DIR, `${id}.json`);
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function createApp(name: string) {
  const id = crypto.randomUUID();
  const app = { id, name, createdAt: Date.now() };

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR, `${id}.json`),
    JSON.stringify(app, null, 2)
  );

  return app;
}
