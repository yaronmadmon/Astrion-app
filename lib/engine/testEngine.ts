import { runEngine } from "./runEngine";

const result = runEngine({
  templateId: "genericApp",
  presetId: "green",            // 👈 THIS is the key line
  variables: {
    appName: "Green Startup App"
  },
  outputDir: "output-app",
  overwrite: true,
  dryRun: false,
});

console.log("ENGINE RESULT:");
console.log(JSON.stringify(result, null, 2));
