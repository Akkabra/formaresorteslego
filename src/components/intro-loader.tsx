"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type IntroLoaderProps = {
  onFinished: () => void;
};

const AnimatedSpring = () => (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="spring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
          </linearGradient>
        </defs>
        <g stroke="url(#spring-gradient)" strokeWidth="6" strokeLinecap="round" fill="none">
            <path className="intro-spring-ring" style={{ animationDelay: '0s' }} d="M 25,85 C 25,75 75,75 75,85 C 75,95 25,95 25,85" />
            <path className="intro-spring-ring" style={{ animationDelay: '0.2s' }} d="M 25,75 C 25,65 75,65 75,75 C 75,85 25,85 25,75" />
            <path className="intro-spring-ring" style={{ animationDelay: '0.4s' }} d="M 25,65 C 25,55 75,55 75,65 C 75,75 25,75 25,65" />
            <path className="intro-spring-ring" style={{ animationDelay: '0.6s' }} d="M 25,55 C 25,45 75,45 75,55 C 75,65 25,65 25,55" />
            <path className="intro-spring-ring" style={{ animationDelay: '0.8s' }} d="M 25,45 C 25,35 75,35 75,45 C 75,55 25,55 25,45" />
            <path className="intro-spring-ring" style={{ animationDelay: '1.0s' }} d="M 25,35 C 25,25 75,25 75,35 C 75,45 25,45 25,35" />
            <path className="intro-spring-ring" style={{ animationDelay: '1.2s' }} d="M 25,25 C 25,15 75,15 75,25 C 75,35 25,35 25,25" />
        </g>
      </svg>
    </div>
);


const Logo = ({ show }: { show: boolean }) => (
    <Image 
        src="/LOGO PRINCIPAL BLANCO.png" 
        alt="FormaResortes Logo" 
        width={240} 
        height={120} 
        priority 
        className={cn("transition-opacity duration-1000", show ? "opacity-100" : "opacity-0")}
    />
);

const Subtitle = ({ show }: { show: boolean }) => (
    <p className={cn(
        "text-lg font-headline tracking-wider text-primary/80 text-center transition-opacity duration-1000",
        show ? "opacity-100" : "opacity-0"
    )}>
        RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),    // 1. Show UI
      setTimeout(() => setPhase(2), 500),    // 2. Start animation (conceptually)
      setTimeout(() => setPhase(3), 4000),   // 3. Start fading out
      setTimeout(() => onFinished(), 4800)   // 4. Finish
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center bg-[#10172A] z-50 transition-opacity duration-800",
        phase >= 3 && "opacity-0"
      )}
    >
        <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-col items-center space-y-2">
                <Logo show={phase >= 1} />
                <AnimatedSpring />
            </div>
            <Subtitle show={phase >= 1} />
        </div>
    </div>
  );
}
