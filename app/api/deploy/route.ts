'use client';

import { useState } from 'react';

export default function Home() {
  const [transcript, setTranscript] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [building, setBuilding] = useState<boolean>(false);
  const [deployedUrl, setDeployedUrl] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setTranscript('Sorry, your browser does not support speech recognition. Try Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      setTranscript(spokenText);

      if (spokenText.includes('real estate') || spokenText.includes('tenant') || spokenText.includes('property') || spokenText.includes('rental') || spokenText.includes('lease')) {
        setPreview(
          `Here's your Real Estate Tenant Tracker App:\n\n` +
          `• Dashboard with list of tenants\n` +
          `• Add / edit tenant details\n` +
          `• Rent due dates and payment tracking\n` +
          `• Automatic email reminders\n` +
          `• Simple reports\n\n` +
          `Ready to build this app?`
        );
      } else if (spokenText.includes('meal') || spokenText.includes('food') || spokenText.includes('recipe') || spokenText.includes('cooking') || spokenText.includes('grocery') || spokenText.includes('housewife')) {
        setPreview(
          `Here's your Housewife Helper App:\n\n` +
          `• Daily meal planner\n` +
          `• Grocery shopping list\n` +
          `• Quick recipe ideas\n` +
          `• Cleaning schedule\n` +
          `• Family reminders\n\n` +
          `Ready to build this app?`
        );
      } else if (spokenText.includes('task') || spokenText.includes('todo') || spokenText.includes('project') || spokenText.includes('work')) {
        setPreview(
          `Here's your Personal Task Manager App:\n\n` +
          `• Daily task list\n` +
          `• Priority levels\n` +
          `• Due dates and reminders\n` +
          `• Progress tracking\n\n` +
          `Ready to build this app?`
        );
      } else {
        setPreview(
          `I heard you! I can currently build:\n\n` +
          `• Real estate / tenant trackers\n` +
          `• Housewife helper apps\n` +
          `• Personal task managers\n\n` +
          `Try saying something like "build me a real estate app" or "housewife helper"`
        );
      }
    };

    recognition.onerror = (event: any) => {
      setTranscript('Error: ' + event.error);
      setPreview('');
    };

    recognition.start();
  };

  const handleBuild = async () => {
    setBuilding(true);
    setStatus('Creating your app...');
    setDeployedUrl('');

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          template: preview.includes('Real Estate') ? 'real-estate' : 
                    preview.includes('Housewife') ? 'housewife' : 
                    'task-manager' 
        }),
      });

      const data = await response.json();

      if (data.url) {
        setDeployedUrl(data.url);
        setStatus('Your app is live!');
      } else {
        setStatus('Error: ' + data.error);
      }
    } catch (err) {
      setStatus('Build failed — check console');
    }

    setBuilding(false);
  };

  return (
    <div style={{ padding: '60px', fontFamily: 'sans-serif', textAlign: 'center', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '60px', color: '#111' }}>
        Astrion — Speak Your App Idea
      </h1>

      <button
        onClick={startListening}
        style={{
          padding: '20px 50px',
          fontSize: '1.8rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,112,243,0.3)',
          marginBottom: '60px',
        }}
      >
        🎤 Start Talking
      </button>

      {transcript && (
        <div style={{ fontSize: '1.8rem', marginBottom: '60px' }}>
          <p style={{ color: '#555' }}>You said:</p>
          <p style={{ fontWeight: 'bold', color: '#0070f3', fontSize: '2rem' }}>
            {transcript}
          </p>
        </div>
      )}

      {preview && (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          maxWidth: '700px',
          margin: '0 auto',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          whiteSpace: 'pre-line',
          textAlign: 'left',
          fontSize: '1.4rem',
          lineHeight: '1.6',
        }}>
          <h2 style={{ color: '#0070f3', textAlign: 'center', marginBottom: '30px' }}>
            App Preview
          </h2>
          <p style={{ color: '#333' }}>{preview}</p>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button 
              onClick={handleBuild}
              disabled={building}
              style={{
                padding: '18px 50px',
                fontSize: '1.6rem',
                backgroundColor: building ? '#888' : '#00aa00',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                cursor: building ? 'not-allowed' : 'pointer',
                boxShadow: building ? 'none' : '0 6px 20px rgba(0,170,0,0.3)',
              }}
            >
              {building ? 'Building...' : 'Build It Now!'}
            </button>
          </div>

          {status && (
            <p style={{ marginTop: '30px', fontSize: '1.4rem', color: '#0070f3' }}>
              {status}
            </p>
          )}

          {deployedUrl && (
            <div style={{ marginTop: '50px', textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', color: '#00aa00', marginBottom: '20px' }}>
                🎉 Your app is live!
              </p>
              <a 
                href={deployedUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  fontSize: '1.6rem',
                  color: '#0070f3',
                  textDecoration: 'underline',
                  wordBreak: 'break-all',
                }}
              >
                Open your new app → {deployedUrl}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}