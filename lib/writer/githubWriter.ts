export type GitHubWriteResult = {
  repo: string;
  branch: string;
};

export async function writeToGitHub(
  files: Record<string, string>
): Promise<GitHubWriteResult> {
  // Placeholder – real GitHub logic later
  return {
    repo: "astrion-generated-app",
    branch: "main",
  };
}
