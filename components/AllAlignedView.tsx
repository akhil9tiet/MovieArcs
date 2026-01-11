
import React from 'react';
import IsometricStackView from './IsometricStackView';

interface AllAlignedViewProps {
  onMethodology: () => void;
}

const AllAlignedView: React.FC<AllAlignedViewProps> = ({ onMethodology }) => {
  return (
      <div className="w-full h-full bg-main overflow-hidden relative font-inter" style={{ backgroundColor: 'var(--bg-main)', height: '100vh' }}>
         {/* Fixed Navigation Header */}
         <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 50,
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none'
         }}>
            <div style={{
                pointerEvents: 'auto',
                display: 'flex',
                gap: '0.75rem'
            }}>
                <button 
                    className="btn-nav btn-nav-active"
                    style={{ 
                        padding: '0.625rem 1.25rem',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                >
                    Compare Arcs
                </button>
                <button 
                    onClick={onMethodology} 
                    className="btn-nav btn-nav-inactive"
                    style={{ 
                        padding: '0.625rem 1.25rem',
                        backdropFilter: 'blur(12px)',
                        boxShadow: 'var(--shadow-md)'
                    }}
                >
                    Methodology
                </button>
            </div>

            <div style={{ 
                pointerEvents: 'auto',
                padding: '0.625rem 1.25rem', 
                borderRadius: '9999px', 
                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                backdropFilter: 'blur(12px)', 
                color: 'var(--slate-500)', 
                fontSize: '0.625rem', 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                border: '1px solid rgba(255, 255, 255, 0.4)'
            }}>
                Nolan • Thesis 2024
            </div>
         </div>
         
         <IsometricStackView />
      </div>
  );
};

export default AllAlignedView;
