
import React, { useState, useRef } from 'react';
import LineChart from './components/LineChart';
import { DataPoint } from './types';

// Baseline Story Arc Data
const storyArcRaw = [
  { point: 1,  label: "Opening image",          value: 1 },
  { point: 2,  label: "Setup",                   value: 2 },
  { point: 3,  label: "Theme stated",            value: 1 },
  { point: 4,  label: "Inciting incident",       value: -3 },
  { point: 5,  label: "Debate",                  value: -5 },
  { point: 6,  label: "Break into Act II",       value: 0 },
  { point: 7,  label: "B story",                 value: 2 },
  { point: 8,  label: "Fun and games begins",    value: -2 },
  { point: 9,  label: "Rising complications",    value: -4 },
  { point: 10, label: "Mid-crisis setup",        value: -6 },
  { point: 11, label: "Hope spot",               value: -3 },
  { point: 12, label: "Midpoint (reversal)",     value: 0 },
  { point: 13, label: "Escalation",              value: 1 },
  { point: 14, label: "Tension mounts",          value: -1 },
  { point: 15, label: "Bad guys close in",       value: -3 },
  { point: 16, label: "All is lost",             value: -8 },
  { point: 17, label: "Dark night of the soul",  value: -6 },
  { point: 18, label: "Break into Act III",      value: -2 },
  { point: 19, label: "Final approach",          value: 3 },
  { point: 20, label: "Climax",                  value: 6 },
  { point: 21, label: "Payoff",                  value: 8 },
  { point: 22, label: "Falling action",          value: 6 },
  { point: 23, label: "Denouement",              value: 4 },
  { point: 24, label: "Final image",             value: 7 }
];

// Convert to DataPoint format for chart
const storyArcData: DataPoint[] = storyArcRaw.map(item => ({
  x: item.point,
  value: item.value,
  label: item.label
}));

// Extended Interface for Table Data
interface DetailedDataPoint extends DataPoint {
  emotion: string;
}

// Interstellar Movie Arc Data with Emotion Labels
const interstellarMovieData: DetailedDataPoint[] = [
  { x: 1, value: -4, label: "Opening on Earth, dust storms, failing crops", emotion: "Frustration" },
  { x: 2, value: -2, label: "Cooper with family, school conflict", emotion: "Unease" },
  { x: 3, value: 2, label: "Discovering NASA’s secret base", emotion: "Hope" },
  { x: 4, value: -7, label: "Decision to leave family behind", emotion: "Anxiety" },
  { x: 5, value: 5, label: "Launch into space", emotion: "Joy" },
  { x: 6, value: 3, label: "Arrival at Saturn wormhole", emotion: "Confidence" },
  { x: 7, value: -6, label: "First planet (Miller’s water world), disaster", emotion: "Sadness" },
  { x: 8, value: -8, label: "Doyle’s death, time dilation shock", emotion: "Betrayal" },
  { x: 9, value: -9, label: "Return to Endurance, decades lost", emotion: "Devastation" },
  { x: 10, value: -7, label: "Watching Murph’s angry video messages", emotion: "Anxiety" },
  { x: 11, value: 1, label: "Journey to Mann’s planet", emotion: "Relief" },
  { x: 12, value: -8, label: "Mann’s betrayal", emotion: "Deep sadness" },
  { x: 13, value: -5, label: "Mann’s sabotage, Endurance damaged", emotion: "Tension" },
  { x: 14, value: 6, label: "Docking sequence (Cooper saves Endurance)", emotion: "Achievement" },
  { x: 15, value: -3, label: "Cooper decides to sacrifice himself", emotion: "Conflict" },
  { x: 16, value: -10, label: "Entering the black hole", emotion: "Despair" },
  { x: 17, value: 4, label: "Tesseract reveal, communication with Murph", emotion: "Satisfaction" },
  { x: 18, value: 8, label: "Cooper realizes love bridges dimensions", emotion: "Triumph" },
  { x: 19, value: 9, label: "Murph solves equation on Earth", emotion: "Celebration" },
  { x: 20, value: 6, label: "Cooper rescued near Saturn", emotion: "Relief" },
  { x: 21, value: 7, label: "Reunion with elderly Murph", emotion: "Happiness" },
  { x: 22, value: 2, label: "Murph urges Cooper to find Brand", emotion: "Hope" },
  { x: 23, value: 5, label: "Brand on Edmunds’ planet, new beginning", emotion: "Joy" },
  { x: 24, value: 10, label: "Closing image: humanity’s survival assured", emotion: "Elation" },
];

