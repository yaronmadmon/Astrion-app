"use client";

import React, { useState } from "react";
import Sidebar from "../../components/shell/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Browser not supported");
      return;
    }
    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      window.dispatchEvent(new CustomEvent("voice-command", { detail: { text } }));
    };
    recognition.start();
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#05070a", color: "white" }}>
      <aside style={{ width: "260px", background: "#0a0f1a", padding: "30px 20px", borderRight: "1px solid #1e293b" }}>
        <div style={{ fontWeight: "bold", fontSize: "22px", color: "#38bdf8", marginBottom: "40px" }}>ASTRION</div>
        <Sidebar items={["Dashboard", "Analytics", "Settings"]} />
      </aside>

      <main style={{ flex: 1, padding: "40px", position: "relative", overflowY: "auto" }}>
        {children}
        
        <button
          onClick={startListening}
          style={{
            position: "fixed", bottom: "30px", right: "30px",
            width: "60px", height: "60px", borderRadius: "50%",
            background: listening ? "#16a34a" : "#2563eb",
            color: "white", border: "none", cursor: "pointer", fontSize: "24px"
          }}
        >
          🎤
        </button>
      </main>
    </div>
  );
}