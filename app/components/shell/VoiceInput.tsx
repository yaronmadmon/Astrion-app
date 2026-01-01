"use client";

import { useState } from "react";

export default function VoiceInput({
  onText,
}: {
  onText: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");

  return (
    <section style={{ display: "grid", gap: 8 }}>
      <div style={{ fontWeight: 600 }}>Voice Input</div>

      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Type/paste transcript here..."
        style={{ padding: 10, border: "1px solid #ccc" }}
      />

      <button
        type="button"
        onClick={() => {
          const text = draft.trim();
          if (!text) return;
          onText(text);
          setDraft("");
        }}
        style={{ padding: "10px 14px", width: "fit-content" }}
      >
        Add text to prompt
      </button>
    </section>
  );
}

