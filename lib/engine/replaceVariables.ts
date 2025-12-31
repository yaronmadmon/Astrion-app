export function replaceVariables(
  files: Record<string, string>,
  variables: Record<string, string> = {}
) {
  const result: Record<string, string> = {};

  for (const [filePath, content] of Object.entries(files)) {
    let updated = content;

    for (const [key, value] of Object.entries(variables)) {
      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      updated = updated.replace(pattern, value);
    }

    result[filePath] = updated;
  }

  return result;
}
