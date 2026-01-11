
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
        if (now - lastScrollTime.current < 50) return; 
        
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

    const getCardGradient = (movie: MovieKey) => {
        const metadata = movieMetadata[movie];
        if (!metadata) return 'none';
        const genres = metadata.genre.split(', ');
        
        const stops = cardBackgroundSections.map((section, index) => {
            const startAngle = (index / 22) * 360;
            const endAngle = ((index + 1) / 22) * 360;
            const isActive = genres.includes(section.genre);
            const color = isActive ? section.color : 'transparent';
            return `${color} ${startAngle}deg ${endAngle}deg`;
        });

        return `conic-gradient(from 0deg, ${stops.join(', ')})`;
    };

    return (
        <div ref={containerRef} style={{ 
            width: '100%', 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden', 
            position: 'relative', 
            backgroundColor: 'var(--bg-main)' 
        }}>
            
            {/* 3D Scene Container */}
            <div 
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: '2000px',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Cards Stack */}
                {movies.map((movie, index) => {
                    const offset = index - activeIndex;
                    const isActive = offset === 0;
                    const color = movieColors[movie];
                    const metadata = movieMetadata[movie];
                    if (!metadata) return null;
                    const genresList = metadata.genre.split(', ');

                    const genreColors = genresList.map(genre => {
                        const section = cardBackgroundSections.find(s => s.genre === genre);
                        return section ? section.color : color;
                    });
                    
                    const spacingZ = -400; 
                    const spacingX = 40; 
                    
                    let translateX = offset * spacingX;
                    let translateY = 0; 
                    let translateZ = offset * spacingZ;
                    
                    const rotateX = 10; 
                    const rotateY = -15;
                    
                    let scale = 1;
                    let opacity = 1;

                    if (isActive) {
                        scale = 1.05;
                        opacity = 1;
                    } else if (offset > 0) {
                        opacity = Math.max(0.2, 1 - offset * 0.15);
                        scale = 1; 
                    } else {
                        translateZ = 800 + Math.abs(offset) * 400; 
                        opacity = 0; 
                        translateY = -200; 
                    }

                    if (offset > 8) opacity = 0;

                    const cardStyle: React.CSSProperties = {
                        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                        zIndex: 100 - index,
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
                            onClick={() => setActiveIndex(index)}
                        >
                            <div className={`movie-card animate-card-entry ${isActive ? 'animate-strobe' : ''}`} style={{ 
                                width: '100%', 
                                height: '100%',
                                backgroundColor: isActive ? 'white' : 'var(--slate-50)',
                                opacity: isActive ? 1 : 0.9,
                                filter: isActive ? 'none' : 'grayscale(0.2)'
                            }}>
                                <div 
                                    className="card-gradient-bg"
                                    style={{
                                        background: gradientBackground,
                                        transform: 'scale(1.5)',
                                        filter: 'blur(60px)',
                                    }}
                                />
                                
                                <div className="card-glass-overlay"></div>
                                {isActive && <div className="card-border-shine"></div>}

                                <div className="flex flex-col gap-3 relative z-10" style={{ borderBottom: '1px solid var(--slate-200)', paddingBottom: '1rem', userSelect: 'none' }}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--slate-500)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Movie Arc</div>
                                            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: isActive ? 'var(--slate-900)' : 'var(--slate-600)', lineHeight: 1.1 }}>{movie}</h2>
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-400)' }}>{getMovieYear(movie)}</div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <div className="flex" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <div className="pill-stat pill-boxoffice">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                </svg>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>
                                                    <AnimatedCounter value={metadata.boxOffice} type="currency" />
                                                </span>
                                            </div>

                                            <div className="pill-stat pill-imdb">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>
                                                    <AnimatedCounter value={metadata.imdbRating} type="rating" />
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {genresList.map(genre => {
                                                const section = cardBackgroundSections.find(s => s.genre === genre);
                                                const pillColor = section ? section.color : '#64748b';
                                                return (
                                                    <div 
                                                        key={genre}
                                                        className="pill-genre"
                                                        style={{
                                                            backgroundColor: `${pillColor}15`,
                                                            borderColor: `${pillColor}50`,
                                                            color: pillColor,
                                                            fontSize: '10px'
                                                        }}
                                                    >
                                                        {genre}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="chart-viewport" style={{ flex: 1, backgroundColor: 'rgba(248, 250, 252, 0.9)', zIndex: 10 }}>
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
            <div style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 50 }}>
                {movies.map((movie, index) => {
                    const genres = movieMetadata[movie].genre.split(', ');
                    const genreColors = genres.map(g => cardBackgroundSections.find(s => s.genre === g)?.color || '#94a3b8');
                    const gradientStyle = genreColors.length > 1 
                        ? `linear-gradient(135deg, ${genreColors.join(', ')})` 
                        : genreColors[0];

                    return (
                        <div 
                            key={movie}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.75rem', 
                                cursor: 'pointer', 
                                transition: 'all 0.3s', 
                                opacity: index === activeIndex ? 1 : 0.4,
                                transform: index === activeIndex ? 'translateX(0)' : 'translateX(10px)'
                            }}
                            onClick={() => setActiveIndex(index)}
                        >
                             <div 
                                style={{ 
                                    width: '0.75rem', 
                                    height: '0.75rem', 
                                    borderRadius: '9999px', 
                                    background: gradientStyle,
                                    boxShadow: 'var(--shadow-md)',
                                    transform: index === activeIndex ? 'scale(1.5)' : 'scale(1)',
                                    transition: 'transform 0.3s'
                                }} 
                             ></div>
                             <span style={{ fontSize: '0.875rem', fontWeight: 700, color: index === activeIndex ? 'var(--slate-800)' : 'var(--slate-500)', whiteSpace: 'nowrap' }}>{movie}</span>
                        </div>
                    );
                })}
            </div>

            {/* Instructions */}
            <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'var(--slate-400)', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', userSelect: 'none', pointerEvents: 'none' }}>
                SCROLL TO NAVIGATE CHRONOLOGY
            </div>
        </div>
    );
};

export default IsometricStackView;
