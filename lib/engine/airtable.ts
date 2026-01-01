"use server";

import Airtable from "airtable";

function getBase() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return null;
  return new Airtable({ apiKey }).base(baseId);
}

export function isAirtableConfigured(): boolean {
  return Boolean(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID);
}

export async function fetchTable(tableName: string) {
  const base = getBase();
  if (!base) {
    throw new Error("Airtable is not configured (missing AIRTABLE_API_KEY/AIRTABLE_BASE_ID).");
  }

  const records = await base(tableName)
    .select({ maxRecords: 10 })
    .all();

  return records.map((r) => ({
    id: r.id,
    ...r.fields,
  }));
}
