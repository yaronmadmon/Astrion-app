import { TEMPLATES, TemplateDefinition } from "./templates";

export function selectTemplate(templateId: string): TemplateDefinition {
  const template = TEMPLATES.find(t => t.id === templateId);

  if (!template) {
    throw new Error(`Unknown templateId: ${templateId}`);
  }

  return template;
}
