
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
import { ExternalLink, Terminal, PlayCircle, Zap } from 'lucide-react';

interface DomainConfig {
  id: TechDomain;
  icon: React.ReactNode;
  color: string;
  bg: string;
  activeLabs: number;
  courseLink: string;
  labLink: string;
  topPlatform: string;
  secondaryLinks?: { label: string; url: string }[];
}

const domains: DomainConfig[] = [
  { 
    id: TechDomain.CYBERSECURITY, 
    icon: <ShieldIcon className="w-6 h-6" />, 
    color: 'text-red-400', 
    bg: 'bg-red-500/10', 
    activeLabs: 50,
    courseLink: 'https://www.isc2.org/landing/1mcc',
    labLink: 'https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html',
    topPlatform: 'ISC2, Cisco & SANS',
    secondaryLinks: [
      { label: 'SANS CyberAces', url: 'https://www.sans.org/cyberaces' },
      { label: 'CyberDegrees Free', url: 'https://www.cyberdegrees.org/resources/free-online-courses/' },
      { label: 'PortSwigger Academy', url: 'https://portswigger.net/web-security' }
    ]
  },
  { 
    id: TechDomain.CLOUD, 
    icon: <CloudIcon className="w-6 h-6" />, 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/10', 
    activeLabs: 24,
    courseLink: 'https://www.skills.google/paths',
    labLink: 'https://github.com/features/codespaces',
    topPlatform: 'Google Skills & Codespaces'
  },
  { 
    id: TechDomain.DEV_DEVOPS, 
    icon: <CodeIcon className="w-6 h-6" />, 
    color: 'text-green-400', 
    bg: 'bg-green-500/10', 
    activeLabs: 18,
    courseLink: 'https://www.freecodecamp.org/',
    labLink: 'https://labex.io/',
    topPlatform: 'LabEx & Replit'
  },
  { 
    id: TechDomain.DATA_BIG_DATA, 
    icon: <DatabaseIcon className="w-6 h-6" />, 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10', 
    activeLabs: 15,
    courseLink: 'https://skillsbuild.org/students/course-catalog/artificial-intelligence',
    labLink: 'https://colab.research.google.com/',
    topPlatform: 'Google Colab'
  },
  { 
    id: TechDomain.IOT_EDGE, 
    icon: <CpuIcon className="w-6 h-6" />, 
    color: 'text-indigo-400', 
    bg: 'bg-indigo-500/10', 
    activeLabs: 8,
    courseLink: 'https://www.coursera.org/specializations/iot',
    labLink: 'https://replit.com/',
    topPlatform: 'Embedded Simulators'
  },
  { 
    id: TechDomain.BLOCKCHAIN, 
    icon: <BlockchainIcon className="w-6 h-6" />, 
    color: 'text-pink-400', 
    bg: 'bg-pink-500/10', 
    activeLabs: 6,
    courseLink: 'https://cryptozombies.io/',
    labLink: 'https://remix.ethereum.org/',
    topPlatform: 'Remix IDE'
  },
  { 
    id: TechDomain.QUANTUM, 
    icon: <QuantumIcon className="w-6 h-6" />, 
    color: 'text-purple-400', 
    bg: 'bg-purple-500/10', 
    activeLabs: 4,
    courseLink: 'https://quantum-computing.ibm.com/composer',
    labLink: 'https://colab.research.google.com/github/Qiskit/qiskit-tutorials',
    topPlatform: 'IBM Quantum'
  },
  { 
    id: TechDomain.ENTERPRISE_MGMT, 
    icon: <EnterpriseIcon className="w-6 h-6" />, 
    color: 'text-orange-400', 
    bg: 'bg-orange-500/10', 
    activeLabs: 10,
    courseLink: 'https://www.scrum.org/learning-series',
    labLink: 'https://www.atlassian.com/university/free-courses',
    topPlatform: 'Jira/Agile Labs'
  },
  { 
    id: TechDomain.HCI_EXPERIENCE, 
    icon: <UXIcon className="w-6 h-6" />, 
    color: 'text-cyan-400', 
    bg: 'bg-cyan-500/10', 
    activeLabs: 7,
    courseLink: 'https://www.figma.com/resources/learn-design/',
    labLink: 'https://codesandbox.io/',
    topPlatform: 'Figma & Sandbox'
  },
  { 
    id: TechDomain.SOFT_SKILLS, 
    icon: <PeopleIcon className="w-6 h-6" />, 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-500/10', 
    activeLabs: 5,
    courseLink: 'https://skillsbuild.org/students/course-catalog/professional-skills',
    labLink: 'https://replit.com/teams',
    topPlatform: 'Team Playgrounds'
  }
];

const DomainExplorer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {domains.map((domain) => (
        <div 
          key={domain.id} 
          className="group relative p-6 bg-[#111114] border border-white/5 rounded-3xl hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col shadow-2xl"
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
                  <span className="text-[8px] font-bold text-green-500 uppercase">Live</span>
               </div>
               <span className={`text-lg font-mono font-bold ${domain.color}`}>{domain.activeLabs}+ Labs</span>
            </div>
          </div>
          
          <h4 className="text-base font-extrabold leading-tight text-white group-hover:text-cyan-400 transition-colors mb-2">
            {domain.id}
          </h4>
          
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-6">
            Via {domain.topPlatform}
          </p>

          <div className="mt-auto space-y-2 relative z-10">
            <a 
              href={domain.courseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-300 border border-white/5 hover:bg-cyan-600 hover:text-white hover:border-cyan-500 transition-all flex items-center justify-center gap-2 group/btn"
              onClick={(e) => e.stopPropagation()}
            >
              <PlayCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              Course Portal
            </a>
            <a 
              href={domain.labLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-indigo-600/10 text-[10px] font-bold uppercase tracking-widest text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all flex items-center justify-center gap-2 group/btn"
              onClick={(e) => e.stopPropagation()}
            >
              <Terminal className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              Live Labs
            </a>
            
            {domain.secondaryLinks && (
              <div className="pt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {domain.secondaryLinks.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 px-2 rounded-lg bg-black/20 text-[8px] font-bold uppercase tracking-widest text-slate-400 border border-white/5 hover:border-cyan-500/40 hover:text-cyan-400 transition-all flex items-center justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Platform Info on Hover */}
          <div className="absolute inset-x-0 top-0 bg-black/90 backdrop-blur-sm p-4 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 border-b border-white/10 z-10">
             <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Zap className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Live Tech Access</span>
             </div>
             <p className="text-xs text-slate-400 leading-tight">
                Instantly connect to {domain.topPlatform} industry-standard environments for {domain.id}.
             </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DomainExplorer;
