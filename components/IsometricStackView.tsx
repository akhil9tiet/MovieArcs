
import React, { useEffect, useRef, useState } from 'react';
import LineChart from './LineChart';
import AnimatedCounter from './AnimatedCounter';
import { movies, getMovieData, movieColors, getMovieYear, storyArcData, cardBackgroundSections, movieMetadata } from '../data';
import { MovieKey } from '../types';

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

    // Helper to generate the conic gradient string for a movie
    const getCardGradient = (movie: MovieKey) => {
        const genres = movieMetadata[movie].genre.split(', ');
        
        const stops = cardBackgroundSections.map((section, index) => {
            const startAngle = (index / 22) * 360;
            const endAngle = ((index + 1) / 22) * 360;
            
            // Check if the movie has this genre
            const isActive = genres.includes(section.genre);
            const color = isActive ? section.color : 'transparent';
            
            return `${color} ${startAngle}deg ${endAngle}deg`;
        });

        return `conic-gradient(from 0deg, ${stops.join(', ')})`;
    };

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
                    const metadata = movieMetadata[movie];
                    const genresList = metadata.genre.split(', ');

                    // Get colors for the line stroke gradient based on genre list
                    const genreColors = genresList.map(genre => {
                        const section = cardBackgroundSections.find(s => s.genre === genre);
                        return section ? section.color : movieColors[movie];
                    });
                    
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
                    } else if (offset > 0) {
                        // Future cards (Background)
                        opacity = Math.max(0.2, 1 - offset * 0.15);
                        scale = 1; 
                    } else {
                        // Past cards (offset < 0)
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
                    const gradientBackground = getCardGradient(movie);

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
                                transition-all duration-500 animate-card-entry relative overflow-hidden
                                ${isActive 
                                    ? 'bg-white border-white/60 shadow-2xl animate-strobe' 
                                    : 'bg-slate-50 border-slate-200/50 shadow-xl grayscale-[0.2]'
                                }
                            `}>
                                {/* Conic Gradient Background */}
                                <div 
                                    className="absolute inset-0 opacity-60 pointer-events-none z-0 scale-150"
                                    style={{
                                        background: gradientBackground,
                                        filter: 'blur(60px)', // Heavy blur for mesh effect
                                    }}
                                />
                                
                                <div className="absolute inset-0 bg-white/40 z-0 pointer-events-none backdrop-blur-[2px]"></div>

                                {/* Border Shine - Only render when active to replay animation */}
                                {isActive && <div className="card-border-shine z-50"></div>}

                                {/* Card Header */}
                                <div className="flex flex-col gap-3 border-b border-slate-200/50 pb-4 select-none relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-1">Movie Arc</div>
                                            <h2 className={`text-4xl font-bold leading-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>{movie}</h2>
                                        </div>
                                        <div className="text-2xl font-bold text-slate-400">{getMovieYear(movie)}</div>
                                    </div>
                                    
                                    {/* Metadata Pills Container */}
                                    <div className="flex flex-col gap-2">
                                        {/* Row 1: Metrics */}
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {/* Box Office Pill */}
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm backdrop-blur-[2px] bg-opacity-80">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                </svg>
                                                <span className="text-xs font-bold font-mono">
                                                    <AnimatedCounter value={metadata.boxOffice} type="currency" />
                                                </span>
                                            </div>

                                            {/* IMDb Pill */}
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 shadow-sm backdrop-blur-[2px] bg-opacity-80">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                <span className="text-xs font-bold font-mono">
                                                    <AnimatedCounter value={metadata.imdbRating} type="rating" />
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 2: Genres */}
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {genresList.map(genre => {
                                                // Find color for this genre
                                                const section = cardBackgroundSections.find(s => s.genre === genre);
                                                const pillColor = section ? section.color : '#64748b'; // default slate
                                                
                                                return (
                                                    <div 
                                                        key={genre}
                                                        className="px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-[1px]"
                                                        style={{
                                                            backgroundColor: `${pillColor}15`, // 15 = ~8% opacity
                                                            borderColor: `${pillColor}50`,    // 50 = ~30% opacity
                                                            color: pillColor
                                                        }}
                                                    >
                                                        {genre}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Chart Area - Solid background to exclude gradient from this section */}
                                <div className="flex-1 relative bg-slate-50/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-inner overflow-hidden z-10">
                                    {/* Only render chart if visible/close to conserve resources */}
                                    {(offset >= 0 && offset <= 2) && (
                                        <LineChart 
                                            id={`chart-${movie.replace(/\s+/g, '-')}`}
                                            data={data} 
                                            baselineData={storyArcData}
                                            lineColor={color}
                                            strokeColors={genreColors}
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
                {movies.map((movie, index) => {
                    // Calculate genre gradient for legend dot
                    const genres = movieMetadata[movie].genre.split(', ');
                    const genreColors = genres.map(g => cardBackgroundSections.find(s => s.genre === g)?.color || '#94a3b8');
                    const gradientStyle = genreColors.length > 1 
                        ? `linear-gradient(135deg, ${genreColors.join(', ')})` 
                        : genreColors[0];

                    return (
                        <div 
                            key={movie}
                            className={`flex items-center gap-3 cursor-pointer transition-all duration-300 group ${index === activeIndex ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-40 hover:opacity-80 hover:translate-x-2'}`}
                            onClick={() => setActiveIndex(index)}
                        >
                             <div 
                                className={`w-3 h-3 rounded-full transition-transform duration-300 shadow-sm ${index === activeIndex ? 'scale-150 ring-2 ring-white' : 'group-hover:scale-125'}`} 
                                style={{ background: gradientStyle }}
                             ></div>
                             <span className={`text-sm font-bold tracking-wide ${index === activeIndex ? 'text-slate-800' : 'text-slate-500'}`}>{movie}</span>
                        </div>
                    );
                })}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-medium tracking-wide animate-pulse pointer-events-none select-none">
                Scroll to Move Through Time
            </div>
        </div>
    );
};

export default IsometricStackView;
