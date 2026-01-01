export type PromptAnalysis = {
  confidence: number; // 0..1
  intent:
    | "real_estate"
    | "crm"
    | "landing"
    | "unknown";
  suggestedTemplateId: string;
  suggestedPresetId?: string;
  suggestedVariables: Record<string, string>;
  questions: string[];
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function titleCase(input: string) {
  return input
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 6)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function analyzePrompt(prompt: string): PromptAnalysis {
  const text = (prompt ?? "").trim();
  const lower = text.toLowerCase();

  const questions: string[] = [];
  let confidence = 0.35;
  let intent: PromptAnalysis["intent"] = "unknown";
  let suggestedTemplateId = "genericApp";
  let suggestedPresetId: string | undefined;

  if (lower.includes("real estate") || lower.includes("property") || lower.includes("tenant")) {
    intent = "real_estate";
    suggestedTemplateId = "genericApp";
    suggestedPresetId = "dark";
    confidence += 0.35;
  } else if (lower.includes("crm") || lower.includes("leads") || lower.includes("pipeline")) {
    intent = "crm";
    suggestedTemplateId = "genericApp";
    suggestedPresetId = "green";
    confidence += 0.3;
  } else if (lower.includes("landing") || lower.includes("waitlist") || lower.includes("marketing page")) {
    intent = "landing";
    suggestedTemplateId = "simpleLanding";
    confidence += 0.35;
  }

  // Confidence boosters for specificity.
  if (text.length >= 40) confidence += 0.15;
  if (/(airtable|stripe|calendar|email|invoice|reporting|analytics|map)/i.test(text)) confidence += 0.1;

  // Confidence penalties for vagueness.
  if (text.length < 18) confidence -= 0.2;
  if (/^(an app|a saas|something|anything|build me)/i.test(text)) confidence -= 0.15;

  // Guiding dialogue triggers.
  if (confidence < 0.55) {
    questions.push(
      "Who is this app for (role + industry)?",
      "What is the primary action users take inside the app?",
      "What records will you store in Airtable (e.g., Leads, Properties, Invoices)?"
    );
  }

  const appName = intent === "unknown"
    ? titleCase(text || "Astrion App")
    : intent === "real_estate"
      ? "Real Estate App"
      : intent === "crm"
        ? "CRM App"
        : "Landing Page";

  return {
    confidence: clamp01(confidence),
    intent,
    suggestedTemplateId,
    suggestedPresetId,
    suggestedVariables: { appName },
    questions,
  };
}

