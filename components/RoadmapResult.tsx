
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { CareerRoadmap } from '../types';
import { BookIcon, LabIcon, CertIcon, ChevronRightIcon, QuantumIcon, CpuIcon } from './icons';
import { Play, Radio, Terminal } from 'lucide-react';

interface RoadmapResultProps {
  roadmap: CareerRoadmap;
  onReset: () => void;
}

const RESOURCE_LINKS: Record<string, string> = {
  'freeCodeCamp': 'https://www.freecodecamp.org/',
  'Google Colab': 'https://colab.research.google.com/',
  'TryHackMe': 'https://tryhackme.com/classrooms',
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
        <section className="bg-gradient-to-br from-cyan-600/10 to-indigo-600/10 border border-cyan-500/20 rounded-3xl p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-20">
             <Radio className="w-32 h-32 text-cyan-400 rotate-12" />
          </div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">{roadmap.goal}</h2>
          <p className="text-slate-400 leading-relaxed italic relative z-10">{roadmap.summary}</p>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BookIcon className="w-5 h-5 text-cyan-400" />
            Learning Milestones
          </h3>
          <div className="space-y-6">
            {roadmap.steps.map((step, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-white/5">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#0a0a0c]" />
                <div className="bg-[#111114] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                      step.timeline === 'Foundational' ? 'bg-green-500/10 text-green-400' :
                      step.timeline === 'Growth' ? 'bg-cyan-500/10 text-cyan-400' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {step.timeline}
                    </span>
                    <h4 className="text-sm font-mono text-slate-500">Phase {idx + 1}</h4>
                  </div>
                  <h5 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">{step.title}</h5>
                  <p className="text-sm text-slate-400 mb-6">{step.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter block mb-2">Key Skills</span>
                      <ul className="flex flex-wrap gap-2">
                        {step.skills.map((s, i) => (
                          <li key={i} className="text-[10px] px-2 py-1 bg-white/5 rounded-md border border-white/5">{s}</li>
                        ))}
                      </ul>
                    </div>
                    {step.certifications && step.certifications.length > 0 && (
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter block mb-2">Certifications</span>
                        <ul className="flex flex-wrap gap-2">
                          {step.certifications.map((c, i) => (
                            <li key={i} className="text-[10px] px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-md flex items-center gap-1">
                              <CertIcon className="w-3 h-3" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600/10 text-cyan-400 text-xs font-bold uppercase rounded-lg border border-cyan-500/20 hover:bg-cyan-600 hover:text-white transition-all">
                    <Terminal className="w-4 h-4" />
                    Launch Interactive Playground
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Resource Hub Section */}
        <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl -mr-32 -mt-32" />
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-white relative z-10">
            <CpuIcon className="w-5 h-5 text-emerald-400" />
            Tech Skyline Live Resource Hub
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Development & Practice Labs</h4>
              {['freeCodeCamp', 'Replit', 'CodeSandbox', 'GitHub Codespaces'].map(platform => (
                <a 
                  key={platform}
                  href={RESOURCE_LINKS[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 border border-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-sm font-medium group-hover:text-cyan-400">{platform}</span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-slate-600" />
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Security & Infrastructure Labs</h4>
              {['TryHackMe', 'SANS CyberAces', 'Any.run', 'LabEx'].map(platform => (
                <a 
                  key={platform}
                  href={RESOURCE_LINKS[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 border border-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                     <span className="text-sm font-medium group-hover:text-indigo-400">{platform}</span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-slate-600" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <section className="bg-[#111114] border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <LabIcon className="w-5 h-5 text-indigo-400" />
              Live Assisted Labs
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[8px] font-bold uppercase animate-pulse">Live</span>
          </div>
          <div className="space-y-4">
            {roadmap.labs.map((lab, i) => (
              <div 
                key={i} 
                className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Play className="w-12 h-12 text-indigo-400 fill-indigo-400" />
                </div>
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 rounded-md uppercase">
                    {lab.platform}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors relative z-10">{lab.name}</h5>
                <p className="text-xs text-slate-500 leading-relaxed mb-3 relative z-10">{lab.description}</p>
                <a 
                  href={RESOURCE_LINKS[lab.platform] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-cyan-500 hover:text-cyan-400 flex items-center gap-1 uppercase tracking-tighter relative z-10"
                >
                  Join Lab Environment <ChevronRightIcon className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-xl font-bold hover:bg-indigo-600/20 transition-all flex items-center justify-center gap-2">
            <Radio className="w-4 h-4" />
            Lifetime Live Vault
          </button>
        </section>

        <section className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-white/5 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full" />
          <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-6 relative z-10">
            <QuantumIcon className="w-8 h-8" />
          </div>
          <h4 className="font-bold mb-2 relative z-10 text-white">24/7 Voice AI Mentor</h4>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed relative z-10">
            Ask any question about your roadmap or labs using our integrated Real-time Voice Assistant.
          </p>
          <div className="text-[10px] font-mono text-cyan-400 mb-4 animate-pulse relative z-10">
             &gt; Mentors are currently online
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoadmapResult;
