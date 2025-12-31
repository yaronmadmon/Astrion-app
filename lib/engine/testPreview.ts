import { previewTemplate } from "./previewTemplate";

const result = previewTemplate({
  templateId: "genericApp",
  presetId: "green",
  variables: {
    appName: "Green Startup App",
  },
});

console.log("PREVIEW RESULT:");
console.log(JSON.stringify(result, null, 2));
