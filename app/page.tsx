"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const recognitionRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) return;

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onresult = (e: any) => {
      setText(e.results[0][0].transcript);
      setListening(false);
    };

    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);

    recognitionRef.current = rec;
  }, []);

  function startMic() {
    if (!recognitionRef.current || listening) return;
    setListening(true);
    recognitionRef.current.start();
  }

  async function build() {
    if (!text.trim()) return;
    setLoading(true);

    const res = await fetch("/api/ai/build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    const data = await res.json();
    setLoading(false);

    if (data?.id) {
      router.push(`/apps/${data.id}`);
    } else {
      alert("Build failed");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "white",
        padding: 40,
        fontFamily: "system-ui",
      }}
    >
      <h1>Astrion</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: 420, height: 120, marginBottom: 12 }}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={startMic}>
          {listening ? "Listening…" : "🎤 Talk"}
        </button>
        <button onClick={build}>
          {loading ? "Building…" : "Build"}
        </button>
      </div>
    </main>
  );
}
