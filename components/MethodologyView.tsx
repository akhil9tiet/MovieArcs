import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import CorrelationChart from './CorrelationChart';

interface MethodologyViewProps {
  onBack: () => void;
}

const MethodologyView: React.FC<MethodologyViewProps> = ({ onBack }) => {
  // Explicitly typing the motion props to avoid inference issues that sometimes hide exports in TS
  const fadeInUp: HTMLMotionProps<"section"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="methodology-container custom-scrollbar">
      <div className="sticky-top-nav" style={{ pointerEvents: 'none' }}>
        <button 
          onClick={onBack} 
          className="btn-nav btn-nav-active"
          style={{ 
            pointerEvents: 'auto',
            boxShadow: 'var(--shadow-xl)', 
            padding: '0.625rem 1.5rem',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 700
          }}
        >
          ← Compare Arcs
        </button>
        <div style={{ 
            padding: '0.625rem 1.25rem', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.4)', 
            backdropFilter: 'blur(12px)', color: 'var(--slate-500)', fontSize: '0.625rem', fontWeight: 900, 
            textTransform: 'uppercase', letterSpacing: '0.2em', border: '1px solid rgba(255, 255, 255, 0.4)'
        }}>
          Akhil Gupta • Thesis 2024
        </div>
      </div>

      <div style={{ maxWidth: '56rem', margin: '0 auto', paddingTop: '8rem', paddingBottom: '10rem' }}>
        
        <motion.section {...fadeInUp} className="thesis-section">
          <div className="flex flex-col gap-8">
            <div style={{ height: '0.375rem', width: '8rem', backgroundColor: 'var(--indigo-600)', borderRadius: '9999px' }}></div>
            <h1 className="thesis-title">
              A Technical Thesis on Emotional Story Arcs in Christopher Nolan’s Filmography:
              <span style={{ display: 'block', color: 'var(--indigo-600)', fontStyle: 'italic', marginTop: '0.5rem' }}>A Comparative RMS Deviation Analysis Against a Standard Story Arc</span>
            </h1>
            
            <div className="flex items-center gap-4" style={{ marginTop: '1rem' }}>
               <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '9999px', backgroundColor: 'var(--indigo-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.5rem', boxShadow: 'var(--shadow-lg)' }}>AG</div>
               <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>Research by <a href="https://www.linkedin.com/in/akhil-gupta/" target="_blank" style={{ color: 'var(--indigo-600)', textDecoration: 'none' }}>Akhil Gupta</a></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Lead Architect & Data Researcher</div>
               </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className="thesis-section">
          <div className="thesis-number">00</div>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--indigo-500)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem' }}>Abstract</h2>
          <div className="thesis-card">
            <p className="thesis-quote">
              This thesis investigates whether the emotional structure of Christopher Nolan’s films—quantified through a 24‑beat emotional arc—correlates with box‑office revenue. Using a manually curated dataset in which each film is decomposed into 24 key narrative moments and assigned an emotional valence score (–10 to +10), we compare each film’s emotional trajectory against a canonical “standard story arc.” The deviation between curves is measured using Root‑Mean‑Square Deviation (RMSD), a robust metric for quantifying distance between two functions. We then examine whether RMSD correlates with global box‑office performance.
            </p>
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className="thesis-section">
          <div className="thesis-number">01</div>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--indigo-500)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem' }}>1. Introduction</h2>
          <div className="flex flex-col gap-6" style={{ color: 'var(--slate-600)', fontSize: '1.125rem', lineHeight: 1.6 }}>
            <p>
              Narrative theory has long proposed that stories follow recognizable emotional trajectories. From Freytag’s Pyramid to modern computational analyses of emotional arcs, researchers have attempted to quantify how stories rise and fall emotionally and how these patterns influence audience engagement.
            </p>
            <p style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.4)', fontWeight: 700, color: 'var(--slate-900)' }}>
              Do Nolan’s films succeed commercially because they follow classical emotional arcs—or because they deviate from them?
            </p>
            <p>
              Christopher Nolan’s films are known for nonlinear structures, temporal manipulation, and psychological complexity. To explore this, we construct a dataset of emotional arcs for all 12 of Nolan’s feature films, compare each arc to a standard 24‑beat story structure, and compute the RMS deviation between the two curves.
            </p>
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className="thesis-section grid-2">
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid white', borderRadius: '2rem', padding: '2rem', boxShadow: 'var(--shadow-xl)' }}>
             <h3 style={{ fontSize: '0.875rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Scientific Foundations</h3>
             <div className="flex flex-col gap-6">
                <a href="https://cdanfort.w3.uvm.edu/research/2016-reagan-epj.pdf?utm_source=copilot.com" target="_blank" style={{ textDecoration: 'none', borderLeft: '4px solid transparent', paddingLeft: '1rem', transition: 'all 0.2s' }}>
                   <span style={{ fontSize: '0.625rem', fontWeight: 900, color: 'var(--indigo-500)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Reagan et al. (2016)</span>
                   <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-800)' }}>The emotional arcs of stories are dominated by six basic shapes.</span>
                </a>
                <a href="https://aclanthology.org/2020.nuse-1.12.pdf?utm_source=copilot.com" target="_blank" style={{ textDecoration: 'none', borderLeft: '4px solid transparent', paddingLeft: '1rem', transition: 'all 0.2s' }}>
                   <span style={{ fontSize: '0.625rem', fontWeight: 900, color: 'var(--indigo-500)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Worsham & Kalita (2020)</span>
                   <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-800)' }}>Movie Narrative Arc Extraction using Sentiment Analysis.</span>
                </a>
             </div>
          </div>
          <div style={{ backgroundColor: 'var(--indigo-600)', borderRadius: '2rem', padding: '2.5rem', boxShadow: 'var(--shadow-2xl)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
             <div style={{ fontSize: '3rem', fontWeight: 900, fontStyle: 'italic' }}>RMSD</div>
             <p style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.9, lineHeight: 1.6 }}>
                Root‑Mean‑Square Deviation: Our mathematical lens for quantifying narrative distance. Lower values indicate conformity; higher values signal subversion.
             </p>
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className="thesis-section">
          <div className="thesis-number">02</div>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--indigo-500)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem' }}>2. Dataset Construction</h2>
          <div className="flex flex-col gap-8">
            <div className="grid-2">
               <div style={{ padding: '1.5rem', borderRadius: '1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.6)' }}>
                  <h4 style={{ fontWeight: 900, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>2.1 Standard Story Arc</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>The standard arc consists of 24 canonical beats (Opening Image → Final Image), representing a generalized trajectory found in classical frameworks.</p>
               </div>
               <div style={{ padding: '1.5rem', borderRadius: '1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.6)' }}>
                  <h4 style={{ fontWeight: 900, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>2.2 Nolan Film Arcs</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>For each of Nolan’s 12 films, we identified the 24 most important scenes and assigned valence scores (–10 to +10).</p>
               </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className="thesis-section">
          <div className="thesis-number">04</div>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--indigo-500)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem' }}>4. Results (Correlation Analysis)</h2>
          <div className="flex flex-col gap-12">
            <p style={{ color: 'var(--slate-600)', fontSize: '1.125rem' }}>
              Visualizing the relationship between <strong>RMSD</strong> (Deviation from Baseline) and <strong>Worldwide Revenue</strong>. Does a "messier" arc lead to a bigger payday?
            </p>
            
            <div style={{ width: '100%', height: '600px', backgroundColor: 'white', borderRadius: '3rem', boxShadow: '0 30px 70px -15px rgba(0,0,0,0.1)', border: '1px solid white', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(79, 70, 229, 0.05), transparent)', pointerEvents: 'none' }}></div>
              <CorrelationChart />
            </div>
          </div>
        </motion.section>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ padding: '10rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2.5rem' }}
        >
          <div style={{ color: 'var(--indigo-400)', fontSize: '4.5rem', fontFamily: 'serif' }}>“</div>
          <p style={{ fontSize: '2.25rem', fontWeight: 200, color: 'var(--slate-900)', maxWidth: '48rem', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
            The best stories aren't just seen; <br/>they are <span style={{ color: 'var(--indigo-600)', fontWeight: 700, fontStyle: 'italic' }}>mathematically felt.</span>
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
             <div style={{ width: '4rem', height: '0.25rem', backgroundColor: 'var(--indigo-600)', marginBottom: '1rem', borderRadius: '9999px' }}></div>
             <p style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5em', color: 'var(--slate-400)' }}>Akhil Gupta</p>
             <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-300)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Architect of the Arc</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default MethodologyView;
