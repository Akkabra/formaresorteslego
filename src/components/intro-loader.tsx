"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

// 🔹 Función para generar el resorte
function generateEllipseSpring(width: number, height: number, turns: number) {
  if (turns <= 0) turns = 1;

  const stepY = height / (turns + 1.5);
  const centerX = width / 2;
  let d = "";

  for (let i = 0; i < turns; i++) {
    const progress = (i + 1) / turns; // más pequeño arriba → más grande abajo
    const rx = 20 + progress * (width / 2 - 40);
    const ry = 8 + progress * (stepY - 12);
    const y = stepY * (i + 1);

    if (i === 0) d += `M ${centerX + rx} ${y} `;
    d += `A ${rx} ${ry} 0 0 1 ${centerX - rx} ${y} `;
    d += `A ${rx} ${ry} 0 0 1 ${centerX + rx} ${y} `;
  }

  return d;
}

const DrawingSpring = ({ show }: { show: boolean }) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!show || !pathRef.current) return;

    const path = pathRef.current;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}px`;

    // 🔹 duración calculada para terminar justo antes del cambio de fase
    const duration = 5400;

    path.animate(
      [
        { strokeDashoffset: `${len}px` },
        { strokeDashoffset: "0px" },
      ],
      {
        duration,
        easing: "linear",
        iterations: Infinity, // 🔹 continuo
      }
    );
  }, [show]);

  const pathD = generateEllipseSpring(300, 300, 6);

  return (
    <div
      className={cn(
        "relative w-[300px] h-[300px] flex items-center justify-center transition-opacity duration-700",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <svg
        width={300}
        height={300}
        viewBox={`0 0 300 300`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d={pathD}
          stroke="#1E90FF"
          strokeWidth={2}
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
      window.setTimeout(() => setPhase(1), 100),   // start anim
      window.setTimeout(() => setPhase(2), 5500),  // show logo
      window.setTimeout(() => setPhase(3), 7500),  // fade out
      window.setTimeout(() => onFinished(), 8300)  // finish
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
        {phase < 2 && <DrawingSpring show={phase === 1} />}
      </div>

      <div className={cn("transition-opacity duration-1000", phase >= 2 ? "opacity-100" : "opacity-0")}>
        <LogoAndText show={phase >= 2} />
      </div>
    </div>
  );
}
