import { templates } from "./templates";

export function listTemplates() {
  return Object.values(templates).map((template: any) => ({
    id: template.id,
    name: template.name,
    description: template.description || "",
    variables: template.variables || {},
    requiredVariables: template.requiredVariables || [],
    presets: template.presets || [],
  }));
}
