'use client';

import { useState } from 'react';

export default function VoiceInput({ onTranscript }: { onTranscript: (text: string) => void }) {
  const [listening, setListening] = useState(false);
  let recognition: SpeechRecognition | null = null;

  if (typeof window !== 'undefined') {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setListening(false);
      };

      recognition.onend = () => setListening(false);
    }
  }

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  return (
    <button
      onClick={startListening}
      disabled={listening}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      {listening ? 'Listening...' : 'Speak'}
    </button>
  );
}