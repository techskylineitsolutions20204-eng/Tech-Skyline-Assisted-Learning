
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { CareerRoadmap, LearningStep } from '../types';
import { BookIcon, LabIcon, CertIcon, ChevronRightIcon, QuantumIcon, CpuIcon } from './icons';
import { Play, Radio, Terminal, Clock, BookOpen, ExternalLink, Zap, Shield, Globe, Server } from 'lucide-react';

interface RoadmapResultProps {
  roadmap: CareerRoadmap;
  onReset: () => void;
}

const RESOURCE_LINKS: Record<string, string> = {
  'TryHackMe': 'https://tryhackme.com/hacktivities',
  'Hack The Box Academy': 'https://academy.hackthebox.com/',
  'HTB Academy': 'https://academy.hackthebox.com/',
  'PortSwigger Academy': 'https://portswigger.net/web-security',
  'SANS CyberAces': 'https://www.sans.org/cyberaces',
  'ISC2 Certified in Cybersecurity': 'https://www.isc2.org/landing/1mcc',
  'ISC2': 'https://www.isc2.org/landing/1mcc',
  'Cisco Packet Tracer': 'https://www.netacad.com/courses/packet-tracer',
  'Packet Tracer': 'https://www.netacad.com/courses/packet-tracer',
  'Cisco NetAcad': 'https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html',
  'GNS3': 'https://www.gns3.com/',
  'EVE-NG': 'https://www.eve-ng.net/',
  'Splunk Work+': 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html',
  'Splunk': 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html',
  'Google Skills': 'https://www.skills.google/paths',
  'Google Cloud Skills Boost': 'https://www.cloudskillsboost.google/',
  'AWS Skill Builder': 'https://explore.skillbuilder.aws/',
  'Microsoft Learn': 'https://learn.microsoft.com/',
  'OWASP Juice Shop': 'https://owasp.org/www-project-juice-shop/',
  'RangeForce': 'https://www.rangeforce.com/',
  'PentesterLab': 'https://pentesterlab.com/',
  'Immersive Labs': 'https://www.immersivelabs.com/',
  'CloudGoat': 'https://github.com/RhinoSecurityLabs/cloudgoat',
  'Security Onion': 'https://securityonion.net/',
  'ELK Stack': 'https://www.elastic.co/guide/index.html',
  'freeCodeCamp': 'https://www.freecodecamp.org/',
  'Replit': 'https://replit.com/',
  'CodeSandbox': 'https://codesandbox.io/',
  'Google Colab': 'https://colab.research.google.com/',
  'LabEx': 'https://labex.io/',
  'IBM SkillsBuild': 'https://skillsbuild.org/'
};

const getResourceUrl = (platform: string) => {
  const key = Object.keys(RESOURCE_LINKS).find(k => platform.toLowerCase().includes(k.toLowerCase()));
  return key ? RESOURCE_LINKS[key] : '#';
};

const RoadmapResult: React.FC<RoadmapResultProps> = ({ roadmap, onReset }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      <div className="lg:col-span-2 space-y-8">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-cyan-600/10 to-indigo-600/10 border border-cyan-500/20 rounded-3xl p-8 overflow-hidden relative shadow-xl">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
             <Radio className="w-48 h-48 text-cyan-400 rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Full Permission Live Roadmap</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">{roadmap.goal}</h2>
            <p className="text-slate-300 leading-relaxed max-w-2xl text-lg">{roadmap.summary}</p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <BookIcon className="w-6 h-6 text-cyan-400" />
              </div>
              Strategic Learning Path
            </h3>
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
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-xl">
                       <Clock className="w-3.5 h-3.5 text-cyan-400" />
                       <span>{step.timeCommitment}</span>
                    </div>
                  </div>

                  <h5 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{step.title}</h5>
                  <p className="text-slate-400 mb-8 leading-relaxed">{step.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-black/30 rounded-2xl border border-white/5">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <Terminal className="w-4 h-4" />
                        Hands-on Skills
                      </span>
                      <ul className="flex flex-wrap gap-2">
                        {step.skills.map((s, i) => (
                          <li key={i} className="text-[11px] px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-slate-300">{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <CertIcon className="w-4 h-4" />
                        Validated Certs
                      </span>
                      <ul className="space-y-2">
                        {step.certifications.map((c, i) => (
                          <li key={i} className="text-xs text-yellow-500 flex items-center gap-2 font-bold">
                             <div className="w-1 h-1 rounded-full bg-yellow-500" />
                             {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600/10 text-cyan-400 text-sm font-bold uppercase rounded-xl border border-cyan-500/20 hover:bg-cyan-600 hover:text-white transition-all shadow-lg">
                      <Terminal className="w-5 h-5" />
                      Open Practice IDE
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600/10 text-indigo-400 text-sm font-bold uppercase rounded-xl border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all shadow-lg">
                      <Play className="w-5 h-5" />
                      Start Simulation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Hub Expanded */}
        <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-3xl -mr-40 -mt-40 pointer-events-none" />
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-8 text-white relative z-10">
            <CpuIcon className="w-6 h-6 text-emerald-400" />
            Direct Tech Portal Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {['TryHackMe', 'HTB Academy', 'Packet Tracer', 'Splunk Work+', 'GNS3 Emulation', 'Google Skills', 'AWS Skill Builder', 'EVE-NG'].map(platform => (
              <a 
                key={platform}
                href={getResourceUrl(platform)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 border border-white/5 transition-all group hover:border-cyan-500/30"
              >
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-cyan-400 truncate">{platform}</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar Labs */}
      <div className="space-y-8">
        <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 shadow-xl sticky top-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <LabIcon className="w-6 h-6 text-indigo-400" />
              Interactive Environments
            </h3>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[9px] font-extrabold uppercase animate-pulse border border-red-500/20">LIVE</span>
          </div>
          <div className="space-y-5">
            {roadmap.labs.map((lab, i) => (
              <div 
                key={i} 
                className="p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-indigo-500/40 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 rounded-lg uppercase border border-indigo-500/20">
                    {lab.platform}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors relative z-10 leading-tight">{lab.name}</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-5 relative z-10">{lab.description}</p>
                <a 
                  href={getResourceUrl(lab.platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white/5 hover:bg-indigo-600 text-[9px] font-extrabold text-white flex items-center justify-center gap-2 uppercase tracking-widest rounded-xl transition-all relative z-10"
                >
                  Join Lab Instance <ChevronRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-white/5 text-center shadow-2xl">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-6 shadow-inner">
            <QuantumIcon className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold mb-3 text-white">Advanced Voice Consult</h4>
          <p className="text-xs text-slate-500 mb-8 leading-relaxed">
            Need help with a specific Packet Tracer config or GNS3 setup? Launch a live consult.
          </p>
          <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold transition-all uppercase text-[10px] tracking-widest shadow-lg shadow-cyan-900/30">
             Start AI Mentor Session
          </button>
        </section>
      </div>
    </div>
  );
};

export default RoadmapResult;
