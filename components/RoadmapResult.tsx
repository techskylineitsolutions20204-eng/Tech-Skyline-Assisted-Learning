
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { CareerRoadmap, LearningStep } from '../types';
import { BookIcon, LabIcon, CertIcon, ChevronRightIcon, QuantumIcon, CpuIcon } from './icons';
import { Play, Radio, Terminal, Clock, BookOpen, ExternalLink, Zap, Shield, Globe, Server, Activity, Search, Code, ShieldCheck, Database } from 'lucide-react';

interface RoadmapResultProps {
  roadmap: CareerRoadmap;
  onReset: () => void;
}

const RESOURCE_LINKS: Record<string, string> = {
  'TryHackMe': 'https://tryhackme.com/hacktivities',
  'Hack The Box': 'https://academy.hackthebox.com/',
  'HTB Academy': 'https://academy.hackthebox.com/',
  'PortSwigger': 'https://portswigger.net/web-security',
  'PortSwigger Academy': 'https://portswigger.net/web-security',
  'SANS': 'https://www.sans.org/cyberaces',
  'SANS CyberAces': 'https://www.sans.org/cyberaces',
  'ISC2': 'https://www.isc2.org/landing/1mcc',
  'ISC2 1MCC': 'https://www.isc2.org/landing/1mcc',
  'CyberDegrees': 'https://www.cyberdegrees.org/resources/free-online-courses/',
  'NetAcad': 'https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html',
  'Packet Tracer': 'https://www.netacad.com/courses/packet-tracer',
  'GNS3': 'https://www.gns3.com/',
  'EVE-NG': 'https://www.eve-ng.net/',
  'RangeForce': 'https://www.rangeforce.com/',
  'Splunk': 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html',
  'Splunk BOTS': 'https://bots.splunk.com/',
  'Blue Team Labs': 'https://blueteamlabs.online/',
  'Security Onion': 'https://securityonion.net/',
  'ELK Stack': 'https://www.elastic.co/security',
  'Elastic': 'https://www.elastic.co/security',
  'CloudGoat': 'https://github.com/RhinoSecurityLabs/cloudgoat',
  'AzureGoat': 'https://github.com/ine-labs/AzureGoat',
  'OWASP Juice Shop': 'https://owasp.org/www-project-juice-shop/',
  'WebGoat': 'https://owasp.org/www-project-webgoat/',
  'DVWA': 'https://github.com/digininja/DVWA',
  'GitHub Security': 'https://securitylab.github.com/',
  'Snyk': 'https://snyk.io/',
  'SonarQube': 'https://www.sonarqube.org/',
  'Google Skills': 'https://www.skills.google/paths',
  'Google Cloud Skills Boost': 'https://www.cloudskillsboost.google/',
  'AWS Skill Builder': 'https://explore.skillbuilder.aws/',
  'Microsoft Learn': 'https://learn.microsoft.com/',
  'Autopsy': 'https://www.autopsy.com/',
  'Volatility': 'https://www.volatilityfoundation.org/',
  'OpenSecurityTraining': 'https://opensecuritytraining.info/',
  'Any.run': 'https://any.run/',
  'freeCodeCamp': 'https://www.freecodecamp.org/',
  'Replit': 'https://replit.com/',
  'Google Colab': 'https://colab.research.google.com/',
  'IBM SkillsBuild': 'https://skillsbuild.org/'
};

const getResourceUrl = (platform: string) => {
  const normalized = platform.toLowerCase();
  const key = Object.keys(RESOURCE_LINKS).find(k => normalized.includes(k.toLowerCase()));
  return key ? RESOURCE_LINKS[key] : '#';
};

