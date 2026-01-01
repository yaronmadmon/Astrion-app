import { templates } from "./templates";

export type TemplateDefinition = any;

export function selectTemplate(templateId: string): TemplateDefinition {
  const template = (templates as Record<string, any>)[templateId];
  if (!template) throw new Error(`Unknown templateId: ${templateId}`);
  return template;
}
