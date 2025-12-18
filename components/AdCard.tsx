
import React, { useState } from 'react';
import { AdVariation } from '../types';

interface AdCardProps {
  ad: AdVariation;
  index: number;
}

const AdCard: React.FC<AdCardProps> = ({ ad, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `Headline: ${ad.headline}\nBody: ${ad.body}\nCTA: ${ad.cta}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="glass rounded-2xl p-6 md:p-8 relative group transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-between items-start mb-6">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          {ad.platform} Optimized
        </span>
        <button 
          onClick={handleCopy}
          className={`p-2 rounded-lg transition-all duration-300 ${copied ? 'bg-green-500/20 text-green-400 scale-110' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-300 transition-colors">
        {ad.headline}
      </h3>

      <div className="space-y-4 mb-8">
        <p className="text-white/70 leading-relaxed text-sm md:text-base">
          {ad.body}
        </p>
        <div className="flex flex-wrap gap-2">
          {ad.persuasionPoints.map((point, i) => (
            <span key={i} className="text-xs text-amber-400/90 font-medium">
              • {point}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-cyan-400 font-bold tracking-wide uppercase text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
          {ad.cta}
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-tighter">Rewrite for Email</button>
          <span className="text-white/10">|</span>
          <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-tighter">A/B Variation</button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
