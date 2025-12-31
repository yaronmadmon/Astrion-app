// FILE: lib/ai/generateConfig.ts
import type { AppConfig } from "../contracts/appConfig";

export async function generateConfig(prompt: string): Promise<AppConfig> {
  const text = prompt.toLowerCase();

  if (text.includes("real estate") || text.includes("property")) {
    return {
      name: "Real Estate App",
      pages: [
        { id: "dashboard", title: "Dashboard", type: "dashboard" },
        { id: "properties", title: "Properties", type: "table" },
        { id: "tenants", title: "Tenants", type: "table" },
        { id: "payments", title: "Payments", type: "table" },
        { id: "settings", title: "Settings", type: "form" },
      ],
    };
  }

  if (text.includes("crm")) {
    return {
      name: "CRM App",
      pages: [
        { id: "dashboard", title: "Dashboard", type: "dashboard" },
        { id: "leads", title: "Leads", type: "table" },
        { id: "contacts", title: "Contacts", type: "table" },
        { id: "settings", title: "Settings", type: "form" },
      ],
    };
  }

  return {
    name: "Custom App",
    pages: [
      { id: "dashboard", title: "Dashboard", type: "dashboard" },
      { id: "data", title: "Data", type: "table" },
      { id: "settings", title: "Settings", type: "form" },
    ],
  };
}
