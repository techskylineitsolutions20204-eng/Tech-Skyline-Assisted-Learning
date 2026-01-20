
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { QuantumIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <QuantumIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-xl tracking-tight text-white uppercase">Tech Skyline</span>
            <span className="text-[10px] text-cyan-400 font-medium tracking-[0.2em] uppercase">IT Solutions</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="text-white hover:text-cyan-400 transition-colors">Roadmaps</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Guided Labs</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Certifications</a>
          <button className="px-5 py-2 rounded-full bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-600/20 transition-all font-semibold">
            Member Access
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
