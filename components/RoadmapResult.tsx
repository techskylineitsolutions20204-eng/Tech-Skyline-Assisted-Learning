
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { CareerRoadmap, LearningStep } from '../types';
import { BookIcon, LabIcon, CertIcon, ChevronRightIcon, QuantumIcon, CpuIcon } from './icons';
import { Play, Radio, Terminal, Clock, BookOpen, ExternalLink, Zap } from 'lucide-react';

interface RoadmapResultProps {
  roadmap: CareerRoadmap;
  onReset: () => void;
}

const RESOURCE_LINKS: Record<string, string> = {
  'freeCodeCamp': 'https://www.freecodecamp.org/',
  'Google Colab': 'https://colab.research.google.com/',
  'Google Skills': 'https://www.skills.google/paths',
  'TryHackMe': 'https://tryhackme.com/hacktivities',
  'PortSwigger Academy': 'https://portswigger.net/web-security',
  'OpenSecurityTraining': 'https://opensecuritytraining.info/',
  'SANS CyberAces': 'https://www.sans.org/cyberaces',
  'LabEx': 'https://labex.io/',
  'Great Learning': 'https://www.mygreatlearning.com/cloud-computing/free-courses',
  'IBM SkillsBuild': 'https://skillsbuild.org/students/course-catalog/artificial-intelligence',
  'Any.run': 'https://any.run/',
  'Replit': 'https://replit.com/',
  'CodeSandbox': 'https://codesandbox.io/',
  'GitHub Codespaces': 'https://github.com/features/codespaces'
};

const RoadmapResult: React.FC<RoadmapResultProps> = ({ roadmap, onReset }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-gradient-to-br from-cyan-600/10 to-indigo-600/10 border border-cyan-500/20 rounded-3xl p-8 overflow-hidden relative shadow-xl">
          <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
             <Radio className="w-48 h-48 text-cyan-400 rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Live Assisted Learning Roadmap</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">{roadmap.goal}</h2>
            <p className="text-slate-300 leading-relaxed max-w-2xl text-lg">{roadmap.summary}</p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <BookIcon className="w-6 h-6 text-cyan-400" />
              </div>
              Learning Milestones & Live Labs
            </h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  Live Interface
               </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {roadmap.steps.map((step, idx) => (
              <div key={idx} className="relative pl-10 border-l-2 border-white/5 group/timeline">
                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#0a0a0c] border-2 border-white/10 group-hover/timeline:border-cyan-500 transition-colors flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover/timeline:bg-cyan-500 transition-colors" />
                </div>
                
                <div className="bg-[#111114] border border-white/5 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group shadow-sm hover:shadow-cyan-500/5">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        step.timeline === 'Foundational' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        step.timeline === 'Growth' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                        'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {step.timeline}
                      </span>
                      <h4 className="text-sm font-mono text-slate-500 mt-2">Phase {idx + 1}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-xl">
                       <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{step.timeCommitment}</span>
                       </div>
                    </div>
                  </div>

                  <h5 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{step.title}</h5>
                  <p className="text-slate-400 mb-8 leading-relaxed">{step.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-black/30 rounded-2xl border border-white/5">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <Terminal className="w-4 h-4" />
                        Skills to Practice
                      </span>
                      <ul className="flex flex-wrap gap-2">
                        {step.skills.map((s, i) => (
                          <li key={i} className="text-[11px] px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-slate-300">{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4" />
                        Prerequisites
                      </span>
                      <ul className="space-y-1">
                        {step.prerequisites.map((p, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                             <div className="w-1 h-1 rounded-full bg-slate-600" />
                             {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600/10 text-cyan-400 text-sm font-bold uppercase rounded-xl border border-cyan-500/20 hover:bg-cyan-600 hover:text-white transition-all shadow-lg active:scale-95">
                      <Terminal className="w-5 h-5" />
                      Open Live Interface
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600/10 text-indigo-400 text-sm font-bold uppercase rounded-xl border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all shadow-lg active:scale-95">
                      <Play className="w-5 h-5" />
                      Study & Practice
                    </button>
                    {step.certifications && step.certifications.length > 0 && (
                       <div className="flex items-center gap-2 ml-auto">
                          {step.certifications.map((c, i) => (
                            <div key={i} className="px-3 py-1.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded-lg border border-yellow-500/20 flex items-center gap-1.5">
                              <CertIcon className="w-3.5 h-3.5" />
                              {c}
                            </div>
                          ))}
                       </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Resource Hub Section */}
        <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-3xl -mr-40 -mt-40 pointer-events-none" />
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-8 text-white relative z-10">
            <CpuIcon className="w-6 h-6 text-emerald-400" />
            Live Global Resource Hub
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Cloud, AI & Tech Paths</h4>
              {['Google Skills', 'freeCodeCamp', 'IBM SkillsBuild', 'Google Colab'].map(platform => (
                <a 
                  key={platform}
                  href={RESOURCE_LINKS[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 border border-white/5 transition-all group hover:border-cyan-500/30"
                >
                  <div className="flex items-center gap-3">
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-sm font-bold group-hover:text-cyan-400">{platform}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                </a>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Security Academy & Interactive Labs</h4>
              {['PortSwigger Academy', 'TryHackMe', 'OpenSecurityTraining', 'Any.run'].map(platform => (
                <a 
                  key={platform}
                  href={RESOURCE_LINKS[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 border border-white/5 transition-all group hover:border-indigo-500/30"
                >
                  <div className="flex items-center gap-3">
                     <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                     <span className="text-sm font-bold group-hover:text-indigo-400">{platform}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-indigo-400" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 shadow-xl sticky top-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <LabIcon className="w-6 h-6 text-indigo-400" />
              Interactive Lab Access
            </h3>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[9px] font-extrabold uppercase animate-pulse border border-red-500/20">Live</span>
          </div>
          <div className="space-y-5">
            {roadmap.labs.map((lab, i) => (
              <div 
                key={i} 
                className="p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-indigo-500/40 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                   <Play className="w-16 h-16 text-indigo-400 fill-indigo-400" />
                </div>
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 rounded-lg uppercase border border-indigo-500/20">
                    {lab.platform}
                  </span>
                </div>
                <h5 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors relative z-10">{lab.name}</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-5 relative z-10">{lab.description}</p>
                <a 
                  href={RESOURCE_LINKS[lab.platform] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white/5 hover:bg-indigo-600 text-[10px] font-extrabold text-white flex items-center justify-center gap-2 uppercase tracking-widest rounded-xl transition-all relative z-10 group/btn shadow-inner"
                >
                  Join Lab Session <ChevronRightIcon className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-extrabold hover:from-indigo-500 hover:to-indigo-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-900/30 uppercase tracking-widest text-xs">
            <Radio className="w-5 h-5 animate-pulse" />
            Lifetime Live Vault
          </button>
        </section>

        <section className="p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-white/5 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
          <div className="w-20 h-20 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-8 relative z-10 shadow-inner">
            <QuantumIcon className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-bold mb-3 relative z-10 text-white">24/7 AI Tech Mentor</h4>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed relative z-10">
            Ask any technical question or request a live code review from our expert Voice Assistant.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
             <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-[0.2em]">System Online</span>
          </div>
          <button className="w-full py-4 bg-white/5 hover:bg-cyan-500/10 text-cyan-400 rounded-2xl font-bold border border-cyan-500/30 transition-all uppercase text-xs tracking-widest">
             Start Voice Consult
          </button>
        </section>
      </div>
    </div>
  );
};

export default RoadmapResult;
