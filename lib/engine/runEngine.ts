import { previewTemplate } from "./previewTemplate";
import { writeFiles } from "../writer/fileWriter";

export type EngineRunInput = {
  templateId: string;
  presetId?: string;
  variables?: Record<string, string>;
  outputDir: string;
  overwrite?: boolean;
  dryRun?: boolean;
};

export type EngineRunResult =
  | {
      success: true;
      templateId: string;
      presetId: string | null;
      variables: Record<string, string>;
      fileCount: number;
      write: ReturnType<typeof writeFiles>;
    }
  | {
      success: false;
      error: string;
      message?: string;
      missing?: string[];
    };

/**
 * Deterministic Builder layer.
 * - Takes a validated templateId + variables
 * - Produces a file map (via brick templates)
 * - Optionally writes to disk
 *
 * NOTE: This function is intentionally non-AI and non-networked.
 */
export function runEngine(input: EngineRunInput): EngineRunResult {
  const preview = previewTemplate({
    templateId: input.templateId,
    presetId: input.presetId,
    variables: input.variables,
  });

  if (!preview.success) {
    return {
      success: false,
      error: "ENGINE_VALIDATION_FAILED",
      message: (preview as any).message ?? (preview as any).error ?? "Invalid input",
      missing: (preview as any).missing,
    };
  }

  const write = writeFiles((preview as any).files as Record<string, string>, {
    baseDir: input.outputDir,
    overwrite: Boolean(input.overwrite),
    dryRun: Boolean(input.dryRun),
  });

  return {
    success: true,
    templateId: (preview as any).templateId as string,
    presetId: ((preview as any).presetId ?? null) as string | null,
    variables: ((preview as any).variables ?? {}) as Record<string, string>,
    fileCount: ((preview as any).fileCount ?? 0) as number,
    write,
  };
}