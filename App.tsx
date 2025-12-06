
import React, { useState } from 'react';
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

  // Derived state
  const currentData = getMovieData(activeMovie);
  const movieYear = getMovieYear(activeMovie);
  const director = 'Christopher Nolan'; 

  const handleMovieChange = (movie: MovieKey) => {
    setActiveMovie(movie);
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden gap-8">
      
      {/* Header Controls: Movie Tabs & View Toggle */}
      <div className="w-full max-w-4xl flex flex-col gap-4 items-center">
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

          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-1.5 flex flex-wrap justify-center gap-1 shadow-lg">
            {movies.map(movie => (
                <button
                key={movie}
                onClick={() => handleMovieChange(movie)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeMovie === movie 
                    ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
                >
                {movie}
                </button>
            ))}
          </div>
      </div>

      <div key={key} className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col gap-6 animate-card-entry">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
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

      {/* Data Table */}
      <div key={`${key}-table`} className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden animate-card-entry" style={{animationDelay: '0.2s'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700/50">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-16 text-center">Pt</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4 border-r border-slate-700/30">
                  Story Arc (Baseline)
                </th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Movie Arc ({activeMovie})
                </th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Emotion</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-24 text-center">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {currentData.map((moviePoint, index) => {
                const storyPoint = storyArcRaw[index];
                return (
                  <tr key={moviePoint.x} className="hover:bg-slate-700/20 transition-colors">
                    <td className="p-3 text-sm text-slate-500 text-center font-mono">
                      {moviePoint.x}
                    </td>
                    <td className="p-3 border-r border-slate-700/30">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-sm text-slate-400 font-medium">{storyPoint.label}</span>
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${getBgClass(storyPoint.value)} ${getColorClass(storyPoint.value)}`}>
                          {storyPoint.value > 0 ? '+' : ''}{storyPoint.value}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm text-slate-200">{moviePoint.label}</span>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBgClass(moviePoint.value)} ${getColorClass(moviePoint.value)}`}>
                        {moviePoint.emotion}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`text-sm font-bold font-mono ${getColorClass(moviePoint.value)}`}>
                        {moviePoint.value > 0 ? '+' : ''}{moviePoint.value}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pb-12">
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
  );
};

export default App;
