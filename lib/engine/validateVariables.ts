type ValidationResult = {
  valid: boolean;
  missing: string[];
  message: string;
};

export function validateVariables(
  required: string[] = [],
  variables: Record<string, string>
): ValidationResult {
  const missing = required.filter(
    (key) => !variables[key] || variables[key].trim() === ""
  );

  return {
    valid: missing.length === 0,
    missing,
    message:
      missing.length === 0
        ? "All required information is provided."
        : `Please provide the following required information: ${missing.join(", ")}.`,
  };
}
