import type { AppConfig } from "@/lib/contracts/appConfig";
import type { BuildCommand, BuildDialogue } from "@/types/appRecord";
import { analyzePrompt } from "@/lib/analyst/analyzePrompt";

export type ForemanPlan =
  | {
      mode: "dialogue";
      dialogue: BuildDialogue;
      draftConfig: AppConfig;
    }
  | {
      mode: "build";
      command: BuildCommand;
      config: AppConfig;
    };

function makeConfigFromIntent(intent: string, appName: string): AppConfig {
  if (intent === "real_estate") {
    return {
      name: appName,
      pages: [
        { id: "dashboard", title: "Dashboard", type: "dashboard" },
        { id: "properties", title: "Properties", type: "table" },
        { id: "tenants", title: "Tenants", type: "table" },
        { id: "payments", title: "Payments", type: "table" },
        { id: "settings", title: "Settings", type: "form" },
      ],
    };
  }

  if (intent === "crm") {
    return {
      name: appName,
      pages: [
        { id: "dashboard", title: "Dashboard", type: "dashboard" },
        { id: "leads", title: "Leads", type: "table" },
        { id: "contacts", title: "Contacts", type: "table" },
        { id: "settings", title: "Settings", type: "form" },
      ],
    };
  }

  if (intent === "landing") {
    return {
      name: appName,
      pages: [{ id: "home", title: "Home", type: "dashboard" }],
    };
  }

  return {
    name: appName || "Astrion App",
    pages: [
      { id: "dashboard", title: "Dashboard", type: "dashboard" },
      { id: "data", title: "Data", type: "table" },
      { id: "settings", title: "Settings", type: "form" },
    ],
  };
}

/**
 * Foreman role: emits ONLY high-level, validated JSON intent/commands/config.
 * No raw code generation happens here.
 */
export function planBuild(prompt: string): ForemanPlan {
  const analysis = analyzePrompt(prompt);
  const config = makeConfigFromIntent(analysis.intent, analysis.suggestedVariables.appName);

  if (analysis.questions.length > 0) {
    return {
      mode: "dialogue",
      dialogue: {
        mode: "dialogue",
        confidence: analysis.confidence,
        questions: analysis.questions,
      },
      draftConfig: config,
    };
  }

  return {
    mode: "build",
    command: {
      mode: "build",
      confidence: analysis.confidence,
      templateId: analysis.suggestedTemplateId,
      presetId: analysis.suggestedPresetId,
      variables: analysis.suggestedVariables,
    },
    config,
  };
}

