
import React, { useEffect, useRef, useState } from 'react';
import MultiLineChart from './MultiLineChart';
import IsometricStackView from './IsometricStackView';
import { movies, movieColors, getMovieYear } from '../data';
import { MovieKey } from '../types';

interface AllAlignedViewProps {
  onBack: () => void;
}

const AllAlignedView: React.FC<AllAlignedViewProps> = ({ onBack }) => {
  const [activeMovie, setActiveMovie] = useState<MovieKey>('Interstellar');
  const [viewMode, setViewMode] = useState<'overlay' | 'stack'>('overlay');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Setup IntersectionObserver to track which movie title is in the center of the viewport
    const options = {
      root: null, // viewport
      rootMargin: '-45% 0px -45% 0px', // Trigger when element is in the middle 10%
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const movie = entry.target.getAttribute('data-movie') as MovieKey;
          // Only update if it's different to avoid loops if we manually clicked
          if (movie) setActiveMovie(movie);
        }
      });
    }, options);

    const items = document.querySelectorAll('.movie-scroll-item');
    items.forEach(item => observerRef.current?.observe(item));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [viewMode]); // Re-run when viewMode changes to re-bind if needed

  // Render Stack View
  if (viewMode === 'stack') {
      return (
          <div className="w-full h-screen bg-[#e0e0ed] overflow-hidden relative font-inter">
             {/* Header Controls */}
             <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none">
                <button 
                    onClick={onBack} 
                    className="pointer-events-auto px-4 py-2 rounded-full bg-white/50 border border-white/50 hover:bg-white/80 text-slate-700 text-sm font-medium transition-all shadow-sm backdrop-blur-md"
                >
                    ← Back to Single View
                </button>
                <div className="pointer-events-auto flex bg-white/40 backdrop-blur-md rounded-full p-1 border border-white/40 shadow-sm">
                    <button 
                        onClick={() => setViewMode('overlay')}
                        className="px-4 py-1.5 rounded-full text-xs font-bold transition-all text-slate-600 hover:bg-white/50"
                    >
                        Overlay
                    </button>
                    <button 
                        onClick={() => setViewMode('stack')}
                        className="px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-indigo-600 text-white shadow-md"
                    >
                        Stack 3D
                    </button>
                </div>
             </div>
             <IsometricStackView />
          </div>
      );
  }

  // Render Overlay View
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#e0e0ed] overflow-hidden font-inter text-slate-800">
      
      {/* Left Pane: Sticky Card Area */}
      <div className="w-full md:w-3/4 h-[50vh] md:h-screen sticky top-0 bg-[#e0e0ed] flex flex-col justify-center items-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-slate-200 z-10 relative">
        
        {/* Top Bar Controls */}
        <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 flex justify-between items-start z-20">
            <button 
                onClick={onBack} 
                className="px-4 py-2 rounded-full bg-white/50 border border-white/50 hover:bg-white/80 text-slate-700 text-sm font-medium transition-all shadow-sm backdrop-blur-md"
            >
                ← Back to Single View
            </button>

            <div className="flex bg-white/40 backdrop-blur-md rounded-full p-1 border border-white/40 shadow-sm">
                <button 
                    onClick={() => setViewMode('overlay')}
                    className="px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-indigo-600 text-white shadow-md"
                >
                    Overlay
                </button>
                <button 
                    onClick={() => setViewMode('stack')}
                    className="px-4 py-1.5 rounded-full text-xs font-bold transition-all text-slate-600 hover:bg-white/50"
                >
                    Stack 3D
                </button>
            </div>
        </div>

        {/* The Card Component - Frosted Glass Light Theme */}
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden p-6 md:p-8 flex flex-col gap-6">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-slate-500 text-sm font-medium tracking-wider uppercase mb-1">COMPARE ARC</h2>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight transition-all duration-300">
                            {activeMovie}
                        </h1>
                        <div className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200">
                            <span>{getMovieYear(activeMovie)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Container - Light Glass */}
            <div className="w-full h-[400px] md:h-[500px] relative rounded-xl bg-white/40 border border-white/60 shadow-inner">
                <MultiLineChart activeMovie={activeMovie} theme="light" />
            </div>

            {/* Footer / Hint */}
            <div className="flex justify-between items-center text-slate-500 text-xs md:text-sm">
                <span>Scroll the list on the right to switch movies</span>
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Live Comparison
                </span>
            </div>
        </div>
      </div>

      {/* Right Pane: Scrollable Legend */}
      <div className="w-full md:w-1/4 h-[50vh] md:h-screen overflow-y-auto bg-[#f8fafc] snap-y snap-mandatory relative no-scrollbar border-l border-slate-200">
        {/* Padding to allow first and last items to be centered */}
        <div className="h-[40vh] md:h-[45vh]"></div>
        
        <div className="flex flex-col gap-32 pb-32">
            {movies.map((movie) => (
                <div 
                    key={movie}
                    data-movie={movie}
                    className={`group movie-scroll-item snap-center flex flex-col items-center justify-center p-6 transition-all duration-500 cursor-pointer ${activeMovie === movie ? 'opacity-100 scale-100' : 'opacity-40 scale-90 blur-[1px] hover:opacity-80 hover:scale-95 hover:blur-none'}`}
                    onClick={() => {
                        setActiveMovie(movie);
                        document.querySelector(`[data-movie="${movie}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                >
                    <div 
                        className={`w-4 h-4 rounded-full mb-4 shadow-sm transition-transform duration-300 ${activeMovie === movie ? 'scale-125' : 'scale-100 group-hover:scale-125'}`}
                        style={{ backgroundColor: movieColors[movie] }}
                    ></div>
                    <h3 className={`text-xl font-bold text-center transition-colors duration-300 ${activeMovie === movie ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>
                        {movie}
                    </h3>
                    <span className="text-slate-500 text-sm mt-2">{getMovieYear(movie)}</span>
                </div>
            ))}
        </div>
        
        <div className="h-[40vh] md:h-[45vh]"></div>
      </div>
    </div>
  );
};

export default AllAlignedView;
