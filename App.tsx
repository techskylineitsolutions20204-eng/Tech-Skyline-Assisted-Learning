
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { AppState, CareerRoadmap } from './types';
import { generateLearningPath, RoadmapError } from './services/geminiService';
import Header from './components/Header';
import GoalForm from './components/GoalForm';
import RoadmapResult from './components/RoadmapResult';
import DomainExplorer from './components/DomainExplorer';
import LoadingIndicator from './components/LoadingIndicator';
import LiveMentor from './components/LiveMentor';
import { BackIcon, RefreshIcon, ShieldIcon } from './components/icons';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [error, setError] = useState<{message: string, code?: string} | null>(null);
  const [lastQuery, setLastQuery] = useState<{goal: string, exp: string} | null>(null);

  const handleGeneratePath = async (goal: string, experience: string) => {
    setAppState(AppState.LOADING);
    setError(null);
    setLastQuery({ goal, exp: experience });
    
    try {
      const result = await generateLearningPath(goal, experience);
      setRoadmap(result);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error("Path Generation Failure:", err);
      if (err instanceof RoadmapError) {
        setError({ message: err.message, code: err.code });
      } else {
        setError({ message: 'An unexpected error occurred. Our engineers have been notified.', code: 'UNKNOWN' });
      }
      setAppState(AppState.ERROR);
    }
  };

  const retryLastQuery = () => {
    if (lastQuery) {
      handleGeneratePath(lastQuery.goal, lastQuery.exp);
    }
  };

  const reset = () => {
    setAppState(AppState.IDLE);
    setRoadmap(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-cyan-500/30">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {appState === AppState.IDLE && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                 <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest animate-pulse">Live 2026 Ready</span>
                 <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Global Lab Access</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Future-Proof Your Career
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Assisted self-learning for the tech landscapes of 2026–2030. Live labs, AI voice mentorship, and industry-validated roadmaps.
              </p>
            </section>

            <GoalForm onSubmit={handleGeneratePath} />

            <section className="pt-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <span className="text-xs">01</span>
                  </div>
                  Live Technology Domains
                </h3>
              </div>
              <DomainExplorer />
            </section>
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <LoadingIndicator />
          </div>
        )}

        {appState === AppState.SUCCESS && roadmap && (
          <div className="animate-in fade-in duration-500">
            <button 
              onClick={reset}
              className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <BackIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Explorer
            </button>
            <RoadmapResult roadmap={roadmap} onReset={reset} />
          </div>
        )}

        {appState === AppState.ERROR && error && (
          <div className="max-w-2xl mx-auto py-16 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#111114] border border-red-500/20 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20" />
              <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-8">
                {error.code === 'SAFETY_BLOCK' ? (
                  <ShieldIcon className="w-10 h-10" />
                ) : (
                  <RefreshIcon className="w-10 h-10" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {error.code === 'SAFETY_BLOCK' ? 'Safety Intervention' : 
                 error.code === 'QUOTA_EXCEEDED' ? 'Service Capacity Reached' : 
                 'Roadmap Generation Failed'}
              </h3>
              <p className="text-slate-400 mb-10 leading-relaxed text-lg max-w-md mx-auto">
                {error.message}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={retryLastQuery}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 active:scale-95"
                >
                  <RefreshIcon className="w-5 h-5" />
                  Try Again
                </button>
                <button 
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all active:scale-95"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <LiveMentor />

      <footer className="border-t border-white/5 py-12 mt-20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-bold text-cyan-400">Tech Skyline IT Solutions</h4>
            <p className="text-sm text-slate-500">Live Learning Ecosystem © 2025–2030</p>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Labs</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Mentorship</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
