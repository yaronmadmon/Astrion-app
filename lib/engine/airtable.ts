"use server";

import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  throw new Error("Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID");
}

const base = new Airtable({ apiKey }).base(baseId);

export async function fetchTable(tableName: string) {
  const records = await base(tableName)
    .select({ maxRecords: 10 })
    .all();

  return records.map((r) => ({
    id: r.id,
    ...r.fields,
  }));
}
