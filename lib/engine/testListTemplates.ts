import { listTemplates } from "./listTemplates";

const templates = listTemplates();

console.log("AVAILABLE TEMPLATES:");
console.log(JSON.stringify(templates, null, 2));
