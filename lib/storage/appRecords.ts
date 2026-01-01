import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { AppConfig } from "@/lib/contracts/appConfig";
import type { AppRecord, BuildCommand } from "@/types/appRecord";

const APPS_DIR = path.join(process.cwd(), "data", "apps");

async function ensureDir() {
  await fs.mkdir(APPS_DIR, { recursive: true });
}

function isoNow() {
  return new Date().toISOString();
}

async function tryWriteToAirtable(record: AppRecord): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return;

  const tableName = process.env.AIRTABLE_TABLE_APPS || "Apps";

  try {
    // Avoid hard-failing builds when Airtable isn't reachable.
    const Airtable = (await import("airtable")).default;
    const base = new Airtable({ apiKey }).base(baseId);

    await base(tableName).create({
      appId: record.id,
      prompt: record.prompt,
      configJson: JSON.stringify(record.config),
      buildJson: JSON.stringify(record.build),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt ?? record.createdAt,
    });
  } catch {
    // Best-effort only; local persistence is the fallback.
  }
}

export async function listAppIds(): Promise<string[]> {
  await ensureDir();
  const files = await fs.readdir(APPS_DIR);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export async function getAppRecord(id: string): Promise<AppRecord | null> {
  await ensureDir();
  const filePath = path.join(APPS_DIR, `${id}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as AppRecord;
  } catch (err: any) {
    if (err?.code === "ENOENT") return null;
    throw err;
  }
}

export type CreateAppRecordInput = {
  prompt: string;
  config: AppConfig;
  build: BuildCommand;
};

export async function createAppRecord(input: CreateAppRecordInput): Promise<AppRecord> {
  await ensureDir();
  const id = randomUUID();

  const record: AppRecord = {
    id,
    prompt: input.prompt,
    config: input.config,
    createdAt: isoNow(),
    updatedAt: isoNow(),
    build: input.build,
  };

  await fs.writeFile(
    path.join(APPS_DIR, `${id}.json`),
    JSON.stringify(record, null, 2),
    "utf-8"
  );

  // Best-effort Airtable persistence (if configured).
  await tryWriteToAirtable(record);

  return record;
}

export async function updateAppRecord(
  id: string,
  patch: Partial<Pick<AppRecord, "prompt" | "config" | "build">>
): Promise<AppRecord> {
  const existing = await getAppRecord(id);
  if (!existing) throw new Error(`App not found: ${id}`);

  const next: AppRecord = {
    ...existing,
    ...patch,
    updatedAt: isoNow(),
  };

  await ensureDir();
  await fs.writeFile(
    path.join(APPS_DIR, `${id}.json`),
    JSON.stringify(next, null, 2),
    "utf-8"
  );

  return next;
}

