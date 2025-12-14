
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LineChart from './components/LineChart';
import AllAlignedView from './components/AllAlignedView';
import { 
    movies, 
    getMovieData, 
    getMovieYear, 
    storyArcData, 
    storyArcRaw 
} from './data';
import { MovieKey } from './types';

const App: React.FC = () => {
  const [activeMovie, setActiveMovie] = useState<MovieKey>('Interstellar');
  const [key, setKey] = useState(0); // Used to force re-render/re-animate
  const [isRecording, setIsRecording] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'all-aligned'>('single');
  
  // Navigation state for the movie carousel
  const [navStartIndex, setNavStartIndex] = useState(() => {
     const idx = movies.indexOf('Interstellar');
     // Initialize centered on the default active movie
     return Math.max(0, Math.min(idx - 1, movies.length - 3));
  });

  // Derived state
  const currentData = getMovieData(activeMovie);
  const movieYear = getMovieYear(activeMovie);
  const director = 'Christopher Nolan'; 
  const visibleMovies = movies.slice(navStartIndex, navStartIndex + 3);

  // Navigation helpers
  const activeIndex = movies.indexOf(activeMovie);
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < movies.length - 1;

  const handleMovieChange = (movie: MovieKey) => {
    setActiveMovie(movie);
    
    // Auto-center the carousel: 
    // We try to position the new active movie at index 1 (center) of the 3 visible slots.
    // So navStartIndex should be index - 1.
    // We clamp this between 0 and movies.length - 3 to handle edge cases.
    const index = movies.indexOf(movie);
    const targetStart = Math.max(0, Math.min(index - 1, movies.length - 3));
    setNavStartIndex(targetStart);

    setKey(prev => prev + 1); // Trigger re-animation
  };

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  const handleDownloadVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: false
      });

      setIsRecording(true);

      const mimeType = MediaRecorder.isTypeSupported("video/mp4") ? "video/mp4" : "video/webm";
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${activeMovie.toLowerCase().replace(/ /g, '-')}-arc-animation.${mimeType === "video/mp4" ? "mp4" : "webm"}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };

      mediaRecorder.start();
      handleRefresh();

      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, 4500);

    } catch (err: any) {
      console.error("Error recording:", err);
      setIsRecording(false);
      if (err.name === 'NotAllowedError') return;
      alert(`Could not start recording. Error: ${err.message || 'Unknown error'}`);
    }
  };

  const getColorClass = (val: number) => {
    if (val > 0) return "text-emerald-400";
    if (val < 0) return "text-rose-400";
    return "text-slate-400";
  };
  
  const getBgClass = (val: number) => {
    if (val > 0) return "bg-emerald-500/10 border-emerald-500/20";
    if (val < 0) return "bg-rose-500/10 border-rose-500/20";
    return "bg-slate-500/10 border-slate-500/20";
  };

  // Render "All Aligned" Comparison View
  if (viewMode === 'all-aligned') {
      return <AllAlignedView onBack={() => setViewMode('single')} />;
  }

  // Render Default "Single" View
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center p-4 md:p-10 gap-8 custom-scrollbar">
      
      {/* Header Controls: Movie Tabs & View Toggle */}
      <div className="w-full max-w-4xl flex flex-col gap-4 items-center shrink-0">
          <div className="flex gap-2">
            <button 
                onClick={() => setViewMode('single')}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-lg"
            >
                Single View
            </button>
            <button 
                onClick={() => setViewMode('all-aligned')}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
            >
                Compare All
            </button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-1.5 flex items-center gap-1 shadow-lg w-full max-w-lg">
             {/* Prev Button */}
             <button
                onClick={() => {
                    if (hasPrev) handleMovieChange(movies[activeIndex - 1]);
                }}
                disabled={!hasPrev || isRecording}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
             </button>

             {/* Visible Items */}
             <div className="flex-1 grid grid-cols-3 gap-1">
                <AnimatePresence mode='popLayout'>
                    {visibleMovies.map(movie => (
                        <motion.button
                            layout
                            key={movie}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
                            onClick={() => handleMovieChange(movie)}
                            className={`relative px-2 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors duration-300 truncate z-0 ${
                                activeMovie === movie 
                                ? 'text-white' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            {activeMovie === movie && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg -z-10"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{movie}</span>
                        </motion.button>
                    ))}
                </AnimatePresence>
             </div>

             {/* Next Button */}
             <button
                onClick={() => {
                   if (hasNext) handleMovieChange(movies[activeIndex + 1]);
                }}
                disabled={!hasNext || isRecording}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
             </button>
          </div>
      </div>

      <div key={key} className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col gap-6 animate-card-entry relative shrink-0">
        
        {/* ADDED: Border Shine Element */}
        <div className="card-border-shine"></div>

        {/* Info Icon & Popover Table */}
        <div className="absolute top-6 right-6 z-30 group">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/50 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all border border-slate-600/50 hover:border-indigo-500 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            </button>
            
            {/* Popover Dialog */}
            <div className="absolute right-0 top-10 w-[90vw] md:w-[600px] max-h-[60vh] overflow-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right transform scale-95 group-hover:scale-100 z-50 p-1 custom-scrollbar">
                <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-4 border-b border-slate-700/50 flex justify-between items-center z-10 rounded-t-xl">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <span>{activeMovie}</span>
                        <span className="text-slate-600">/</span>
                        <span className="text-indigo-400">Data Points</span>
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-800 px-2 py-1 rounded">Scroll to view</span>
                </div>
                <div className="p-2">
                    <table className="w-full text-left border-collapse">
                         <thead className="bg-slate-800/30 sticky top-0 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="p-3 text-center w-12 rounded-l-lg">#</th>
                                <th className="p-3">Event / Story Beat</th>
                                <th className="p-3 w-20 text-center">Val</th>
                                <th className="p-3 w-24 text-right rounded-r-lg">Emotion</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-800/50">
                            {currentData.map((moviePoint, i) => {
                                const storyPoint = storyArcRaw[i];
                                return (
                                    <tr key={moviePoint.x} className="hover:bg-slate-800/60 transition-colors">
                                        <td className="p-3 text-xs text-slate-500 text-center font-mono">{moviePoint.x}</td>
                                        <td className="p-3">
                                            <div className="text-sm text-slate-200 font-medium leading-tight mb-1">{moviePoint.label}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                                {storyPoint.label}
                                            </div>
                                        </td>
                                        <td className="p-3 text-center align-top pt-3">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${getBgClass(moviePoint.value)} ${getColorClass(moviePoint.value)}`}>
                                                {moviePoint.value > 0 ? '+' : ''}{moviePoint.value}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right align-top pt-3">
                                            <span className="text-xs font-medium text-slate-400 block truncate max-w-[100px] ml-auto">
                                                {moviePoint.emotion}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                         </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pr-12">
          <div className="animate-title-slide">
            <h2 className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-1">STORY ARC</h2>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {activeMovie}
              </h1>
              <div className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                <span>{movieYear}</span>
              </div>
            </div>
            {/* Director Pill */}
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600/50">
              <span className="text-emerald-400 text-sm font-medium">{director}</span>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="w-full h-[400px] md:h-[500px] relative rounded-xl bg-slate-900/30 border border-slate-700/30 shadow-inner">
           <LineChart 
              data={currentData} 
              baselineData={storyArcData}
              lineColor="#818cf8" 
              gradientStart="rgba(129, 140, 248, 0.4)" 
              gradientEnd="rgba(129, 140, 248, 0)" 
            />
        </div>

        {/* Footer / Legend */}
        <div className="flex flex-col gap-2 pt-2 animate-legend-entry">
          <div className="flex gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.7)] ring-4 ring-indigo-500/20"></div>
                  <span className="text-slate-400 text-sm">movie arc</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-3">
                     <div className="w-full border-b-2 border-slate-500 border-dotted"></div>
                  </div>
                  <span className="text-slate-500 text-sm">Baseline</span>
              </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <span className="text-slate-600 text-xs font-medium tracking-wide">
              data gathered with help from Gemini
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pb-12 shrink-0">
          <button 
            onClick={handleRefresh}
            disabled={isRecording}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-500 group-hover:rotate-180`}>
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 21h5v-5"/>
            </svg>
            Replay Animation
          </button>

          <button 
            onClick={handleDownloadVideo}
            disabled={isRecording}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
          >
            {isRecording ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                Recording...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download MP4
              </>
            )}
          </button>
      </div>
      </div>
    </div>
  );
};

export default App;
