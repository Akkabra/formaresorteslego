"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

// 🔹 Función para generar el resorte con diferencia fija de 2px por anillo
function generateEllipseSpring(width: number, height: number, turns: number) {
  if (turns <= 0) turns = 1;

  const stepY = height / (turns + 1.5);
  const centerX = width / 2;
  let d = "";

  // tamaño inicial de los radios
  const baseRx = 10;
  const baseRy = 6;

  for (let i = 0; i < turns; i++) {
    const rx = baseRx + i * 10; // +2px cada vez en X
    const ry = baseRy + i * 10; // +2px cada vez en Y
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

    const duration = 5000; // animación más lenta

    path.animate(
      [
        { strokeDashoffset: `${len}px` },
        { strokeDashoffset: "0px" },
      ],
      {
        duration,
        easing: "cubic-bezier(.65,0,.35,1)",
        iterations: Infinity,
      }
    );
  }, [show]);

  // 🔹 Resorte más pequeño
  const pathD = generateEllipseSpring(150, 150, 3);

  return (
    <div
      className={cn(
        "relative w-[200px] h-[200px] flex flex-col items-center justify-center transition-opacity duration-700",
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
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="mt-4 text-lg font-semibold text-blue-400 animate-pulse">
        Cargando...
      </p>
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
      width={480}
      height={360}
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
      window.setTimeout(() => setPhase(2), 7500),  // show logo
      window.setTimeout(() => setPhase(3), 9500),  // fade out
      window.setTimeout(() => onFinished(), 10300) // finish
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
