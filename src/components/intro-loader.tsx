"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type IntroLoaderProps = {
  onFinished: () => void;
};

const DrawingSpring = ({ show }: { show: boolean }) => (
  <div className={cn("relative w-48 h-48 flex items-center justify-center transition-opacity duration-1000", show ? "opacity-100" : "opacity-0")}>
    <svg className="drawing-spring" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M 20,10 C 20,0 80,0 80,10 S 20,20 20,30 C 20,20 80,20 80,30 S 20,40 20,50 C 20,40 80,40 80,50 S 20,60 20,70 C 20,60 80,60 80,70 S 20,80 20,90 C 20,80 80,80 80,90" />
    </svg>
  </div>
);

const LogoAndText = ({ show }: { show: boolean }) => (
    <div className={cn("flex flex-col items-center text-primary transition-opacity duration-1000", show ? "opacity-100" : "opacity-0")}>
       <Image src="/LOGO PRINCIPAL BLANCO.png" 
       alt="FormaResortes Logo" 
       width={240} height={120} priority />
       <p className="mt-4 text-lg font-headline tracking-wider text-primary/80 text-center">
        RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
      </p>
    </div>
);


export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),   // 1. Start animation
      setTimeout(() => setPhase(2), 5500),  // 2. Show logo and text (after 2 loops of 2.5s)
      setTimeout(() => setPhase(3), 7500), // 3. Start fade out
      setTimeout(() => onFinished(), 8300) // 4. Finish
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center bg-[#0a192f] z-50 transition-opacity duration-800",
        phase === 3 && "opacity-0"
      )}
    >
        <div className="absolute inset-0 flex items-center justify-center">
            {phase < 2 && <DrawingSpring show={phase === 1} />}
        </div>
        <div className={cn("transition-opacity duration-1000", phase >= 2 ? "opacity-100" : "opacity-0")}>
            <LogoAndText show={phase >= 2} />
        </div>

    </div>
  );
}
