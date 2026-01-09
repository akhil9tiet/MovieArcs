
import React from 'react';
import { motion } from 'framer-motion';
import CorrelationChart from './CorrelationChart';

interface MethodologyViewProps {
  onBack: () => void;
}

const MethodologyView: React.FC<MethodologyViewProps> = ({ onBack }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="w-full h-screen bg-[#e0e0ed] overflow-y-auto overflow-x-hidden custom-scrollbar font-inter selection:bg-indigo-100 selection:text-indigo-900">
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="pointer-events-auto px-6 py-2.5 rounded-full bg-white/70 border border-white/50 hover:bg-white text-slate-700 text-sm font-bold transition-all shadow-xl backdrop-blur-xl hover:scale-105 active:scale-95"
        >
          ← Return to Arcs
        </button>
        <div className="px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-md text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border border-white/40 shadow-sm">
          Akhil Gupta • Thesis 2024
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-40">
        
        {/* Title Section */}
        <motion.section {...fadeInUp} className="mb-24">
          <div className="flex flex-col gap-8">
            <div className="h-1.5 w-32 bg-indigo-600 rounded-full"></div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              A Technical Thesis on Emotional Story Arcs in Christopher Nolan’s Filmography:
              <span className="block text-indigo-600 italic mt-2">A Comparative RMS Deviation Analysis Against a Standard Story Arc</span>
            </h1>
            
            <div className="flex items-center gap-4 mt-4">
               <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">AG</div>
               <div>
                  <div className="text-base font-bold text-slate-900">Research by <a href="https://www.linkedin.com/in/akhil-gupta/" target="_blank" className="text-indigo-600 hover:underline">Akhil Gupta</a></div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Lead Architect & Data Researcher</div>
               </div>
            </div>
          </div>
        </motion.section>

        {/* Abstract */}
        <motion.section {...fadeInUp} className="mb-32 relative">
          <div className="absolute -left-12 top-0 text-indigo-200 font-black text-8xl opacity-10 select-none">00</div>
          <h2 className="text-xs font-black text-indigo-500 tracking-[0.3em] uppercase mb-8">Abstract</h2>
          <div className="p-8 md:p-12 bg-white/40 border border-white/60 rounded-[2.5rem] backdrop-blur-md shadow-sm">
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed italic font-light">
              This thesis investigates whether the emotional structure of Christopher Nolan’s films—quantified through a 24‑beat emotional arc—correlates with box‑office revenue. Using a manually curated dataset in which each film is decomposed into 24 key narrative moments and assigned an emotional valence score (–10 to +10), we compare each film’s emotional trajectory against a canonical “standard story arc.” The deviation between curves is measured using Root‑Mean‑Square Deviation (RMSD), a robust metric for quantifying distance between two functions. We then examine whether RMSD correlates with global box‑office performance.
            </p>
          </div>
        </motion.section>

        {/* 1. Introduction */}
        <motion.section {...fadeInUp} className="mb-32 relative">
          <div className="absolute -left-12 top-0 text-indigo-200 font-black text-8xl opacity-10 select-none">01</div>
          <h2 className="text-xs font-black text-indigo-500 tracking-[0.3em] uppercase mb-8">1. Introduction</h2>
          <div className="flex flex-col gap-6 text-slate-600 text-lg leading-relaxed">
            <p>
              Narrative theory has long proposed that stories follow recognizable emotional trajectories. From Freytag’s Pyramid to modern computational analyses of emotional arcs, researchers have attempted to quantify how stories rise and fall emotionally and how these patterns influence audience engagement.
            </p>
            <p className="bg-white/30 p-6 rounded-2xl border border-white/40 font-bold text-slate-900">
              Do Nolan’s films succeed commercially because they follow classical emotional arcs—or because they deviate from them?
            </p>
            <p>
              Christopher Nolan’s films are known for nonlinear structures, temporal manipulation, and psychological complexity. To explore this, we construct a dataset of emotional arcs for all 12 of Nolan’s feature films, compare each arc to a standard 24‑beat story structure, and compute the RMS deviation between the two curves.
            </p>
          </div>
        </motion.section>

        {/* Citations / References Section */}
        <motion.section {...fadeInUp} className="mb-32 grid md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-lg border border-white rounded-[2rem] p-8 shadow-xl">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Scientific Foundations</h3>
             <div className="flex flex-col gap-6">
                <a href="https://cdanfort.w3.uvm.edu/research/2016-reagan-epj.pdf?utm_source=copilot.com" target="_blank" className="group block border-l-4 border-transparent hover:border-indigo-500 pl-4 transition-all">
                   <span className="text-[10px] font-black text-indigo-500 uppercase block mb-1">Reagan et al. (2016)</span>
                   <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">The emotional arcs of stories are dominated by six basic shapes.</span>
                </a>
                <a href="https://aclanthology.org/2020.nuse-1.12.pdf?utm_source=copilot.com" target="_blank" className="group block border-l-4 border-transparent hover:border-indigo-500 pl-4 transition-all">
                   <span className="text-[10px] font-black text-indigo-500 uppercase block mb-1">Worsham & Kalita (2020)</span>
                   <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Movie Narrative Arc Extraction using Sentiment Analysis.</span>
                </a>
             </div>
          </div>
          <div className="bg-indigo-600 rounded-[2rem] p-10 shadow-2xl text-white flex flex-col justify-center gap-4">
             <div className="text-5xl font-black italic">RMSD</div>
             <p className="text-sm font-medium opacity-90 leading-relaxed">
                Root‑Mean‑Square Deviation: Our mathematical lens for quantifying narrative distance. Lower values indicate conformity; higher values signal subversion.
             </p>
          </div>
        </motion.section>

        {/* 2. Dataset Construction */}
        <motion.section {...fadeInUp} className="mb-32 relative">
          <div className="absolute -left-12 top-0 text-indigo-200 font-black text-8xl opacity-10 select-none">02</div>
          <h2 className="text-xs font-black text-indigo-500 tracking-[0.3em] uppercase mb-8">2. Dataset Construction</h2>
          <div className="flex flex-col gap-8">
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-6 rounded-3xl bg-white/40 border border-white/60">
                  <h4 className="font-black text-slate-900 mb-2">2.1 Standard Story Arc</h4>
                  <p className="text-sm text-slate-600">The standard arc consists of 24 canonical beats (Opening Image → Final Image), representing a generalized trajectory found in classical frameworks.</p>
               </div>
               <div className="p-6 rounded-3xl bg-white/40 border border-white/60">
                  <h4 className="font-black text-slate-900 mb-2">2.2 Nolan Film Arcs</h4>
                  <p className="text-sm text-slate-600">For each of Nolan’s 12 films, we identified the 24 most important scenes and assigned valence scores (–10 to +10).</p>
               </div>
            </div>
            <div className="bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100 flex flex-wrap justify-center gap-12">
               <div className="text-center">
                  <div className="text-4xl font-black text-indigo-600">12</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Films</div>
               </div>
               <div className="text-center">
                  <div className="text-4xl font-black text-indigo-600">288</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Points</div>
               </div>
               <div className="text-center">
                  <div className="text-4xl font-black text-indigo-600">±10</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valence Range</div>
               </div>
            </div>
          </div>
        </motion.section>

        {/* 3. Methodology */}
        <motion.section {...fadeInUp} className="mb-32 relative">
          <div className="absolute -left-12 top-0 text-indigo-200 font-black text-8xl opacity-10 select-none">03</div>
          <h2 className="text-xs font-black text-indigo-500 tracking-[0.3em] uppercase mb-8">3. Methodology</h2>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="text-lg">To quantify how much a film’s emotional arc deviates from the standard arc, we compute:</p>
            <div className="my-8 flex justify-center p-8 bg-slate-900 rounded-3xl shadow-inner">
               <code className="text-white text-xl md:text-3xl font-mono">RMSD = √ [ (1/24) * Σ (f_film(i) - f_std(i))² ]</code>
            </div>
            <ul className="grid md:grid-cols-3 gap-6 list-none p-0">
               <li className="m-0 p-4 rounded-xl bg-white/30 border border-white/40 text-sm font-medium">Penalizes large deviations strongly</li>
               <li className="m-0 p-4 rounded-xl bg-white/30 border border-white/40 text-sm font-medium">Provides a single scalar measure</li>
               <li className="m-0 p-4 rounded-xl bg-white/30 border border-white/40 text-sm font-medium">Standardized signal analysis</li>
            </ul>
          </div>
        </motion.section>

        {/* 4. Results & Scatter Plot */}
        <motion.section {...fadeInUp} className="mb-32 relative">
          <div className="absolute -left-12 top-0 text-indigo-200 font-black text-8xl opacity-10 select-none">04</div>
          <h2 className="text-xs font-black text-indigo-500 tracking-[0.3em] uppercase mb-8">4. Results (Correlation Analysis)</h2>
          <div className="flex flex-col gap-12">
            <p className="text-slate-600 text-lg">
              Visualizing the relationship between <strong>RMSD</strong> (Deviation from Baseline) and <strong>Worldwide Revenue</strong>. Does a "messier" arc lead to a bigger payday?
            </p>
            
            <div className="w-full h-[600px] bg-white rounded-[3rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] border border-white p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-transparent pointer-events-none"></div>
              <CorrelationChart />
            </div>
          </div>
        </motion.section>

        {/* 5. Discussion */}
        <motion.section {...fadeInUp} className="mb-32 relative">
          <div className="absolute -left-12 top-0 text-indigo-200 font-black text-8xl opacity-10 select-none">05</div>
          <h2 className="text-xs font-black text-indigo-500 tracking-[0.3em] uppercase mb-8">5. Discussion</h2>
          <div className="flex flex-col gap-10">
            <div className="p-8 rounded-[2.5rem] bg-white/80 border border-white shadow-sm">
               <h4 className="text-xl font-black text-slate-900 mb-6 italic">5.1 Emotional Predictors of Success</h4>
               <p className="text-slate-600 leading-relaxed">
                  If RMSD correlates with revenue, it suggests that emotional structure—independent of plot, genre, or theme—plays a measurable role in audience engagement. Given Nolan’s reputation for unconventional storytelling, <strong>Outcome B (Positive Correlation)</strong> is plausible: Audiences reward novelty and structural experimentation.
               </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="p-6 rounded-3xl bg-slate-100/50 border border-slate-200">
                  <h5 className="font-black text-slate-400 uppercase text-xs mb-2">5.2 Limitations</h5>
                  <p className="text-sm text-slate-500 italic">Emotional scores are subjective (generated by ChatGPT). Box‑office revenue is influenced by external factors like IP strength and release timing.</p>
               </div>
               <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100">
                  <h5 className="font-black text-indigo-400 uppercase text-xs mb-2">5.3 Future Work</h5>
                  <p className="text-sm text-indigo-700 font-medium">Use sentiment analysis on actual scripts or subtitles. Compare Nolan to other directors like Villeneuve or Spielberg.</p>
               </div>
            </div>
          </div>
        </motion.section>

        {/* 6. Conclusion */}
        <motion.section {...fadeInUp} className="mb-32 relative border-t border-slate-200 pt-20">
          <div className="absolute -left-12 top-16 text-indigo-200 font-black text-8xl opacity-10 select-none">06</div>
          <h2 className="text-xs font-black text-indigo-500 tracking-[0.3em] uppercase mb-8">6. Conclusion</h2>
          <p className="text-2xl md:text-3xl font-extralight text-slate-800 leading-relaxed">
            This thesis presents a novel computational approach to analyzing Christopher Nolan’s filmography. By quantifying each film’s divergence from a standard story arc using <strong>RMSD</strong> and comparing it to box‑office revenue, we explore whether emotional structure predicts commercial success. The dataset constructed is uniquely suited for deeper research into narrative structure and emotional design.
          </p>
        </motion.section>

        {/* Footer Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="py-40 flex flex-col items-center text-center gap-10"
        >
          <div className="text-indigo-400 text-7xl font-serif">“</div>
          <p className="text-4xl md:text-6xl font-extralight text-slate-900 max-w-3xl leading-[1.1] tracking-tight">
            The best stories aren't just seen; <br/>they are <span className="text-indigo-600 font-bold italic">mathematically felt.</span>
          </p>
          <div className="mt-8 flex flex-col items-center gap-2">
             <div className="w-16 h-1 bg-indigo-600 mb-4 rounded-full"></div>
             <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-400">Akhil Gupta</p>
             <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Architect of the Arc</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default MethodologyView;
