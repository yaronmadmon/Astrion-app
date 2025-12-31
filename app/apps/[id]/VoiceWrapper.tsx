"use client";

import VoiceInput from "../../components/shell/VoiceInput";

export default function VoiceWrapper() {
  const handleVoice = (text: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("voice-command", { detail: { text } }));
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 100 }}>
      <VoiceInput onText={handleVoice} />
    </div>
  );
}