"use client";

import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/shell/Sidebar";
import VoiceInput from "@/app/components/shell/VoiceInput";
import type { AppRecord } from "@/types/appRecord";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [record, setRecord] = useState<AppRecord | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const parts = window.location.pathname.split("/");
        const id = parts[parts.indexOf("apps") + 1];
        const res = await fetch(`/api/apps/${id}`);
        if (!res.ok) return;
        const json = (await res.json()) as AppRecord;
        if (!cancelled) setRecord(json);
      } catch {
        // ignore
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sidebarItems = useMemo(() => {
    const pages = record?.config?.pages ?? [];
    return pages.length > 0 ? pages.map((p) => p.title) : ["Dashboard", "Settings"];
  }, [record]);

  return (
    <div className="flex min-h-dvh">
      <aside className="w-72 border-r border-slate-800 bg-slate-950/40 px-5 py-6">
        <div className="text-lg font-semibold tracking-tight text-sky-300">
          ASTRION
        </div>
        <div className="mt-6">
          <Sidebar items={sidebarItems} />
        </div>
      </aside>

      <main className="relative flex-1 overflow-y-auto p-6">
        {children}
        <VoiceInput
          onText={(text) => {
            window.dispatchEvent(new CustomEvent("voice-command", { detail: { text } }));
          }}
        />
      </main>
    </div>
  );
}