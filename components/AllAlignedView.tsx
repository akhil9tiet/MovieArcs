
import React from 'react';
import IsometricStackView from './IsometricStackView';

interface AllAlignedViewProps {
  onBack: () => void;
}

const AllAlignedView: React.FC<AllAlignedViewProps> = ({ onBack }) => {
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
         </div>
         <IsometricStackView />
      </div>
  );
};

export default AllAlignedView;
