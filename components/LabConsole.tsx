
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play, CheckCircle2, AlertCircle, Copy, Info } from 'lucide-react';
import { Lab } from '../types';

interface LabConsoleProps {
  lab: Lab;
  onClose: () => void;
}

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

const LabConsole: React.FC<LabConsoleProps> = ({ lab, onClose }) => {
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'system', content: `Provisioning secure tenant for ${lab.platform}...` },
    { type: 'system', content: `Instance ready: tech-skyline-sandbox-${Math.random().toString(36).substring(7)}` },
    { type: 'system', content: `Type 'help' to see available commands.` },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmd = input.trim();
    setHistory(prev => [...prev, { type: 'input', content: cmd }]);
    setInput('');
    setIsProcessing(true);

    // Simulated Local Commands
    if (cmd.toLowerCase() === 'help') {
      setHistory(prev => [...prev, { type: 'output', content: 'Available commands:\n  ls         - List directory contents\n  cat <file> - Read file contents\n  gcloud     - Google Cloud CLI simulation\n  kubectl    - Kubernetes CLI simulation\n  nmap       - Network discovery simulation\n  clear      - Clear terminal\n  exit       - Close console' }]);
      setIsProcessing(false);
      return;
    }

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setIsProcessing(false);
      return;
    }

    if (cmd.toLowerCase() === 'exit') {
      onClose();
      return;
    }

    // AI-Assisted Command Simulation
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Simulate a Linux terminal response for a ${lab.platform} sandbox environment. 
                  Lab context: ${lab.description}. 
                  The user typed: "${cmd}". 
                  Provide a realistic, concise terminal output. If it's a security command like nmap or gcloud, show appropriate logs or JSON results. 
                  Keep it as raw text output only.`,
        config: {
          temperature: 0.1,
          maxOutputTokens: 200,
        }
      });

      const output = response.text || 'Command execution timed out.';
      setHistory(prev => [...prev, { type: 'output', content: output }]);
    } catch (err) {
      setHistory(prev => [...prev, { type: 'error', content: 'Connection lost to lab gateway.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-in zoom-in-95 duration-300">
      <div className="w-full max-w-6xl h-full max-h-[85vh] bg-[#0c0c0e] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-[#111114] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
              <TerminalIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{lab.name}</h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Live Session: {lab.platform}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 px-4 py-1.5 bg-black/40 rounded-full border border-white/5 text-[10px] font-mono text-slate-400">
              <span className="text-cyan-400">CPU: 12%</span>
              <span className="text-indigo-400">MEM: 1.2GB/4GB</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Terminal */}
          <div 
            className="flex-1 p-6 font-mono text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="space-y-2">
              {history.map((entry, idx) => (
                <div key={idx} className="whitespace-pre-wrap break-all">
                  {entry.type === 'input' && (
                    <div className="flex gap-2 text-cyan-400">
                      <span className="text-indigo-500">➜</span>
                      <span className="text-green-500">guest@skyline:~$</span>
                      <span>{entry.content}</span>
                    </div>
                  )}
                  {entry.type === 'output' && <div className="text-slate-300 pl-4">{entry.content}</div>}
                  {entry.type === 'system' && <div className="text-indigo-400 font-bold italic">[*] {entry.content}</div>}
                  {entry.type === 'error' && <div className="text-red-500 font-bold">[!] {entry.content}</div>}
                </div>
              ))}
              {isProcessing && (
                <div className="flex items-center gap-2 text-cyan-400/50">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Processing...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleCommand} className="mt-4 flex gap-2">
              <span className="text-indigo-500">➜</span>
              <span className="text-green-500 font-bold">guest@skyline:~$</span>
              <input
                ref={inputRef}
                autoFocus
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isProcessing}
              />
            </form>
          </div>

          {/* Sidebar Lab Manual */}
          <div className="hidden lg:flex w-80 bg-[#111114] border-l border-white/5 flex-col p-6 overflow-y-auto">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Lab Manual
            </h4>
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <h5 className="text-[10px] font-bold text-cyan-400 uppercase mb-2">Objective</h5>
                <p className="text-xs text-slate-400 leading-relaxed">{lab.description}</p>
              </div>
              <div className="space-y-3">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase">Suggested Tasks</h5>
                {[
                  'Scan the network for active hosts',
                  'Audit IAM policies for over-privileged roles',
                  'Test VPC firewall egress rules',
                  'Simulate a cross-region data exfiltration'
                ].map((task, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer">
                    <div className="mt-1 w-4 h-4 rounded-full border border-white/20 group-hover:border-cyan-500 flex items-center justify-center transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-cyan-500 transition-colors" />
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{task}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/5">
                 <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all flex items-center justify-center gap-2">
                    <Copy className="w-3 h-3" /> Copy Sandbox Credentials
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3 border-t border-white/5 bg-[#0a0a0c] flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5"><Info className="w-3 h-3 text-indigo-400" /> Latency: 42ms</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-green-400" /> SSL: Secure</span>
          </div>
          <div className="flex gap-4">
             <span className="text-cyan-400">Build: 2026.04.12</span>
             <span className="text-slate-600 italic">Isolated ephemeral environment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for loading icon within terminal
const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);

const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
);

const Lock = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);

export default LabConsole;
