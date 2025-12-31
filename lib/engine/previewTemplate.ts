import { templates } from "./templates";
import { replaceVariables } from "./replaceVariables";
import { validateVariables } from "./validateVariables";

type PreviewInput = {
  templateId: string;
  presetId?: string;
  variables?: Record<string, string>;
};

export function previewTemplate(input: PreviewInput) {
  const template = templates[input.templateId as keyof typeof templates];

  if (!template) {
    return {
      success: false,
      error: "The selected template could not be found.",
    };
  }

  const preset =
    template.presets?.find((p: any) => p.id === input.presetId) || null;

  const mergedVariables = {
    ...(template.variables || {}),
    ...(preset?.variables || {}),
    ...(input.variables || {}),
  };

  const validation = validateVariables(
    template.requiredVariables || [],
    mergedVariables
  );

  if (!validation.valid) {
    return {
      success: false,
      message: validation.message,
      missing: validation.missing,
    };
  }

  const processedFiles = replaceVariables(
    template.files,
    mergedVariables
  );

  return {
    success: true,
    templateId: template.id,
    presetId: preset?.id || null,
    variables: mergedVariables,
    files: processedFiles,
    fileCount: Object.keys(processedFiles).length,
  };
}
