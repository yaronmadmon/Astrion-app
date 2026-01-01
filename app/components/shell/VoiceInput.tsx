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

    // @ts-expect-error - webkitSpeechRecognition is a Chrome-only API
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
      className={[
        "fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full text-xl",
        "shadow-lg ring-1 ring-white/10 transition",
        listening ? "bg-emerald-600 text-white" : "bg-blue-600 text-white",
        "hover:brightness-110 active:scale-[0.98]",
      ].join(" ")}
      aria-label={listening ? "Listening" : "Start voice input"}
    >
      🎤
    </button>
  );
}
