
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { CareerRoadmap, LearningStep, Lab } from '../types';
import { BookIcon, LabIcon, CertIcon, ChevronRightIcon, QuantumIcon, CpuIcon } from './icons';
import { Play, Radio, Terminal, Clock, ExternalLink, Zap, Globe, ShieldCheck, Loader2, Lock, Cpu, Server } from 'lucide-react';
import LabConsole from './LabConsole';

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
  'NetAcad': 'https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html',
  'Packet Tracer': 'https://www.netacad.com/courses/packet-tracer',
  'GNS3': 'https://www.gns3.com/',
  'EVE-NG': 'https://www.eve-ng.net/',
  'RangeForce': 'https://www.rangeforce.com/',
  'Splunk': 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html',
  'Blue Team Labs': 'https://blueteamlabs.online/',
  'Security Onion': 'https://securityonion.net/',
  'ELK Stack': 'https://www.elastic.co/security',
  'CloudGoat': 'https://github.com/RhinoSecurityLabs/cloudgoat',
  'AzureGoat': 'https://github.com/ine-labs/AzureGoat',
  'OWASP Juice Shop': 'https://owasp.org/www-project-juice-shop/',
  'Google Cloud Skills Boost': 'https://www.cloudskillsboost.google/',
  'Cloud Skills Boost': 'https://www.cloudskillsboost.google/',
  'Qwiklabs': 'https://www.cloudskillsboost.google/',
  'Google Cloud Shell': 'https://shell.cloud.google.com/',
  'Google Cloud Free Tier': 'https://cloud.google.com/free',
  'Coursera': 'https://www.coursera.org/google-certificates/cybersecurity-certificate',
  'Google Cybersecurity': 'https://www.coursera.org/google-certificates/cybersecurity-certificate',
  'AWS Skill Builder': 'https://explore.skillbuilder.aws/',
  'Microsoft Learn': 'https://learn.microsoft.com/',
  'Autopsy': 'https://www.autopsy.com/',
  'Volatility': 'https://www.volatilityfoundation.org/',
  'OpenSecurityTraining': 'https://opensecuritytraining.info/',
  'GitHub Security': 'https://securitylab.github.com/'
};

const getResourceUrl = (platform: string, labName?: string) => {
  const normalized = platform.toLowerCase();
  const key = Object.keys(RESOURCE_LINKS).find(k => normalized.includes(k.toLowerCase()));
  let url = key ? RESOURCE_LINKS[key] : 'https://google.com/search?q=' + encodeURIComponent(platform + ' labs');
  
  if (labName && (url.includes('cloudskillsboost') || url.includes('qwiklabs'))) {
    url = `https://www.cloudskillsboost.google/catalog?keywords=${encodeURIComponent(labName)}`;
  } else if (labName && url.includes('tryhackme')) {
    url = `https://tryhackme.com/modules`; 
  }
  
  return url;
};

const RoadmapResult: React.FC<RoadmapResultProps> = ({ roadmap, onReset }) => {
  const [launchingLab, setLaunchingLab] = useState<Lab | null>(null);
  const [activeLab, setActiveLab] = useState<Lab | null>(null);
  const [launchProgress, setLaunchProgress] = useState(0);

  const handleJoinConsole = (name: string, platform: string, description: string) => {
    setLaunchingLab({ name, platform, description });
    setLaunchProgress(0);
  };

  useEffect(() => {
    if (launchingLab) {
      const interval = setInterval(() => {
        setLaunchProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setActiveLab(launchingLab);
              setLaunchingLab(null);
            }, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [launchingLab]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 relative">
      {/* Integrated Lab Console */}
      {activeLab && (
        <LabConsole lab={activeLab} onClose={() => setActiveLab(null)} />
      )}

      {/* Lab Launching Overlay */}
      {launchingLab && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0c]/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="max-w-md w-full p-8 bg-[#111114] border border-cyan-500/30 rounded-3xl shadow-2xl text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Loader2 className="w-12 h-12 animate-spin" />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-[8px] font-black px-2 py-1 rounded-full text-black uppercase animate-pulse border border-black/20">
                Full Auth
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">Initializing Lab Console</h4>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{launchingLab.platform} // {launchingLab.name}</p>
            </div>

            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
              <div 
                className="bg-cyan-500 h-full transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(6,182,212,0.6)]" 
                style={{ width: `${launchProgress}%` }} 
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className={`p-2.5 rounded-xl bg-black/40 border transition-colors flex flex-col items-center gap-1.5 ${launchProgress > 25 ? 'border-green-500/30' : 'border-white/5'}`}>
                <Lock className={`w-3.5 h-3.5 ${launchProgress > 25 ? 'text-green-500' : 'text-slate-700'}`} />
                <span className="text-[7px] text-slate-500 uppercase font-black">IAM Sync</span>
              </div>
              <div className={`p-2.5 rounded-xl bg-black/40 border transition-colors flex flex-col items-center gap-1.5 ${launchProgress > 55 ? 'border-green-500/30' : 'border-white/5'}`}>
                <Cpu className={`w-3.5 h-3.5 ${launchProgress > 55 ? 'text-green-500' : 'text-slate-700'}`} />
                <span className="text-[7px] text-slate-500 uppercase font-black">Provisioning</span>
              </div>
              <div className={`p-2.5 rounded-xl bg-black/40 border transition-colors flex flex-col items-center gap-1.5 ${launchProgress > 85 ? 'border-green-500/30' : 'border-white/5'}`}>
                <Server className={`w-3.5 h-3.5 ${launchProgress > 85 ? 'text-green-500' : 'text-slate-700'}`} />
                <span className="text-[7px] text-slate-500 uppercase font-black">Live Tunnel</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-cyan-400 font-mono animate-pulse uppercase tracking-[0.2em]">
                {launchProgress < 20 ? 'Connecting to verified gateway...' :
                 launchProgress < 40 ? 'Authenticating with cloud tenant...' :
                 launchProgress < 60 ? 'Allocating ephemeral compute resources...' :
                 launchProgress < 80 ? 'Configuring VPC network isolation...' :
                 launchProgress < 100 ? 'Syncing lab objectives to console...' :
                 'Environment Ready. Opening Terminal.'}
              </p>
            </div>
          </div>
        </div>
      )}

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
                    <button 
                      onClick={() => handleJoinConsole(step.title, "Strategic Milestone", step.description)}
                      className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      Join Live Console
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
            {['TryHackMe', 'Hack The Box', 'Google Cloud Skills Boost', 'PortSwigger Academy', 'Cisco Packet Tracer', 'Splunk Work+', 'AWS Skill Builder', 'RangeForce', 'Blue Team Labs', 'Security Onion', 'GNS3', 'EVE-NG', 'OWASP Juice Shop'].map(platform => (
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
                <button 
                  onClick={() => handleJoinConsole(lab.name, lab.platform, lab.description)}
                  className="w-full py-2.5 bg-white/5 hover:bg-indigo-600 text-[9px] font-black text-white flex items-center justify-center gap-2 uppercase tracking-widest rounded-xl transition-all relative z-10 shadow-inner"
                >
                  Join Live Console <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
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
            Stuck on a TryHackMe challenge, HTB box, or a Google Cloud IAM lab? Launch a live consult.
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
