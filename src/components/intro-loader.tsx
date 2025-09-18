"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

// 🔹 Genera un resorte con anillos iguales
function generateEllipseSpring(width: number, height: number, turns: number) {
  const stepY = height / (turns + 1.5);
  let d = "";

  for (let i = 0; i < turns; i++) {
    const cy = stepY * (i + 1);
    const rx = width / 2 - 10;
    const ry = stepY / 2;

    d += `M ${width / 2 - rx} ${cy} A ${rx} ${ry} 0 1 0 ${
      width / 2 + rx
    } ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 - rx} ${cy} `;
  }

  return d;
}

const DrawingSpring = ({ show }: { show: boolean }) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!show || !pathRef.current) return;

    const p = pathRef.current;
    let len = 0;
    try {
      len = p.getTotalLength();
    } catch {
      len = 1200;
    }
    if (len <= 0 || !isFinite(len)) len = 1200;

    // Configuración inicial
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;

    // 🔹 Nueva animación infinita tipo “draw loop”
    const anim = p.animate(
      [
        { strokeDashoffset: len }, // empieza invisible
        { strokeDashoffset: 0 },   // se dibuja
        { strokeDashoffset: -len } // inmediatamente se borra y empieza otra vez
      ],
      {
        duration: 1500, // ⚡ mucho más rápido, continuo
        easing: "linear",
        iterations: Infinity,
      }
    );

    return () => anim.cancel();
  }, [show]);

  const pathD = generateEllipseSpring(200, 300, 6);

  return (
    <div
      className={cn(
        "relative w-[120px] h-[220px] flex flex-col items-center justify-center transition-opacity duration-500",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <svg
        width={100}
        height={200}
        viewBox={`0 0 200 300`}
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
      <p className="mt-4 text-lg text-white tracking-wider animate-pulse">
        Cargando..
      </p>
    </div>
  );
};

const LogoAndText = ({ show }: { show: boolean }) => (
  <div
    className={cn(
      "flex flex-col items-center text-primary transition-opacity duration-700",
      show ? "opacity-100" : "opacity-0"
    )}
  >
    <Image
      src="/LOGO PRINCIPAL FORMARESORTES LEGO SAS.png"
      alt="FormaResortes Logo"
      width={400}
      height={300}
      priority
    />
    <p className="mt-4 text-lg font-headline tracking-wider text-[#0a192f] text-center">
      RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
  </div>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 50),
      window.setTimeout(() => setPhase(2), 3000),
      window.setTimeout(() => setPhase(3), 5000),
      window.setTimeout(() => onFinished(), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-700",
        phase === 3 && "opacity-0",
        phase < 2 ? "bg-[#0a192f]" : "bg-white"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {phase < 2 && <DrawingSpring show={phase === 1} />}
      </div>

      <div
        className={cn(
          "transition-opacity duration-700",
          phase >= 2 ? "opacity-100" : "opacity-0"
        )}
      >
        <LogoAndText show={phase >= 2} />
      </div>
    </div>
  );
}
