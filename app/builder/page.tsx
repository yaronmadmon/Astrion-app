"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addHistoryItem } from "@/lib/history";

function generateId(): string {
  // Short, readable id (not cryptographically secure)
  return `app_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function BuilderPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [prompt, setPrompt] = useState("");
  const defaultId = useMemo(() => generateId(), []);
  const [appId, setAppId] = useState(defaultId);

  const canSave = prompt.trim().length > 0 && appId.trim().length > 0;

  const onSave = () => {
    if (!canSave) return;

    addHistoryItem({
      id: appId.trim(),
      prompt: prompt.trim(),
      createdAt: new Date().toISOString(),
    });

    // Navigate using Next router (no window.location.href race)
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <main style={{ padding: 40, maxWidth: 800 }}>
      <h1>Builder</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        Save an App ID + Prompt to localStorage, then return to the landing page
        to see it in History.
      </p>

      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>App ID</span>
          <input
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            style={{ padding: 10, border: "1px solid #ccc" }}
            placeholder="app_..."
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Prompt</span>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ padding: 10, border: "1px solid #ccc", minHeight: 120 }}
            placeholder="Describe the app you want to generate..."
          />
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave || isPending}
            style={{ padding: "10px 14px" }}
          >
            Save to History &amp; go Home
          </button>
          <button
            type="button"
            onClick={() => {
              setAppId(generateId());
              setPrompt("");
            }}
            style={{ padding: "10px 14px" }}
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

