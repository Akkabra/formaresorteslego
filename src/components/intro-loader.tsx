"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

const DrawingSpring = ({ show }: { show: boolean }) => (
  <div
    className={cn(
      "relative w-64 h-64 flex items-center justify-center transition-opacity duration-1000",
      show ? "opacity-100" : "opacity-0"
    )}
  >
    <svg
      className="drawing-spring"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="#003366"   // Azul del logo
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M0 7680 l0 -7680 5120 0 5120 0 0 7680 0 7680 -5120 0 -5120 0 0
-7680z"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0, 2000"
          to="2000, 0"
          dur="3s"
          fill="freeze"
          begin="0s"
        />
        <animate
          attributeName="stroke-dasharray"
          from="2000, 0"
          to="0, 2000"
          dur="2s"
          fill="freeze"
          begin="3s"
        />
      </path>
    </svg>
  </div>
);

const LogoAndText = ({ show }: { show: boolean }) => (
  <div
    className={cn(
      "flex flex-col items-center text-primary transition-opacity duration-1000",
      show ? "opacity-100" : "opacity-0"
    )}
  >
    <Image
      src="/LOGO PRINCIPAL BLANCO.png"
      alt="FormaResortes Logo"
      width={240}
      height={120}
      priority
    />
    <p className="mt-4 text-lg font-headline tracking-wider text-primary/80 text-center">
      RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
  </div>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 5500),
      setTimeout(() => setPhase(3), 7500),
      setTimeout(() => onFinished(), 8300),
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
      <div
        className={cn(
          "transition-opacity duration-1000",
          phase >= 2 ? "opacity-100" : "opacity-0"
        )}
      >
        <LogoAndText show={phase >= 2} />
      </div>
    </div>
  );
}
