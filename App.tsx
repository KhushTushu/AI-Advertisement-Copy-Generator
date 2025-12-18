
import React, { useState } from 'react';
import { generateAdCopy } from './services/geminiService';
import { AdVariation, GeneratorConfig } from './types';
import MarketingLogos from './components/MarketingLogos';
import AdCard from './components/AdCard';

const App: React.FC = () => {
  const [config, setConfig] = useState<GeneratorConfig>({
    productName: '',
    description: '',
    audience: '',
    tone: 'Professional',
    goal: 'Sales'
  });
  const [results, setResults] = useState<AdVariation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.productName || !config.description) return;

    setLoading(true);
    setResults([]);
    try {
      const ads = await generateAdCopy(config);
      setResults(ads);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d2a2d] to-[#121c2c] text-white selection:bg-cyan-500/30">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-brand text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            CONVERSION <span className="text-cyan-400">STUDIO</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-white/50">
          <a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Enterprise</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Case Studies</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-brand font-extrabold leading-[1.1] tracking-tight">
                Stop Guessing. <br />
                <span className="text-cyan-400">Start Converting.</span>
              </h1>
              <p className="text-lg text-white/50 max-w-md font-light leading-relaxed">
                Conversion Studio uses advanced behavioral linguistics to craft ad copy that doesn't just look good—it sells.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="glass rounded-3xl p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 px-1">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. ZenFlow Wireless Headphones"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  value={config.productName}
                  onChange={e => setConfig({...config, productName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 px-1">Product Description</label>
                <textarea 
                  rows={4}
                  placeholder="What makes your product unique? Mention key benefits..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                  value={config.description}
                  onChange={e => setConfig({...config, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 px-1">Tone</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
                    value={config.tone}
                    onChange={e => setConfig({...config, tone: e.target.value as any})}
                  >
                    <option value="Professional" className="bg-[#121c2c]">Professional</option>
                    <option value="Bold" className="bg-[#121c2c]">Bold</option>
                    <option value="Witty" className="bg-[#121c2c]">Witty</option>
                    <option value="Luxury" className="bg-[#121c2c]">Luxury</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 px-1">Goal</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
                    value={config.goal}
                    onChange={e => setConfig({...config, goal: e.target.value as any})}
                  >
                    <option value="Sales" className="bg-[#121c2c]">Max Sales</option>
                    <option value="Leads" className="bg-[#121c2c]">Lead Gen</option>
                    <option value="Awareness" className="bg-[#121c2c]">Brand Buzz</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full group relative py-5 rounded-2xl bg-cyan-500 overflow-hidden font-bold text-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 gradient-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Market...
                    </>
                  ) : (
                    <>
                      Generate Performance Copy
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 h-full">
            {results.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-xs uppercase font-bold tracking-[0.3em] text-white/40">Market-Ready Variations</h2>
                  <div className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {results.map((ad, idx) => (
                    <AdCard key={ad.id} ad={ad} index={idx} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl p-12 text-center group">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Your Conversion-Ready Copy Awaits</h3>
                <p className="text-white/30 max-w-sm leading-relaxed">
                  Enter your product details to generate high-performing ads optimized for the world's leading marketing platforms.
                </p>
              </div>
            )}
          </div>
        </div>

        <MarketingLogos />
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 text-white/40 text-[10px] uppercase tracking-widest font-bold">
        <div>© 2024 Conversion Studio AI. Built for Revenue.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-cyan-400">Terms of Service</a>
          <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400">Contact Human</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
