import type { AppConfig } from "@/lib/contracts/appConfig";

export type BuildDialogue = {
  mode: "dialogue";
  confidence: number; // 0..1
  questions: string[];
};

export type BuildCommand = {
  mode: "build";
  confidence: number; // 0..1
  templateId: string;
  presetId?: string;
  variables: Record<string, string>;
};

export type AppRecord = {
  id: string;
  prompt: string;
  config: AppConfig;
  createdAt: string; // ISO
  updatedAt?: string; // ISO
  build: BuildCommand;
};

