import Airtable from "airtable";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getBase() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return null;
  return new Airtable({ apiKey }).base(baseId);
}

export async function GET(req) {
  try {
    const base = getBase();
    if (!base) {
      return NextResponse.json(
        { error: "Airtable not configured (missing AIRTABLE_API_KEY/AIRTABLE_BASE_ID)" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");

    if (!table) {
      return NextResponse.json(
        { error: "Missing table parameter" },
        { status: 400 }
      );
    }

    const records = await base(table)
      .select({ maxRecords: 10 })
      .all();

    const data = records.map(r => ({
      id: r.id,
      ...r.fields
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
