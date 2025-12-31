"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import VoiceButton from "./components/VoiceInput"

export default function ClientShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [text, setText] = useState("")
  const pathname = usePathname()

  // Voice UI ONLY inside built apps
  const showVoice = pathname.startsWith("/apps")

  return (
    <>
      {children}

      {showVoice && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            width: 320,
            background: "#0b1220",
            padding: 12,
            borderRadius: 10,
            zIndex: 9999,
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Speak or type…"
            style={{
              width: "100%",
              height: 80,
              background: "#020617",
              color: "white",
              borderRadius: 6,
              padding: 8,
              border: "1px solid #1e293b",
              resize: "none",
            }}
          />

          <div style={{ marginTop: 8 }}>
            <VoiceButton onResult={setText} />
          </div>
        </div>
      )}
    </>
  )
}
