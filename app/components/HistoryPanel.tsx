"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HISTORY_EVENT, type HistoryItem, readHistory } from "@/lib/history";

export default function HistoryPanel() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);

    const refresh = () => {
      setHistory(readHistory());
    };

    refresh();

    // Updates from other tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === "astrion.history.v1") refresh();
    };

    // Updates from same tab (since 'storage' doesn't fire in the same document)
    const onLocalHistoryChange = () => refresh();

    window.addEventListener("storage", onStorage);
    window.addEventListener(HISTORY_EVENT, onLocalHistoryChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(HISTORY_EVENT, onLocalHistoryChange);
    };
  }, []);

  // Avoid flicker/mismatch by only rendering history after hydration.
  if (!hasHydrated) return null;

  return (
    <section style={{ marginTop: 16 }}>
      <h2>History</h2>
      {history.length === 0 ? (
        <p style={{ marginTop: 8 }}>
          No history yet. <Link href="/builder">Generate an app</Link> to create
          your first entry.
        </p>
      ) : (
        <ol style={{ marginTop: 8, paddingLeft: 20 }}>
          {history.map((item) => (
            <li key={item.id} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: "monospace" }}>{item.id}</div>
              <div>{item.prompt}</div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>{item.createdAt}</div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

