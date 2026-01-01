import { NextResponse } from "next/server";
import { planBuild } from "@/lib/foreman/planBuild";
import { validateAppConfig } from "@/lib/contracts/validator";
import { createAppRecord } from "@/lib/storage/appRecords";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if prompt exists
    if (!body.prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    const prompt = String(body.prompt);
    const plan = planBuild(prompt);

    if (plan.mode === "dialogue") {
      return NextResponse.json(
        {
          mode: "dialogue",
          confidence: plan.dialogue.confidence,
          questions: plan.dialogue.questions,
          draftConfig: plan.draftConfig,
        },
        { status: 200 }
      );
    }

    const validation = validateAppConfig(plan.config);
    if (!validation.ok) {
      return NextResponse.json(
        { error: "Invalid config", details: validation.error },
        { status: 422 }
      );
    }

    const record = await createAppRecord({
      prompt,
      config: plan.config,
      build: plan.command,
    });

    return NextResponse.json(
      {
        mode: "build",
        id: record.id,
        confidence: plan.command.confidence,
        config: record.config,
        build: record.build,
      },
      { status: 200 }
    );

  } catch (_error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 500 });
  }
}