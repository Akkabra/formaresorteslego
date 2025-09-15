"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

// Función para generar el resorte con elipses crecientes
function generateEllipseSpring(width: number, height: number, turns: number) {
  const stepY = height / (turns + 1.5);
  let d = "";

  for (let i = 0; i < turns; i++) {
    const cy = stepY * (i + 1);
    const scaleFactor = 0.5 + (i / turns) * 0.5;
    const rx = (width / 2) * scaleFactor;
    const ry = (stepY / 2) * scaleFactor;

    d += `M ${width / 2 - rx} ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 + rx} ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 - rx} ${cy} `;
  }

  return d;
}

const DrawingSpring = ({ show, repeat = 2 }: { show: boolean; repeat?: number }) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!show || !pathRef.current) return;

    const path = pathRef.current;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}px`;

    let count = 0;

    const runAnimation = () => {
      path.style.strokeDashoffset = `${len}px`;
      const anim = path.animate(
        [
          { strokeDashoffset: `${len}px` },
          { strokeDashoffset: "0px" },
        ],
        {
          duration: 2500,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );

      anim.onfinish = () => {
        count++;
        if (count < repeat) {
          runAnimation();
        }
      };
    };

    runAnimation();
  }, [show, repeat]);

  const pathD = generateEllipseSpring(240, 400, 6);

  return (
    <div
      className={cn(
        "relative w-[300px] h-[450px] flex items-center justify-center transition-opacity duration-700",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <svg
        width={240}
        height={400}
        viewBox={`0 0 240 400`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d={pathD}
          stroke="white"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

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
      window.setTimeout(() => setPhase(1), 100), // start anim
      window.setTimeout(() => setPhase(2), 5500), // show logo
      window.setTimeout(() => setPhase(3), 7500), // fade out
      window.setTimeout(() => onFinished(), 8300) // finish
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center bg-[#0a192f] z-50 transition-opacity duration-800",
        phase === 3 && "opacity-0"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {phase < 2 && <DrawingSpring show={phase === 1} repeat={2} />}
      </div>

      <div className={cn("transition-opacity duration-1000", phase >= 2 ? "opacity-100" : "opacity-0")}>
        <LogoAndText show={phase >= 2} />
      </div>
    </div>
  );
}
