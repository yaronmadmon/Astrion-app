"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function AppPreviewPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("Dashboard"); // Controls navigation
  const [prompt, setPrompt] = useState("");

  // Listen for the voice command from the Layout
  useEffect(() => {
    const handleVoiceUpdate = (e: any) => {
      if (e.detail?.text) setPrompt(e.detail.text);
    };
    window.addEventListener("voice-command", handleVoiceUpdate);
    return () => window.removeEventListener("voice-command", handleVoiceUpdate);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      {/* 1. TOP NAVIGATION TABS */}
      <div style={{ display: "flex", gap: "30px", borderBottom: "1px solid #1e293b" }}>
        {["Dashboard", "Analytics", "Settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none", border: "none", padding: "12px 0", cursor: "pointer",
              color: activeTab === tab ? "#38bdf8" : "#94a3b8",
              borderBottom: activeTab === tab ? "2px solid #38bdf8" : "transparent",
              fontWeight: activeTab === tab ? "bold" : "normal", transition: "0.2s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2. DYNAMIC CONTENT AREA */}
      {activeTab === "Dashboard" && (
        <div style={{ animation: "fadeIn 0.3s ease-in" }}>
          <h1 style={{ fontSize: "28px", color: "white", marginBottom: "10px" }}>Project Dashboard</h1>
          <p style={{ color: "#94a3b8", marginBottom: "20px" }}>App ID: {params.id}</p>
          
          <div style={{ background: "#0a0f1a", padding: "24px", borderRadius: "16px", border: "1px solid #1e293b" }}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Refine your app..."
              style={{ width: "100%", height: "80px", background: "#05070a", color: "white", padding: "15px", borderRadius: "10px", border: "1px solid #334155", resize: "none" }}
            />
            <button style={{ marginTop: "10px", width: "100%", padding: "10px", background: "#38bdf8", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer" }}>
              Apply Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === "Analytics" && (
        <div style={{ padding: "40px", textAlign: "center", color: "#475569", border: "2px dashed #1e293b", borderRadius: "16px" }}>
          <h2 style={{ color: "white" }}>Analytics View</h2>
          <p>Chart data for {params.id} will appear here.</p>
        </div>
      )}

      {activeTab === "Settings" && (
        <div style={{ padding: "40px", color: "white" }}>
          <h2>App Settings</h2>
          <p style={{ color: "#94a3b8" }}>Configure deployment and API keys for this instance.</p>
        </div>
      )}
    </div>
  );
}