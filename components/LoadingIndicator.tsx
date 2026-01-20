
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { QuantumIcon } from './icons';

const messages = [
  "Consulting the knowledge base...",
  "Analyzing 2026-2030 tech trends...",
  "Mapping skill dependencies...",
  "Integrating real-world labs...",
  "Synthesizing your career trajectory...",
  "Aligning with global certifications...",
  "Optimizing for future-readiness...",
  "Almost there, finalizing roadmap..."
];

const LoadingIndicator: React.FC = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % messages.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center space-y-6 animate-pulse">
      <div className="relative inline-block">
        <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <QuantumIcon className="w-10 h-10 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute inset-0 w-20 h-20 border-2 border-cyan-500/20 rounded-3xl animate-ping" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight">Generating Guided Roadmap</h3>
        <p className="text-sm text-slate-500 italic font-mono transition-opacity duration-500">{messages[idx]}</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
