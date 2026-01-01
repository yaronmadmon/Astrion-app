"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VoiceInput from "@/app/components/shell/VoiceInput";
import { addHistoryItem, readHistory, type HistoryItem } from "@/lib/history";

export default function BuilderPage() {
  // 1. Initialize hooks properly inside the component
  const router = useRouter(); 
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 2. Load existing history when the page loads
  useEffect(() => {
    setHistory(readHistory());
  }, []);

  const handleBuild = async () => {
    if (!prompt) return;

    try {
      setLoading(true);
      setQuestions([]);
      setConfidence(null);

      const response = await fetch("/api/ai/build", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.mode === "dialogue") {
        setConfidence(typeof data.confidence === "number" ? data.confidence : null);
        setQuestions(Array.isArray(data.questions) ? data.questions : []);
        return;
      }

      if (data.mode === "build" && data.id) {
        const next = addHistoryItem({
          id: data.id,
          prompt,
          createdAt: new Date().toISOString(),
        });
        setHistory(next);
        router.push(`/apps/${data.id}`);
      }
    } catch (error) {
      console.error("Build failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-sky-300">
        Astrion Builder
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Describe your Micro‑SaaS. If you’re vague, Astrion will ask clarifying questions before building.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-sm">
        <label className="text-xs font-medium text-slate-400">Your idea</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g. "A CRM for solar installers to track leads, calls, and quotes"'
          className="mt-2 h-24 w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-sky-500/40"
        />

        <button
          onClick={handleBuild}
          disabled={loading || !prompt.trim()}
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Working..." : "Build"}
        </button>

        {confidence !== null && (
          <div className="mt-3 text-xs text-slate-400">
            Confidence: <span className="font-medium text-slate-200">{Math.round(confidence * 100)}%</span>
          </div>
        )}

        {questions.length > 0 && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="text-sm font-semibold text-slate-100">Guiding questions</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-slate-500">
              Answer these in one sentence and press Build again.
            </div>
          </div>
        )}
      </div>

      <h2 className="mt-10 text-sm font-semibold text-slate-300">Recent apps</h2>
      <div className="mt-3 flex flex-col gap-2">
        {history.length > 0 ? (
          history.map((app) => (
            <button
              key={app.id}
              onClick={() => router.push(`/apps/${app.id}`)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-left hover:bg-slate-950"
            >
              <div className="text-sm font-medium text-slate-100">{app.prompt}</div>
              <div className="mt-1 text-xs text-slate-500">{app.id}</div>
            </button>
          ))
        ) : (
          <div className="text-sm text-slate-500">No saved apps yet.</div>
        )}
      </div>

      <VoiceInput onText={(text) => setPrompt(text)} />
    </div>
  );
}