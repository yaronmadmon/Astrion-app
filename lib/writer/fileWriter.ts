import fs from "fs";
import path from "path";

type WriteOptions = {
  baseDir: string;
  overwrite?: boolean;
  dryRun?: boolean;
};

export function writeFiles(
  files: Record<string, string>,
  options: WriteOptions
) {
  const { baseDir, overwrite = false, dryRun = false } = options;

  const actions: Record<string, string> = {};

  for (const relativePath of Object.keys(files)) {
    const fullPath = path.join(baseDir, relativePath);
    const dir = path.dirname(fullPath);

    if (fs.existsSync(fullPath) && !overwrite) {
      actions[relativePath] = "skipped";
      continue;
    }

    if (!dryRun) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(fullPath, files[relativePath], "utf8");
    }

    actions[relativePath] = dryRun ? "dry-run" : "written";
  }

  return {
    success: true,
    baseDir,
    overwrite,
    dryRun,
    actions,
  };
}
