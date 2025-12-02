import React, { useEffect, useState, useRef } from 'react';

const SkillRing = ({ skills }) => {
    const [radius, setRadius] = useState(300);
    const containerRef = useRef(null);

    // Calculate radius based on number of items and width
    useEffect(() => {
        const calculateRadius = () => {
            const itemWidth = window.innerWidth < 768 ? 60 : 100; // Approximate item width + gap
            const count = skills.length * 3; // We tripled the items in the render loop

            // Calculate radius to ensure it covers more width
            // We want the diameter to be roughly 80-90% of the screen width on desktop
            const targetDiameter = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth * 0.75;
            const calculatedRadius = targetDiameter / 2;

            // Ensure a minimum radius based on item count to prevent overlapping
            const minRadiusFromItems = Math.round((itemWidth / 2) / Math.tan(Math.PI / count));

            setRadius(Math.max(calculatedRadius, minRadiusFromItems));
        };

        calculateRadius();
        window.addEventListener('resize', calculateRadius);
        return () => window.removeEventListener('resize', calculateRadius);
    }, [skills.length]);

    return (
        <div className="relative w-full h-[100px] md:h-[120px] flex items-center justify-center perspective-2000" style={{ perspective: '2000px' }}>


            <div
                className="relative w-full h-full transform-style-3d animate-spin-3d"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(10deg)',
                }}
            >
                {[...skills, ...skills, ...skills].map((skill, index, array) => {
                    const angle = (360 / array.length) * index;
                    return (
                        <div
                            key={index}
                            className="absolute top-1/2 left-1/2 transform-style-3d"
                            style={{
                                transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <div className="flex flex-col items-center justify-center group">
                                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-jetBlack/60 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110">
                                    {skill.iconUrl ? (
                                        typeof skill.iconUrl === 'string' && skill.iconUrl.startsWith('http') ? (
                                            <img src={skill.iconUrl} alt={skill.name} className="w-6 h-6 md:w-7 md:h-7 object-contain" />
                                        ) : (
                                            <span className="text-2xl md:text-3xl">{skill.iconUrl}</span>
                                        )
                                    ) : (
                                        <span className="text-lg md:text-xl text-pureWhite font-bold">{skill.name[0]}</span>
                                    )}
                                </div>
                                <span
                                    className="mt-2 text-[10px] md:text-xs font-bold text-white opacity-100 transition-opacity duration-300 whitespace-nowrap"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden'
                                    }}
                                >
                                    {skill.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default SkillRing;
