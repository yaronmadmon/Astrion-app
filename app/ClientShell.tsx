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
        <div className="fixed bottom-6 left-6 z-50 w-80 rounded-xl border border-slate-800 bg-slate-950/80 p-3 shadow-lg backdrop-blur">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Speak or type…"
            className="h-20 w-full resize-none rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/40"
          />

          <div className="mt-2">
            <VoiceButton onTranscript={setText} />
          </div>
        </div>
      )}
    </>
  )
}
