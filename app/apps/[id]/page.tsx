"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { AppRecord } from "@/types/appRecord";

export default function AppPreviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") || "dashboard").toLowerCase();

  const [record, setRecord] = useState<AppRecord | null>(null);
  const [prompt, setPrompt] = useState("");

  // Listen for the voice command from the Layout
  useEffect(() => {
    const handleVoiceUpdate = (e: any) => {
      if (e.detail?.text) setPrompt(e.detail.text);
    };
    window.addEventListener("voice-command", handleVoiceUpdate);
    return () => window.removeEventListener("voice-command", handleVoiceUpdate);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/apps/${params.id}`);
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
  }, [params.id]);

  const activePage = useMemo(() => {
    const pages = record?.config?.pages ?? [];
    const byId = pages.find((p) => p.id.toLowerCase() === tab);
    if (byId) return byId;
    const byTitle = pages.find((p) => p.title.toLowerCase() === tab);
    return byTitle ?? pages[0] ?? null;
  }, [record, tab]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold tracking-widest text-slate-500">
          {record?.config?.name ?? "Loading..."}
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100">
          {activePage?.title ?? "App"}
        </h1>
        <div className="mt-1 text-xs text-slate-500">App ID: {String(params.id)}</div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
        {activePage ? (
          <div className="text-sm text-slate-300">
            <div className="font-medium text-slate-100">Page type</div>
            <div className="mt-1 text-slate-400">{activePage.type}</div>
          </div>
        ) : (
          <div className="text-sm text-slate-500">No pages found in config.</div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
        <div className="text-sm font-semibold text-slate-100">Refine by voice or text</div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Say or type changes (MVP: stored locally, not applied yet)"
          className="mt-3 h-24 w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-sky-500/40"
        />
        <button
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50"
          disabled
          title="Coming next: apply edits via Foreman commands"
        >
          Apply Changes (next)
        </button>
      </div>
    </div>
  );
}