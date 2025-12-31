import Airtable from "airtable";
import { NextResponse } from "next/server";

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  throw new Error("Missing Airtable environment variables");
}

const base = new Airtable({ apiKey }).base(baseId);

export async function GET(req) {
  try {
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