const App: React.FC = () => {
  const [data, setData] = useState<DetailedDataPoint[]>(interstellarMovieData);
  const [key, setKey] = useState(0); // Used to force re-render/re-animate
  const [isRecording, setIsRecording] = useState(false);

  const handleRefresh = () => {
    // Reset data (though it's static now) and trigger re-render
    setData(interstellarMovieData);
    setKey(prev => prev + 1);
  };

  const handleDownloadVideo = async () => {
    try {
      // 1. Ask user to select screen/tab to record
      // We recommend they select "This Tab" for best results
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "browser", // Hint to browser to prefer tab sharing
        },
        audio: false
      });

      setIsRecording(true);

      // 2. Check supported mime types
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
        // Use mp4 extension if supported, else webm
        a.download = `story-arc-animation.${mimeType === "video/mp4" ? "mp4" : "webm"}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Stop all tracks to clear the recording icon in browser
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };

      // 3. Start recording
      mediaRecorder.start();

      // 4. Trigger the animation replay immediately
      handleRefresh();

      // 5. Stop recording after adequate time (4.5s covers the animation + buffer)
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, 4500);

    } catch (err) {
      console.error("Error recording:", err);
      setIsRecording(false);
      alert("Could not start recording. Please ensure you grant screen recording permissions.");
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden gap-8">
      
      <div key={key} className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col gap-6 animate-card-entry">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="animate-title-slide">
            <h2 className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-1">STORY ARC</h2>
            <div className="flex items-baseline gap-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Interstellar
              </h1>
              <div className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                <span>2014</span>
              </div>
            </div>
            {/* Director Pill */}
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600/50">
              <span className="text-emerald-400 text-sm font-medium">Christopher Nolan</span>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="w-full h-[400px] md:h-[500px] relative rounded-xl bg-slate-900/30 border border-slate-700/30 shadow-inner">
           {/* Passing key forces React to unmount and remount the chart, triggering animations again */}
           <LineChart 
              data={data} 
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
                  {/* Halo effect: Stronger shadow + ring */}
                  <div className="w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.7)] ring-4 ring-indigo-500/20"></div>
                  <span className="text-slate-400 text-sm">movie arc</span>
              </div>
              <div className="flex items-center gap-2">
                  {/* Visual representation of dotted gray line for legend */}
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
      <div className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden animate-card-entry" style={{animationDelay: '0.2s'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700/50">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-16 text-center">Pt</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4 border-r border-slate-700/30">
                  Story Arc (Baseline)
                </th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Movie Arc (Interstellar)
                </th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Emotion</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-24 text-center">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {interstellarMovieData.map((moviePoint, index) => {
                const storyPoint = storyArcRaw[index];
                return (
                  <tr key={moviePoint.x} className="hover:bg-slate-700/20 transition-colors">
                    {/* Point */}
                    <td className="p-3 text-sm text-slate-500 text-center font-mono">
                      {moviePoint.x}
                    </td>

                    {/* Baseline */}
                    <td className="p-3 border-r border-slate-700/30">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-sm text-slate-400 font-medium">{storyPoint.label}</span>
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${getBgClass(storyPoint.value)} ${getColorClass(storyPoint.value)}`}>
                          {storyPoint.value > 0 ? '+' : ''}{storyPoint.value}
                        </span>
                      </div>
                    </td>

                    {/* Movie Arc Scene */}
                    <td className="p-3">
                      <span className="text-sm text-slate-200">{moviePoint.label}</span>
                    </td>

                    {/* Emotion Label */}
                    <td className="p-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBgClass(moviePoint.value)} ${getColorClass(moviePoint.value)}`}>
                        {moviePoint.emotion}
                      </span>
                    </td>

                    {/* Value */}
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
      <div className="flex flex-col sm:flex-row items-center gap-4">
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
