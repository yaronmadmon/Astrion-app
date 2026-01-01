export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string }

export function validateAppConfig(config: any): ValidationResult {
  if (!config || typeof config !== "object") {
    return { ok: false, error: "Config must be an object" }
  }

  if (typeof config.name !== "string") {
    return { ok: false, error: "Config.name must be a string" }
  }

  if (!Array.isArray(config.pages)) {
    return { ok: false, error: "Config.pages must be an array" }
  }

  for (const page of config.pages) {
    const result = validatePage(page)
    if (!result.ok) return result
  }

  return { ok: true }
}

function validatePage(page: any): ValidationResult {
  if (!page || typeof page !== "object") {
    return { ok: false, error: "Page must be an object" }
  }

  if (typeof page.id !== "string") {
    return { ok: false, error: "Page.id must be a string" }
  }

  if (typeof page.title !== "string") {
    return { ok: false, error: "Page.title must be a string" }
  }

  if (
    page.type !== "dashboard" &&
    page.type !== "table" &&
    page.type !== "form"
  ) {
    return {
      ok: false,
      error: `Invalid page.type: ${page.type}`
    }
  }

  return { ok: true }
}