const RoadmapResult: React.FC<RoadmapResultProps> = ({ roadmap, onReset }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      <div className="lg:col-span-2 space-y-8">
        {/* Success Header */}
        <section className="bg-gradient-to-br from-cyan-600/10 to-indigo-600/10 border border-cyan-500/20 rounded-3xl p-8 overflow-hidden relative shadow-xl">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
             <Radio className="w-48 h-48 text-cyan-400 rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Full Permission Tech Roadmap</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">{roadmap.goal}</h2>
            <p className="text-slate-300 leading-relaxed max-w-2xl text-lg">{roadmap.summary}</p>
          </div>
        </section>

        {/* Learning Steps */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <BookIcon className="w-6 h-6 text-cyan-400" />
            </div>
            Strategic Learning Journey
          </h3>
          
          <div className="space-y-8">
            {roadmap.steps.map((step, idx) => (
              <div key={idx} className="relative pl-10 border-l-2 border-white/5 group/timeline">
                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#0a0a0c] border-2 border-white/10 group-hover/timeline:border-cyan-500 transition-colors flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover/timeline:bg-cyan-500 transition-colors" />
                </div>
                
                <div className="bg-[#111114] border border-white/5 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group shadow-sm">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      step.timeline === 'Foundational' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      step.timeline === 'Growth' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {step.timeline}
                    </span>
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 bg-white/5 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                       <Clock className="w-3.5 h-3.5 text-cyan-400" />
                       <span>{step.timeCommitment}</span>
                    </div>
                  </div>

                  <h5 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{step.title}</h5>
                  <p className="text-slate-400 mb-8 leading-relaxed text-sm">{step.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-black/40 rounded-2xl border border-white/5">
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                        <Terminal className="w-4 h-4" />
                        Target Skills
                      </span>
                      <ul className="flex flex-wrap gap-2">
                        {step.skills.map((s, i) => (
                          <li key={i} className="text-[10px] px-2.5 py-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-200 font-bold">{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                        <CertIcon className="w-4 h-4" />
                        Validations
                      </span>
                      <ul className="space-y-2">
                        {step.certifications.map((c, i) => (
                          <li key={i} className="text-xs text-yellow-500/80 flex items-center gap-2 font-black">
                             <div className="w-1 h-1 rounded-full bg-yellow-500" />
                             {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95">
                      <Zap className="w-4 h-4 fill-white" />
                      Grant Permission
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <Play className="w-4 h-4" />
                      Virtual Simulation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Tech Portal */}
        <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl -mr-40 -mt-40 pointer-events-none" />
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-8 text-white relative z-10">
            <Globe className="w-6 h-6 text-cyan-400" />
            Global Tech Portal Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
            {['TryHackMe', 'Hack The Box', 'PortSwigger Academy', 'SANS CyberAces', 'ISC2 1MCC', 'Cisco Packet Tracer', 'RangeForce', 'Blue Team Labs', 'Security Onion', 'Splunk Work+', 'AWS Skill Builder', 'Google Cloud Boost', 'EVE-NG'].map(platform => (
              <a 
                key={platform}
                href={getResourceUrl(platform)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-cyan-600 hover:text-white border border-white/5 transition-all group hover:border-cyan-500/30"
              >
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse group-hover:bg-white" />
                   <span className="text-[9px] font-black uppercase tracking-wider truncate">{platform}</span>
                </div>
                <ExternalLink className="w-3 h-3 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Dynamic Labs Sidebar */}
      <div className="space-y-8">
        <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 shadow-xl sticky top-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <LabIcon className="w-6 h-6 text-indigo-400" />
              Live Tech Sandboxes
            </h3>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[8px] font-black uppercase animate-pulse border border-red-500/20 tracking-tighter">PERMISSIONS GRANTED</span>
          </div>
          <div className="space-y-5">
            {roadmap.labs.map((lab, i) => (
              <div 
                key={i} 
                className="p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-indigo-500/40 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <span className="px-2.5 py-1 text-[9px] font-black bg-indigo-500/20 text-indigo-400 rounded-lg uppercase border border-indigo-500/30">
                    {lab.platform}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors relative z-10 leading-tight">{lab.name}</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-5 relative z-10 line-clamp-2">{lab.description}</p>
                <a 
                  href={getResourceUrl(lab.platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white/5 hover:bg-indigo-600 text-[9px] font-black text-white flex items-center justify-center gap-2 uppercase tracking-widest rounded-xl transition-all relative z-10 shadow-inner"
                >
                  Join Live Console <ChevronRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-black transition-all uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-900/40">
             Open Tech Skyline Range
          </button>
        </section>

        <section className="p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-white/5 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-6 shadow-inner">
            <QuantumIcon className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold mb-3 text-white">Advanced AI Mentorship</h4>
          <p className="text-xs text-slate-500 mb-8 leading-relaxed px-4">
            Stuck on a TryHackMe challenge or a complex CloudGoat scenario? Launch a live consult.
          </p>
          <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black transition-all uppercase text-[10px] tracking-widest shadow-xl shadow-cyan-900/40">
             Launch Voice Mentor
          </button>
        </section>
      </div>
    </div>
  );
};

export default RoadmapResult;
