'use client';

import { useState } from 'react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');

  return (
    <div className="app-shell">
      {children}
      <button onClick={() => setMessage('Next step: AI integration')}>Next</button>
      {message && <p>{message}</p>}
    </div>
  );
}