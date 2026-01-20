
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface GoalFormProps {
  onSubmit: (goal: string, experience: string) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
  const [goal, setGoal] = useState('');
  const [exp, setExp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal, exp);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-[#111114] border border-white/5 rounded-3xl p-2 shadow-2xl focus-within:border-cyan-500/40 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center px-4 py-3 gap-3">
            <SearchIcon className="w-5 h-5 text-slate-500" />
            <input 
              type="text"
              placeholder="e.g., Become a Senior DevSecOps Engineer by 2027..."
              className="bg-transparent border-none outline-none w-full text-slate-200 placeholder-slate-600"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>
          <div className="hidden md:block w-px bg-white/10 my-2" />
          <div className="md:w-64 flex items-center px-4 py-3 gap-3">
            <input 
              type="text"
              placeholder="Current Role/Skills"
              className="bg-transparent border-none outline-none w-full text-slate-200 placeholder-slate-600 text-sm"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-cyan-900/20 active:scale-[0.98]"
          >
            Generate Roadmap
          </button>
        </div>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
        <span>Trending:</span>
        <button onClick={() => setGoal('Cloud Security Specialist')} className="hover:text-cyan-400">#CloudSecurity</button>
        <button onClick={() => setGoal('Full-Stack Web3 Developer')} className="hover:text-cyan-400">#Web3</button>
        <button onClick={() => setGoal('Quantum Software Engineer')} className="hover:text-cyan-400">#QuantumIT</button>
        <button onClick={() => setGoal('AI Reliability Engineer')} className="hover:text-cyan-400">#AISecurity</button>
      </div>
    </div>
  );
};

export default GoalForm;
