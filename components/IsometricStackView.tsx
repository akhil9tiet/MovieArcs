
import React, { useEffect, useRef, useState } from 'react';
import LineChart from './LineChart';
import { movies, getMovieData, movieColors, getMovieYear, storyArcData } from '../data';

const IsometricStackView: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastScrollTime = useRef(0);

    const handleWheel = (e: WheelEvent) => {
        const now = Date.now();
        // Slightly lower debounce for smoother feel
        if (now - lastScrollTime.current < 50) return; 
        
        // Threshold to prevent accidental micro-scrolls
        if (Math.abs(e.deltaY) > 5) {
            lastScrollTime.current = now;
            if (e.deltaY > 0) {
                setActiveIndex(prev => Math.min(prev + 1, movies.length - 1));
            } else {
                setActiveIndex(prev => Math.max(prev - 1, 0));
            }
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => container?.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-screen flex items-center justify-center overflow-hidden relative bg-[#e0e0ed]">
            
            {/* 3D Scene Container */}
            <div 
                className="relative w-full h-full flex items-center justify-center"
                style={{
                    perspective: '2000px', // Deep perspective
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Cards Stack */}
                {movies.map((movie, index) => {
                    const offset = index - activeIndex;
                    const isActive = offset === 0;
                    const color = movieColors[movie];
                    
                    // --- Z-Axis Stack Transforms ---
                    
                    // Z-Spacing: How far back each card is push
                    const spacingZ = -400; 
                    
                    // X-Offset: Slight shift to right to see the edge of the card behind
                    const spacingX = 40; 
                    
                    let translateX = offset * spacingX;
                    let translateY = 0; // Keep them on the same floor level
                    let translateZ = offset * spacingZ;
                    
                    // Rotation: Standing up but angled for Isometric look
                    // -15deg Y makes it face slightly left, good for seeing the stack on the right
                    const rotateX = 10; 
                    const rotateY = -15;
                    const rotateZ = 0;
                    
                    let scale = 1;
                    let opacity = 1;

                    // Active Card Logic
                    if (isActive) {
                        scale = 1.05;
                        opacity = 1;
                        // Slightly distinct rotation for focus?
                        // Keeping it uniform looks more like a "stack"
                    } else if (offset > 0) {
                        // Future cards (Background)
                        // Fade slightly as they get deeper
                        opacity = Math.max(0.2, 1 - offset * 0.15);
                        scale = 1; 
                    } else {
                        // Past cards (offset < 0)
                        // They are "behind" the camera or just passed it.
                        // We push them WAY forward (positive Z) and fade them out instantly
                        // so they don't block the view of the active card.
                        translateZ = 800 + Math.abs(offset) * 400; // Fly past camera
                        opacity = 0; // Invisible
                        translateY = -200; // Fly up
                    }

                    // Visibility optimization
                    if (offset > 8) opacity = 0;

                    const cardStyle: React.CSSProperties = {
                        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                        zIndex: 100 - index, // Ensure front cards overlap back cards correctly
                        opacity: opacity,
                        transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s ease',
                        pointerEvents: isActive ? 'auto' : 'none', 
                        position: 'absolute',
                        width: '750px',
                        height: '520px',
                        transformOrigin: 'center center'
                    };

                    const data = getMovieData(movie);

                    return (
                        <div 
                            key={movie}
                            style={cardStyle}
                            className="transition-all duration-500"
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* Inner wrapper handles visual style and entrance animation to avoid 3D transform conflict */}
                            <div className={`
                                w-full h-full flex flex-col gap-4 p-8 
                                rounded-3xl border 
                                transition-all duration-500 animate-card-entry relative
                                ${isActive 
                                    ? 'bg-white border-white/60 shadow-2xl animate-strobe' 
                                    : 'bg-slate-50 border-slate-200/50 shadow-xl grayscale-[0.2]'
                                }
                            `}>
                                {/* Border Shine - Only render when active to replay animation */}
                                {isActive && <div className="card-border-shine"></div>}

                                {/* Card Header */}
                                <div className="flex justify-between items-end border-b border-slate-200 pb-4 select-none relative z-10">
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Movie Arc</div>
                                        <h2 className={`text-4xl font-bold ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>{movie}</h2>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-300">{getMovieYear(movie)}</div>
                                </div>
                                
                                {/* Chart Area */}
                                <div className="flex-1 relative bg-slate-50/50 rounded-xl border border-slate-100 shadow-inner overflow-hidden z-10">
                                    {/* Only render chart if visible/close to conserve resources */}
                                    {(offset >= 0 && offset <= 2) && (
                                        <LineChart 
                                            data={data} 
                                            baselineData={storyArcData}
                                            lineColor={color}
                                            gradientStart={`${color}66`} 
                                            gradientEnd={`${color}00`}
                                            disableAnimation={true}
                                            theme="light" 
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Right Side Vertical Legend */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                {movies.map((movie, index) => (
                    <div 
                        key={movie}
                        className={`flex items-center gap-3 cursor-pointer transition-all duration-300 group ${index === activeIndex ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-40 hover:opacity-80 hover:translate-x-2'}`}
                        onClick={() => setActiveIndex(index)}
                    >
                         <div className={`w-3 h-3 rounded-full transition-transform duration-300 shadow-sm ${index === activeIndex ? 'scale-150 ring-2 ring-white' : 'group-hover:scale-125'}`} style={{ backgroundColor: movieColors[movie] }}></div>
                         <span className={`text-sm font-bold tracking-wide ${index === activeIndex ? 'text-slate-800' : 'text-slate-500'}`}>{movie}</span>
                    </div>
                ))}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-medium tracking-wide animate-pulse pointer-events-none select-none">
                Scroll to Move Through Time
            </div>
        </div>
    );
};

export default IsometricStackView;
