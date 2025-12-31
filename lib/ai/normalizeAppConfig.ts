import type { AppConfig } from "../contracts/appConfig";

export function normalizeAppConfig(config: AppConfig): AppConfig {
  return {
    ...config,
    pages: config.pages ?? [],
  };
}
