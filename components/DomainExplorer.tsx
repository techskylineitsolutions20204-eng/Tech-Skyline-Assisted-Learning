
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { 
  ShieldIcon, CloudIcon, CodeIcon, DatabaseIcon, 
  CpuIcon, BlockchainIcon, QuantumIcon, EnterpriseIcon, 
  UXIcon, PeopleIcon
} from './icons';
import { TechDomain } from '../types';
import { ExternalLink, Terminal, PlayCircle, Zap, Shield, Globe, Server, Code, Activity, Search } from 'lucide-react';

interface DomainConfig {
  id: TechDomain;
  icon: React.ReactNode;
  color: string;
  bg: string;
  activeLabs: number;
  primaryLink: string;
  primaryLabel: string;
  secondaryLinks: { label: string; url: string; icon?: React.ReactNode }[];
  tagline: string;
}

const domains: DomainConfig[] = [
  { 
    id: TechDomain.CYBERSECURITY, 
    icon: <ShieldIcon className="w-6 h-6" />, 
    color: 'text-red-400', 
    bg: 'bg-red-500/10', 
    activeLabs: 480,
    tagline: 'Offensive, Blue Team & Forensics',
    primaryLink: 'https://tryhackme.com/hacktivities',
    primaryLabel: 'Launch TryHackMe Range',
    secondaryLinks: [
      { label: 'HTB Academy (Red)', url: 'https://academy.hackthebox.com/', icon: <Shield className="w-3 h-3" /> },
      { label: 'RangeForce (Blue)', url: 'https://www.rangeforce.com/', icon: <Activity className="w-3 h-3" /> },
      { label: 'Splunk Sandbox', url: 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html', icon: <Search className="w-3 h-3" /> },
      { label: 'PentesterLab', url: 'https://pentesterlab.com/', icon: <Globe className="w-3 h-3" /> },
      { label: 'Security Onion', url: 'https://securityonion.net/', icon: <Server className="w-3 h-3" /> },
      { label: 'Autopsy Forensics', url: 'https://www.autopsy.com/', icon: <Search className="w-3 h-3" /> }
    ]
  },
  { 
    id: TechDomain.CLOUD, 
    icon: <CloudIcon className="w-6 h-6" />, 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/10', 
    activeLabs: 320,
    tagline: 'Multi-Cloud & Advanced Emulation',
    primaryLink: 'https://www.netacad.com/courses/packet-tracer',
    primaryLabel: 'Open Cisco Packet Tracer',
    secondaryLinks: [
      { label: 'GNS3 / EVE-NG', url: 'https://www.gns3.com/', icon: <Server className="w-3 h-3" /> },
      { label: 'AWS Skill Builder', url: 'https://explore.skillbuilder.aws/', icon: <Terminal className="w-3 h-3" /> },
      { label: 'Google Cloud Boost', url: 'https://www.cloudskillsboost.google/', icon: <Globe className="w-3 h-3" /> },
      { label: 'CloudGoat (Attack)', url: 'https://github.com/RhinoSecurityLabs/cloudgoat', icon: <Shield className="w-3 h-3" /> },
      { label: 'Microsoft Learn', url: 'https://learn.microsoft.com/', icon: <Code className="w-3 h-3" /> },
      { label: 'Prisma Cloud Labs', url: 'https://www.paloaltonetworks.com/prisma/cloud', icon: <Activity className="w-3 h-3" /> }
    ]
  },
  { 
    id: TechDomain.DEV_DEVOPS, 
    icon: <CodeIcon className="w-6 h-6" />, 
    color: 'text-green-400', 
    bg: 'bg-green-500/10', 
    activeLabs: 140,
    tagline: 'SecOps, K8s & Pipeline Security',
    primaryLink: 'https://labex.io/',
    primaryLabel: 'Enter DevSecOps Sandbox',
    secondaryLinks: [
      { label: 'OWASP Juice Shop', url: 'https://owasp.org/www-project-juice-shop/', icon: <Shield className="w-3 h-3" /> },
      { label: 'Docker/K8s Play', url: 'https://labs.play-with-k8s.com/', icon: <Server className="w-3 h-3" /> },
      { label: 'GitHub Sec Labs', url: 'https://securitylab.github.com/', icon: <Code className="w-3 h-3" /> },
      { label: 'Snyk Advisor', url: 'https://snyk.io/', icon: <Shield className="w-3 h-3" /> },
      { label: 'Jenkins Sec Labs', url: 'https://www.jenkins.io/doc/book/security/', icon: <Activity className="w-3 h-3" /> },
      { label: 'SonarQube Cloud', url: 'https://www.sonarsource.com/products/sonarqube/', icon: <Terminal className="w-3 h-3" /> }
    ]
  },
  { 
    id: TechDomain.DATA_BIG_DATA, 
    icon: <DatabaseIcon className="w-6 h-6" />, 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10', 
    activeLabs: 85,
    tagline: 'AI, Big Data & ELK Stack',
    primaryLink: 'https://colab.research.google.com/',
    primaryLabel: 'Open Google Colab Studio',
    secondaryLinks: [
      { label: 'Elastic Security', url: 'https://www.elastic.co/security', icon: <Search className="w-3 h-3" /> },
      { label: 'IBM SkillsBuild', url: 'https://skillsbuild.org/', icon: <Globe className="w-3 h-3" /> },
      { label: 'Kaggle Workspaces', url: 'https://www.kaggle.com/', icon: <DatabaseIcon className="w-3 h-3" /> },
      { label: 'Snowflake Hands-on', url: 'https://quickstarts.snowflake.com/', icon: <Server className="w-3 h-3" /> }
    ]
  },
  { 
    id: TechDomain.IOT_EDGE, 
    icon: <CpuIcon className="w-6 h-6" />, 
    color: 'text-indigo-400', 
    bg: 'bg-indigo-500/10', 
    activeLabs: 55,
    tagline: 'Hardware, Edge & ARM Security',
    primaryLink: 'https://replit.com/',
    primaryLabel: 'Access IoT Emulator',
    secondaryLinks: [
      { label: 'Wokwi Simulator', url: 'https://wokwi.com/', icon: <Terminal className="w-3 h-3" /> },
      { label: 'Arduino Cloud', url: 'https://create.arduino.cc/', icon: <CpuIcon className="w-3 h-3" /> },
      { label: 'Microsoft IoT Labs', url: 'https://learn.microsoft.com/en-us/azure/iot/', icon: <CloudIcon className="w-3 h-3" /> },
      { label: 'Arm Virtual HW', url: 'https://www.arm.com/products/development-tools/simulation/arm-virtual-hardware', icon: <Server className="w-3 h-3" /> }
    ]
  }
];

const DomainExplorer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {domains.map((domain) => (
        <div 
          key={domain.id} 
          className="group relative p-6 bg-[#111114] border border-white/5 rounded-3xl hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col shadow-2xl"
        >
          {/* Active Background Glow */}
          <div className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${domain.bg}`} />
          
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 rounded-2xl ${domain.bg} ${domain.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
              {domain.icon}
            </div>
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-1.5 mb-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-bold text-green-500 uppercase">Granted Access</span>
               </div>
               <span className={`text-lg font-mono font-bold ${domain.color}`}>{domain.activeLabs}+ Labs</span>
            </div>
          </div>
          
          <h4 className="text-base font-extrabold leading-tight text-white group-hover:text-cyan-400 transition-colors mb-1">
            {domain.id}
          </h4>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-6 leading-tight">{domain.tagline}</p>

          <div className="mt-auto space-y-3 relative z-10">
            <a 
              href={domain.primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-cyan-900/40"
              onClick={(e) => e.stopPropagation()}
            >
              <Zap className="w-4 h-4 fill-white" />
              {domain.primaryLabel}
            </a>

            <div className="grid grid-cols-2 gap-2">
              {domain.secondaryLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 text-[7px] font-extrabold uppercase tracking-tight text-slate-400 flex items-center gap-1.5 transition-all truncate"
                  title={link.label}
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.icon}
                  <span className="truncate">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Hub Info on Hover */}
          <div className="absolute inset-x-0 top-0 bg-black/90 backdrop-blur-sm p-4 translate-y-[-100%] group-hover:translate-y-0 transition-all duration-500 border-b border-white/10 z-20">
             <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Terminal className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Full Permissions Granted</span>
             </div>
             <p className="text-[10px] text-slate-400 leading-snug">
                Verified Tech Skyline partner status. You have direct routing to live {domain.id} sandboxes.
             </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DomainExplorer;
