
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

const domains = [
  { id: TechDomain.CYBERSECURITY, icon: <ShieldIcon className="w-6 h-6" />, color: 'text-red-400', bg: 'bg-red-500/10', activeLabs: 12 },
  { id: TechDomain.CLOUD, icon: <CloudIcon className="w-6 h-6" />, color: 'text-blue-400', bg: 'bg-blue-500/10', activeLabs: 24 },
  { id: TechDomain.DEV_DEVOPS, icon: <CodeIcon className="w-6 h-6" />, color: 'text-green-400', bg: 'bg-green-500/10', activeLabs: 18 },
  { id: TechDomain.DATA_BIG_DATA, icon: <DatabaseIcon className="w-6 h-6" />, color: 'text-amber-400', bg: 'bg-amber-500/10', activeLabs: 15 },
  { id: TechDomain.IOT_EDGE, icon: <CpuIcon className="w-6 h-6" />, color: 'text-indigo-400', bg: 'bg-indigo-500/10', activeLabs: 8 },
  { id: TechDomain.BLOCKCHAIN, icon: <BlockchainIcon className="w-6 h-6" />, color: 'text-pink-400', bg: 'bg-pink-500/10', activeLabs: 6 },
  { id: TechDomain.QUANTUM, icon: <QuantumIcon className="w-6 h-6" />, color: 'text-purple-400', bg: 'bg-purple-500/10', activeLabs: 4 },
  { id: TechDomain.ENTERPRISE_MGMT, icon: <EnterpriseIcon className="w-6 h-6" />, color: 'text-orange-400', bg: 'bg-orange-500/10', activeLabs: 10 },
  { id: TechDomain.HCI_EXPERIENCE, icon: <UXIcon className="w-6 h-6" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', activeLabs: 7 },
  { id: TechDomain.SOFT_SKILLS, icon: <PeopleIcon className="w-6 h-6" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', activeLabs: 5 }
];

const DomainExplorer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {domains.map((domain) => (
        <div 
          key={domain.id} 
          className="group relative p-6 bg-[#111114] border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
          {/* Active Background Glow */}
          <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity ${domain.bg}`} />
          
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl ${domain.bg} ${domain.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {domain.icon}
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Labs Ready</span>
               <span className={`text-sm font-mono font-bold ${domain.color}`}>{domain.activeLabs}+</span>
            </div>
          </div>
          
          <h4 className="text-sm font-bold leading-tight group-hover:text-cyan-400 transition-colors mb-4">
            {domain.id}
          </h4>
          
          <button className="w-full py-1.5 rounded-lg bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-white/5 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all">
            Join Live Track
          </button>

          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-bold text-green-500 uppercase">Live Now</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DomainExplorer;
