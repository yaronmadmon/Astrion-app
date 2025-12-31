// FILE: app/components/shell/VoiceInput.tsx
"use client";

import { useState } from "react";

export default function VoiceInput({
  onText,
}: {
  onText?: (text: string) => void;
}) {
  const [listening, setListening] = useState(false);

  function startListening() {
    if (!("webkitSpeechRecognition" in window)) return;

    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onText?.(text);
    };

    recognition.start();
  }

  return (
    <button
      onClick={startListening}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: listening ? "#16a34a" : "#2563eb",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: 22,
      }}
    >
      🎤
    </button>
  );
}
