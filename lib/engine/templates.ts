// Template registry
// This file intentionally avoids strict typing to prevent JS/TS conflicts

// eslint-disable-next-line @typescript-eslint/no-var-requires
const genericApp = require("../generators/genericApp").default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const simpleLanding = require("../generators/simpleLanding").default;

export const templates: Record<string, any> = {
  genericApp,
  simpleLanding,
};
