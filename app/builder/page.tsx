"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  // 1. Initialize hooks properly inside the component
  const router = useRouter(); 
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<any[]>([]); // This defines setHistory!

  // 2. Load existing history when the page loads
  useEffect(() => {
    const saved = localStorage.getItem("astrion_apps");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const handleBuild = async () => {
    if (!prompt) return;

    try {
      const response = await fetch("/api/ai/build", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.id) {
        // 3. Create the new item
        const newApp = { 
          id: data.id, 
          prompt: prompt, 
          createdAt: Date.now() 
        };

        // 4. Manual Save (Ensures it works even if state is slow)
        const existingRaw = localStorage.getItem("astrion_apps");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const updatedHistory = [newApp, ...existing];

        // 5. WRITE TO DISK (This must happen before redirect)
        localStorage.setItem("astrion_apps", JSON.stringify(updatedHistory));
        
        // 6. Update local state
        setHistory(updatedHistory);

        // 7. SOFT REDIRECT (Standard Next.js way)
        router.push(`/apps/${data.id}`);
      }
    } catch (error) {
      console.error("Build failed:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05070a", color: "white", padding: "40px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", color: "#38bdf8", marginBottom: "30px" }}>ASTRION BUILDER</h1>
        
        <div style={{ background: "#0a0f1a", padding: "20px", borderRadius: "12px", border: "1px solid #1e293b" }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your app..."
            style={{ width: "100%", height: "80px", background: "#05070a", color: "white", padding: "10px", borderRadius: "8px", border: "1px solid #334155" }}
          />
          <button 
            onClick={handleBuild}
            style={{ width: "100%", marginTop: "15px", padding: "12px", background: "#38bdf8", color: "black", fontWeight: "bold", borderRadius: "8px", cursor: "pointer", border: "none" }}
          >
            Generate App
          </button>
        </div>

        <h2 style={{ marginTop: "40px", fontSize: "18px", color: "#94a3b8" }}>Recent Apps</h2>
        <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {history.length > 0 ? history.map((app) => (
            <div 
              key={app.id} 
              onClick={() => router.push(`/apps/${app.id}`)}
              style={{ padding: "15px", background: "#0a0f1a", border: "1px solid #1e293b", borderRadius: "10px", cursor: "pointer" }}
            >
              <strong>{app.prompt}</strong>
              <div style={{ fontSize: "11px", color: "#475569" }}>ID: {app.id}</div>
            </div>
          )) : (
            <p style={{ color: "#475569" }}>No saved apps found.</p>
          )}
        </div>
      </div>
    </div>
  );
}